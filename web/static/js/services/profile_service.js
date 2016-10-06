class ProfileService {
  constructor($http, $state, $rootScope, $q) {
    this.$http = $http
    this.$state = $state
    this.$rootScope = $rootScope
    this.$q = $q
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
        this.$state.go("app.home")
      }
    }, (error)=>{

    })
  }
  get_user_profile(){
    
  }
}
ProfileService.$inject = ['$http', '$state', '$rootScope', '$q']
angular.module('zigfo').service('ProfileService', ProfileService)
