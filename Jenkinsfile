// Playwright CI Pipeline

pipeline {
    agent any

    environment {
        CI = 'true'
        BASE_URL = 'https://www.saucedemo.com/'
        LOGIN_CREDENTIALS = credentials('playwright-login')
    }

    stages {
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
            when {
                changeRequest target: 'main'
            }
            steps {
                sh '''
                    USERNAME="$LOGIN_CREDENTIALS_USR" \
                    PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                    npm run test:smoke
                '''
            }
        }

        stage('Run Regression Tests') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    USERNAME="$LOGIN_CREDENTIALS_USR" \
                    PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                    npm run test:regression
                '''
            }
        }
    }
}