// Playwright CI Pipeline

pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['smoke', 'regression'],
            description: 'Select the test suite to run'
        )
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://www.saucedemo.com/'
        LOGIN_CREDENTIALS = credentials('playwright-ui-automation')
    }

    stages {
        stage('Clean Test Artifacts') {
            steps {
                sh 'rm -rf playwright-report* test-results* blob-report* junit-results-*.xml'
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

        // Manual parameterized execution
        stage('Run Selected Test Suite') {
            when {
                expression {
                    currentBuild.getBuildCauses(
                        'hudson.model.Cause$UserIdCause'
                    ).size() > 0
                }
            }

            steps {
                script {
                    if (params.TEST_SUITE == 'smoke') {
                        sh '''
                            USERNAME="$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit-results-manual.xml" \
                            npm run test:smoke -- \
                            --reporter=html,junit
                        '''
                    } else {
                        sh '''
                            USERNAME="$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit-results-manual.xml" \
                            npm run test:regression -- \
                            --reporter=html,junit
                        '''
                    }
                }
            }
        }

        // Automatic PR execution
        stage('Run Smoke Tests') {
            when {
                allOf {
                    changeRequest target: 'main'

                    expression {
                        currentBuild.getBuildCauses(
                            'hudson.model.Cause$UserIdCause'
                        ).size() == 0
                    }
                }
            }

            steps {
                sh '''
                    USERNAME="$LOGIN_CREDENTIALS_USR" \
                    PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                    PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit-results-smoke.xml" \
                    npm run test:smoke -- \
                    --reporter=html,junit
                '''
            }
        }

        // Automatic main execution
        stage('Run Regression Tests') {
            when {
                allOf {
                    branch 'main'

                    expression {
                        currentBuild.getBuildCauses(
                            'hudson.model.Cause$UserIdCause'
                        ).size() == 0
                    }
                }
            }

            parallel {
                stage('Shard 1/3') {
                    steps {
                        sh '''
                            USERNAME="$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_BLOB_OUTPUT_DIR="blob-report-shard-1" \
                            PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit-results-shard-1.xml" \
                            npm run test:regression -- \
                            --shard=1/3 \
                            --reporter=blob,junit \
                            --output=test-results-shard-1
                        '''
                    }
                }

                stage('Shard 2/3') {
                    steps {
                        sh '''
                            USERNAME="$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_BLOB_OUTPUT_DIR="blob-report-shard-2" \
                            PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit-results-shard-2.xml" \
                            npm run test:regression -- \
                            --shard=2/3 \
                            --reporter=blob,junit \
                            --output=test-results-shard-2
                        '''
                    }
                }

                stage('Shard 3/3') {
                    steps {
                        sh '''
                            USERNAME="$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_BLOB_OUTPUT_DIR="blob-report-shard-3" \
                            PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit-results-shard-3.xml" \
                            npm run test:regression -- \
                            --shard=3/3 \
                            --reporter=blob,junit \
                            --output=test-results-shard-3
                        '''
                    }
                }
            }
        }

        stage('Merge Regression Reports') {
            when {
                allOf {
                    branch 'main'

                    expression {
                        currentBuild.getBuildCauses(
                            'hudson.model.Cause$UserIdCause'
                        ).size() == 0
                    }
                }
            }

            steps {
                sh '''
                    mkdir -p blob-report
                    cp blob-report-shard-*/*.zip blob-report/

                    npx playwright merge-reports \
                    --reporter=html \
                    blob-report
                '''
            }
        }
    }

    post {
        always {
            junit(
                testResults: 'junit-results-*.xml',
                allowEmptyResults: true
            )

            archiveArtifacts(
                artifacts: 'playwright-report*/**, test-results*/**, junit-results-*.xml',
                allowEmptyArchive: true
            )
        }

        failure {
            emailext(
                to: 'ankushnikure@gmail.com',
                subject: "❌ Playwright CI Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    Playwright CI build failed.

                    Job: ${env.JOB_NAME}
                    Build: #${env.BUILD_NUMBER}
                    Status: ${currentBuild.currentResult}

                    Build URL: ${env.BUILD_URL}

                    Please check Jenkins for failed tests and Playwright artifacts.
                """
            )
        }
    }
}