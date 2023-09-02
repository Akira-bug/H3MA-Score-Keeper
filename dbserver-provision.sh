#!/bin/bash
apt-get update
        
export MYSQL_PWD='insecure_mysqlroot_pw'
echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
apt-get -y install mysql-server
echo "CREATE DATABASE HEMA_SK;" | mysql
echo "CREATE USER 'webuser'@'%' IDENTIFIED BY 'insecure_db_pw';" | mysql
echo "GRANT ALL PRIVILEGES ON *.* TO 'webuser'@'%'" | mysql
echo "ALTER USER 'webuser'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'insecure_db_pw';" | mysql

export MYSQL_PWD='insecure_db_pw'
cat /vagrant/setup-database.sql | mysql -u webuser HEMA_SK

sed -i'' -e '/bind-address/s/127.0.0.1/0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
service mysql restart
