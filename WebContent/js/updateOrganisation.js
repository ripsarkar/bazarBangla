/*app.directive('updateOrg', ['MyAPIServiceUpOrg','$http','$rootScope', function(MyAPIServiceUpOrg,$http,$rootScope) {
    return {
        restrict: "E",
        templateUrl:"html/templates/update-organization.html",
        link: function(scope, element, attr, mCtrl) {



        }
    };
}]);

app.factory('MyAPIServiceUpOrg', function($http,$rootScope){

  return {

  };
});*/
app.controller('updateOrgani',function($scope,$http,$rootScope){
                $rootScope.loadinganimation=true;

/*$http.get( $rootScope.url + "/listCompanies").success(function(data){
                $rootScope.loadinganimation=false;

$scope.organiUpdatetable = data.companiesView;
}).error(function(err){

});*/
var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
if(obj.Users.Organization !=undefined){
  var permissiontypeList = obj.Users.Organization.PermissionTypeDet;
  for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
    if(permissiontypeList[int2].PermissionName=="update"){
       $scope.organiUpdatetable=permissiontypeList[int2].ObjectList;
                $rootScope.loadinganimation=false;

    }
  }
}



       $http.get("data/restcountries.json")
      .success(function(data, status, config, headers){
                $scope.countryNameUp = data;
                $rootScope.loadinganimation = false;
            }).error(function(data, status, headers, config) {
        $rootScope.loadinganimation = false;
        alert('Sorry Application error in serverside');
    });
    $http.get($rootScope.url + '/populateEPIndutry').success(function(data, status, headers, config) {
            //$scope.EPdatas = data.EP;
            $scope.industrydatas = data.industry;
            $rootScope.loadinganimation = false;
    }).error(function(data, status, headers, config) {
        $rootScope.loadinganimation = false;
        alert('Sorry Application error in serverside');
    });   
    

$scope.UsecaseIntry = [];
$scope.openUpdatePage = function(compsurrID){

                $rootScope.loadinganimation=true;
            $http.get( $rootScope.url + "/retrieveCompany/"+compsurrID).success(function(result){
                $rootScope.loadinganimation=false;

                $scope.organID=result.company_id;
                $scope.organName=result.company_name;
                $scope.compAdd1=result.company_add1;
                $scope.compAdd2=result.company_add2;
                $scope.compAdd3=result.company_add3;
                $scope.city=result.company_add_city;
                $scope.state=result.company_add_state;
                $scope.country222=result.company_add_country;
                $scope.zip=result.company_add_zip;
                $scope.geocode=result.company_geo_code;
                $scope.companySurrId = result.company_surr_id;
                
                for(var i=0;i<result.company_industries.length;i++){
                  $scope.UsecaseIntry[i]=result.company_industries[i].industry_surr_id;
                  
                  angular.element(".bgcolorOptn").each(function(){
                    
                    if(angular.element(this).val() == result.company_industries[i].industry_surr_id){
                        angular.element(this).addClass('addClassBgcolor');
                    }
                  });
                }

}).error(function(err){
	$rootScope.loadinganimation=false;
	 alert("Internal server error"); 
});

}
            $scope.chckindustry = function(){
            Indtsyarray = [];
            
            for (var i=0;i<$scope.UsecaseIntry.length-1;i++){
              if($scope.UsecaseIntry[i] == $scope.UsecaseIntry[$scope.UsecaseIntry.length-1]){
                $scope.UsecaseIntry.splice(-1);
              }
            }

          }

$scope.updateOrganizationVal = function(compsurrID){
      var testAlpNu = /^[a-zA-Z0-9\s\d\/]+$/;
      var testAlp = /^[a-zA-Z\s\d\/]+$/;
      var testAddress = /^[a-zA-Z0-9\s\d\/]+$/;
      if($scope.geocode == null){
        $scope.geocode = "";
      }
      if($scope.organID == ''  || !testAlpNu.test($scope.organID)){
        alert('Please enter a valid Company Id(no special character)');
          return false;
      }
      else if($scope.organName == ''  || !testAlpNu.test($scope.organName)){
        alert('Please enter a valid Company Name');
          return false;
      }
      /*else if($scope.compAdd1 == '' || !testAddress.test($scope.compAdd1)){
        alert('Please enter atleast one valid address');
          return false;
      }
      else if($scope.compAdd2 != '' && !testAddress.test($scope.compAdd2)){
        alert('Please enter valid 2nd address');
          return false;
      }
      else if($scope.compAdd3 != '' && !testAddress.test($scope.compAdd3)){
        alert('Please enter valid 3rd address');
          return false;
      }*/
            else if($scope.compAdd1 == ''){
        alert('Please enter atleast one valid address');
          return false;
      }
            else if($scope.city == ''  || !testAlp.test($scope.city)){
        alert('Please enter valid city');
          return false;
      }
            else if($scope.state != ''  && !testAlp.test($scope.state)){
        alert('Please enter valid state');
          return false;
      }
            else if($scope.country == ''){
        alert('Please enter country');
          return false;
      }
            else if($scope.zip == '' || !testAlpNu.test($scope.zip)){
        alert('Please enter valid zipcode');
          return false;
      }
            else if($scope.geocode != '' && !testAlpNu.test($scope.geocode)){
        alert('Please enter valid geocode');
          return false;
      }
      else{

var updateorgjson = {
  "companyid": $scope.organID,
  "companyname": $scope.organName,
  "companyadd1": $scope.compAdd1,
  "companyadd2": $scope.compAdd2,
  "companyadd3": $scope.compAdd3,
  "companyadd_city": $scope.city,
  "companyadd_state": $scope.state,
  "companyadd_country": $scope.country222,
  "companyadd_zip": $scope.zip,
  "companyadd_geocode": $scope.geocode,
  "company_industries" : [],
  "user_surr_id" : localStorage.getItem("surrrip"),
  "company_surr_id" : $scope.companySurrId

}
                for(var i=0;i<$scope.UsecaseIntry.length;i++){
                var cOpI = {};
                cOpI.SurrId = $scope.UsecaseIntry[i];
                //console.log($scope.UsecaseIntry[i]);
                    updateorgjson.company_industries.push(cOpI);
                }





var updarorg = {
    url:$rootScope.url + "/updateCompany",
    method:"POST",
    data:JSON.stringify(updateorgjson)
}

    $http(updarorg).success(function(result){

        alert("Organization updated");

}).error(function(error){
	alert("Internal server error");
});
}
}
});