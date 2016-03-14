app.controller("updateOrgCtrl",["$scope","$http", "$rootScope", function($scope, $http,$rootScope){
	
		  $rootScope.currentUserOrg = 'html/viewsubscription.html';
		  
		  
		  $scope.fnOpenPermission=function(id,name,tabname){
		     $rootScope.orgId=id;
	         $rootScope.OrgName=name;
			 $rootScope.tabName=tabname;
			 $rootScope.currentUserOrg = 'html/permissions.html';
		   
	  }
	
}]);
app.controller("updateRoleCtrl",["$scope","$http", "$rootScope", function($scope, $http,$rootScope){
	
		  $rootScope.currentUserOrg = 'html/updaterole.html';
		  
		  
		  $scope.fnOpenPermission=function(id,name,tabname){
		     $rootScope.orgId=id;
	         $rootScope.OrgName=name;
			 $rootScope.tabName=tabname;
			 $rootScope.currentUserOrg = 'html/permissions.html';
		   
	  }
	
}]);
