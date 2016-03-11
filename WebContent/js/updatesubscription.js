app.controller("updatesubscription", ["$scope", "$rootScope", "$state", '$http', '$modal', 'feedback_model', '$filter',function($scope, $rootScope, $state, $http, $modal, feedback_model, $filter) {
    
        $scope.cmpyId = localStorage.getItem("cmpyId");
        $scope.usrId = localStorage.getItem("surrrip");
     //   $rootScope.loadinganimation = true;
    
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        $scope.pgnation = function() {
            if (typeof $scope.vspPckg != 'undefined' && $scope.vspPckg.length > 0 && $scope.vspPckg != null) {
                $scope.numberOfPages = function() {
                    console.clear();
                    if($scope.vspPckg != null){
                    return Math.ceil($scope.vspPckg.length / $scope.pageSize);
                    }else{
                    return null;
                    }
                };
            }
        };
        $rootScope.dataUpdated = false;
        $scope.$watch(function() {
            if ($rootScope.dataUpdated) {
                $rootScope.dataUpdated = false;
                $scope.pageLoad();
            }
        });
    
        $scope.pageLoad = function() {
            var URLviewpage = null;
            var viewPagedata = $rootScope.url+'/viewSubscription/';
            URLviewpage = viewPagedata + $scope.orgName;
            $scope.vspPckg = null;
            $scope.vsp_tb= [];
            var vsp = null;
            $http.get(URLviewpage).success(function(data, status, headers, config) {
                $rootScope.loadinganimation = false;
                if (typeof data != 'undefined' && data.subscriptionview.length > 0) {
                    $rootScope.dataLoading=true;
                    vsp = data.subscriptionview;
                    $scope.vsp_tb.length = 0;
                    $scope.vspPckg = null;
                    for (var i = 0; i < vsp.length; i++) {
                        var vspdata = {};
                        vspdata.subsctpId = vsp[i].subsctpId;
                        vspdata.effectdate = vsp[i].effectdate;
                        vspdata.expirationdate = vsp[i].expirationdate;
                        vspdata.maxusers = vsp[i].maxusers;
                        vspdata.subscprtsurrId = vsp[i].subscprtsurrId;
                        $scope.vsp_tb.push(vspdata);
                    }

                    $scope.vspPckg = $scope.vsp_tb;
                    $scope.pgnation();
                    $rootScope.loadinganimation = false;
                } else {
                    $rootScope.loadinganimation = false;
                    $scope.vspPckg= null;
                    alert("Sorry, No subscription under this company");
                }
            }).error(function(data, status, headers, config) {
                $rootScope.loadinganimation = false;
                $scope.vspPckg= null;
                alert("Technical Error.Please contact administrator for further details");
            });
        };
    
        $scope.orgcmpname = function(){
            $rootScope.loadinganimation = true;
            $scope.pageLoad();
        }
        
     
    
		var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
		if(obj.Users.Subscription !=undefined){
			var permissiontypeList = obj.Users.Subscription.PermissionTypeDet;
			for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
				if(permissiontypeList[int2].PermissionName=="update"){
					 $scope.vspselPckgs = permissiontypeList[int2].ObjectList;
				
				}
			}

		}
		
//        $scope.cpmysurrid = function() {
//            var URLviewpage = $rootScope.url+'/getCompany';
//            $http.get(URLviewpage).success(function(data, status, headers, config) {
//                $scope.vspselPckgs = data.Company;
//                $scope.orgName = parseInt($scope.cmpyId);
//                $scope.pageLoad();
//            }).error(function(data, status, headers, config) {
//                $rootScope.dataLoading=true;
//                alert("Please contact your adminstrator");
//            });
//        }

      //  $scope.cpmysurrid();
    
        $scope.subscptForm = function(id, subsctpId, effectdate, expirationdate, maxusers, index) {
            var subscptdata = {
                id: id,
                subsctpId : subsctpId,
                effectdate : effectdate,
                expirationdate : expirationdate,
                maxusers : maxusers,
                index:index,
                orgName:$scope.orgName
            };
            feedback_model.setvsp_data(subscptdata);
            var modalInstance = $modal.open({
                templateUrl: 'subscptContent.html',
                controller: 'subscptpop',
                size: 'md'
            });
        };
}]);

