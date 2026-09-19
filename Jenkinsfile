// Playwright CI Pipeline

pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['smoke', 'regression'],
            description: 'Select test suite'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select browser'
        )

        choice(
            name: 'ENVIRONMENT',
            choices: ['staging', 'production'],
            description: 'Select environment'
        )
    }

    environment {
        CI = 'true'
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

        stage('Set Environment') {
            steps {
                script {
                    def isManualBuild = currentBuild.getBuildCauses(
                        'hudson.model.Cause$UserIdCause'
                    ).size() > 0

                    if (isManualBuild) {
                        if (params.ENVIRONMENT == 'production') {
                            env.BASE_URL = 'https://www.saucedemo.com/'
                        } else {
                            env.BASE_URL = 'https://www.saucedemo.com/'
                        }
                    } else {
                        // Automatic CI runs against staging
                        env.BASE_URL = 'https://www.saucedemo.com/'
                    }

                    echo "Environment: ${isManualBuild ? params.ENVIRONMENT : 'staging'}"
                    echo "Base URL: ${env.BASE_URL}"
                }
            }
        }

        stage('Install Playwright Browser') {
            steps {
                script {
                    def isManualBuild = currentBuild.getBuildCauses(
                        'hudson.model.Cause$UserIdCause'
                    ).size() > 0

                    if (isManualBuild) {
                        sh "npx playwright install ${params.BROWSER}"
                    } else {
                        sh 'npx playwright install chromium'
                    }
                }
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
                        sh """
                            USERNAME="\$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="\$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit-results-manual.xml" \
                            npm run test:smoke -- \
                            --project=${params.BROWSER} \
                            --reporter=html,junit
                        """
                    } else {
                        sh """
                            USERNAME="\$LOGIN_CREDENTIALS_USR" \
                            PASSWORD="\$LOGIN_CREDENTIALS_PSW" \
                            PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit-results-manual.xml" \
                            npm run test:regression -- \
                            --project=${params.BROWSER} \
                            --reporter=html,junit
                        """
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
                    --project=chromium \
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
                            --project=chromium \
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
                            --project=chromium \
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
                            --project=chromium \
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