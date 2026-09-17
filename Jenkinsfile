pipeline {
    agent any

    environment {
        CI = 'true'
        BASE_URL = 'https://www.saucedemo.com/'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Smoke Tests') {
            steps {
                sh 'npm run test:smoke'
            }
        }
    }
}