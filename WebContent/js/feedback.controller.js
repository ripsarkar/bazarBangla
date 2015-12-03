app.controller("feedbackController", ["$scope", "$rootScope", "$state", '$http', '$modal', 'feedback_model','$filter', function($scope, $rootScope, $state, $http, $modal, feedback_model,$filter) {

    $scope.cmpyId = localStorage.getItem("cmpyId");
    $scope.usrId = localStorage.getItem("surrrip");
    //$scope.rulesPckg='';

    $scope.currentPage = 0;
    $scope.pageSize = 4;
    //$scope.data = [];
    $scope.pgnation = function() {
        if (typeof $scope.rulesPckg != 'undefined' && $scope.rulesPckg.length > 0) {
            $scope.numberOfPages = function() {
                return Math.ceil($scope.rulesPckg.length / $scope.pageSize);
            }
        }
    }
    $rootScope.dataUpdated = false;
    $scope.$watch(function () {
    	if($rootScope.dataUpdated){
    		$rootScope.dataUpdated=false;
    		$scope.pageLoad();
    	}
    });
    /*date picker code*/
//    $scope.$watch(function () {
//    	if($scope.startdt != undefined || $scope.startdt!=''){
//    		var dt =new Date();
//        	var hr=dt.getHours();
//        	var min=dt.getMinutes();
//        	var sec=dt.getSeconds();
//        	var time = hr +":"+min+":"+sec;
//        	$scope.startdt = $scope.startdt+time;
//    	}
//    	
//    //	alert(time);
//    });
      
    $scope.pageLoad = function() {
    	$rootScope.loadinganimation=true;
        
    	 $http.get($rootScope.url + '/getRulePkgExportData/' + $scope.cmpyId).success(function(data, status, headers, config) {
    		  
    		 if (typeof data.Usecase != 'undefined' && data.Usecase.length > 0) {
    	            var fbrule = data.Usecase;
    	            var fb_tb = [];
    	            for (var i = 0; i < fbrule.length; i++) {
    	                for (var j = 0; j < fbrule[i].Rule.length; j++) {
    	                    var fbruledata = {};
    	                    if (j == 0) {
    	                        fbruledata.id_label = fbrule[i].id;
    	                        fbruledata.name = fbrule[i].name;
    	                        fbruledata.ucId = fbrule[i].id;
    	                        fbruledata.ucName = fbrule[i].name;
    	                        fbruledata.ruleid = fbrule[i].Rule[j].id;
    	                        fbruledata.ruleid_label = fbrule[i].Rule[j].id_label;
    	                        fbruledata.rulename = fbrule[i].Rule[j].name;
    	                        fbruledata.ruleoob_flag = fbrule[i].Rule[j].oob_flag;
    	                        fbruledata.ruleclient_rule_id = fbrule[i].Rule[j].client_rule_id;
    	                        fbruledata.ruleclient_rule_name = fbrule[i].Rule[j].client_rule_name;
    	                        fbruledata.rulerule_impl_percent = fbrule[i].Rule[j].rule_impl_percent;
    	                        
    	                        fb_tb.push(fbruledata);
    	                    } else {
    	                        fbruledata.id_label = "";
    	                        fbruledata.name = "";
    	                        fbruledata.ucId = fbrule[i].id;
    	                        fbruledata.ucName = fbrule[i].name;
    	                        fbruledata.ruleid = fbrule[i].Rule[j].id;
    	                        fbruledata.ruleid_label = fbrule[i].Rule[j].id_label;
    	                        fbruledata.rulename = fbrule[i].Rule[j].name;
    	                        fbruledata.ruleoob_flag = fbrule[i].Rule[j].oob_flag;
    	                        fbruledata.ruleclient_rule_id = fbrule[i].Rule[j].client_rule_id;
    	                        fbruledata.ruleclient_rule_name = fbrule[i].Rule[j].client_rule_name;
    	                        fbruledata.rulerule_impl_percent = fbrule[i].Rule[j].rule_impl_percent;
    	                        fb_tb.push(fbruledata);
    	                    }
    	                }
    	            }

    	            $scope.rulesPckg = fb_tb;
    	            $scope.pgnation();
    	        	$rootScope.loadinganimation=false;
    	            
    	        } else {
    	            alert("Sorry data not found");
    	        	$rootScope.loadinganimation=false;
    	        }
    	    }).error(function(data, status, headers, config) {
    	    	$rootScope.loadinganimation=false;
    	        alert("Technical Error.Please contact administrator for further details");
    	    });

    }

   
    $scope.pageLoad();

  
    $scope.feedbackForm = function(id, fdlabel, fdname,index) {
        var fb_id = {
            fdlabel: fdlabel,
            fdname: fdname,
            id: id,
            index : index
        };
        feedback_model.setfbModal_data(fb_id);
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg'
        });
    }

    $scope.sort = {
        column: '',
        descending: false
    };
    $scope.changeSorting = function(column) {
        var sort = $scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };
   
   
    
}]);

