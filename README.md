# H3MA-Score-Keeper
An application to score and track HEMA fights and statistics using 3 virtual machines.
Assignment at the University of Otago - COSC349 Cloud Computing - Assignment 1.

HEMA (Historical European Martial Arts) is a thrilling sport with competitors, clubs and collections of enthusiasts all across the world. Practitioners of the sport most often face off in one-on-one duels, wielding various historical weapons such as the longsword, rapier or sabre. 

H3MA-Score-Keeper (the '3' representing the use of three virtual machines) aims to provide management and scoring of fighter analytics in an easy and secure way. 

Use in scoring official tournaments or casual sparring within a club!

<hr>
# Prerequisites:
In order to run this application you must install Vagrant and Virtual box.

# How to run the application:
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





Diagram of the architecture of the application.

![alt text](assets/H3MA-Score-Keeper.drawio.png)

Initial set up of this project follows the development process from the COSC349 [vagrant-multivm](https://altitude.otago.ac.nz/cosc349/vagrant-multivm) repository on GitLab by David Eyers.

