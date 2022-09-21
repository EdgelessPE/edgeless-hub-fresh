pipeline {
  agent any
  stages {
    stage('Build') {
      agent {
        node {
          label 'linux'
        }

      }
      when {
        branch 'master'
      }
      steps {
        sh 'yarn'
        sh 'yarn build:linux -p=never'
      }
    }

  }
}