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
    console.log(loggedIn, token, name);
    if(loggedIn === "true"){
        $rootScope.loggedIn = true
    }

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      console.log('Unauthorized', error);
      if (error === "Not Authorised") {
        $state.go("main.home")
      } else if(error === "Already Logged In"){
        console.log('Already Logged');
        $state.go("app.home")
      } else if (error === "Token Invalid") {
        $state.go("main.home")
      } else if (error === "No Profile"){
        $state.go("app.profile")
      }
    })

    $rootScope.$on('tokenexpired', function () {
      localStorage.removeItem('token')
      localStorage.loggedIn = false
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
                config.headers['Device'] = ''
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
    $urlRouterProvider.otherwise("/");
    $urlRouterProvider.when('/app', '/app/home');
    $facebookProvider.setAppId('1791808574372416');

    // State definitions
    $stateProvider
        .state("main", {
          url: "/",
          templateUrl: "partials/main.html",
          controller: "mainController",
          abstract: true,
          resolve:{
            gotoLogin: ['$state', '$q', function ($state, $q) {
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

        .state("app", {
          url: "/app",
          templateUrl: "partials/app.html",
          controller: "appController",
          resolve:{
              loginRequired: ['$q', function($q){
                if(!localStorage.token) {
                  return $q.reject("Not Authorised");
                }
              }],
              getProfile: ['$q', '$http', '$rootScope', '$state',function ($q, $http, $rootScope, $state) {
                let mobileno = localStorage.mobileno
                let client_id = localStorage.client_id
                $http({
                  url: `/api/profile?mobileno=${mobileno}&client_id=${client_id}`,
                  method: 'GET'
                }).then((response)=>{
                  if(response.data.status === 'success'){
                    $rootScope.profile = response.data.data
                  }else{
                    $state.go("app.profile")
                  }
                }, (error)=>{
                  return $q.reject("Not Authorised");
                })
              }]
          }
        })

        .state("app.home", {
            url: "/home",
            templateUrl: "partials/app.home.html",
            controller: "homeController"
        })
        .state("app.profile", {
            url: "/profile",
            templateUrl: "partials/app.profile.html",
            controller: "mainProfileController"
        })
        .state("app.measurements", {
            url: "/measurements",
            templateUrl: "partials/app.measurements.html",
            controller: "measurementsController"
        })
        .state("app.credits", {
          url: "/credits",
          templateUrl: "partials/app.credits.html",
          controller: "creditsController"
        })
})
