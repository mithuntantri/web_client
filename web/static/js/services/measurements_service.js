class MeasurementsService {
  constructor($http, $state) {
    this.$http = $http
    this.$state = $state
    this.measurements = []
    this.measurements_exists = false
  }
  changeUnits(cm,inch){
    this.measurements.cms = cm
    this.measurements.inches = inch
    this.measurements.units = "0"
    if (inch){
      this.measurements.units = "1"
    }
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
        this.measurements.name = 'Default Measurements'
        this.measurements.neck = parseInt(this.measurements.neck)
        this.measurements.chest = parseInt(this.measurements.chest)
        this.measurements.waist = parseInt(this.measurements.waist)
        this.measurements.hip = parseInt(this.measurements.hip)
        this.measurements.length = parseInt(this.measurements.length)
        this.measurements.shoulder = parseInt(this.measurements.shoulder)
        this.measurements.sleeve = parseInt(this.measurements.sleeve)
        if (this.measurements.neck !== 0){
          this.measurements_exists = true
        }
        this.measurements.inches = true
        this.measurements.cms = false
        if (this.measurements.units === "0"){
          this.measurements.cms = true
          this.measurements.inches = false
        }
      }
    }, (error)=>{

    })
  }
  updateMeasurements(){
    let m = this.measurements
    let mobileno = localStorage.mobileno
    let client_id = "5"
    this.$http({
      url:'/api/measurements',
      method:'POST',
      data:{
        'mobileno': mobileno,
        'client_id': client_id,
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
          'mobileno': mobileno,
          'client_id': client_id,
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
