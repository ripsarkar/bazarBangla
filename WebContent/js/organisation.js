app.directive('organization', ['MyAPIService','$http','$rootScope', function(MyAPIService,$http,$rootScope) {
    return {
        restrict: "E",
        templateUrl:"html/templates/organization-template.html",
        link: function(scope, element, attr, mCtrl) {

                scope.organID="";
                scope.organName="";
                scope.compAdd1="";
                scope.compAdd2="";
                scope.compAdd3="";
                scope.city="";
                scope.state="";
                scope.country="";
                scope.zip="";
                scope.geocode="";
                Indtsyarray=[];
                scope.UsecaseIntry=[];

       $rootScope.loadinganimation=true; 
       $http.get("https://restcountries.eu/rest/v1/all")
      .success(function(data, status, config, headers){
                scope.countryName = data;
        //$rootScope.loadinganimation=false; 
              //industry
    $http.get($rootScope.url + '/populateEPIndutry').success(function(data, status, headers, config) {
            $rootScope.loadinganimation = false;
            //$scope.EPdatas = data.EP;
            scope.industrydatas = data.industry;

    }).error(function(data, status, headers, config) {
        $rootScope.loadinganimation = false;
        alert('Sorry Application error in serverside');
    });
      })
      .error(function(){ //handler errors here
        alert("Server error");
        $rootScope.loadinganimation=false; 
      });



            
            //industry
            var Indtsyarray = [];
            var Indtsy = {};
            var inlastvalue;
            scope.chckindustry = function(){
            Indtsyarray = [];
            
            for (var i=0;i<scope.UsecaseIntry.length-1;i++){
              if(scope.UsecaseIntry[i] == scope.UsecaseIntry[scope.UsecaseIntry.length-1]){
                scope.UsecaseIntry.splice(-1);
              }
            }
            for (var j=0;j<scope.UsecaseIntry.length;j++){

              Indtsy = {};
              Indtsy.SurrId = parseInt(scope.UsecaseIntry[j]);
              Indtsyarray.push(Indtsy);
            }
            
            

          }
    //
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
                "company_industries" : Indtsyarray/*[{"SurrId" : 4502},{"SurrId" : 4503}]*/,
                "user_surr_id" : $rootScope.surrId
              }

        });
            



      scope.sendOrganizationVal = function(){

      
      if(scope.organID == ''){
        alert('Please enter a valid Company Id');
          return false;
      }
      else if(scope.organName == ''){
        alert('Please enter a valid Company Name');
          return false;
      }
      else if(scope.compAdd1 == ''){
        alert('Please enter atleast one address');
          return false;
      }
            else if(scope.city == ''){
        alert('Please enter city');
          return false;
      }
            else if(scope.country == ''){
        alert('Please enter country');
          return false;
      }
            else if(scope.zip == ''){
        alert('Please enter zipcode');
          return false;
      }
      else{

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

            scope.clearValOrganization = function(){
                scope.organID="";
                scope.organName="";
                scope.compAdd1="";
                scope.compAdd2="";
                scope.compAdd3="";
                scope.city="";
                scope.state="";
                scope.country="";
                scope.zip="";
                scope.geocode="";
                Indtsyarray=[];
                scope.UsecaseIntry=[];
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