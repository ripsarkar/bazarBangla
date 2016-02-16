//wrting the controller for viewuser page

app.controller("permissionsCtrl",["$scope","$http", "$rootScope", function($scope, $http,$rootScope){
          $scope.membertabOrga = true;

  $scope.$watch(function(){
      
      if($rootScope.tabName == "User"){
        $scope.membertabOrga = false;
      }
  });
  ///////////////////////////////////////////////////////////

      //$scope.dropshowhide = true;
      //$scope.fnSubsTab=function(){       
            
            $http.get($rootScope.url + '/getCompany').success(function(data) {
              $scope.companyListli = data.Company;            
            }).error(function(data, status, headers, config) {
                alert('Sorry Application error in serverside');
            });
           
        
     //};
  $rootScope.loadinganimation = true;

     //$scope.fnPopulateRoleList=function(){
            $http.get($rootScope.url + '/getpopulateRoleforLogin/'+localStorage.getItem("surrComprip")).success(function(data) {
              $scope.roleListli = data.Roles;             
              $rootScope.loadinganimation = false;
            }).error(function(data, status, headers, config) {                
                alert('Sorry Application error in serverside');
          });
           
        
   //  };
   
  
   
   
   
    $scope.expandAll = function (expanded) {
                // $scope is required here, hence the injection above, even though we're using "controller as" syntax
                $scope.$broadcast('onExpandAll', {expanded: expanded});
            };
///////////////////////////////////////////////////////////
	$rootScope.loadinganimation = true;
$http.get($rootScope.url + "/populateEPIndutry").success(function(result){
  $scope.usecInduLi = result.industry;
  $rootScope.loadinganimation = false;
}).error(function(err){
  $rootScope.loadinganimation = false;
});
$http.get($rootScope.url + "/populateRegCatDropDown").success(function(result){
  $scope.regcatlist = result.RegCat;
}).error(function(err){

});
///////////////////////////////////////////////////
$http.get($rootScope.url + "/getAllUseCaseList").success(function(result){
  $scope.alluselist = result.Usecases;
}).error(function(err){

});
$http.get($rootScope.url + "/getAllRulesList").success(function(result){
  $scope.allrulelist = result.Rules;
}).error(function(err){

});
var mm;
$scope.$watch(function(){
 mm = $scope.selectedroleList;
});
            //rolelist
            var Indtsyarray = [];
            var Indtsy = {};

            $scope.chckRoleList = function(){
              
            Indtsyarray = [];
            
            for (var i=0;i<$scope.selectedroleList.length-1;i++){
              if($scope.selectedroleList[i] == $scope.selectedroleList[$scope.selectedroleList.length-1]){
                $scope.selectedroleList.splice(-1);
              }
            }
            for (var j=0;j<$scope.selectedroleList.length;j++){

              Indtsy = {};
              Indtsy.surrId = $scope.selectedroleList[j];
              Indtsyarray.push(Indtsy);
            }
            postjson.PermissionFor.Role = Indtsyarray;

          }
////////////////////////////////////////////////////
 postjson = {
                  "PermissionFor": {
                    "ObjectType": $rootScope.tabName.toString(),
                    "ObjectValue": $rootScope.orgId.toString(),
                    "Role": [
                      /*{
                        "surrId": "9000"
                      }*/
                    ]
                  },
                  "PermissionTo": {
                    "Subscription": [
                      /*{
                        "operation": "create",
                        "objectval": "HSBC",
                        "filterType": "OrganizationName"
                      }*/
                    ],
                    "User": [],
                    "Organization": [],
                    "Role": [],
                    "UseCase": [
                      /*{
                        "operation": "create",
                        "objectval": "All",
                        "filterType": "All"
                      }*/
                    ],
                    "Rule": [
                      /*{
                        "operation": "create",
                        "objectval": "ISA",
                        "filterType": "RegCatName"
                      }*/
                    ]
                  }
                }

$scope.sendPermissions = function(){

//alert(JSON.stringify(postjson))
          var postdata = {
                  method : "POST",
                  url:$rootScope.url + "/createPermission",
                  data:JSON.stringify(postjson)
                }
                $http(postdata).success(function(result){
                  alert("Data saved for permission changes");
                }).error(function(err){
                  alert("Server side error");
                });

}


/*start for fetch update code */


//fetchPermissionsTemp/Subscription/825
//$scope.chcked=false;
$scope.fnFetchPermissions=function(id,name){
 //var read = {};
		  $http.get($rootScope.url + "/fetchPermissions/"+$scope.tabName+"/"+$scope.orgId).success(function(result){      

		            $scope.permissionJson = result;	 	  	
					angular.extend(postjson.PermissionTo.UseCase, result.PermissionTo.UseCase);					
					angular.extend(postjson.PermissionTo.Rule, result.PermissionTo.Rule);
					angular.extend(postjson.PermissionTo.Organization, result.PermissionTo.Organization);
					angular.extend(postjson.PermissionTo.Subscription, result.PermissionTo.Subscription);			
					angular.extend(postjson.PermissionTo.User, result.PermissionTo.User);
					angular.extend(postjson.PermissionTo.Role, result.PermissionTo.Role);
					
								
					
					
				//usercase Tab  - createusecase
					angular.forEach(document.querySelectorAll('.crtusecase'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {						             
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										  outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);
										  
										
										 
										 if(filterType == 'ALL'){											
											 $scope.disableCreate = true;
											 									 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableCreateAll=true													 
												
								          }
										
										
							  }
							  else{
								  
							  }
			  
						});
						
					});

					
					//usercase Tab  - readusecase
					angular.forEach(document.querySelectorAll('.readusecase'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {	
					       //alert(operation+"-----"+val.operation)
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                
										  outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);										
										
										if(filterType == 'ALL'){											
											 $scope.disableRead = true;
											 $scope.disableReadSpe= true;											 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableReadAll=true													 
													 $scope.disableReadSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableReadAll=true;													 
													 $scope.disableRead = true;
													
										 }
                                                												
											 
										
							  }
							  
			  
						});
						
					});
					//usercase Tab  - updateusecase
					angular.forEach(document.querySelectorAll('.updateusecase'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {	
					 //debugger;
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                       
										outer[0].setAttribute("checked", "checked");
										$scope.compile(outer[0]);	
										
										
										
										
										if(filterType == 'ALL'){											
											 $scope.disableUpdate = true;
											 $scope.disableUpdateSpe= true;											 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableUpdateAll=true													 
													 $scope.disableUpdateSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableUpdateAll=true;													 
													 $scope.disableUpdate = true;
													
										 }
										
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					//usercase Tab  - deleteusecase
					angular.forEach(document.querySelectorAll('.deleteusecase'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");
										$scope.compile(outer[0]);	
										
											
										if(filterType == 'ALL'){											
											 $scope.disableDelete = true;
											 $scope.disableDeleteSpe= true;											 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableDeleteAll=true													 
													 $scope.disableDeleteSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableDeleteAll=true;													 
													 $scope.disableDelete = true;
													
										 }
										
											
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					//usercase Tab  - exportusecase
					angular.forEach(document.querySelectorAll('.exportusecase'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {	
					 
								if (val.operation == operation && val.objectval==objectval && val.filterType==filterType) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");
										$scope.compile(outer[0]);										
										
										
										if(filterType == 'ALL'){											
											 $scope.disableExport = true;
											 $scope.disableExportSpe= true;											 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableExportAll=true													 
													 $scope.disableExportSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableExportAll=true;													 
													 $scope.disableExport = true;
													
										 }
										
										
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					
							
					/****************START Specific Use case*******************/
					
					//usercase Tab  - createusecase
					angular.forEach(document.querySelectorAll('.crtusecasesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {						             
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										  outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);
										  
										
										 
										 if(filterType == 'ALL'){											
											 $scope.disableCreate = true;
											 									 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableCreateAll=true													 
												
								          }
										
										
							  }
							  else{
								  
							  }
			  
						});
						
					});

					
					//usercase Tab  - readusecase
					angular.forEach(document.querySelectorAll('.readusecasesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {	
					       //alert(operation+"-----"+val.operation)
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                
										  outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);										
										
										if(filterType == 'ALL'){											
											 $scope.disableRead = true;
											 $scope.disableReadSpe= true;											 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableReadAll=true													 
													 $scope.disableReadSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableReadAll=true;													 
													 $scope.disableRead = true;
													
										 }
                                                												
											 
										
							  }
							  
			  
						});
						
					});
					//usercase Tab  - updateusecase
					angular.forEach(document.querySelectorAll('.updateusecasesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {	
					 //debugger;
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                       
										outer[0].setAttribute("checked", "checked");
										$scope.compile(outer[0]);	
										
										
										
										
										if(filterType == 'ALL'){											
											 $scope.disableUpdate = true;
											 $scope.disableUpdateSpe= true;											 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableUpdateAll=true													 
													 $scope.disableUpdateSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableUpdateAll=true;													 
													 $scope.disableUpdate = true;
													
										 }
										
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					//usercase Tab  - deleteusecase
					angular.forEach(document.querySelectorAll('.deleteusecasesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");
										$scope.compile(outer[0]);	
										
											
										if(filterType == 'ALL'){											
											 $scope.disableDelete = true;
											 $scope.disableDeleteSpe= true;											 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableDeleteAll=true													 
													 $scope.disableDeleteSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableDeleteAll=true;													 
													 $scope.disableDelete = true;
													
										 }
										
											
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					//usercase Tab  - exportusecase
					angular.forEach(document.querySelectorAll('.exportusecasesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.UseCase, function(val,key) {	
					 
								if (val.operation == operation && val.objectval==objectval && val.filterType==filterType) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");
										$scope.compile(outer[0]);										
										
										
										if(filterType == 'ALL'){											
											 $scope.disableExport = true;
											 $scope.disableExportSpe= true;											 
										 } 
									   if(filterType == 'IndustryName')
										 {
                                              	     $scope.disableExportAll=true													 
													 $scope.disableExportSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableExportAll=true;													 
													 $scope.disableExport = true;
													
										 }
										
										
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
							
					/****************END Specific Use case*******************/
					
					
					
					
					//alert(JSON.stringify(result))
					
					//Rule Tab  - create-rule
					angular.forEach(document.querySelectorAll('.ctrrule'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (val.operation == operation && val.objectval==objectval ) {	
                                        
										outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);						
										  
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - readrule
					angular.forEach(document.querySelectorAll('.readrule'), function(value, key) {
							
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
					    var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					   
					            //alert(operation +"=="+ val.operation +"&&"+ objectval+"=="+val.objectval)
								if (operation == val.operation && objectval==val.objectval) {	
                                     	
										outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);										
										
										
										if(filterType == 'ALL'){											
											 $scope.disableReadRule = true;
											 $scope.disableReadRuleSpe= true;											 
										 } 
									   if(filterType == 'RegCatName')
										 {
                                              	     $scope.disableReadRuleAll=true													 
													 $scope.disableReadRuleSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableReadRuleAll=true;													 
													 $scope.disableReadRule = true;
													
										 }
										/// break; 
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - updaterule
					angular.forEach(document.querySelectorAll('.updaterule'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						 var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval== val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);		
										  
										if(filterType == 'ALL'){											
											 $scope.disableUpdateRule = true;
											 $scope.disableUpdateRuleSpe= true;											 
										 } 
									   if(filterType == 'RegCatName')
										 {
                                              	     $scope.disableUpdateRuleAll=true													 
													 $scope.disableUpdateRuleSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableUpdateRuleAll=true;													 
													 $scope.disableUpdateRule = true;
													
										 }
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - deleterule
					angular.forEach(document.querySelectorAll('.deleterule'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						 var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);										
										
										if(filterType == 'ALL'){											
											 $scope.disableDeleteRule = true;
											 $scope.disableDeleteRuleSpe= true;											 
										 } 
									   if(filterType == 'RegCatName')
										 {
                                              	     $scope.disableDeleteRuleAll=true													 
													 $scope.disableDeleteRuleSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableDeleteRuleAll=true;													 
													 $scope.disableDeleteRule = true;
													
										 }
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - exportrule
					angular.forEach(document.querySelectorAll('.exportrule'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
					    var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										 outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);		
										  
										if(filterType == 'ALL'){											
											 $scope.disableExportRule = true;
											 $scope.disableExportRuleSpe= true;											 
										 } 
									   if(filterType == 'RegCatName')
										 {
                                              	     $scope.disableExportRuleSpe=true													 
													 $scope.disableExportRuleSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableExportRuleAll=true;													 
													 $scope.disableExportRule = true;
													
										 }
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					
					
					/****************Specific Rules*******************/
					
					//Rule Tab  - create-rule
					angular.forEach(document.querySelectorAll('.ctrrulesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (val.operation == operation && val.objectval==objectval ) {	
                                        
										outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);						
										  
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - readrule
					angular.forEach(document.querySelectorAll('.readrulesp'), function(value, key) {
							
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
					    var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					   
					            //alert(operation +"=="+ val.operation +"&&"+ objectval+"=="+val.objectval)
								if (operation == val.operation && objectval==val.objectval) {	
                                     	
										outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);										
										
										
										if(filterType == 'ALL'){											
											 $scope.disableReadRule = true;
											 $scope.disableReadRuleSpe= true;											 
										 } 
									   if(filterType == 'RegCatName')
										 {
                                              	     $scope.disableReadRuleAll=true													 
													 $scope.disableReadRuleSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableReadRuleAll=true;													 
													 $scope.disableReadRule = true;
													
										 }
										/// break; 
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - updaterule
					angular.forEach(document.querySelectorAll('.updaterulesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						 var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval== val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);		
										  
										if(filterType == 'ALL'){											
											 $scope.disableUpdateRule = true;
											 $scope.disableUpdateRuleSpe= true;											 
										 } 
									   if(filterType == 'RegCatName')
										 {
                                              	     $scope.disableUpdateRuleAll=true													 
													 $scope.disableUpdateRuleSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableUpdateRuleAll=true;													 
													 $scope.disableUpdateRule = true;
													
										 }
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - deleterule
					angular.forEach(document.querySelectorAll('.deleterulesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						 var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);										
										
										if(filterType == 'ALL'){											
											 $scope.disableDeleteRule = true;
											 $scope.disableDeleteRuleSpe= true;											 
										 } 
									   if(filterType == 'RegCatName')
										 {
                                              	     $scope.disableDeleteRuleAll=true													 
													 $scope.disableDeleteRuleSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableDeleteRuleAll=true;													 
													 $scope.disableDeleteRule = true;
													
										 }
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - exportrule
					angular.forEach(document.querySelectorAll('.exportrulesp'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
					    var filterType=outer[0].attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										 outer[0].setAttribute("checked", "checked");																		 
                                          $scope.compile(outer[0]);		
										  
										if(filterType == 'ALL'){											
											 $scope.disableExportRule = true;
											 $scope.disableExportRuleSpe= true;											 
										 } 
									   if(filterType == 'RegCatName')
										 {
                                              	     $scope.disableExportRuleSpe=true													 
													 $scope.disableExportRuleSpe= true;
								          }
										if(filterType == 'id')
										  {
													 $scope.disableExportRuleAll=true;													 
													 $scope.disableExportRule = true;
													
										 }
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					
					/*********************************/
					
					
					
					
					
					//Subscription Tab  - Create
					angular.forEach(document.querySelectorAll('.createsubs'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Subscription, function(val,key) {	
					 
								if (operation == val.operation && objectval== val.objectval) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");
                                          $scope.compile(outer[0]);										
										if(objectval =='ALL'){
											
											
											$scope.disableCreateSub=true;
										}
										else{
												$scope.disableCreateSubAll=true;
												
											
										}
										
							  }
							  else{
								
							  }
			  
						});
						
					});

					
					
					//Subscription Tab  - Read
					angular.forEach(document.querySelectorAll('.readsubs'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Subscription, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");	
                                          $scope.compile(outer[0]);										
										
										if(objectval =='ALL'){
											
											
											$scope.disableReadSub=true;
										}
										else{
												$scope.disableReadSubAll=true;
												
											
										}
							  }
							 
			  
						});
						
					});
					
					
					//Subscription Tab  - Update
					angular.forEach(document.querySelectorAll('.updatesubs'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Subscription, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");	
                                          $scope.compile(outer[0]);										
										if(objectval =='ALL'){
											
											
											$scope.disableUpdateSub=true;
										}
										else{
												$scope.disableUpdateSubAll=true;
												
											
										}
										
							  }
							 
			  
						});
						
					});
					
					//Subscription Tab  - Delete
					angular.forEach(document.querySelectorAll('.deletesubs'), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Subscription, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                        //alert("if")	
										outer[0].setAttribute("checked", "checked");	
                                          $scope.compile(outer[0]);										
										if(objectval =='ALL'){
											
											
											$scope.disableDeleteSub=true;
										}
										else{
												$scope.disableDeleteSubAll=true;
												
											
										}
										
							  }
							 
			  
						});
						
					});
					
					
					
				//Organization Tab  - create
			      angular.forEach(document.querySelectorAll('.createorg'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										//debugger;
										
										
							  }
							  else{
								 
							  }
			  
						});
						
					});
		  
		 
		 
		          //Organization Tab  - Read
			      angular.forEach(document.querySelectorAll('.readorg'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										//debugger;
										if(objectval =='ALL'){
											
											
											$scope.disableReadOrg=true;
										}
										else{
												$scope.disableReadOrgAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
					   //Organization Tab  - Update
			      angular.forEach(document.querySelectorAll('.updateorg'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval== val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										//debugger;
										if(objectval =='ALL'){
											
											
											$scope.disableUpdateOrg=true;
										}
										else{
												$scope.disableUpdateOrgAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
					
					//Organization Tab  - delete
			         angular.forEach(document.querySelectorAll('.deleteorg'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										//debugger;
										if(objectval =='ALL'){
											
											
											$scope.disableDeleteOrg=true;
										}
										else{
												$scope.disableDeleteOrgAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					//Organization Tab  - Member
			         angular.forEach(document.querySelectorAll('.memberorg'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										//debugger;
										if(objectval =='ALL'){
											
											
											$scope.disableMemberOrg=true;
										}
										else{
												$scope.disableMemberOrgAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
					//user Tab  - createuser
			         angular.forEach(document.querySelectorAll('.createuser'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.User, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										//debugger;
										
										if(objectval =='ALL'){
											
											
											$scope.disableCreateUser=true;
										}
										else{
												$scope.disableCreateUserAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
					//user Tab  - readuser
			         angular.forEach(document.querySelectorAll('.readuser'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.User, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										//debugger;
										if(objectval =='ALL'){
											
											
											$scope.disableReadUser=true;
										}
										else{
												$scope.disableReadUserAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
					//user Tab  - updateuser
			         angular.forEach(document.querySelectorAll('.updateuser'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.User, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
									
										if(objectval =='ALL'){
											
											
											$scope.disableUpdateUser=true;
										}
										else{
												$scope.disableUpdateUserAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
						//user Tab  - deleteuser
			         angular.forEach(document.querySelectorAll('.deleteuser'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.User, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										//debugger;
										if(objectval =='ALL'){
											
											
											$scope.disableDeleteUser=true;
										}
										else{
												$scope.disableDeleteUserAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
						//Role Tab  - createrole
			         angular.forEach(document.querySelectorAll('.createrole'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Role, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										if(objectval =='ALL'){
											
											
											$scope.disableCreateRole=true;
										}
										else{
												$scope.disableCreateRoleAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					//Role Tab  - readrole
			         angular.forEach(document.querySelectorAll('.readrole'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Role, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										if(val.objectval =='ALL'){
											
											
											$scope.disableReadRole=true;
										}
										else{
												$scope.disableReadRoleAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
					//Role Tab  - updaterole
			         angular.forEach(document.querySelectorAll('.updaterole'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Role, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										if(objectval =='ALL'){
											
											
											$scope.disableUpdateRole=true;
										}
										else{
												$scope.disableUpdateRoleAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
						//Role Tab  - deleterole
			         angular.forEach(document.querySelectorAll('.deleterole'), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= outer[0].attributes['data-objectval'].value;
						var operation= outer[0].attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Role, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										outer[0].setAttribute("checked", "checked");
                                        $scope.compile(outer[0]);
										if(objectval =='ALL'){
											
											
											$scope.disableDeleteRole=true;
										}
										else{
												$scope.disableDeleteRoleAll=true;
												
											
										}
							  }
							  else{
								 
							  }
			  
						});
						
					});
					
					
		  
		}).error(function(err){
			alert("Server side error");
			
	     });
	
	
};
  
$scope.compile=function (element){
	
  var el = angular.element(element);    
  $scope1 = el.scope();
    $injector = el.injector();
    $injector.invoke(function($compile){
       $compile(el)($scope1)
	   //alert("comp")
    })     
}


//$scope.fnFetchPermissions($rootScope.tabName,$rootScope.orgId);

/*end for fetch update code*/

///////////////////////////Usecase/////////////////////////////
var readSubscription = [];
$scope.creaindAll = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
        $scope.disableCreate = true;
        //$scope.disableCreateSpe = true;
        readSubscription.push(read);
     // postjson.PermissionTo.UseCase = readSubscription;
        postjson.PermissionTo.UseCase.push(read);
    }
    else{
        $scope.disableCreate = false;
        //$scope.disableCreateSpe = false;
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == "ALL")
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.readindAll = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
        $scope.disableRead = true;
        $scope.disableReadSpe = true;

      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	    postjson.PermissionTo.UseCase.push(read);
    }
    else{
        $scope.disableRead = false;
        $scope.disableReadSpe = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == "ALL")
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.updaindAll = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableUpdate = true;
              $scope.disableUpdateSpe = true;

      readSubscription.push(read);
     // postjson.PermissionTo.UseCase = readSubscription;
	    postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableUpdate = false;
              $scope.disableUpdateSpe = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == "ALL")
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindAll = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableDelete = true;
              $scope.disableDeleteSpe = true;
      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	    postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableDelete = false;
              $scope.disableDeleteSpe = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == "ALL")
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.expoindAll = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableExport = true;
              $scope.disableExportSpe = true;

      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	  postjson.PermissionTo.UseCase.push(read);
    }
    else{              
              $scope.disableExport = false;
              $scope.disableExportSpe = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == "ALL")
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
      console.log(postjson);
}
$scope.createind = function($event){
	//alert("usecreate");
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "IndustryName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableCreateAll = true;
              //$scope.disableCreateSpe = true;

      readSubscription.push(read);
	 	
      //postjson.PermissionTo.UseCase = readSubscription;
	//angular.extend(postjson.PermissionTo.UseCase, read);
	  postjson.PermissionTo.UseCase.push(read);
	  
    }
    else{
              $scope.disableCreateAll = false;
              //$scope.disableCreateSpe = false;
//alert(angular.element($event.currentTarget).parent().prev().text())
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
			  
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }

  console.log(postjson);

}
$scope.readind = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "IndustryName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableReadAll = true;
              $scope.disableReadSpe = true;

      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	    postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableReadAll = false;
              $scope.disableReadSpe = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }

  console.log(postjson);

}
$scope.updaind = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().text();
  read.filterType = "IndustryName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableUpdateAll = true;
              $scope.disableUpdateSpe = true;

      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	    postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableUpdateAll = false;
              $scope.disableUpdateSpe = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleind = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().text();
  read.filterType = "IndustryName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableDeleteAll = true;
              $scope.disableDeleteSpe = true;

      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	    postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableDeleteAll = false;
              $scope.disableDeleteSpe = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.expoind = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text();
  read.filterType = "IndustryName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableExportAll = true;
              $scope.disableExportSpe = true;

      readSubscription.push(read);
     // postjson.PermissionTo.UseCase = readSubscription;
	 postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableExportAll = false;
              $scope.disableExportSpe = false;
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
/*$scope.createindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableCreateAll = true;
              $scope.disableCreate = true;
      readSubscription.push(read);
     // postjson.PermissionTo.UseCase = readSubscription;
	 postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableCreateAll = false;
              $scope.disableCreate = false;
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }

  console.log(postjson);

}*/
$scope.readindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableReadAll = true;
              $scope.disableRead = true;

      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	  postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableReadAll = false;
              $scope.disableRead = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }

  console.log(postjson);

}
$scope.updaindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableUpdateAll = true;
              $scope.disableUpdate = true;

      readSubscription.push(read);
     // postjson.PermissionTo.UseCase = readSubscription;
	 postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableUpdateAll = false;
              $scope.disableUpdate = false;
              

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableDeleteAll = true;
              $scope.disableDelete = true;

      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	  postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableDeleteAll = false;
              $scope.disableDelete = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.expoindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableExportAll = true;
              $scope.disableExport = true;

      readSubscription.push(read);
      //postjson.PermissionTo.UseCase = readSubscription;
	  postjson.PermissionTo.UseCase.push(read);
    }
    else{
              $scope.disableExportAll = false;
              $scope.disableExport = false;

        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
///////////////////////////////////////////////////////////
////////////////////////////RULE////////////////////////////
var readRule = [];

$scope.creaindAllRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";

    if(angular.element($event.currentTarget).is(':checked') == true){
      //$scope.disableCreateRule = true;
      //$scope.disableCreateRuleSpe = true;
			  //alert("pop")
      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      //$scope.disableCreateRule = false;
      //$scope.disableCreateRuleSpe = false;

        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == "ALL")
          {
 
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.readindAllRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadRule = true;
      $scope.disableReadRuleSpe = true;

      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableReadRule = false;
      $scope.disableReadRuleSpe = false;

        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == "ALL")
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.updaindAllRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateRule = true;
      $scope.disableUpdateRuleSpe = true;

      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableUpdateRule = false;
      $scope.disableUpdateRuleSpe = false;

        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == "ALL")
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindAllRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteRule = true;
      $scope.disableDeleteRuleSpe = true;

      readRule.push(read);
     // postjson.PermissionTo.Rule = readRule;
	 postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableDeleteRule = false;
      $scope.disableDeleteRuleSpe = false;

        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == "ALL")
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.expoindAllRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableExportRule = true;
      $scope.disableExportRuleSpe = true;

      readRule.push(read);
     // postjson.PermissionTo.Rule = readRule;
	 postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableExportRule = false;
      $scope.disableExportRuleSpe = false;

        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == "ALL")
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
/*$scope.createindRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "RegCatName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateRuleAll = true;
      //$scope.disableCreateRuleSpe = true;

      readRule.push(read);
     // postjson.PermissionTo.Rule = readRule;
	 postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableCreateRuleAll = false;
      //$scope.disableCreateRuleSpe = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}*/
$scope.readindRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "RegCatName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadRuleAll = true;
      $scope.disableReadRuleSpe = true;
      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableReadRuleAll = false;
      $scope.disableReadRuleSpe = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.updaindRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().text();
  read.filterType = "RegCatName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateRuleAll = true;
      $scope.disableUpdateRuleSpe = true;
      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableUpdateRuleAll = false;
      $scope.disableUpdateRuleSpe = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().text();
  read.filterType = "RegCatName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteRuleAll = true;
      $scope.disableDeleteRuleSpe = true;
      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableDeleteRuleAll = false;
      $scope.disableDeleteRuleSpe = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.expoindRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text();
  read.filterType = "RegCatName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableExportRuleAll = true;
      $scope.disableExportRuleSpe = true;

      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableExportRuleAll = false;
      $scope.disableExportRuleSpe = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
/*$scope.createindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateRuleAll = true;
      //$scope.disableCreateRule = true;

      readRule.push(read);
     // postjson.PermissionTo.Rule = readRule;
	 postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableCreateRuleAll = false;
      //$scope.disableCreateRule = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}*/
$scope.readindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadRuleAll = true;
      $scope.disableReadRule = true;
      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableReadRuleAll = false;
      $scope.disableReadRule = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.updaindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateRuleAll = true;
      $scope.disableUpdateRule = true;
      readRule.push(read);
     // postjson.PermissionTo.Rule = readRule;
	 postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableUpdateRuleAll = false;
      $scope.disableUpdateRule = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteRuleAll = true;
      $scope.disableDeleteRule = true;
      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableDeleteRuleAll = false;
      $scope.disableDeleteRule = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.expoindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableExportRuleAll = true;
      $scope.disableExportRule = true;
      readRule.push(read);
      //postjson.PermissionTo.Rule = readRule;
	  postjson.PermissionTo.Rule.push(read);
    }
    else{
      $scope.disableExportRuleAll = false;
      $scope.disableExportRule = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
///////////////////////////////////////////////////////////
////////////////////////////ORG////////////////////////////
var readOrg = [];
$scope.creaindAllOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      //$scope.disableCreateOrg=true;
  readOrg.push(read);
  //postjson.PermissionTo.Organization = readOrg;
   postjson.PermissionTo.Organization.push(read);
    }
    else{
            //$scope.disableCreateOrg=false;

        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == "ALL")
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.readindAllOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadOrg = true;
  readOrg.push(read);
  //postjson.PermissionTo.Organization = readOrg;
   postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableReadOrg = false;
        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == "ALL")
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.updaindAllOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateOrg = true;
  readOrg.push(read);
 // postjson.PermissionTo.Organization = readOrg;
  postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableUpdateOrg = false;
        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == "ALL")
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindAllOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteOrg = true;
  readOrg.push(read);
  //postjson.PermissionTo.Organization = readOrg;
   postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableDeleteOrg = false;

        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == "ALL")
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.membindAllOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableMemberOrg = true;

  readOrg.push(read);
  //postjson.PermissionTo.Organization = readOrg;
   postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableMemberOrg = false;
        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == "ALL")
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
      console.log(postjson);

}
/*$scope.createindOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateOrgAll=true;

    readOrg.push(read);
    //postjson.PermissionTo.Organization = readOrg;
	 postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableCreateOrgAll=false;

        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}*/
$scope.readindOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadOrgAll=true;

    readOrg.push(read);
    //postjson.PermissionTo.Organization = readOrg;
	 postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableReadOrgAll=false;

        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.updaindOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateOrgAll=true;

    readOrg.push(read);
    //postjson.PermissionTo.Organization = readOrg;
	 postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableUpdateOrgAll=false;

        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteOrgAll=true;

    readOrg.push(read);
    //postjson.PermissionTo.Organization = readOrg;
	 postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableDeleteOrgAll=false;

        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.membindOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableMemberOrgAll=true;

    readOrg.push(read);
   // postjson.PermissionTo.Organization = readOrg;
    postjson.PermissionTo.Organization.push(read);
    }
    else{
      $scope.disableMemberOrgAll=false;

        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
///////////////////////////////////////////////////////////
////////////////////////////Subscr////////////////////////////
var readSub = [];
$scope.creaindAllSub = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateSub = true;
  readSub.push(read);
  //postjson.PermissionTo.Subscription = readSub;
   postjson.PermissionTo.Subscription.push(read);
    }
    else{
            $scope.disableCreateSub = false;

        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == "ALL")
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.readindAllSub = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadSub=true;
  readSub.push(read);
 // postjson.PermissionTo.Subscription = readSub;
   postjson.PermissionTo.Subscription.push(read);
    }
    else{
      $scope.disableReadSub=false;
        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == "ALL")
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.updaindAllSub = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateSub=true;
  readSub.push(read);
  //postjson.PermissionTo.Subscription = readSub;
    postjson.PermissionTo.Subscription.push(read);
    }
    else{
      $scope.disableUpdateSub=false;
        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == "ALL")
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindAllSub = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteSub=true;
  readSub.push(read);
 // postjson.PermissionTo.Subscription = readSub;
   postjson.PermissionTo.Subscription.push(read);
    }
    else{
      $scope.disableDeleteSub=false;
        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == "ALL")
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.createindSub = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "OrganizationName";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableCreateSubAll=true;

    readSub.push(read);
    //postjson.PermissionTo.Subscription = readSub;
	  postjson.PermissionTo.Subscription.push(read);
    }
    else{
            $scope.disableCreateSubAll=false;

        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.readindSub = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "OrganizationName";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableReadSubAll=true;

    readSub.push(read);
    //postjson.PermissionTo.Subscription = readSub;
	  postjson.PermissionTo.Subscription.push(read);
    }
    else{
            $scope.disableReadSubAll=false;

        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.updaindSub = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().text();
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableUpdateSubAll=true;

    readSub.push(read);
    //postjson.PermissionTo.Subscription = readSub;
	  postjson.PermissionTo.Subscription.push(read);
    }
    else{
            $scope.disableUpdateSubAll=false;

        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindSub = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().text();
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableDeleteSubAll=true;

    readSub.push(read);
    //postjson.PermissionTo.Subscription = readSub;
	  postjson.PermissionTo.Subscription.push(read);
    }
    else{
            $scope.disableDeleteSubAll=false;

        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}

///////////////////////////////////////////////////////////
////////////////////////////User////////////////////////////
var readUser = [];
$scope.creaindAllUser = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateUser=true;
  readUser.push(read);
  //postjson.PermissionTo.User = readUser;
    postjson.PermissionTo.User.push(read);
    }
    else{
            $scope.disableCreateUser=false;

        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == "ALL")
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.readindAllUser = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadUser=true;
  readUser.push(read);
  //postjson.PermissionTo.User = readUser;
   postjson.PermissionTo.User.push(read);
    }
    else{
      $scope.disableReadUser=false;
        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == "ALL")
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.updaindAllUser = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateUser=true;
  readUser.push(read);
  
  //postjson.PermissionTo.User = readUser;
   postjson.PermissionTo.User.push(read);
    }
    else{
      $scope.disableUpdateUser=false;
        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == "ALL")
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindAllUser = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteUser=true;
  readUser.push(read);
  //postjson.PermissionTo.User = readUser;
   postjson.PermissionTo.User.push(read);
    }
    else{
      $scope.disableDeleteUser=false;
        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == "ALL")
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.createindUser = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "OrganizationName";
  if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableCreateUserAll=true;

  readUser.push(read);
  //postjson.PermissionTo.User = readUser;
   postjson.PermissionTo.User.push(read);
    }
    else{
            $scope.disableCreateUserAll=false;

        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.readindUser = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "OrganizationName";
  if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableReadUserAll=true;

  readUser.push(read);
  //postjson.PermissionTo.User = readUser;
   postjson.PermissionTo.User.push(read);
    }
    else{
            $scope.disableReadUserAll=false;

        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.updaindUser = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().text();
  read.filterType = "OrganizationName";
  if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableUpdateUserAll=true;

  readUser.push(read);
  //postjson.PermissionTo.User = readUser;
   postjson.PermissionTo.User.push(read);
    }
    else{
            $scope.disableUpdateUserAll=false;

        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindUser = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().text();
  read.filterType = "OrganizationName";
//push and pop data
  if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableDeleteUserAll=true;

  readUser.push(read);
 // postjson.PermissionTo.User = readUser;
  postjson.PermissionTo.User.push(read);
    }
    else{
            $scope.disableDeleteUserAll=false;

        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}

///////////////////////////////////////////////////////////
////////////////////////////Role////////////////////////////
var readRole = [];
$scope.creaindAllRole = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateRole=true;
  readRole.push(read);
  //postjson.PermissionTo.Role = readRole;
   postjson.PermissionTo.Role.push(read);
    }
    else{
      $scope.disableCreateRole=false;
        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == "ALL")
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.readindAllRole = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadRole=true;
  readRole.push(read);
  //postjson.PermissionTo.Role = readRole;
   postjson.PermissionTo.Role.push(read);
    }
    else{
      $scope.disableReadRole=false;
        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == "ALL")
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
  
}
$scope.updaindAllRole = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateRole=true;
  readRole.push(read);
  //postjson.PermissionTo.Role = readRole;
   postjson.PermissionTo.Role.push(read);
    }
    else{
      $scope.disableUpdateRole=false;
        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == "ALL")
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindAllRole = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "OrganizationName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteRole=true;
  readRole.push(read);
  //postjson.PermissionTo.Role = readRole;
   postjson.PermissionTo.Role.push(read);
    }
    else{
      $scope.disableDeleteRole=false;
        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == "ALL")
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.createindRole = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "OrganizationName";
//push and pop data
  if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableCreateRoleAll=true;

  readRole.push(read);
  //postjson.PermissionTo.Role = readRole;
   postjson.PermissionTo.Role.push(read);
  }
    else{
            $scope.disableCreateRoleAll=false;

        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.readindRole = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "OrganizationName";
//push and pop data
  if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableReadRoleAll=true;

  readRole.push(read);
  //postjson.PermissionTo.Role = readRole;
   postjson.PermissionTo.Role.push(read);
    }
    else{
            $scope.disableReadRoleAll=false;

        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.updaindRole = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().text();
  read.filterType = "OrganizationName";
//push and pop data
  if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableUpdateRoleAll=true;

  readRole.push(read);
  //postjson.PermissionTo.Role = readRole;
   postjson.PermissionTo.Role.push(read);
    }
    else{
            $scope.disableUpdateRoleAll=false;

        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}
$scope.deleindRole = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().text();
  read.filterType = "OrganizationName";
//push and pop data
  if(angular.element($event.currentTarget).is(':checked') == true){
            $scope.disableDeleteRoleAll=true;

  readRole.push(read);
  //postjson.PermissionTo.Role = readRole;
   postjson.PermissionTo.Role.push(read);
    }
    else{
            $scope.disableDeleteRoleAll=false;

        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);
}

///////////////////////////////////////////////////////////
}])
 .directive('expand', function () {
            return {
                restrict: 'A',
                controller: ['$scope', function ($scope) {
                    $scope.$on('onExpandAll', function (event, args) {
                        $scope.expanded = args.expanded;
                    });
                }]
            };
        })
    
.directive('showtab',
    function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {

                    $(element).tab('show');
          
                });
            }
        };
    });



    
    
