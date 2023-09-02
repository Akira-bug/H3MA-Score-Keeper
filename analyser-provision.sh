#!/bin/bash

# Update package repositories
sudo apt-get update

# Install Python and data analysis libraries
sudo apt-get install -y python3-pip
pip3 install pandas numpy matplotlib scikit-learn jupyter  mysql-connector-python

# Start Jupyter Notebook (optional)
jupyter notebook --ip=0.0.0.0 --port=8888 --no-browser --allow-root
