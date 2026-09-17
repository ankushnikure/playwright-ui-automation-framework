pipeline {
    agent any

    environment {
        CI = 'true'
        BASE_URL = 'https://www.saucedemo.com/'
        LOGIN_CREDENTIALS = credentials('playwright-ui-automation')
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
                sh '''
                    USERNAME="$LOGIN_CREDENTIALS_USR" \
                    PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                    npm run test:smoke
                '''
            }
        }
    }
}