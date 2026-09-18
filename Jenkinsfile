// Playwright CI Pipeline

pipeline {
    agent any

    environment {
        CI = 'true'
        BASE_URL = 'https://www.saucedemo.com/'
        LOGIN_CREDENTIALS = credentials('playwright-ui-automation')
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

            parallel {
                stage('Shard 1/3') {
                    steps {
                        sh '''
                            USERNAME="$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_HTML_OUTPUT_DIR="playwright-report-shard-1" \
                            npm run test:regression -- --shard=1/3 --output=test-results-shard-1
                        '''
                    }
                }

                stage('Shard 2/3') {
                    steps {
                        sh '''
                            USERNAME="$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_HTML_OUTPUT_DIR="playwright-report-shard-2" \
                            npm run test:regression -- --shard=2/3 --output=test-results-shard-2
                        '''
                    }
                }

                stage('Shard 3/3') {
                    steps {
                        sh '''
                            USERNAME="$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_HTML_OUTPUT_DIR="playwright-report-shard-3" \
                            npm run test:regression -- --shard=3/3 --output=test-results-shard-3
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report*/**, test-results*/**',
                allowEmptyArchive: true
            )
        }
    }
}