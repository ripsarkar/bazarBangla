app.directive('subscription', ['apiforsubscription','$http','$rootScope', function(apiforsubscription,$http,$rootScope) {
    return {
        restrict: "E",
        templateUrl:"html/templates/subscription-template.html",
        link: function(scope, element, attr, mCtrl) {
            angular.element(document).ready(function () {
                
                angular.element('.effecDate').datepicker({
                    format: "yyyy-mm-dd"
                });  
            
            });



        var compSurrid;
        scope.$watch(function () {

            var effectdate = scope.effecDate;
            var enddate = scope.expDate;
            
            var startDate = new Date(effectdate);
            var endDate = new Date(enddate);

            if (startDate > endDate){
            alert("please enter a valid expiry date");
            scope.expDate="";
            angular.element('#expDate').val("");
            }

          subscripParam = {
           "CompanySurrId": scope.compList,
           "SubContractId": scope.subID,
           "SubConFromDt": scope.effecDate,
           "SubConToDt": scope.expDate,
           "MaxActiveUser": scope.maxUser
          }

        });


            $rootScope.loadinganimation=true;
            //calling getcompany
            $http.get($rootScope.url+'/getCompany').success(function(resultnamecr) {
              scope.complist = resultnamecr.Company;
               //starting loading animation 
               $rootScope.loadinganimation=false; 
                }).error(function(error) {
                   //error
                  alert("There is some problem as reported by the backend. Please contact the administrator");
                  $rootScope.loadinganimation=false;
            });

          //sending data
          scope.ceateContact = function(){
             var callpost = {
              method : "POST",
              url: $rootScope.url + "/createSubscription",
              headers: { 'Content-Type': 'application/json; charset=UTF-8' },
              data: JSON.stringify(subscripParam)
            };
            $http(callpost).success(function(data){
              alert("A request for subscription sent");
            }).error(function(error){
            	alert("Subscription failure");
            	alert(JSON.stringify(error));
            	
            });
          }

          //clearing the form
          scope.clearVal = function(){
           scope.compList="";
           scope.subID="";
           scope.effecDate="";
           scope.expDate="";
           scope.maxUser="";
          }








        }
    };
}]);

app.factory('apiforsubscription', function($http,$rootScope){
  var apiurl, myData;
  return {
    getData: function(){

    }
  };
});
