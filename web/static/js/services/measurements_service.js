class MeasurementsService {
  constructor($http, $state) {
    this.$http = $http
    this.$state = $state
    this.measurements = []
  }
  getMeasurements(){
    let mobileno = localStorage.mobileno
    let client_id = "5"
    this.$http({
      url :`/api/measurements?&mobileno=${mobileno}&client_id=${client_id}`,
      method: 'GET'
    }).then((response)=>{
      if(response.data.status === 'success'){
        this.measurements = response.data.data
      }
    }, (error)=>{

    })
  }
  updateMeasurements(m){
    let mobileno = localStorage.mobileno
    let client_id = "5"
    this.$http({
      url:'/api/measurements',
      method:'POST',
      data:{
        'mobileno': m.mobileno,
        'client_id': m.client_id,
        'units' : m.units,
        'neck': m.neck,
        'chest': m.chest,
        'waist': m.waist,
        'hip': m.hip,
        'length': m.length,
        'shoulder': m.shoulder,
        'sleeve': m.sleeve
      }
    }).then((response)=>{
      if(response.data.status === 'success'){
        this.measurements = {
          'units' : m.units,
          'neck' : m.neck,
          'chest': m.chest,
          'waist': m.waist,
          'hip': m.hip,
          'length': m.length,
          'shoulder': m.shoulder,
          'sleeve': m.sleeve
        }
      }
    }, (error)=>{

    })
  }
}
MeasurementsService.$inject = ['$http', '$state']
angular.module("zigfo").service('MeasurementsService',MeasurementsService)
