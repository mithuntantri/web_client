class LoginService {
  constructor($http, $rootScope) {
    this.$http = $http
    this.$rootScope = $rootScope
  }
  userlogin(id, set_expiry, password, otp_login, otp, fb_login){
    if(otp_login && otp === ''){
      login_w_otp(id, "5", set_expiry)
    }else if(otp_login && otp !== ''){
      verify_login_otp(id, "5", otp)
    }else if(fb_login){
      login_w_fb(id, "5", set_expiry)
    }else{
      login_w_id(id, "5", set_expiry, password)
    }
  }
  login_w_id (id, client_id, set_expiry, password){
    console.log('User ID:',id);
    this.$http({
      url: '/api/login',
      method: 'POST',
      data:{
        'id': id,
        'client_id' : client_id,
        'set_expiry' : set_expiry,
        'password' : password
      }
    }).then((response)=>{
      if(response.data.status === 'success'){
        $cookies.put('token',response.data.data.secret)
        $cookies.put('loggedIn',"true")
        $cookies.put('username', response.data.data.username)
        if(response.data.data.first_time_login && !response.data.data.is_password_set){
          $state.go('password')
        }else if(response.data.data.first_time_login && !response.data.data.is_profile_set){
          $state.go('profile')
        }
      }
    },(error)=>{
      console.log('Login Failed:',error);
    })
  }
}
LoginService.$inject = ['$http', '$rootScope']
angular.module("zigfo").service('LoginService', LoginService)
