pipeline {
  agent any
  when {
    branch 'master'
  }
  stages {
    stage('Build') {
      steps {
        sh 'yarn'
        sh 'yarn build'
      }
    }

  }
}
