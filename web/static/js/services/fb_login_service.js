class FBLoginService {
  constructor($facebook, $rootScope, LoginService, ModalService) {
    this.$facebook = $facebook
    this.$rootScope = $rootScope
    this.LoginService = LoginService
    this.ModalService = ModalService
    this.set_expiry = false
  }
  fblogin (set_expiry) {
    this.set_expiry = set_expiry
    let this_temp = this
    this.$facebook.login().then(function() {
      this_temp.fb_refresh();
    });
  }
  fblogout () {
    let this_temp = this
    this.$facebook.logout().then(function() {
      this_temp.fb_refresh();
    })
  }
  fb_refresh() {
    let this_temp = this
    let modal_service = this.ModalService
    let login_service = this.LoginService
    this.$facebook.api("/me?fields=id,name,email").then(
      function(response) {
        console.log("Facebook login response",response);
        // modal_service.CloseLoginModal()
        // login_service.userlogin(response.id, this_temp.set_expiry, "", false, "", true)
      },
      function(err) {
      });
  }
}
FBLoginService.$inject = ['$facebook', '$rootScope', 'LoginService', 'ModalService']
angular.module('zigfo').service('FBLoginService', FBLoginService)
