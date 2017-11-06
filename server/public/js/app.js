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
        .when('/tasks/', {
          templateUrl: 'views/task/list',
          controller: 'tasksCtrl'
        })
        .when('/task/create', {
          templateUrl: 'views/task/create',
          controller: 'taskCreateCtrl'
        })
        .when('/teams/', {
          templateUrl: 'views/task/list',
          controller: 'tasksCtrl'
        })
        .when('/team/create', {
          templateUrl: 'views/task/create',
          controller: 'taskCreateCtrl'
        })
        .when('/user/:id', {
          templateUrl: 'views/user/profile',
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
