#!/bin/bash

# Update package repositories
sudo apt-get update

# Install Python and data analysis libraries
sudo apt-get install -y python3-pip
pip3 install pandas numpy scikit-learn mysql-connector-python

# Change to analysis dir
cd /vagrant/analysis

# Execute analysis script
python3 analyseAll.py

