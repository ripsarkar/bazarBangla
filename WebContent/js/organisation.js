app.directive('organization', ['MyAPIService','$http','$rootScope', function(MyAPIService,$http,$rootScope) {
    return {
        restrict: "E",
        templateUrl:"html/templates/organization-template.html",
        link: function(scope, element, attr, mCtrl) {

       $rootScope.loadinganimation=true; 
       $http.get("https://restcountries.eu/rest/v1/all")
      .success(function(data, status, config, headers){
                scope.countryName = data;
        $rootScope.loadinganimation=false; 
      })
      .error(function(){ //handler errors here
        alert("Server error");
        $rootScope.loadinganimation=false; 
      });

          scope.$watch(function () {

          organiseParam = {
                "companyid": scope.organID,
                "companyname": scope.organName,
                "companyadd1": scope.compAdd1,
                "companyadd2": scope.compAdd2,
                "companyadd3": scope.compAdd3,
                "companyadd_city": scope.city,
                "companyadd_state": scope.state,
                "companyadd_country": scope.country,
                "companyadd_zip": scope.zip,
                "companyadd_geocode": scope.geocode,
                "company_industries" : [{"SurrId" : 4502},{"SurrId" : 4503}],
                "user_surr_id" : $rootScope.surrId
              }

        });


            scope.sendOrganizationVal = function(){

             var callpost = {
              method : "POST",
              url: $rootScope.url + "/createNewCompany",
              headers: { 'Content-Type': 'application/json; charset=UTF-8' },
              data: JSON.stringify(organiseParam)
            };
            $http(callpost).success(function(data){
              alert("A request for Organisation sent");
            }).error(function(error){
              alert("Registering Organisation failure");
            });
          }


        }
    };
}]);
/*app.factory('factoryOrganization',['$http','$rootScope', function($http,$rootScope) {

        return {
        sayHello: function(){
        var countryName;
        $rootScope.loadinganimation=true; 
        $http.get("https://restcountries.eu/rest/v1/all").success(function(result) {
            alert(28);
            countryName = result;
             //ending loading animation   
             $rootScope.loadinganimation=false; 
        }).error(function(error) {
            alert("There is some problem as reported by the backend. Please contact the administrator");
            //ending loading animation   
            $rootScope.loadinganimation=false;
        });

            return countryName;
        }

        }
}]);*/
app.factory('MyAPIService', function($http,$rootScope){
  var apiurl, myData;
  return {
    getData: function(){
        $rootScope.loadinganimation=true; 
      $http.get("https://restcountries.eu/rest/v1/all")
      .success(function(data, status, config, headers){
        myData = data;
        $rootScope.loadinganimation=false; 
      })
      .error(function(){ //handler errors here
      });
      return myData;
    },
    data: function() { return myData; }
  };
});