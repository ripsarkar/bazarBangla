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

$http.get( $rootScope.url + "/listCompanies").success(function(data){
                $rootScope.loadinganimation=false;

$scope.organiUpdatetable = data.companiesView;
}).error(function(err){

});



$scope.openUpdatePage = function(compsurrID){
                $rootScope.loadinganimation=true;

    $http.get($rootScope.url + '/populateEPIndutry').success(function(data, status, headers, config) {
            //$scope.EPdatas = data.EP;
            $scope.industrydatas = data.industry;
            $http.get( $rootScope.url + "/retrieveCompany/"+compsurrID).success(function(result){
                $rootScope.loadinganimation=false;

                $scope.organID=result.company_id;
                $scope.organName=result.company_name;
                $scope.compAdd1=result.company_add1;
                $scope.compAdd2=result.company_add2;
                $scope.compAdd3=result.company_add3;
                $scope.city=result.company_add_city;
                $scope.state=result.company_add_state;
                $scope.country=result.company_add_country;
                $scope.zip=result.company_add_zip;
                $scope.geocode=result.company_geo_code;
                
                for(var i=0;i<result.company_industries.length;i++){
                  $scope.UsecaseIntry[i]=result.company_industries[i];
                }
}).error(function(err){

});
    }).error(function(data, status, headers, config) {
        $rootScope.loadinganimation = false;
        alert('Sorry Application error in serverside');
    });




}


});