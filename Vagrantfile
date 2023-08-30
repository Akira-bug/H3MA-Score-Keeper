# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/xenial64"
  
    config.vm.define "react-app" do |app|
        app.vm.hostname = "webserver"
        app.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
        app.vm.network "private_network", ip: "192.168.56.11"
    
        app.vm.provision "shell", inline: <<-SHELL
            sudo apt-get update

            # Install Node.js
            curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
            sudo apt-get install -y nodejs

            # Copy then the neccesary files from the host to the VM
            cp -r /vagrant/client/build /home/vagrant/client
            cp -r /vagrant/backend /home/vagrant/backend

            # Navigate to, and install the apps dependencies
            cd /home/vagrant/client/build
            npm install

            # Start the react app in the background
            npm start &
            
            # Navigate to, and install the node server dependencies
            cd /vagrant/backend
            npm install
            
            # Start the node.js server
            node index.js
        SHELL
    end

    config.vm.define "dbserver" do |dbserver|
        dbserver.vm.hostname = "dbserver"
        dbserver.vm.network "private_network", ip: "192.168.56.12"

        dbserver.vm.provision "shell", inline: <<-SHELL
            apt-get update
        
            export MYSQL_PWD='insecure_mysqlroot_pw'
            echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
            echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
            apt-get -y install mysql-server
            echo "CREATE DATABASE HEMA-SK;" | mysql
            echo "CREATE USER 'webuser'@'%' IDENTIFIED BY 'insecure_db_pw';" | mysql
            echo "GRANT ALL PRIVILEGES ON HEMA-SK.* TO 'webuser'@'%'" | mysql

            export MYSQL_PWD='insecure_db_pw'
            cat /vagrant/setup-database.sql | mysql -u webuser HEMA-SK

            sed -i'' -e '/bind-address/s/127.0.0.1/0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
            service mysql restart
        SHELL
    end
end