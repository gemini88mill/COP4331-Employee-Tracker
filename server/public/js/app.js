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
        .when('/user/:username', {
          templateUrl: 'views/user/profile',
          controller: 'userViewCtrl'
        })
        .when('/user/edit/:username', {
          templateUrl: 'views/user/edit',
          controller: 'userEditCtrl'
        })
        .when('/users', {
          templateUrl: 'views/user/list',
          controller: 'userListCtrl'
        })

        .when('/tasks/', {
          templateUrl: 'views/task/list',
          controller: 'taskListCtrl'
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
          controller: 'teamListCtrl'
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
    .controller('userViewCtrl', userCtrls.view)
    .controller('userListCtrl', userCtrls.list)
    .controller('userEditCtrl', userCtrls.edit)
    .controller('taskListCtrl', taskCtrls.list)
    .controller('taskCreateCtrl', taskCtrls.create)
    .controller('taskEditCtrl', taskCtrls.edit)
    .controller('teamListCtrl', teamCtrls.list)
    .controller('teamCreateCtrl', teamCtrls.create)
    .controller('teamEditCtrl', teamCtrls.edit)

})()
