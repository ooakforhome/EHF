# base image
FROM node:v8.11.3

# set working directory
# RUN mkdir /client/public/index
WORKDIR ./dist

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json
RUN npm install --silent

# Copy working App
COPY ./dist

# start app
CMD ["npm", "start"]

EXPOSE 7070


//JENKINS
pipeline {
    agent any
    stages {
        stage('Build image') {
            steps {
                echo 'Starting to build docker image'

                script {
                    def customImage = docker.build("my-image:${env.BUILD_ID}")
                    customImage.push()
                }
            }
        }
    }
}