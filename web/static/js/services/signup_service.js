
class SignupService {
  constructor($http, $rootScope, $state, ModalService) {
    this.$http = $http
    this.$rootScope = $rootScope
    this.otp_generated = false
    this.$state = $state
    this.ModalService = ModalService

    this.set_password = false
    this.set_profile = false
    this.signup_verified = false
  }
  usersignup(mobileno, referral_id){
    if (referral_id.length === 0){
      this.signup_wo_referral(mobileno, "5")
    }else{
      this.signup_w_referral(mobileno, "5", referral_id)
    }
  }
  signup_w_referral(mobileno, client_id, referral_id){
    this.$http({
      url : '/api/signup',
      method: 'POST',
      data:{
        'mobileno' : mobileno,
        'client_id' : client_id,
        'referral_id' : referral_id
      }
    }).then((response)=>{
      if (!response.data.data.is_valid_refcode){
        this.ErrorField2 = true
      }else if(!response.data.data.is_new_user){
        this.ErrorField1 = true
      }else if(response.data.data.is_new_user && response.data.data.is_valid_refcode){
        if(response.data.data.otp_generated){
          this.otp_generated = true
        }else{
          this.ErrorField3 = true
        }
      }
    },(error)=>{
      console.log('Sign up failed:',error);
    })
  }
  signup_wo_referral(mobileno, client_id){
    this.$http({
      url : '/api/signup',
      method: 'POST',
      data:{
        'mobileno' : mobileno,
        'client_id' : client_id
      }
    }).then((response)=>{
      console.log(response);
      if(!response.data.data.is_new_user){
        this.ErrorField1 = true
      }else if(response.data.data.is_new_user && response.data.data.is_valid_refcode){
        if(response.data.data.otp_generated){
          this.otp_generated = true
          console.log(this.otp_generated);
        }else{
          this.ErrorField3 = true
        }
      }
    },(error)=>{
      console.log('Sign up failed:',error);
    })
  }
  verify_signup(mobileno, otp){
    this.$http({
      url : '/api/signup/verify',
      method: 'POST',
      data: {
        'mobileno': mobileno,
        'otp': otp
      }
    }).then((response)=>{
      if(response.data.data.verified && response.data.data.first_time_login){
        console.log('coming here');
        this.signup_verified = true
        if(!response.data.data.password_set){
          this.ModalService.CloseLoginModal()
          this.ModalService.OpenPasswordModal()
        }else if(!response.data.data.profile_set){
          this.ModalService.CloseLoginModal()
          this.$state.go("main.profile")
        }
      }else{
        this.signup_verified = false
      }
    }, (error)=>{

    })
  }
  create_user_password(mobileno, password){
    this.$http({
      url: '/api/setpassword',
      method: 'POST',
      data:{
        'mobileno' : mobileno,
        'client_id' : "5",
        'password': password
      }
    }).then((response)=>{
      this.$rootScope.loggedIn = true
      localStorage.token = response.data.data.secret
      localStorage.loggedIn = true
      localStorage.mobileno = mobileno
      if(response.data.data.first_time_login){
        if(!response.data.data.password_set){
          this.ModalService.CloseLoginModal()
          this.ModalService.OpenPasswordModal()
        }else if(!response.data.data.profile_set){
          this.ModalService.CloseLoginModal()
          this.ModalService.ClosePasswordModal()
          this.$state.go("app.profile")
        }
      }
    }, (error)=>{

    })
  }
  create_user_profile(){

  }
}
SignupService.$inject = ['$http', '$rootScope', '$state', 'ModalService']
angular.module("zigfo").service('SignupService', SignupService)
