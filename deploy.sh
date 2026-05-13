#!/bin/bash
set -e
echo "updating system"
sudo yum update -y
echo "checking Docker"
if ! command -v docker &> /dev/null
then 
    echo "Installing Docker"
    sudo yum install docker -y
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker ec2-user 
    sudo chmod 666 /var/run/docker.sock
fi
echo "Stopping old container"
sudo docker stop react-app || true
sudo docker rm react-app || true
sudo echo "removing old image"
sudo docker rmi react-app || true
echo "Builing Docker image"
sudo docker build -t react-app .
echo "running container"

sudo docker run -d --name react-app -p 80:80 react-app

echo "deployment completed"
