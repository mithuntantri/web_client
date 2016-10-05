class ProfileService {
  constructor($http, $state) {
    this.$http = $http
    this.$state = $state
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
}
ProfileService.$inject = ['$http', '$state']
angular.module('zigfo').service('ProfileService', ProfileService)
