app.directive('organization', ['MyAPIService','$http','$rootScope', function(MyAPIService,$http,$rootScope) {
    return {
        restrict: "E",
        templateUrl:"html/templates/organization-template.html",
        link: function(scope, element, attr, mCtrl) {


       $http.get("https://restcountries.eu/rest/v1/all")
      .success(function(data, status, config, headers){
                scope.countryName = data;

      })
      .error(function(){ //handler errors here
        alert("Server error");
      });

              // scope.countryName2 = MyAPIService.getData();

            scope.sendOrganizationVal = function(){
                alert("Server not found");

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