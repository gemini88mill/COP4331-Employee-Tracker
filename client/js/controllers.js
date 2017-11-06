function main($scope, $http, $routeParams) {
  console.log('Loaded main controller')
}
function registerCtrl($scope, $http, $routeParams) {
  console.log('Loaded registration controller')
}
function loginCtrl($scope, $http, $routeParams) {
  console.log('Loaded login controller')
}

let taskCtrls = {
  list: function($scope, $http, $routeParams) {
    console.log('Loaded task listing controller.')
  },
  create: function($scope, $http, $routeParams) {
    console.log('Loaded task creation controller.')
  }
}

let userCtrls = {
  viewProfile: function($scope, $http, $routeParams) {
    console.log('Loaded user profile controller.')
  }
}
