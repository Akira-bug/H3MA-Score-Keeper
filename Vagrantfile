# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/focal64"

    config.vm.define "dbserver" do |dbserver|
        dbserver.vm.hostname = "dbserver"
        dbserver.vm.network "private_network", ip: "192.168.56.12"
        dbserver.vm.provision "shell", path: "dbserver-provision.sh"
            
    end

    config.vm.define "react-app" do |app|
        app.vm.hostname = "react-app"
        app.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
        app.vm.network "private_network", ip: "192.168.56.11"
        app.vm.provision "shell", path: "react-app-provision"
    end
end