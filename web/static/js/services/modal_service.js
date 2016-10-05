class ModalService{
  constructor(){

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
