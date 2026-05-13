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
fi
echo "Stopping old container"
docker stop react-app || true
docker rm react-app || true
echo "removing old image"
docker rmi react-app || true
echo "Builing Docker image"
docker build -t react-app .
echo "running container"

docker run -d --name react-app -p 80:80 react-app

echo "deployment completed"
