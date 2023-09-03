#!/bin/bash

# Update package repositories
sudo apt-get update

# Install Python and data analysis libraries
sudo apt-get install -y python3-pip
pip3 install pandas numpy matplotlib scikit-learn  mysql-connector-python

cd /vagrant/analysis

python3 analyseAll.py

