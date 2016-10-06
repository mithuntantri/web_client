class ProfileService {
  constructor($http, $state, $rootScope, $q) {
    this.$http = $http
    this.$state = $state
    this.$rootScope = $rootScope
    this.$q = $q
    this.username = 'User'
  }
  set_user_profile(mobileno, email_id, gender, first_name, last_name, address, street, pin_code){
    this.$http({
      url : '/api/setprofile',
      method: 'POST',
      data: {
        'mobileno' : mobileno,
        'client_id' : "5",
        'email_id':  email_id,
        'gender': gender,
        'first_name': first_name,
        'last_name': last_name,
        'address' : address,
        'street' : street,
        'pin_code': pin_code
      }
    }).then((response) =>{
      if(response.data.status === 'success'){
        this.get_user_profile()
        this.$state.go("app.home")
      }
    }, (error)=>{

    })
  }
  get_user_profile(){
    let mobileno = localStorage.mobileno
    let client_id = localStorage.client_id
    this.$http({
      url: `/api/profile?mobileno=${mobileno}&client_id=${client_id}`,
      method: 'GET'
    }).then((response)=>{
      if(response.data.status === 'success'){
        this.$rootScope.profile = response.data.data
        this.username = this.$rootScope.profile.personal_info.first_name
        this.credits = this.$rootScope.profile.credits
      }else if(response.data.status === 'failed'){
        this.$state.go("app.profile")
      }
    }, (error)=>{
    })
  }
}
ProfileService.$inject = ['$http', '$state', '$rootScope', '$q']
angular.module('zigfo').service('ProfileService', ProfileService)
