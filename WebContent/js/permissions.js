//wrting the controller for viewuser page

app.controller("permissionsCtrl",["$scope","$http", "$rootScope","$q","$timeout", function($scope, $http,$rootScope,$q,$timeout){
          $scope.membertabOrga = true;

  $scope.$watch(function(){
      
      if($rootScope.tabName == "User"){
        $scope.membertabOrga = false;
      }
  });
  ///////////////////////////////////////////////////////////

      //$scope.dropshowhide = true;
      //$scope.fnSubsTab=function(){       
            
             var promise1=  $http.get($rootScope.url + '/getCompany').success(function(data) {
              $scope.companyListli = data.Company;            
            }).error(function(data, status, headers, config) {
                alert('Sorry Application error in serverside');
            });
           
        
     //};
  $rootScope.loadinganimation = true;

     //$scope.fnPopulateRoleList=function(){
          var promise5= $http.get($rootScope.url + '/getpopulateRoleforLogin/'+$rootScope.orgId).success(function(data) {
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
var promise2= $http.get($rootScope.url + "/populateEPIndutry").success(function(result){
  $scope.usecInduLi = result.industry;
  $rootScope.loadinganimation = false;
}).error(function(err){
  $rootScope.loadinganimation = false;
  alert('Sorry Application error in serverside');
});
$http.get($rootScope.url + "/populateRegCatDropDown").success(function(result){
  $scope.regcatlist = result.RegCat;
}).error(function(err){
    alert('Sorry Application error in serverside');
});
///////////////////////////////////////////////////
var promise3= $http.get($rootScope.url + "/getAllUseCaseList").success(function(result){
  $scope.alluselist = result.Usecases;
}).error(function(err){
    alert('Sorry Application error in serverside');
});
var promise4=$http.get($rootScope.url + "/getAllRulesList").success(function(result){
  $scope.allrulelist = result.Rules;
}).error(function(err){
    alert('Sorry Application error in serverside');
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
    $rootScope.loadinganimation = true;

//alert(JSON.stringify(postjson))
          var postdata = {
                  method : "POST",
                  url:$rootScope.url + "/createPermission",
                  data:JSON.stringify(postjson)
                }
                $http(postdata).success(function(result){
                          $http.get($rootScope.url + "/managePermission/" + $rootScope.user_name + '/' + $rootScope.companyNamee).success(function(result) {
                              sessionStorage.setItem("fetchPermission", JSON.stringify(result));
                              $scope.permission = sessionStorage.getItem("fetchPermission");
                             // console.log(sessionStorage.getItem("fetchPermission"));
                              $rootScope.loadinganimation = false;
                          }).error(function (error) {
                  				alert("Server side error");
                          });
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
 var roleselectedval=[];
 var usecase=postjson.PermissionTo.UseCase;
		  $http.get($rootScope.url + "/fetchPermissions/"+$scope.tabName+"/"+$scope.orgId).success(function(result){      

		            $scope.permissionJson = result;	 	  	
					angular.extend(postjson.PermissionTo.UseCase, result.PermissionTo.UseCase);					
					angular.extend(postjson.PermissionTo.Rule, result.PermissionTo.Rule);
					angular.extend(postjson.PermissionTo.Organization, result.PermissionTo.Organization);
					angular.extend(postjson.PermissionTo.Subscription, result.PermissionTo.Subscription);			
					angular.extend(postjson.PermissionTo.User, result.PermissionTo.User);
					angular.extend(postjson.PermissionTo.Role, result.PermissionTo.Role);
					angular.extend(postjson.PermissionFor.Role, result.PermissionFor.Role);
								
				 $q.all([promise1, promise2, promise3, promise4,promise5]).then(function(data){

					$timeout(function () { $scope.fnLoadCheckBox(result); }, 1000);
					
					angular.forEach(result.PermissionFor.Role, function(value, key) {
						roleselectedval.push(""+value.surrId+"")
					});
					//console.log(roleselectedval);
					$scope.selectedroleList = roleselectedval;
				});
					
					
		  
		}).error(function(err){
			alert("Server side error");
			
	     });
	
	
};
  
  
  $scope.fnLoadCheckBox=function(result){
	
	 var usecase=result.PermissionTo.UseCase;
                  
       
				var wrappedResult = angular.element(document.getElementsByClassName("crtusecase"));
				
		
			
					angular.forEach(wrappedResult, function(value, key) {
							//for(i=0;i<angular.element(document.getElementsByClassName("crtusecase")).length;i++){
								//debugger;
						//var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
						//alert("createusecase");
							//console.log("createusecase" +value.attributes['data-filtertype'].value);
						 angular.forEach(usecase, function(val,key) {						             
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										  value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);
										  
										
										 
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
					//}

					
					//usercase Tab  - readusecase
					angular.forEach(angular.element(document.getElementsByClassName("readusecase")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
							//console.log(value.attributes['data-objectval'].value);
						 angular.forEach(usecase, function(val,key) {	
					       //alert(operation+"-----"+val.operation)
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                
										  value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("updateusecase")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(usecase, function(val,key) {	
					 //debugger;
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                       
										value.setAttribute("checked", "checked");
										$scope.compile(value);	
										
										
										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("deleteusecase")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(usecase, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");
										$scope.compile(value);	
										
											
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
					angular.forEach(angular.element(document.getElementsByClassName("exportusecase")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(usecase, function(val,key) {	
					 
								if (val.operation == operation && val.objectval==objectval && val.filterType==filterType) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");
										$scope.compile(value);										
										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("crtusecasesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
							//console.log(value.attributes['data-objectval'].value);
						 angular.forEach(usecase, function(val,key) {						             
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										  value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);
										  
										
										 
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
					angular.forEach(angular.element(document.getElementsByClassName("readusecasesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value
							//console.log(value.attributes['data-objectval'].value);
						 angular.forEach(usecase, function(val,key) {	
					       //alert(operation+"-----"+val.operation)
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                
										  value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("updateusecasesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
							//console.log(value.attributes['data-objectval'].value);
						 angular.forEach(usecase, function(val,key) {	
					 //debugger;
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                       
										value.setAttribute("checked", "checked");
										$scope.compile(value);	
										
										
										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("deleteusecasesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
						//console.log(value.attributes['data-objectval'].value);
						 angular.forEach(usecase, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");
										$scope.compile(value);	
										
											
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
					angular.forEach(angular.element(document.getElementsByClassName("exportusecasesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(usecase, function(val,key) {	
					 
								if (val.operation == operation && val.objectval==objectval && val.filterType==filterType) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");
										$scope.compile(value);										
										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("ctrrule")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						//console.log(value.attributes['value'].value)
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (val.operation == operation && val.objectval==objectval ) {	
                                        
										value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);						
										  
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - readrule
					angular.forEach(angular.element(document.getElementsByClassName("readrule")), function(value, key) {
							
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
					    var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					   
					            //alert(operation +"=="+ val.operation +"&&"+ objectval+"=="+val.objectval)
								if (operation == val.operation && objectval==val.objectval) {	
                                     	
										value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);										
										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("updaterule")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						 var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval== val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);		
										  
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
					angular.forEach(angular.element(document.getElementsByClassName("deleterule")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						 var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("exportrule")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
					    var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										 value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);		
										  
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
					angular.forEach(angular.element(document.getElementsByClassName("ctrrulesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (val.operation == operation && val.objectval==objectval ) {	
                                        
										value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);						
										  
										
										
							  }
							  else{
								
							  }
			  
						});
						
					});
					
					
					//Rule Tab  - readrule
					angular.forEach(angular.element(document.getElementsByClassName("readrulesp")), function(value, key) {
							
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
					    var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					   
					            //alert(operation +"=="+ val.operation +"&&"+ objectval+"=="+val.objectval)
								if (operation == val.operation && objectval==val.objectval) {	
                                     	
										value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);										
										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("updaterulesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						 var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval== val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);		
										  
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
					angular.forEach(angular.element(document.getElementsByClassName("deleterulesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						 var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("exportrulesp")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
					    var filterType=value.attributes['data-filterType'].value;
						 angular.forEach(result.PermissionTo.Rule, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval && filterType==val.filterType) {	
                                        //alert("if")	
										 value.setAttribute("checked", "checked");																		 
                                          $scope.compile(value);		
										  
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
					angular.forEach(angular.element(document.getElementsByClassName("createsubs")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Subscription, function(val,key) {	
					 
								if (operation == val.operation && objectval== val.objectval) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");
                                          $scope.compile(value);										
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
					angular.forEach(angular.element(document.getElementsByClassName("readsubs")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Subscription, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");	
                                          $scope.compile(value);										
										
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
					angular.forEach(angular.element(document.getElementsByClassName("updatesubs")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Subscription, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");	
                                          $scope.compile(value);										
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
					angular.forEach(angular.element(document.getElementsByClassName("deletesubs")), function(value, key) {						 
						var outer =angular.element(value);							
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Subscription, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                        //alert("if")	
										value.setAttribute("checked", "checked");	
                                          $scope.compile(value);										
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
			      angular.forEach(angular.element(document.getElementsByClassName("createorg")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
										//debugger;
										
										
							  }
							  else{
								 
							  }
			  
						});
						
					});
		  
		 
		 
		          //Organization Tab  - Read
			      angular.forEach(angular.element(document.getElementsByClassName("readorg")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			      angular.forEach(angular.element(document.getElementsByClassName("updateorg")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval== val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("deleteorg")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("memberorg")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Organization, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("createuser")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.User, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("readuser")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.User, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("updateuser")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.User, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
									
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
			         angular.forEach(angular.element(document.getElementsByClassName("deleteuser")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.User, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("createrole")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Role, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("readrole")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Role, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("updaterole")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Role, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
			         angular.forEach(angular.element(document.getElementsByClassName("deleterole")), function(value, key) {
						 
						var outer =angular.element(value);						
						var objectval= value.attributes['data-objectval'].value;
						var operation= value.attributes['value'].value;
						
						 angular.forEach(result.PermissionTo.Role, function(val,key) {	
					 
								if (operation == val.operation && objectval==val.objectval) {	
                                    							
										value.setAttribute("checked", "checked");
                                        $scope.compile(value);
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
  //console.log(postjson);
  $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
      //console.log(postjson);
        $event.stopImmediatePropagation();
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
    	angular.element(".crtusecaseGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableCreateAll = true;

    		}
    	})
//alert(angular.element($event.currentTarget).parent().prev().text())
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
			  
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }

  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".readusecaseGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableReadAll = true;
              $scope.disableReadSpe = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }

  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".updateusecaseGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableUpdateAll = true;
              $scope.disableUpdateSpe = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".deleteusecaseGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableDeleteAll = true;
              $scope.disableDeleteSpe = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".exportusecaseGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableExportAll = true;
              $scope.disableExportSpe = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".readusecasesp").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableReadAll = true;
              $scope.disableRead = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }

  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".updateusecasesp").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableUpdateAll = true;
              $scope.disableUpdate = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".deleteusecasesp").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableDeleteAll = true;
              $scope.disableDelete = true;
    		}
    	});        
    	for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".exportusecasesp").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableExportAll = true;
              $scope.disableExport = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.UseCase.length;i++){
          if(postjson.PermissionTo.UseCase[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.UseCase[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.UseCase.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);

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
    	angular.element(".readruleGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableReadRuleAll = true;
              $scope.disableReadRuleSpe = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".updateruleGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableUpdateRuleAll = true;
              $scope.disableUpdateRuleSpe = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".deleteruleGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableDeleteRuleAll = true;
              $scope.disableDeleteRuleSpe = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".exportruleGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableExportRuleAll = true;
              $scope.disableExportRuleSpe = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);

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
    	angular.element(".readrulesp").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableReadRuleAll = true;
              $scope.disableReadRule = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".updaterulesp").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableUpdateRuleAll = true;
              $scope.disableUpdateRule = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".deleterulesp").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableDeleteRuleAll = true;
              $scope.disableDeleteRule = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".exportrulesp").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableExportRuleAll = true;
              $scope.disableExportRule = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().attr('value'))
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
      //console.log(postjson);
        $event.stopImmediatePropagation();

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
  //console.log(postjson);

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
    	angular.element(".readorgGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableReadOrgAll = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".updateorgGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableUpdateOrgAll = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".deleteorgGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableDeleteOrgAll = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".memberorgGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableMemberOrgAll = true;
    		}
    	}); 
        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".createsubsGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableCreateSubAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".readsubsGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableReadSubAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".updatesubsGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableUpdateSubAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".deletesubsGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableDeleteSubAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.Subscription.length;i++){
          if(postjson.PermissionTo.Subscription[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Subscription[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Subscription.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".createuserGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableCreateUserAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".readuserGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableReadUserAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".updateuserGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableUpdateUserAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".deleteuserGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableDeleteUserAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.User.length;i++){
          if(postjson.PermissionTo.User[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.User[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.User.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
  
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".createroleGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableCreateRoleAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".readroleGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableReadRoleAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == angular.element($event.currentTarget).parent().prev().prev().text())
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();

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
    	angular.element(".updateroleGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableUpdateRoleAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().text())
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    	angular.element(".deleteroleGen").each(function(){
    		if(angular.element(this).is(":checked")){
              $scope.disableDeleteRoleAll = true;
    		}
    	});
        for(var i=0;i<=postjson.PermissionTo.Role.length;i++){
          if(postjson.PermissionTo.Role[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Role[i].objectval == angular.element($event.currentTarget).parent().prev().prev().prev().prev().text())
          {
            postjson.PermissionTo.Role.splice(i, 1);
            break;
          }
        }
    }
  //console.log(postjson);
    $event.stopImmediatePropagation();
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
    })


    
    
