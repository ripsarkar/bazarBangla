app.controller("createrolecrt", ["$scope", "$rootScope", "$state", '$http', '$modal', 'feedback_model', '$filter',function($scope, $rootScope, $state, $http, $modal, feedback_model, $filter) {
    
    $scope.cmpyId = localStorage.getItem("cmpyId");
    $scope.usrId = localStorage.getItem("surrrip");

    $scope.reSet = function(){
        $scope.createroleid =""
        $scope.createrolename =""
        $scope.createroledescp =""
        $scope.orgName ="";
        console.log('check');
    }
    $scope.reSet();
    
    $scope.cpmysurrid = function() {
        var URLviewcomp = $rootScope.url+'/getCompany';
        console.log(URLviewcomp);
        $http.get(URLviewcomp).success(function(data, status, headers, config) {
                $scope.vfbselPckg = data.Company;
        }).error(function(data, status, headers, config) {
            alert("Please contact your adminstrator");
        });
    }

    $scope.cpmysurrid();
    
    $scope.submitrole = function(){
        if( $scope.createroleid !="" && $scope.createroleid != 'undefined' && $scope.createrolename !="" && $scope.createrolename !='undefined'  && typeof $scope.orgName != 'undefined' && $scope.orgName !=""){
            var crtrole = {
                role_id : $scope.createroleid,
                role_name : $scope.createrolename,
                role_desc : $scope.createroledescp,
                company_surr_id : $scope.orgName
            }
            
            var postURLrole = $rootScope.url+'/createNewRole';
            console.log(postURLrole);
           $http.post(postURLrole, crtrole).success(function(data, status, headers, config) {
               alert('Role Created succesfully');
               $scope.reSet();
           }).error(function(data, status, headers, config) {
               alert("Please contact your adminstrator");
               $scope.reSet();
           });
        }else{
            alert('Please fill all *mandatory fields')
        }
    }

}]);