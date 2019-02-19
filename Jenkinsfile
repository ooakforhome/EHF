#!groovy

pipeline {
    agent any
    stage('Build') {
        steps {
            echo 'Building..'
             sh 'git pull origin master'
             sh 'npm install'
        }
    }
    stage('Test') {
        steps {
            echo 'Testing..',
             sh 'npm test'
        }
    }
}
