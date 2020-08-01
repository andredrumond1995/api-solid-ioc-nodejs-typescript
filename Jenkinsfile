pipeline {
  agent {
    node {
      label 'worker1-172.16.0.29'
    }

  }
  stages {
    stage('run nginx') {
      steps {
        sh 'docker run -d --name nginx nginx'
      }
    }

  }
}