function main($scope, $http, $routeParams) {
  console.log('Loaded main controller')
}

let userCtrls = {
  register: function($scope, $http, $routeParams) {
    console.log('Loaded registration controller')
  },

  login: function($scope, $http, $routeParams) {
    console.log('Loaded login controller')
  },

  viewProfile: function($scope, $http, $routeParams) {
    console.log('Loaded user profile controller.')
  }
}

let taskCtrls = {
  list: function($scope, $http, $routeParams) {
    console.log('Loaded task listing controller.')
  },
  
  create: function($scope, $http, $routeParams) {
    console.log('Loaded task creation controller.')
  }
}
