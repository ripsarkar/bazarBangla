app.controller("feedbackController", ["$scope", "$rootScope", "$state", '$http', function($scope, $rootScope, $state, $http) {
    
    $scope.cmpyId = localStorage.getItem("cmpyId");
    $scope.usrId = localStorage.getItem("surrrip");
    //$scope.rulesPckg='';
    $http.get($rootScope.url+'/getRulePkgExportData/'+$scope.cmpyId).success(function(data, status, headers, config) {
        if( typeof data.rulesPackageData != 'undefined' && data.rulesPackageData.length > 0){
        $scope.rulesPckg = data.rulesPackageData;
        //$scope.numberOfPages();
        
        }else{
            alert("Sorry data not found");
        }
    }).error(function(data, status, headers, config) {
        alert("Sorry Application error in serverside");
    });
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    //$scope.data = [];
    if(typeof $scope.rulesPckg != 'undefined' ){
        $scope.numberOfPages = function(){
            return Math.ceil($scope.rulesPckg.length/$scope.pageSize);                
        }
    }
    
    /*$scope.feedbackForm = function(id) {
    var modalInstance = $modal.open({
      templateUrl: '_DemoModal.html',
      controller: 'feedbackmodalCtrl',
      ruleid: id,
      backdrop: true,
      keyboard: true,
      modalFade: true
    });
  };*/
    
    $scope.feedbackFrm = {
        impstrtdate: "",
        orgruleid : "",
        orgrulename : "",
        impuptdate : "",
        Implper : "",
        fedbckcomments : "",
        pcklists:""
    }
    
    $scope.feedbackForm = function(id){
        $scope.ucruleid = id;
        if(id != null && typeof id != 'undefined'){
        $http.get($rootScope.url+'/getFeedbackData/'+id).success(function(data, status, headers, config) {
        if( typeof data.rulesFeedbackData != 'undefined' && data.rulesFeedbackData.length > 0){
        $scope.feedbackdetails = data.rulesFeedbackData;
        var pcklists =$scope.feedbackdetails[0].DownloadedRules;
        var fbformId =$scope.feedbackdetails[0].usecase_rule_id;
        if( typeof pcklists != 'undefined' && pcklists.length >0 ){
            $scope.feedbackFrm.pcklists = pcklists;
        }else{ $scope.pcklists=[];}   
        if(fbformId !="" && fbformId != null && typeof fbformId != 'undefined'){
            var impstrt =  $scope.feedbackdetails[0].uc_rule_impl_start_dt;
            var impupt =  $scope.feedbackdetails[0].uc_rule_impl_updt_dt;
            $scope.feedbackFrm.impstrtdate = impstrt.split('.')[0];
            $scope.feedbackFrm.orgruleid = $scope.feedbackdetails[0].client_rule_id;
            $scope.feedbackFrm.orgrulename = $scope.feedbackdetails[0].client_rule_name;
            $scope.feedbackFrm.impuptdate = impupt.split('.')[0];
            $scope.feedbackFrm.Implper = $scope.feedbackdetails[0].rule_impl_percent.toString();
            $scope.feedbackFrm.fedbckcomments = "";
        }else{
                $scope.feedbackFrm.impstrtdate="";
                $scope.feedbackFrm.orgruleid = "";
                $scope.feedbackFrm.orgrulename = "";
                $scope.feedbackFrm.impuptdate = "";
                $scope.feedbackFrm.Implper = "";
                $scope.feedbackFrm.fedbckcomments = "";
            }
        
        }else{
            alert("Sorry data not found");
        }
    }).error(function(data, status, headers, config) {
        alert("Sorry Application error in serverside");
    });
    }else{
        $scope.feedbackFrm.impstrtdate="";
        $scope.feedbackFrm.orgruleid = "";
        $scope.feedbackFrm.orgrulename = "";
        $scope.feedbackFrm.impuptdate = "";
        $scope.feedbackFrm.Implper = "";
        $scope.feedbackFrm.fedbckcomments = "";
        }
    }

    $scope.feedbacksubmit = function(){
    if($scope.feedbackFrm.impstrtdate !="" && $scope.feedbackFrm.orgruleid != "" && $scope.feedbackFrm.orgrulename != "" &&       $scope.feedbackFrm.impuptdate != "" && $scope.feedbackFrm.Implper != "" && $scope.feedbackFrm.Implper != 'undefined'){
        if(typeof $scope.ucruleid != 'undefined'){
            $scope.PostJson_feedback = {
                ucrulesurrid : $scope.ucruleid,
                clientucruleid : $scope.feedbackFrm.orgruleid,
                clientucrulename : $scope.feedbackFrm.orgrulename,
                clientucruleimplStartDate : $scope.feedbackFrm.impstrtdate, 
                clientucruleimplUpdtDate : new Date(),
                clientucruleimplpercent : $scope.feedbackFrm.Implper,
                clientcomments : $scope.feedbackFrm.fedbckcomments,
                usersurrid : $scope.usrId
            }
            $http.post($rootScope.url+'/saveFeedbackDetails/'+$scope.PostJson_feedback).success(function(data, status, headers, config) {
                alert("Feedback form successfully submitted");
                $scope.feedbackFrm.impstrtdate="";
                $scope.feedbackFrm.orgruleid = "";
                $scope.feedbackFrm.orgrulename = "";
                $scope.feedbackFrm.impuptdate = "";
                $scope.feedbackFrm.Implper = "";
                $scope.feedbackFrm.fedbckcomments = "";
            }).error(function(data, status, headers, config) {
                alert("Sorry Application error in serverside");
            });
        }else{ alert(" Usecase rule surrid is undefined, please conatct Admin");}
    }else{ alert("Please fill all mandatory fields ")}
    }
    
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if(typeof input != 'undefined' ){
            return input.slice(start);
        }
    }
});