#!/bin/bash
echo "************************************"
echo "*    Installing dependencies...    *"
echo "************************************"
# Install "some" dependencies.
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg build-essential forever
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
# Update again and install nodejs.
sudo apt-get update && sudo apt-get install nodejs -y


echo "*******************************************"
echo "*   Creating and preparing directories... *"
echo "*******************************************"
# Making the directories on the VM so I don't have to manually 
# delete the node_modules and package-lock.json everytime the 
# VM starts up.
sudo mkdir -p /usr/react-app/client
sudo mkdir -p /usr/react-app/backend
sudo cp -r /vagrant/client/* /usr/react-app/client
sudo cp -r /vagrant/backend/* /usr/react-app/backend


echo "************************************"
echo "*        Preparing Node...         *"
echo "************************************"
# Navigate and install the deps. for the Nodejs server.
# NOTE: It is discouraged to use sudo when running npm
# commands, however I haven't found a workaround yet.
cd /usr/react-app/backend
sudo npm install --verbose --no-bin-links
# Start the server process in the background.
sudo node index.js &
# Gives the server time to start up...
sleep 5


echo "************************************"
echo "*       Preparing React-app...     *"
echo "************************************"
# Navigate and install React app dependencies.
cd /usr/react-app/client
# Not sure why, but the react-scripts must be
# installed differently or else I get an error.
sudo npm install react-scripts --verbose
sudo npm install --verbose --no-bin-links
# Start the react app in the background.
sudo npm start &


echo "**************************************"
echo "* Reached end of React-app set up!!! *"
echo "**************************************"