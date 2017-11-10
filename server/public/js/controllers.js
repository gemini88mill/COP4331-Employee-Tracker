function main($scope, $http, $routeParams) {
  console.log('Loaded main controller')
}

let userCtrls = {
  register: function($scope, $http, $routeParams) {
    console.log('Loaded registration controller')

    $scope.register = () => {
      // Send POST request to register user
      $http.post('/api/user/register', $scope.formData)
        .then( (res) => {
          // Success
          console.log(res)
        }, (res) => {
          // Error/fail
          console.log(res)
        })
    }

  },

  login: function($scope, $http, $routeParams) {
    console.log('Loaded login controller')
    $http.post('/api/user/login', $scope.formData)
      .then( (res) => {
        // Success
        console.log(res)
      }, (res) => {
        // Error/fail
        console.log(res)
      })
  },

  view: function($scope, $http, $routeParams) {
    $scope.id = $routeParams.id
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
    $scope.id = $routeParams.id
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
