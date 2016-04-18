//wrting the controller for viewuser page
app.controller("viewUserController",["$scope","ViewUserService", "$rootScope", function($scope, ViewUserService, $rootScope){
	
	// code for extend user expiration
	/*$scope.extendUser = function(email){
		$rootScope.loadinganimation = true;
		$http.get($rootScope.url+"/extendUser/"+email).success(function(result){
		$rootScope.loadinganimation = false;
			alert("User Account extended for 30 more days");
		}).error(function(result){

		})
	}
	var expirelist = "notpresent";
	$scope.activeUser = function(email){
		$rootScope.loadinganimation = true;
		if($scope.Expiring){
			expirelist = "present";
		}
		$http.get($rootScope.url+"/activateUser/"+email).success(function(result){
		
		ViewUserService.getUserDetails($scope.selectedCompany.SurrId+"/"+expirelist).then(function(resultname)
				{
							$rootScope.loadinganimation = false;

					$scope.userList = resultname.Users;					
				});

		}).error(function(result){
			
		})
	}*/
	
	//////////////////////////////////

	
	$scope.industryName = "";
	$scope.contractId = "";
	
    /*back botton*/
//    $scope.backbtnusermanager = function(){
//        if(typeof $rootScope.backcmplist != 'undefined' && $rootScope.backcmplist !=""){
//        ViewUserService.getUserDetails($rootScope.backcmplist).then(function(resultname)
//                {
//                    $scope.userList = resultname.Users;
//                    $scope.selectedCompany = {
//                        id :$rootScope.backcmplist
//                    };
//                    $scope.getDetails();
//                    $rootScope.backcmplist="";
//                });
//        }
//    }
    
	var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
	if(obj.Users.User !=undefined){

		var permissiontypeList = obj.Users.User.PermissionTypeDet;
		for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
			 if(permissiontypeList[int2].PermissionName=="update"){
				 $scope.companyList=permissiontypeList[int2].ObjectList;
				// $scope.backbtnusermanager();
			}
		}
	
	}
	
	
	
//		ViewUserService.getCompanyName().success(function(resultname)
//				{		 
//					$rootScope.loadinganimation=false;	
//					$scope.companyList = resultname.Company;
//                    $scope.backbtnusermanager();
//				}).error(function (error) {
//       	         //error
//			  		alert("There is some problem as reported by the backend. Please contact the administrator");
//			  		$rootScope.loadinganimation=false;
//			  	})

	
	$scope.getDetails=function(){
		ViewUserService.getCompDetails($scope.selectedCompany.SurrId).then(function(resultname)
				{
					$scope.industryName = resultname.industryName;
					$scope.contractId = resultname.contractId;
				});
	}
	
	/*-----------------search function starts-----------------*/
	$scope.userList=[];
	$scope.clickme=function(){
		
		ViewUserService.getUserDetails($scope.selectedCompany.SurrId).then(function(resultname)
				{
					$scope.userList = resultname.Users;					
				});

    }
    
	/*-----------------/search function ends-----------------*/
	
	//red green dot styling
	$scope.$watch(function (){
		angular.element(".activeprev").each(function() {
		 if(angular.element(this).text()=="N"){
			angular.element(this).addClass(" activeiconred");
			}
		else{
				angular.element(this).addClass(" activeicongreen");
			} 
		});
	});
	//
	
}]);
    	    
//wrting the services for viewuser page


    app.service('ViewUserService', ['$http','$rootScope',
    	        function ($http, $rootScope) {
    	     
    	        
    	        this.getCompanyName= function (data) {
       	         var promisename = $http.get($rootScope.url+'/getCompany') .success(function(responsename) {
       	         return responsename.data;
       	       	}).error(function (error) {
       	         //error
       	       		alert("Internal server error");
       	     	})
       	     	return promisename;
       	    	}
        	       	        

    	        this.getCompDetails= function (data) {
          	         var promisename = $http.get($rootScope.url+'/getCompanyDetails/'+data) .then(function(responsename) {
          	         return responsename.data;
          	       	}, function (error) {
          	         //error
          	       	alert("Internal server error");
          	     	})
          	     	return promisename;
          	    	}

    	        
    	        this.getUserDetails= function (data) {
         	         var promisename = $http.get($rootScope.url+'/viewUser/'+data) .then(function(responsename) {
         	         return responsename.data;
         	       	}, function (error) {
         	         //error
         	       	alert("Internal server error");
         	     	})
         	     	return promisename;
         	    	}

    	     }
    ]);

    
    
