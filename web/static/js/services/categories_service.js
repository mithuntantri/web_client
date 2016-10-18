class CategoriesService {
  constructor($http) {
    this.$http = $http
    this.Categories = []
  }
  getCategories(){
    this.$http({
      url : '/product/categories',
      method: 'GET'
    }).then((response)=>{
      if(response.data.status === 'success'){
        this.Categories = response.data.data
      }
    },(error)=>{

    })
  }
}
CategoriesService.$inject = ['$http']
angular.module("zigfo").service('CategoriesService', CategoriesService)
