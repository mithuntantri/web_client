class FabricsService{
  constructor($http){
    this.$http = $http
    this.topFabrics = []
    this.filters = []
    this.fabrics = []
    this.favorites = false
  }
  getTopFabrics(){
    let quality = 3
    this.$http({
      url : '/api/fabrics?quality=3',
      method: 'GET'
    }).then((response)=>{
      if(response.data.status === 'success'){
        this.topFabrics = response.data.data
      }else{

      }
    },(error)=>{

    })
  }
  getFabricFilters(){
    this.$http({
      url: '/api/fabrics/filter',
      method: 'GET'
    }).then((response)=>{
      if(response.data.status === 'success')  {
        this.filters = response.data.data
      }
    },(error)=>{

    })
  }
  getAllFabrics(){
    this.$http({
      url: '/api/fabrics',
      method: 'GET'
    }).then((response)=>{
      if(response.data.status === 'success'){
        this.fabrics = response.data.data
        angular.forEach(this.fabrics, (fabric)=>{
          fabric.stars = parseFloat(fabric.quality)
        })
      }
    },(error)=>{

    })
  }
}
FabricsService.$inject = ['$http']
angular.module('zigfo').service('FabricsService', FabricsService)
