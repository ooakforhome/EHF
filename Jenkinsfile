#!groovy

pipeline {
    agent any
    tools {nodejs "node 11"}
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
