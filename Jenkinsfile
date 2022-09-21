pipeline {
  agent any
  stages {
    stage('Build') {
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
