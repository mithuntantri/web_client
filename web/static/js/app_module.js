angular.module("zigfo", ['ui.router', 'satellizer', 'ngMaterial', 'ngFacebook'])
.run(['$rootScope', '$state', '$stateParams', '$timeout',
    function($rootScope, $state, $stateParams, $timeout) {

    (function(){
       if (document.getElementById('facebook-jssdk')) {return;}
       var firstScriptElement = document.getElementsByTagName('script')[0];
       var facebookJS = document.createElement('script');
       facebookJS.id = 'facebook-jssdk';
       facebookJS.src = '//connect.facebook.net/en_US/all.js';
       firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
     }());

    let loggedIn = localStorage.loggedIn
    let token = localStorage.token
    let name = localStorage.username
    if(loggedIn === "true"){
        $rootScope.loggedIn = true
    }

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      if (error === "Not Authorised") {
        $state.go("main.home")
      } else if(error === "Already Logged In"){
        $state.go("main.home")
      } else if (error === "Token Invalid") {
        $state.go("main.home")
      }
    })

    $rootScope.$on('tokenexpired', function () {
      localStorage.removeItem('token')
      localStorage.removeItem('loggedIn')
      $rootScope.loggedIn = false
      $state.go("main.home")
    })
}])
// A $http interceptor for injecting token and checking for token expiry
.factory('tokenInterceptor', ['$q', '$rootScope',function($q, $rootScope){
    var Interceptor = {
        'request': function(config) {
            if (localStorage.token) {
                config.headers['X-Authorization-Token'] = localStorage.token
            }
            return config;
        },
        'responseError': function (rejection) {
            if (rejection.status === 401) {
                $rootScope.$broadcast('tokenexpired')
                return rejection
            }
            return $q.reject(rejection)
        }
    }
    return Interceptor;
}])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider,
                    $httpProvider, $authProvider, $facebookProvider){
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('tokenInterceptor');
    $urlRouterProvider.otherwise("/home");
    $facebookProvider.setAppId('1791808574372416');

    // State definitions
    $stateProvider
        .state("main", {
          url: "/",
          templateUrl: "partials/main.html",
          controller: "mainController",
          abstract: true,
          resolve:{
              gotoHome: ['$state', '$q', function ($state, $q) {
                  $state.go('main.home')
                  return $q.resolve()
              }],
              alreadyLoggedIn: ['$q', function($q) {
                  if(localStorage.token){
                      return $q.reject("Already Logged In")
                  }
              }]
          }
        })

        .state("main.home", {
          url: "",
          templateUrl: "partials/main.home.html",
          controller: "mainHomeController"
        })

        .state("main.design", {
          url: "",
          templateUrl: "partials/main.design.html",
          controller: "mainHomeController"
        })

        .state("main.profile", {
          url: "",
          templateUrl: "partials/main.profile.html",
          controller: "mainProfileController"
        })

        .state("main.app", {
          url: "/app",
          templateUrl: "partials/app.html",
          controller: "appController",
          resolve:{
              gotoHome: ['$state', '$q', function ($state, $q) {
                  $state.go('main.app.home')
                  return $q.resolve()
              }],
              alreadyLoggedIn: ['$q', function($q) {
                  if(localStorage.token){
                      return $q.reject("Already Logged In")
                  }
              }],
              loginRequired: ['$q', function($q){
                if(!localStorage.token) {
                  return $q.reject("Not Authorised");
                }
              }]
          }
        })

        .state("main.app.home", {
            url: "/home",
            templateUrl: "partials/app.home.html",
            controller: "homeController"
        })
        .state("main.app.profile", {
            url: "/profile",
            templateUrl: "partials/app.profile.html",
            controller: "profileController"
        })
        .state("main.app.measurements", {
            url: "/measurements",
            templateUrl: "partials/app.measurements.html",
            controller: "measurementsController"
        })
        .state("main.app.credits", {
          url: "/credits",
          templateUrl: "partials/app.credits.html",
          controller: "creditsController"
        })
})
