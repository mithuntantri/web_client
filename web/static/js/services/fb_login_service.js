class FBLoginService {
  constructor($facebook, $rootScope) {
    this.$facebook = $facebook
    this.$rootScope = $rootScope
  }
  fblogin () {
    this.$facebook.login().then(function() {
      this.refresh();
    });
  }
  fblogout () {
    this.$facebook.logout().then(function() {
      this.refresh();
    })
  }
  refresh() {
    this.$facebook.api("/me").then(
      function(response) {
        this.$rootScope.username = response.name;
        this.$rootScope.loggedIn = true;
      },
      function(err) {
      });
  }
}
FBLoginService.$inject = ['$facebook', '$rootScope']
angular.module('zigfo').service('FBLoginService', FBLoginService)