app.controller('subscptpop', ['$scope', '$modalInstance', '$rootScope', '$state', '$http', 'feedback_model', '$filter',
    function($scope, $modalInstance, $rootScope, $state, $http, feedback_model, $filter) {
        
        $scope.usrId = localStorage.getItem("surrrip");
        var vspmodeldata = feedback_model.getvsp_data();
        $rootScope.loadinganimation = true;
        
        $scope.size = 'md';
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
            $scope.startTime = $filter('date')(new Date(), 'HH:mm:ss');

        };
        $scope.onchangeStartDate = function() {
            var stDate = $filter('date')($scope.startdt, 'yyyy-MM-dd');
            $scope.startdt = stDate + " " + $scope.startTime;
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        
        $scope.today = function() {
            $scope.dt = new Date();
        };
      $scope.today();

      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

        $scope.Upopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.Upopened = true;
            //$scope.updateTime = $filter('date')(new Date(), 'HH:mm:ss');
        };

        $scope.onchangeUpdtDate = function() {
            var updDate = $filter('date')($scope.updatedt, 'yyyy-MM-dd');
            $scope.updatedt = updDate;// + " " + $scope.updateTime;
        };

        $scope.subspcrtFrm = {
            supsctpId:"",
            maximumAcc:"",
            subscprtsurrId:""
        };
        
        $scope.gteComparator = function(a,b) {
          return new Date(a) >= new Date(b);
        };

        $scope.subscptForm = function(data) {
            if (data.id != null && typeof data.id != 'undefined') {
                $rootScope.loadinganimation = false;
                $scope.subspcrtFrm.supsctpId = data.subsctpId;
                $scope.startdt =  data.effectdate;
                $scope.updatedt = data.expirationdate;
                $scope.subspcrtFrm.maximumAcc = data.maxusers;
                $scope.subspcrtFrm.subscprtsurrId = data.id;
            } else {
                
            }
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.reSet = function(){
            $scope.updatedt ="";
            $scope.subspcrtFrm.maximumAcc ="";
        };
        
        $scope.subscptForm(vspmodeldata);
        $scope.updataSubscrptsubmit = function(id) {
            $scope.validation = false;
            var stdt = true;
            var updt = true;

            $scope.subspcrtFrm.effectdata = $scope.startdt;
            $scope.subspcrtFrm.expirationdate = $scope.updatedt;

            if (stdt && updt) {
                stdt = false;
                updt = false;
                if ($scope.subspcrtFrm.startdt < $scope.subspcrtFrm.expirationdate || $scope.updatedt == undefined || $scope.updatedt == '' || $scope.startdt == undefined || $scope.startdt == '') {
                    if($scope.subspcrtFrm.impupdate < $scope.subspcrtFrm.impstrtdate){
                        alert("Update date time should be greater then start date time");
                    }else if($scope.subspcrtFrm.Implper == undefined || $scope.subspcrtFrm.Implper == ''){
                        alert("Please provide valid date");
                    }else if($scope.updatedt == undefined || $scope.updatedt == ''){
                        alert('Please provide valid update date');
                    }else if($scope.startdt == undefined || $scope.startdt == ''){
                        alert('Please provide valid start date');
                    }
                    $scope.validation = false;
                    $rootScope.loadinganimation = false;
                } else {
                    $scope.validation = true;
                }
            }

            
            if ($scope.validation) {
                $scope.validation = false;
                if($scope.subspcrtFrm.maximumAcc !="" && $scope.subspcrtFrm.maximumAcc !="" &&typeof $scope.subspcrtFrm.maximumAcc !='undefined' && $scope.updatedt !="" && $scope.updatedt !=null && typeof $scope.updatedt != 'undefined' ){
                $scope.PostJson_updtscrtp = {
                    "subscprtsurrId": $scope.subspcrtFrm.subscprtsurrId,
                    "contractId": $scope.subspcrtFrm.supsctpId,
                    "effectiveDate": $scope.startdt,
                    "expirationdate": $scope.updatedt,
                    "maxUser": $scope.subspcrtFrm.maximumAcc
                };
                $http.post($rootScope.url + '/updateSubscription/', $scope.PostJson_updtscrtp).success(function(data, status, headers, config) {
                    $scope.cancel();
                    $scope.subspcrtFrm.subscprtsurrId ="";
                    $scope.subspcrtFrm.supsctpId ="";
                    $scope.startdt = "";
                    $scope.updatedt ="";
                    $scope.subspcrtFrm.maximumAcc = "";
                    $rootScope.loadinganimation = false;
                    alert("Update Subscription saved successfully");
                    $rootScope.dataUpdated = true;
              //fetch permission api
                          $http.get($rootScope.url + "/managePermission/" + $rootScope.user_name + '/' + $rootScope.companyNamee).success(function(result) {
                              sessionStorage.setItem("fetchPermission", JSON.stringify(result));
                              $scope.permission = sessionStorage.getItem("fetchPermission");
                             // console.log(sessionStorage.getItem("fetchPermission"));
                              $rootScope.loadinganimation = false;
                          }).error(function (error) {
                          alert("Server side error");
                          });
                }).error(function(data, status, headers, config) {
                    $scope.cancel();
                    $scope.subspcrtFrm.subscprtsurrId ="";
                    $scope.subspcrtFrm.supsctpId ="";
                    $scope.startdt = "";
                    $scope.updatedt ="";
                    $scope.subspcrtFrm.maximumAcc = "";
                    $rootScope.loadinganimation = false;
                    alert(data.ErrMsg);
                });
                }else{
                	alert('Please fill valid Maximum Acive Users');
                }
            }
        };
        
    }
]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        console.clear();
        if (typeof input != 'undefined') {
            return input.slice(start);
        }
    };
});