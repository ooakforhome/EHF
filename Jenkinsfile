pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..',
                 script: 'git pull origin master',
                 script: 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..',
                 script: 'npm test'
            }
        }
    }
}
