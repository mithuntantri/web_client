class SignupService {
  constructor($http, $rootScope) {
    this.$http = $http
    this.$rootScope = $rootScope
  }
  usersignup(mobileno, referral_id){
    if (referral_id.length === 0){
      signup_wo_referral(mobileno, "5")
    }else{
      signup_w_referral(mobileno, "5", referral_id)
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
      if(!response.data.data.is_new_user){
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
}
