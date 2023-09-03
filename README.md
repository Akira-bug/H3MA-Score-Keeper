# H3MA-Score-Keeper
An application designed to score and track HEMA fights and statistics using 3 virtual machines.

Project made to satisfy an assignment at the University of Otago - COSC349 Cloud Computing Architecture paper.
<p align="center">
    <img src="assets/HEMA-Header-Image.jpg" 
        alt="Image showing two fully geared HEMA fighters mid battle with longswords"
        width="350" border="1px solid black"/>
</p>
HEMA (Historical European Martial Arts) is a thrilling sport with competitors, clubs and collections of enthusiasts all across the world. Practitioners of the sport most often face off in one-on-one duels, wielding various historical weapons such as the longsword, rapier or sabre.

H3MA-Score-Keeper (the '3' representing the use of three virtual machines) aims to provide management and scoring of fights in an easy and secure way. 

If you use this for in any way (scoring official tournaments or casual sparring within a club), let me know how I can improve the software by submitting an issue or feature request!

<hr>

## Prerequisites:
In order to run this application you must install Vagrant and Virtual box to provision and run the virtual machines's that power the application.

## How to run the application:
1. Download or clone the repository:
```
git clone https://github.com/Akira-bug/H3MA-Score-Keeper.git
```

2. In your terminal, navigate to the directory of the repository:
```
cd your/path/to/H3MA-Score-Keeper
```

3. Run the vagrant command.
```
vagrant up
```

4. Open your web browser and in the url bar, paste the following link:
```
192.168.56.11:3000
```

<hr>

## How to shut down the application:
Ensure you have exported the database if you plan on using the stats you have collected.
You can do this simply by navigating to the "View Matches" page, then clicking the "Backup data" button.
1. Exit the vagrant process using `ctrl + c`.  
2. Connect to the react-app VM.
```
vagrant ssh react-app
```
3. Shut down all Node processes.
```
sudo killall node
```
4. Logout of the vm using `logout`.
5. Use `vagrant destroy` and agree to destroy the VMs.

You must use these steps or manually end the processes using something like task manager and ending any Ruby or Vagrant processes.
This is becuase the Node server and React application are started as background processes, that don't end when using `ctrl + c` from the host shell running vagrant.

<hr>

#### Diagram of application's architecture.

<p align="center">
    <img src="assets/H3MA-Score-Keeper.drawio.png" 
        alt="Sketch of the overall layout of the application"
        width="400" />
</p>

<hr>
Initial set up of this project follows the development process from the COSC349 [vagrant-multivm](https://altitude.otago.ac.nz/cosc349/vagrant-multivm) repository on GitLab by David Eyers.
ChatGPT-3.5 used to make parts of this project.
