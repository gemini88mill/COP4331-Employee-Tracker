// This is the actual application that contains the module, there will be
// other files for controllers and whatnot, I think...
(() => {
  'use strict'
  let dependencies = ['ngRoute', 'ngResource']
  angular.module('app', dependencies)
    .config(($routeProvider, $locationProvider) => {
      $locationProvider.html5Mode(true)
      $routeProvider
        .when('/', {
          templateUrl: '/partials/home',
          controller: 'mainCtrl'
        })
        .when('/register', {
          templateUrl: 'partials/register',
          controller: 'registerCtrl'
        })
        .when('/login', {
          templateUrl: 'partials/login',
          controller: 'loginCtrl'
        })
        .when('/tasks/', {
          templateUrl: 'partials/tasks',
          controller: 'tasksCtrl'
        })
        .when('/task/create', {
          templateUrl: 'partials/task-create',
          controller: 'taskCreateCtrl'
        })
        // TODO(timp): To be implemented once a connection can be made to the
        // database and there is existing users
        .when('/user/:id', {
          templateUrl: 'partials/user-profile',
          controller: 'userProfileCtrl'
        })
        .otherwise({
          redirectTo: '/'
        })
    })
    .controller('mainCtrl', main)
    .controller('registerCtrl', userCtrls.register)
    .controller('loginCtrl', userCtrls.login)
    .controller('tasksCtrl', taskCtrls.list)
    .controller('taskCreateCtrl', taskCtrls.create)
    .controller('userProfileCtrl', userCtrls.viewProfile)

})()
