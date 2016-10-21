angular.module("zigfo").controller('appDesignController',
  ['$scope', '$rootScope', '$timeout', 'DesignService',
  function ($scope, $rootScope, $timeout, DesignService) {
      $scope.DesignService = DesignService
      if(!localStorage.designHash){
        DesignService.initOptions()
      }else{
        DesignService.getOptions(localStorage.designHash)
      }
      console.log(DesignService.allOptions);
      $scope.faviconhover = false
      $scope.styles_active = true
      $scope.fabrics_active = false
      $scope.measurements_active = false
      $scope.checkout_active = false

      $scope.changeDesignTabs = (styles, fabrics, measurements, checkout)=>{
        $scope.styles_active = styles
        $scope.fabrics_active = fabrics
        $scope.measurements_active = measurements
        $scope.checkout_active = checkout
      }
      $scope.current_active_option = 0
      $scope.changeStylesTab = (index)=>{
        $scope.current_active_option = index
        angular.forEach(DesignService.allOptions, (val, key)=>{
          val.active = false
        })
        DesignService.allOptions[index].active = true
      }
      $scope.changeSubCategory = (index)=>{
        DesignService.setValue(localStorage.designHash, $scope.current_active_option, index)
      }
      $timeout(function() {
        $scope.ready = true;
      }, 1000);
      $('.carousel-content').slick({
         slidesToShow: 6,
         slidesToScroll: 1,
         infinite: true,
         mobileFirst: true,
         responsive: [{
             breakpoint: 500,
             settings: {
                 slidesToShow: 2
             }
         }]
     });
     $scope.carouselPrev = ()=>{
       $('.carousel-content').slick('slickPrev')
     }
     $scope.carouselNext = ()=>{
       $('.carousel-content').slick('slickNext')
     }
}])
