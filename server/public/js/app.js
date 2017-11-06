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
          templateUrl: 'views/home',
          controller: 'mainCtrl'
        })
        .when('/register', {
          templateUrl: 'views/user/register',
          controller: 'registerCtrl'
        })
        .when('/login', {
          templateUrl: 'views/user/login',
          controller: 'loginCtrl'
        })
        .when('/user/:id', {
          templateUrl: 'views/user/profile',
          controller: 'userProfileCtrl'
        })

        .when('/tasks/', {
          templateUrl: 'views/task/list',
          controller: 'tasksCtrl'
        })
        .when('/task/create', {
          templateUrl: 'views/task/create',
          controller: 'taskCreateCtrl'
        })
        .when('/task/edit/:id', {
          templateUrl: 'views/task/edit',
          controller: 'taskEditCtrl'
        })

        .when('/teams/', {
          templateUrl: 'views/team/list',
          controller: 'teamCtrl'
        })
        .when('/team/create', {
          templateUrl: 'views/team/create',
          controller: 'teamCreateCtrl'
        })
        .when('/team/edit/:id', {
          templateUrl: 'views/team/edit',
          controller: 'teamEditCtrl'
        })

        .otherwise({
          redirectTo: '/'
        })
    })
    .controller('mainCtrl', main)
    .controller('registerCtrl', userCtrls.register)
    .controller('loginCtrl', userCtrls.login)
    .controller('userProfileCtrl', userCtrls.viewProfile)
    .controller('taskCtrl', taskCtrls.list)
    .controller('taskCreateCtrl', taskCtrls.create)
    .controller('taskEditCtrl', taskCtrls.edit)
    .controller('teamCtrl', teamCtrls.list)
    .controller('teamCreateCtrl', teamCtrls.create)
    .controller('teamEditCtrl', teamCtrls.edit)

})()
