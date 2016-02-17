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
           var constartdate = "";
           var expiDate = "";


        $scope.$watch(function () {

            var effectdate = $scope.effecDate;
            var enddate = $scope.expDate;
            
            var startDate = new Date(effectdate);
            var endDate = new Date(enddate);

            if (startDate > endDate){
            alert("Expiry date should be greater than Effective date");
            $scope.expDate="";
            angular.element('#expDate').val("");
            }



            //asign exp date
            expiDate = angular.element(".expDate").val();

            // Subscription create api data
          subscripParam = {
           "CompanySurrId": parseInt($scope.compList),
           "SubContractId": $scope.subID,
           "SubConFromDt": constartdate,
           "SubConToDt": expiDate,
           "MaxActiveUser": parseInt($scope.maxUser)
          }

        });

    	var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
    	if(obj.Users.Subscription !=undefined){

			var permissiontypeList = obj.Users.Subscription.PermissionTypeDet;
			for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
				 if(permissiontypeList[int2].PermissionName=="create"){
					 $scope.complist=permissiontypeList[int2].ObjectList;
				}
			}
		
    	}
    
        

//            $rootScope.loadinganimation=true;
//            //calling getcompany
//            $http.get($rootScope.url+'/getCompany').success(function(resultnamecr) {
//              $scope.complist = resultnamecr.Company;
//               //starting loading animation 
//               $rootScope.loadinganimation=false; 
//                }).error(function(error) {
//                   //error
//                  alert("There is some problem as reported by the backend. Please contact the administrator");
//                  $rootScope.loadinganimation=false;
//            });

      //sending data
      $scope.ceateContact = function(){
      var numbercheck = /^[0-9]+$/;
      var testAlpNu = /^[a-zA-Z0-9]+$/;

      if($scope.compList == ''){
        alert('Please select an Organization Name');
          return false;
      }
      else if($scope.subID == '' || !testAlpNu.test($scope.subID)){
        alert('Please enter a valid Subscription Id(no special character)');
          return false;
      }
      else if($scope.effecDate == ''){
        alert('Please enter a valid Effective Date(not less than current date)');
          return false;
      }
            else if($scope.expDate == ''){
        alert('Please enter a valid Expiration Date(not less than effective date)');
          return false;
      }
            else if($scope.maxUser == ''|| !numbercheck.test($scope.maxUser)){
        alert('Please enter valid maximum no of users(only numbers)');
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
              alert("Subcription created successfully");
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

            //comparing curretn and effective date
          $scope.hititOnChange =function(){

            //comparing curretn and effective date
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();

            var effectiDate = angular.element(".effecDate").val();
            var splitDate = effectiDate.split("-");
            var effectiYear = splitDate[0];
            var effectiMonth = splitDate[1];
            var effectiDate = splitDate[2];

            if(effectiYear<year){
              alert("Effective Date cannot be lesser than current date");
              angular.element(".effecDate").val("");
              $scope.effecDate = "";
            }
            else if(effectiMonth<month){
              alert("Effective Date cannot be lesser than current date");
              angular.element(".effecDate").val("");
              $scope.effecDate = "";
            }
            else if(effectiDate<day){
              alert("Effective Date cannot be lesser than current date");
              angular.element(".effecDate").val("");
              $scope.effecDate = "";
            }
            else{
              //assign effective date
              constartdate = angular.element(".effecDate").val();
            }
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