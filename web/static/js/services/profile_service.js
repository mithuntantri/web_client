class ProfileService {
  constructor($http) {
    this.$http = $http
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
    })
  }
}
ProfileService.$inject = ['$http']
angular.module('zigfo').service('ProfileService', ProfileService)
