class ModalService{
  constructor(){

  }
  OpenMeasurementsModal(){
    console.log('open modal');
    $('.modal.measurements').modal('show')
  }
  CloseMeasurementsModal(){
    $('.modal.measurements').modal('hide')
  }
  OpenLoginModal(){
    $('.modal.loginmodal').modal('show')
  }

  CloseLoginModal(){
    $('.modal.loginmodal').modal('hide')
  }

  OpenPasswordModal(){
    $('.modal.passwordmodal').modal('show')
  }

  ClosePasswordModal(){
    $('.modal.passwordmodal').modal('hide')
  }
}
ModalService.$inject = []
angular.module('zigfo').service('ModalService',ModalService)
