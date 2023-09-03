#!/bin/bash
echo "************************************"
echo "*    Installing dependencies...    *"
echo "************************************"
# Install "some" dependencies.
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg build-essential mysql-client-core-8.0
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
# Update again and install nodejs.
sudo apt-get update && sudo apt-get install nodejs -y


echo "************************************"
echo "*        Preparing Node...         *"
echo "************************************"
# Navigate and install the deps. for the Nodejs server.
# NOTE: It is discouraged to use sudo when running npm
# commands, however I haven't found a workaround yet.

sudo npm install -g npm@10.0.0

cd /vagrant/backend

### UNCOMMENT LINE BELOW IF HAVING ERRORS WITH NODE DEPENDENCIES ###
# sudo rm -rf node_modules

sudo rm package-lock.json

sudo npm i nodemon -g
sudo npm i --no-bin-links


echo "************************************"
echo "*       Preparing React-app...     *"
echo "************************************"
# Navigate and install React app dependencies.
cd /vagrant/client
### UNCOMMENT LINE BELOW IF HAVING ERRORS WITH NODE DEPENDENCIES ###
# sudo rm -rf node_modules

sudo rm package-lock.json

# Not sure why, but "react-scripts" must be
# installed differently or else I get an error.
sudo npm i concurrently react-scripts eslint -g
sudo npm i --no-bin-links

echo "********************************************"
echo "*  Starting React-app and Node server API. *"
echo "********************************************"
# Run the React app in the background using nohup
sudo npm start

echo "**************************************"
echo "* Reached end of React-app set up!!! *"
echo "**************************************"