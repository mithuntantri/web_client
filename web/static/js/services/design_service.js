class DesignService {
  constructor($http) {
    this.$http = $http
    this.allOptions = []
    this.totalPrice = "0"
  }
  initOptions(){
    this.$http({
      url: '/api/product/init',
      method: 'GET'
    }).then((response)=>{
      if(response.data.status === 'success'){
        this.allOptions = response.data.data.all_options
        this.totalPrice = (response.data.data.total_price)
        localStorage.designHash = response.data.data.hash
      }
    },(error)=>{

    })
  }
  getOptions(hash){
    this.$http({
      url:`/api/product/options?hash=${hash}`,
      method: 'GET'
    }).then((response)=>{
      this.allOptions = response.data.data.all_options
      this.totalPrice = (response.data.data.total_price)
      localStorage.designHash = response.data.data.hash
      console.log(this.allOptions);
      angular.forEach(this.allOptions, (val, key)=>{
        val.active = false
      })
      this.allOptions[0].active = true
    },(error)=>{

    })
  }
  setValue(hash, choice, option){
    this.$http({
      url: '/api/product/options',
      method:'POST',
      data:{
        'hash' : hash,
        'choice' : choice + 1,
        'option' : option + 1
      }
    }).then((response)=>{
      if(response.data.status === 'success'){
        angular.forEach(this.allOptions[choice].options, (val, key)=>{
          val.selected = false
        })
        this.allOptions[choice].options[option].selected = true
        this.totalPrice = (response.data.data.total_price)
      }
    },(error)=>{

    })
  }
}
DesignService.$inject = ['$http']
angular.module("zigfo").service('DesignService', DesignService)
