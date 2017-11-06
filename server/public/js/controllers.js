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

  view: function($scope, $http, $routeParams) {
    $scope.userid = $routeParams.id
    console.log('Loaded user profile controller.')
  }
}

let taskCtrls = {
  list: function($scope, $http, $routeParams) {
    console.log('Loaded task listing controller.')
  },

  create: function($scope, $http, $routeParams) {
    console.log('Loaded task creation controller.')
  },

  edit: function($scope, $http, $routeParams) {
    console.log('Loaded task edit controller.')
  }
}

let teamCtrls = {
  list: function($scope, $http, $routeParams) {
    console.log('Loaded team listing controller.')
  },

  create: function($scope, $http, $routeParams) {
    console.log('Loaded team creation controller.')
  },

  edit: function($scope, $http, $routeParams) {
    console.log('Loaded team edit controller.')
  }
}
