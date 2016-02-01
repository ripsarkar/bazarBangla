app.directive("xyzcomp", function($http,$rootScope){
  return {
    restrict: "E",
    scope:{
      ngModel: "=",
      dateOptions: "=",
      opened: "=",
    },
    link: function($scope, element, attrs) {
/////////////////////////////////////////////////////////



           $scope.compList="";
           $scope.subID="";
           $scope.effecDate="";
           $scope.expDate="";
           $scope.maxUser="";




        $scope.$watch(function () {

            var effectdate = $scope.effecDate;
            var enddate = $scope.expDate;
            
            var startDate = new Date(effectdate);
            var endDate = new Date(enddate);

            if (startDate > endDate){
            alert("please enter a valid expiry date");
            $scope.expDate="";
            angular.element('#expDate').val("");
            }

          subscripParam = {
           "CompanySurrId": parseInt($scope.compList),
           "SubContractId": $scope.subID,
           "SubConFromDt": $scope.effecDate,
           "SubConToDt": $scope.expDate,
           "MaxActiveUser": parseInt($scope.maxUser)
          }

        });


            $rootScope.loadinganimation=true;
            //calling getcompany
            $http.get($rootScope.url+'/getCompany').success(function(resultnamecr) {
              $scope.complist = resultnamecr.Company;
               //starting loading animation 
               $rootScope.loadinganimation=false; 
                }).error(function(error) {
                   //error
                  alert("There is some problem as reported by the backend. Please contact the administrator");
                  $rootScope.loadinganimation=false;
            });

      //sending data
      $scope.ceateContact = function(){
      var numbercheck = /^[0-9]+$/;
      if($scope.compList == ''){
        alert('Please enter a valid Organization Name');
          return false;
      }
      else if($scope.subID == ''){
        alert('Please enter a valid Subscription Id');
          return false;
      }
      else if($scope.effecDate == ''){
        alert('Please enter a valid Effective Date');
          return false;
      }
            else if($scope.expDate == ''){
        alert('Please enter a valid Expiration Date');
          return false;
      }
            else if($scope.maxUser == ''|| !numbercheck.test($scope.maxUser)){
        alert('Please enter valid maximum no of users');
          return false;
      }

      else{
        $rootScope.loadinganimation=true;

             var callpost = {
              method : "POST",
              url: $rootScope.url + "/createSubscription",
              headers: { 'Content-Type': 'application/json; charset=UTF-8' },
              data: JSON.stringify(subscripParam)
            };
            $http(callpost).success(function(data){
              alert("A request for subscription sent");
              $rootScope.loadinganimation=false;
            }).error(function(error){
              $rootScope.loadinganimation=false;
              if(error.ErrMsg !='undefined'){
                  var str = error.ErrMsg;
                  alert(str);
              }else{
                alert("Subscription failure");  
              }
              
              
            });

        }

    }

          //clearing the form
          $scope.clearVal = function(){
           $scope.compList="";
           $scope.subID="";
           $scope.effecDate="";
           $scope.expDate="";
           $scope.maxUser="";
          }


////////////////////////////////////////////////////////////
      $scope.open = function(event){
        console.log("open");
        event.preventDefault();
        event.stopPropagation();
        $scope.opened = true;
      };
      $scope.open2 = function(event){
        console.log("open");
        event.preventDefault();
        event.stopPropagation();
        $scope.opened2 = true;
      };
      $scope.clear = function () {
        $scope.ngModel = null;
      };
    },
    templateUrl: 'html/templates/subscription-template.html'
  }
})

.controller('myCtrl', function ($scope, $http) {
  
  $scope.formData      = {};
  $scope.formData.date = "";
  $scope.opened        = false;
  
  //Datepicker
  $scope.dateOptions = {
    'year-format': "'yy'",
    'show-weeks' : false
  };
});