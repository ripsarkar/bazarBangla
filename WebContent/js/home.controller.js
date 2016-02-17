'use strict';
var app = angular.module('app').controller('HomeController', HomeController);
HomeController.$inject = ['UserService', '$rootScope', '$scope', '$http','$location'];


function HomeController(UserService,  $rootScope, $scope, $http,$location) {
		var usernameId;
		angular.element(document).ready(function(){
		usernameId = window.location.href;
		});
		var mj = usernameId.split("=");
	console.log("dataloading value::"+$rootScope.dataLoading);
	
    if($rootScope.dataLoading == undefined || $rootScope.dataLoading==false) {
    	console.log("data loading GET called");
		  $rootScope.loadinganimation = true;
		  var loadUserdetails = {
 	                method: "GET",
 	               url: $rootScope.url+"/getUserDetails/"+mj[1]
 	         	//  url: "data/userdtail.json"
 	            };
 	            $http(loadUserdetails).success(function(result) {
 	             $rootScope.dataLoading=true; 	            
 	            	if (result.User[0].error!=undefined) {
 	            		if(result.User[0].error=="Username not populated"){
 	            			$rootScope.loginError=false;
 	            		}else{
 	            			$rootScope.loginError=true;
 	            		}
 	            		$location.path('/login');
 	                }else{
 	                	$rootScope.loginError=false;
 	                	// Store
 	                	localStorage.setItem("rolerip", result.User[0].user_role_name);
 	                	localStorage.setItem("surrrip", result.User[0].user_surr_id);
 	                	localStorage.setItem("surrComprip", result.User[0].company_surr_id);
 	                	localStorage.setItem("namerip", result.User[0].user_name);
 	                	if(result.User[0].user_middle_name!=null){
 	                		localStorage.setItem("fullname", (result.User[0].user_first_name+" "+result.User[0].user_middle_name+" "+result.User[0].user_last_name));	
 	                	}else{
 	                		localStorage.setItem("fullname", (result.User[0].user_first_name+" "+result.User[0].user_last_name));
 	                	}
 	                	
 	                	localStorage.setItem("showallbutt", result.User[0].user_industry_name);
 	                	localStorage.setItem("cmpyId", result.User[0].company_surr_id);
                        localStorage.setItem("industrySurrId", result.User[0].user_industry_surr_id);
                        localStorage.setItem("nameCompany", result.User[0].company_name);

 	                	$rootScope.role = result.User[0].user_role_name;
 	                	$rootScope.surrId = result.User[0].user_surr_id;
 	                	$rootScope.user_name = result.User[0].user_name;
 	                    $rootScope.disabled=false;
 	                 //   $rootScope.username = result.User[0].user_name;
 	                    $rootScope.username = localStorage.getItem("fullname");
 	                    $rootScope.compSurrId = localStorage.getItem("surrComprip");
                        $rootScope.user_name = result.User[0].user_name;
                        $rootScope.companyNamee = result.User[0].company_name;

 	                }
 	            	    $rootScope.loadinganimation = false;
                        console.log($rootScope.user_name);
                        console.log($rootScope.companyNamee);
                        console.log(localStorage.getItem("fullname"));

                        $location.path('/home/search');

                        $http.get($rootScope.url + "/managePermission/" + $rootScope.user_name + '/' + $rootScope.companyNamee).success(function(result) {
                        
                            sessionStorage.setItem("fetchPermission", JSON.stringify(result));
                            $scope.permission = sessionStorage.getItem("fetchPermission");
                            console.log(sessionStorage.getItem("fetchPermission"));
                          
                            $location.path('/home/search');
                            $rootScope.loadinganimation = false;
                        }).error(function (error) {

                        });

                        $http.get($rootScope.url + "/getOrgListForUser/" + localStorage.getItem("surrrip")).success(function(result) {
                        
                            $scope.RfetchList = result.Organization;
                            $rootScope.loadinganimation = false;
                        }).error(function (error) {

                        });

 	            }).error(function (error) {
 	             $rootScope.loadinganimation = false;

 	            });
		  
	  }

//changing the user undustry
    $scope.userIndustCh = function(){
        var userIndustCh = $scope.userIndustChVa;
                            $rootScope.loadinganimation = true;

                            $http.get($rootScope.url + "/managePermission/" + $rootScope.user_name + '/' + userIndustCh).success(function(result) {

                            	sessionStorage.setItem("fetchPermission", JSON.stringify(result));
                                $rootScope.indussession = sessionStorage.getItem("fetchPermission");
                                console.log(sessionStorage.getItem("fetchPermission"));
                                //$location.path('/home/search');
                                $rootScope.loadinganimation = false;
                            }).error(function (error) {

                            });
    }
////////////////////////////////////////////////
	  
	//  initController();
	//code for showall button visibility
	$rootScope.userIndustryName =  localStorage.getItem("showallbutt");

	if($rootScope.userIndustryName =="ALL"){
		$scope.showAllmode=true;
	}
	
	
	
	//logout
	$scope.localStorageclear=function(){
		
	   localStorage.clear();
	   $location.path('/login');
//	   $rootScope.loadinganimation = true;
//	   var logout =   {
//				method: "GET",    			
//		
//				url: $rootScope.url+"/logout",
//				headers: {
//		               'Access-Control-Allow-Origin':"{$_SERVER['HTTP_ORIGIN']}",
//		               'Access-Control-Request-Method': 'GET',
//		               'Content-Type': "application/json",
//		               'Access-Control-Allow-Headers': "Content-Type",
//		              ' Access-Control-Allow-Credentials':'true',
//		              'Access-Control-Max-Age': '86400'
//		           }
//					
//	         
//			};
//			
////			 if (isset($_SERVER['HTTP_ORIGIN'])) {
////		        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
////		        header('Access-Control-Allow-Credentials: true');
////		        header('Access-Control-Max-Age: 86400');    // cache for 1 day
////		    }
//		  
//			 $http(logout).success(function(result) {
//	            	$rootScope.loadinganimation = false;
//	            	
//	            	$location.path('/login');
//	            }).error(function (error) {
//		             $rootScope.loadinganimation = false;
//		            	
//		            	$location.path('/login');
//		            });
		}
	
	//local storage
	$rootScope.role = localStorage.getItem("rolerip");
//	$rootScope.surrId = localStorage.getItem("surrrip");
//	$rootScope.user_name = localStorage.getItem("namerip");
//	$rootScope.username = localStorage.getItem("fullname");
//	$rootScope.compSurrId = localStorage.getItem("surrComprip");

	//link visited
    $scope.$watch(function () {
    	//link visited color change
    	angular.element( ".dimensionTableBasic" ).click(function() {
    		angular.element(".dimensionTableBasic").removeClass("dimensionTableVisited");
    		angular.element(".usecaseTable").removeClass("usecaseTableclick");
    		angular.element(".usecaseTablerule").removeClass("usecaseTableclick");
    		angular.element(this).addClass("dimensionTableVisited");
    		angular.element(this).parents(".usecaseTable").addClass("usecaseTableclick");
    		angular.element(this).parents(".usecaseTablerule").addClass("usecaseTableclick");
    	});
    });
    var feedhov = true;
	angular.element(".feedbackmenu").click(function(){
			angular.element(this).children("span").css({
				'background-position':'52px 0px'
			});
			feedhov = false;
	});
	

	angular.element(".feedbackmenu").hover(function(){
		angular.element(this).children("span").css({
			'background-position':'52px 0px'
		});
	},
	function(){
		if(feedhov==true){
		angular.element(this).children("span").css({
			'background-position':'0px 0px'
		});
		}
	});
	angular.element(".forallnotFedd").click(function(){
		angular.element(".feedbackmenu").children("span").css({
			'background-position':'0px 0px'
		});
		feedhov = true;
	});
    var searhov = true;
	angular.element(".searchlibrarymenuI").click(function(){
		angular.element(this).children("span").css({
			'background-position':'-71px -325px'
		});
		searhov = false;
	});
	angular.element(".searchlibrarymenuI").hover(function(){
		angular.element(this).children("span").css({
			'background-position':'-71px -325px'
		});
	},
	function(){
		if(searhov==true){
		angular.element(this).children("span").css({
			'background-position':'0px -325px'
		});
		}
	});
	angular.element(".forallnotsear").click(function(){
		angular.element(".searchlibrarymenuI").children("span").css({
			'background-position':'0px -325px'
		});
		searhov = true;
	});
	

    //code for user role specific access
	
	  $scope.$watch(function () {
		    if ($rootScope.role == "ADMIN") {
		        $scope.useCaseMaintain = true;
		        $scope.userAccountManagement = true;
		        $scope.ucrlPackage = true;
		        $scope.alertMenu = true;
		        $scope.searchMenu = true;
		        $scope.feedback = true;
		        $scope.showAllmode=true;
		        $scope.organization=true;
                $scope.rolemenu=true;
		        $rootScope.exported = false;
		        $rootScope.searchOOBCri=true;
		    }
		    if ($rootScope.role == "SALES_PERSON") {
		        $scope.searchMenu = true;
		        $rootScope.exported = false;
		        $scope.useCaseMaintain = true;
		        $scope.userAccountManagement = false;
		        $scope.showAllmode=true;
		        $scope.feedback = true;
		        $scope.organization=true;
                $scope.rolemenu=true;
		        $rootScope.searchOOBCri=true;
		    }
		    if ($rootScope.role == "USER_VIEW") {
		        $scope.searchMenu = true;
		        $rootScope.exported = true;
		        $scope.feedback = true;
		        $scope.userAccountManagement = false;
		        $scope.showAllmode=true;
		        $scope.organization=true;
                $scope.rolemenu=true;
		        $rootScope.searchOOBCri=true;
		    }
		    if ($rootScope.role == "USER_EXPORT") {
		        $scope.searchMenu = true;
		        $scope.feedback = true;
		        $rootScope.exported = false;
		        $scope.userAccountManagement = false;
		        $scope.showAllmode=true;
		        $scope.organization=true;
                $scope.rolemenu=true;
		        $rootScope.searchOOBCri=true;
		    }
		});

    //starting messege
    $scope.userMsg = "Please select search criteria from left";
    $scope.showResult = false;

    $scope.currentTab = 'html/search-result.html';

    $scope.onClickTab = function() {
        $scope.currentTab = 'html/search-name-id.html';
    }
    $scope.onClickTabRule = function() {
        $scope.currentTab = 'html/usecaserule.html';

    }

    $scope.onClickTree = function() {
        $scope.currentTab = 'html/search-result.html';
    }


    angular.element('.panel-heading a').on('click', function(e) {
        if (angular.element(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
            e.stopPropagation();
        }
    });


  
    /*-------/code for search pages------*/

//    var vm = this;
//    vm.user = null;
//    vm.allUsers = [];
//    vm.deleteUser = deleteUser;

//    initController();
//
//    function initController() {
//   //     loadCurrentUser();
//   //     loadAllUsers();
//    }
//
//    function loadCurrentUser() {
//        UserService.GetByUsername($rootScope.globals.currentUser.username).then(function(user) {
//                vm.user = user;
//            });
//    }

//    function loadAllUsers() {
//        UserService.GetAll()
//            .then(function(users) {
//                vm.allUsers = users;
//            });
//    }

//    function deleteUser(id) {
//        UserService.Delete(id).then(function() {
//                loadAllUsers();
//            });
//    }
    
    /**********************************/
    $scope.managePermissionOrg=function(){
		$scope.UpdateOrgzd = false;
		$scope.CreateOrgzd = false;
		$scope.UpdateSubzd = false;
		$scope.CreateSubzd = false;
		
		var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
		if(obj.Users.Subscription !=undefined){

			var permissiontypeList = obj.Users.Subscription.PermissionTypeDet;
			for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
				if(permissiontypeList[int2].PermissionName=="update"){
					if(permissiontypeList[int2].ObjectList.length > 0){
						$scope.UpdateSubzd = true;
					}
				}else if(permissiontypeList[int2].PermissionName=="create"){
					if(permissiontypeList[int2].ObjectList.length > 0){
					$scope.CreateSubzd = true;
					}
				}
			}
		}
		if(obj.Users.Organization !=undefined){

			var permissiontypeList = obj.Users.Organization.PermissionTypeDet;
			for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
				if(permissiontypeList[int2].PermissionName=="update"){
					if(permissiontypeList[int2].ObjectList.length > 0){
					$scope.UpdateOrgzd = true;
					}
				}else if(permissiontypeList[int2].PermissionName=="create"){
					if(permissiontypeList[int2].ObjectList.length > 0){
					$scope.CreateOrgzd = true;
					}
				}
			}
		
		}
    	
		
	}
	
	$scope.managePermissionForUserAccount=function(){
		$scope.UpdateUserzd = false;
		$scope.CreateUserzd = false;
		$scope.ViewUserzd = false;
		
		
		var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
		if(obj.Users.User !=undefined){

			var permissiontypeList = obj.Users.User.PermissionTypeDet;
			for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
				if(permissiontypeList[int2].PermissionName=="update"){
					if(permissiontypeList[int2].ObjectList.length > 0){
						$scope.UpdateUserzd = true;
					}
				}else if(permissiontypeList[int2].PermissionName=="create"){
					if(permissiontypeList[int2].ObjectList.length > 0){
					$scope.CreateUserzd = true;
					}
				}else if(permissiontypeList[int2].PermissionName=="read"){
					if(permissiontypeList[int2].ObjectList.length > 0){
						$scope.ViewUserzd = true;
						}
					}
			}
		}
		    	
		
	}
	
	$scope.managePermissionForRole=function(){
		$scope.UpdateRolezd = false;
		$scope.CreateRolezd = false;
		
		
		var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
		if(obj.Users.Role !=undefined){

			var permissiontypeList = obj.Users.Role.PermissionTypeDet;
			for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
				if(permissiontypeList[int2].PermissionName=="update"){
					if(permissiontypeList[int2].ObjectList.length > 0){
						$scope.UpdateRolezd = true;
					}
				}else if(permissiontypeList[int2].PermissionName=="create"){
					if(permissiontypeList[int2].ObjectList.length > 0){
					$scope.CreateRolezd = true;
					}
				}
			}
		}
		    	
		
	}
     
   /***************************** */
    $scope.defaultmenu = function(){
        $scope.menu = {
            usecaserule :false,
            feedback : false,
            usecase:false,
            rule:false,
            uaman:false,
            organisation:false,
            subrolemenu:false,
            menu:false
        };
        angular.element("ul.submainlinks li").removeClass("subactive");
    };
    $scope.defaultmenu();
    
    $scope.menuUseRule =  function(){
        $scope.menu = {
            usecaserule :true,
            feedback : false,
            usecase:false,
            rule:false,
            uaman:false,
            organisation:false,
            subrolemenu:false,
            menu:true
        };
        angular.element("ul.submainlinks li").removeClass("subactive");
    };

    
    $scope.feedbackmenu = function(){
        $scope.menu = {
            usecaserule :false,
            feedback : true,
            usecase:false,
            rule:false,
            uaman:false,
            organisation:false,
            subrolemenu:false,
            menu:true
        };
        angular.element("ul.submainlinks li").removeClass("subactive");
    };
    $scope.manageOrg = function(){
    	 $scope.managePermissionOrg();
    	if(!$scope.CreateOrgzd){
    	//	alert(1);
    	    angular.element(".disabfuncCUc1").attr("ui-sref","");
            angular.element(".disabfuncCUc1").attr("disabled","disabled");
            angular.element(".disabfuncCUc1").addClass(" btn btn-disabled");
            angular.element(".disabfuncCUc1").addClass("disabfuncCUcColor");
            angular.element(".disabfuncCUc1").click(function(ev) {
 		       ev.preventDefault();
 		   }); 
    	}
    	
    	if(!$scope.CreateSubzd){
    		//alert(2);
    	    angular.element(".disabfuncCUc2").attr("ui-sref","");
            angular.element(".disabfuncCUc2").attr("disabled","disabled");
            angular.element(".disabfuncCUc2").addClass(" btn btn-disabled");
            angular.element(".disabfuncCUc2").addClass("disabfuncCUcColor");
            angular.element(".disabfuncCUc2").click(function(ev) {
 		       ev.preventDefault();
 		   }); 
    	}
    	
    	if(!$scope.UpdateOrgzd){
    		//alert(3);
    	    angular.element(".disabfuncCUc3").attr("ui-sref","");
            angular.element(".disabfuncCUc3").attr("disabled","disabled");
            angular.element(".disabfuncCUc3").addClass(" btn btn-disabled");
            angular.element(".disabfuncCUc3").addClass("disabfuncCUcColor");
            angular.element(".disabfuncCUc3").click(function(ev) {
 		       ev.preventDefault();
 		   }); 
    	}
    	
    	if(!$scope.UpdateSubzd){
    	//	alert(4);
    	    angular.element(".disabfuncCUc4").attr("ui-sref","");
            angular.element(".disabfuncCUc4").attr("disabled","disabled");
            angular.element(".disabfuncCUc4").addClass(" btn btn-disabled");
            angular.element(".disabfuncCUc4").addClass("disabfuncCUcColor");
            angular.element(".disabfuncCUc4").click(function(ev) {
 		       ev.preventDefault();
 		   }); 
    	}

    	
        $scope.menu = {
            usecaserule :false,
            feedback : false,
            usecase:false,
            rule:false,
            uaman:false,
            organisation:true,
            subrolemenu:false,
            menu:true
        };
        angular.element("ul.submainlinks li").removeClass("subactive");
    };
    $scope.uamanagement = function(){
    	 $scope.managePermissionForUserAccount();
     	if(!$scope.CreateUserzd){
     		
     	//	alert(1);
     	  //  angular.element(".disabfuncCUc5").attr("ui-sref","");
             angular.element(".disabfuncCUc5").attr("disabled","disabled");
             angular.element(".disabfuncCUc5").addClass(" btn btn-disabled");
             angular.element(".disabfuncCUc5").addClass("disabfuncCUcColor");
             angular.element(".disabfuncCUc5").click(function(ev) {
  		       ev.preventDefault();
  		   }); 
     	}
     	
     	if(!$scope.UpdateUserzd){
     		//alert(2);
     	    angular.element(".disabfuncCUc6").attr("ui-sref","");
             angular.element(".disabfuncCUc6").attr("disabled","disabled");
             angular.element(".disabfuncCUc6").addClass(" btn btn-disabled");
             angular.element(".disabfuncCUc6").addClass("disabfuncCUcColor");
             angular.element(".disabfuncCUc6").click(function(ev) {
  		       ev.preventDefault();
  		   }); 
     	}
     	
     	if(!$scope.ViewUserzd){
     		//alert(2);
     	    angular.element(".disabfuncCUc7").attr("ui-sref","");
             angular.element(".disabfuncCUc7").attr("disabled","disabled");
             angular.element(".disabfuncCUc7").addClass(" btn btn-disabled");
             angular.element(".disabfuncCUc7").addClass("disabfuncCUcColor");
             angular.element(".disabfuncCUc7").click(function(ev) {
  		       ev.preventDefault();
  		   }); 
     	}
     	
    	
    	$scope.menu = {
                usecaserule :false,
                feedback : false,
                usecase:false,
                rule:false,
                uaman:true,
                organisation:false,
                subrolemenu:false,
                menu:true
            };
    	angular.element("ul.submainlinks li").removeClass("subactive");
    };
    $scope.roleMnu = function(){
    	 $scope.managePermissionForRole();
      	if(!$scope.CreateRolezd){
      		
      	//	alert(1);
      		  angular.element(".disabfuncCUc8").attr("ui-sref","");
              angular.element(".disabfuncCUc8").attr("disabled","disabled");
              angular.element(".disabfuncCUc8").addClass(" btn btn-disabled");
              angular.element(".disabfuncCUc8").addClass("disabfuncCUcColor");
              angular.element(".disabfuncCUc8").click(function(ev) {
   		       ev.preventDefault();
   		   }); 
      	}
      	
      	if(!$scope.UpdateRolezd){
      		//alert(2);
      	    angular.element(".disabfuncCUc9").attr("ui-sref","");
              angular.element(".disabfuncCUc9").attr("disabled","disabled");
              angular.element(".disabfuncCUc9").addClass(" btn btn-disabled");
              angular.element(".disabfuncCUc9").addClass("disabfuncCUcColor");
              angular.element(".disabfuncCUc9").click(function(ev) {
   		       ev.preventDefault();
   		   }); 
      	}
    	$scope.menu = {
                usecaserule :false,
                feedback : false,
                usecase:false,
                rule:false,
                uaman:false,
                organisation:false,
                subrolemenu:true,
                menu:true
            };
    	angular.element("ul.submainlinks li").removeClass("subactive");
    };
    
    
    
    $scope.updateruleReload = function(){
        $rootScope.$emit("updateruleReset", {});
    };
    
    $scope.updateusecaseReload = function(){
        $rootScope.$emit("updateusecaseReset", {});
    };
    
    $scope.uamanager = function(){
        $rootScope.$emit("uamanagerpage", {});
    };
    
    $scope.uaviewer = function(){
        $rootScope.$emit("uaviewerpage", {});
    };
    $scope.uaviewerMain = function(){
        $rootScope.$emit("uaviewerMainpage", {});
    };

    
  $scope.selection=[];
}
