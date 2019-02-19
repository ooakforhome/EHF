pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                git 'pull origin master'
                npm 'install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                npm 'test'
            }
        }
    }
}