app.service('feedback_model', ['$http', '$rootScope', function($http, $rootScope) {
    var fbchk = this;
    var fbModal_data = null;

    fbchk.getfbModal_data = function() {
        return fbModal_data;
    }

    fbchk.setfbModal_data = function(data) {
        fbModal_data = data;
    }

}]);

app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$rootScope', '$state', '$http', 'feedback_model','$filter', function($scope, $modalInstance, $rootScope, $state, $http, feedback_model,$filter) {

    /*fdlabel :$scope.fdlabel;
    fdname :$scope.fdname;
    id :$scope.ucruleid;*/

    var fdmodeldata = feedback_model.getfbModal_data();
     $scope.size = 'lg';
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    
    

    $scope.Upopen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.Upopened = true;
    };

    $scope.feedbackFrm = {
        impstrtdate: "",
        orgruleid: "",
        orgrulename: "",
        impuptdate: "",
        Implper: "",
        fedbckcomments: ""
    };
    $scope.ucruleid = "";
    $scope.feedbackForm = function(id, fdlabel, fdname,index) {
    	$rootScope.loadinganimation=true;
        
        $scope.fdlabel = fdlabel;
        $scope.fdname = fdname;
        $scope.ucruleid = id;
        $scope.index = index;
        if (id != null && typeof id != 'undefined') {
            $http.get($rootScope.url + '/getFeedbackData/' + id).success(function(data, status, headers, config) {
            	$rootScope.loadinganimation=false;
                
                if (typeof data.rulesFeedbackData != 'undefined' && data.rulesFeedbackData.length > 0) {
                    //console.log(JSON.stringify(data, null, 2));
                    $scope.feedbackdetails = data.rulesFeedbackData;
                    var pcklists = $scope.feedbackdetails[0].DownloadedRules;
                    var fbformId = $scope.feedbackdetails[0].usecase_rule_id;
                    if (typeof pcklists != 'undefined' && pcklists.length > 0) {
                        $scope.feedbackFrm.pcklists = pcklists;
                    } else {
                        $scope.pcklists = [];
                    }
                    if (fbformId != "" && fbformId != null && $scope.feedbackdetails[0].client_rule_id != null && typeof fbformId != 'undefined') {
                        var impstrt = $scope.feedbackdetails[0].uc_rule_impl_start_dt;
                        var impupt = $scope.feedbackdetails[0].uc_rule_impl_updt_dt;
                        //$scope.feedbackFrm.impstrtdate = impstrt.split('.')[0];
                        $scope.startdt = impstrt;
                        $scope.dt = $scope.feedbackFrm.impstrtdate;
                        $scope.feedbackFrm.orgruleid = $scope.feedbackdetails[0].client_rule_id;
                        $scope.feedbackFrm.orgrulename = $scope.feedbackdetails[0].client_rule_name;
                        //$scope.feedbackFrm.impupdate = impupt.split('.')[0];
                        $scope.updatedt = impupt;
                        $scope.feedbackFrm.Implper = $scope.feedbackdetails[0].rule_impl_percent.toString();
                        $scope.feedbackFrm.fedbckcomments =  $scope.feedbackdetails[0].client_rule_comment;
                    } else {
                        $scope.feedbackFrm.impstrtdate = "";
                        $scope.feedbackFrm.orgruleid = "";
                        $scope.feedbackFrm.orgrulename = "";
                        $scope.feedbackFrm.impuptdate = "";
                        $scope.feedbackFrm.Implper = "";
                        $scope.feedbackFrm.fedbckcomments = "";
                    }

                } else {
                    alert("Sorry data not found");
                }
            }).error(function(data, status, headers, config) {
                alert("Error loading data.Please contact administrator for further details");
                $scope.feedbackFrm.impstrtdate = "";
                $scope.feedbackFrm.orgruleid = "";
                $scope.feedbackFrm.orgrulename = "";
                $scope.feedbackFrm.impuptdate = "";
                $scope.feedbackFrm.Implper = "";
                $scope.feedbackFrm.fedbckcomments = "";
            });
        } else {
            $scope.feedbackFrm.impstrtdate = "";
            $scope.feedbackFrm.orgruleid = "";
            $scope.feedbackFrm.orgrulename = "";
            $scope.feedbackFrm.impuptdate = "";
            $scope.feedbackFrm.Implper = "";
            $scope.feedbackFrm.fedbckcomments = "";
        }
    }

    $scope.feedbackForm(fdmodeldata.id, fdmodeldata.fdlabel, fdmodeldata.fdname);
    
    

    $scope.feedbacksubmit = function(id) {
    	$scope.validation = false;
    	var stdt =false;
    	var updt = false;
    	    	
    	if ($scope.updatedt == undefined || $scope.updatedt =='') {
            alert('Please enter a valid implementation update date');
            $scope.validation = false;
        }else{
        	$scope.validation = true;
        	 stdt =true;
        }
    	if ($scope.startdt == undefined || $scope.startdt =='') {
            alert('Please enter a valid implementation start date');
            $scope.validation = false;
        }else{
        	$scope.validation = true;
        	 updt = true;
        }
    	 $scope.feedbackFrm.impstrtdate =  $filter('date')($scope.startdt, 'yyyy-MM-dd HH:mm:ss');
	     $scope.feedbackFrm.impupdate =  $filter('date')($scope.updatedt, 'yyyy-MM-dd HH:mm:ss');

	     if (stdt && updt) {
	    	 stdt =false;
	    	 updt = false;
	    	 if ( $scope.feedbackFrm.impupdate  < $scope.feedbackFrm.impstrtdate)
			  {
			  alert("Please choose update date after start date");
			  $scope.validation = false;
			  }else{
				  $scope.validation = true;
		      } 
	     }
	     
	     if ( $scope.feedbackFrm.Implper == undefined ||  $scope.feedbackFrm.Implper =='') {
	    	 alert("Please give implementation percentage");
	    	  $scope.validation = false;
	     }else{
	    	  $scope.validation = true; 
	     }
    	
    	if($scope.validation){
    		  $scope.validation = false;
             $scope.PostJson_feedback = {
                 ucrulesurrid: $scope.ucruleid,
                 clientucruleid: $scope.feedbackFrm.orgruleid,
                 clientucrulename: $scope.feedbackFrm.orgrulename,
                 clientucruleimplStartDate: $scope.feedbackFrm.impstrtdate,
                 clientucruleimplUpdtDate: $scope.feedbackFrm.impupdate,
                 clientucruleimplpercent: $scope.feedbackFrm.Implper,
                 clientcomments : $scope.feedbackFrm.fedbckcomments,
                 usersurrid: $scope.usrId
             }

             console.log(JSON.stringify($scope.PostJson_feedback, null, 2));
             $http.post($rootScope.url + '/saveFeedbackDetails/', $scope.PostJson_feedback).success(function(data, status, headers, config) {
             	$rootScope.dataUpdated =true;
                 alert(data);
                 $scope.startdt = "";
                 $scope.updatedt = "";
                 $scope.ucruleid ="";
                 $scope.feedbackFrm.orgruleid = "";
                 $scope.feedbackFrm.orgrulename = "";
                 $scope.feedbackFrm.impupdate = "";
                 $scope.feedbackFrm.Implper = "";
                 $scope.feedbackFrm.fedbckcomments = "";
                 //$("#myModal").modal("hide");
                 $scope.cancel();
                 
             }).error(function(data, status, headers, config) {
            	//  alert(data);
                 $scope.startdt = "";
                 $scope.updatedt = "";
                 $scope.ucruleid ="";
                 if($scope.feedbackFrm!=undefined){
                     $scope.feedbackFrm.orgruleid = "";
                     $scope.feedbackFrm.orgrulename = "";
                     $scope.feedbackFrm.impupdate = "";
                     $scope.feedbackFrm.Implper = "";
                     $scope.feedbackFrm.fedbckcomments = "";
                 }
           
                 //$("#myModal").modal("hide");
                 $scope.cancel();
             });
         
    	}
    	
    }
    $scope.feedbacksubmitchck=function(id){
        console.log("entered");
      
    }
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (typeof input != 'undefined') {
            return input.slice(start);
        }
    }
});