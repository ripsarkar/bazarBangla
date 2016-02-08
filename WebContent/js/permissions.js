//wrting the controller for viewuser page
var aclinkROle = true;
app.controller("permissionsCtrl",["$scope","$http", "$rootScope", function($scope, $http,$rootScope){
  $scope.$watch(function(){
      $scope.dropshowhide = aclinkROle;
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
            $http.get($rootScope.url + '/getpopulateRoleforLogin').success(function(data) {
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
$scope.selectedroleList = "";
$scope.role_id = "1";
$scope.role_name = "ADMIN";
var num;
$scope.$watch(function(){
/*var txt = $scope.selectedroleList;*/
num = $scope.selectedroleList;
console.log($scope.selectedroleList);
postjson = {
                  "PermissionFor": {
                    "ObjectType": $scope.role_id,
                    "ObjectValue": $scope.role_name,
                    "Role": [
                      {
                        "surrId": parseInt($scope.selectedroleList)
                      }
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
});
////////////////////////////////////////////////////
var postjson = {
                  "PermissionFor": {
                    "ObjectType": $scope.role_id,
                    "ObjectValue": $scope.role_name,
                    "Role": [
                      {
                        "surrId": $scope.selectedroleList
                      }
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

      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
        $scope.disableCreate = false;
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

      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
        $scope.disableRead = false;

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

      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
              $scope.disableUpdate = false;
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

      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
              $scope.disableDelete = false;
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
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{              
      $scope.disableExport = false;

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
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "IndustryName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
$scope.createindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
$scope.readindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
$scope.updaindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
$scope.deleindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
$scope.expoindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
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
///////////////////////////////////////////////////////////
////////////////////////////RULE////////////////////////////
var readRule = [];

$scope.creaindAllRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = "ALL";
  read.filterType = "ALL";

    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateRule = true;
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
      $scope.disableCreateRule = false;
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
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
      $scope.disableReadRule = false;
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
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
      $scope.disableUpdateRule = false;
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
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
      $scope.disableDeleteRule = false;
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
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
      $scope.disableExportRule = false;
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
$scope.createindRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "RegCatName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.readindRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "RegCatName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
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
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
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
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
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
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
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
$scope.createindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Rule.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.readindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
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
$scope.updaindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
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
$scope.deleindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
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
$scope.expoindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().prev().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
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
      $scope.disableCreateOrg=true;
  readOrg.push(read);
  postjson.PermissionTo.Organization = readOrg;
    }
    else{
            $scope.disableCreateOrg=false;

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
  postjson.PermissionTo.Organization = readOrg;
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
  postjson.PermissionTo.Organization = readOrg;
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
  postjson.PermissionTo.Organization = readOrg;
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
  postjson.PermissionTo.Organization = readOrg;
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
$scope.createindOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
    readOrg.push(read);
    postjson.PermissionTo.Organization = readOrg;
    }
    else{
        for(var i=0;i<=postjson.PermissionTo.Organization.length;i++){
          if(postjson.PermissionTo.Organization[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Organization[i].objectval == angular.element($event.currentTarget).parent().prev().text())
          {
            postjson.PermissionTo.Organization.splice(i, 1);
            break;
          }
        }
    }
  console.log(postjson);

}
$scope.readindOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
    readOrg.push(read);
    postjson.PermissionTo.Organization = readOrg;
    }
    else{
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
    readOrg.push(read);
    postjson.PermissionTo.Organization = readOrg;
    }
    else{
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
    readOrg.push(read);
    postjson.PermissionTo.Organization = readOrg;
    }
    else{
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
    readOrg.push(read);
    postjson.PermissionTo.Organization = readOrg;
    }
    else{
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
  read.filterType = "ALL";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateSub = true;
  readSub.push(read);
  postjson.PermissionTo.Subscription = readSub;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadSub=true;
  readSub.push(read);
  postjson.PermissionTo.Subscription = readSub;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateSub=true;
  readSub.push(read);
  postjson.PermissionTo.Subscription = readSub;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteSub=true;
  readSub.push(read);
  postjson.PermissionTo.Subscription = readSub;
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
    readSub.push(read);
    postjson.PermissionTo.Subscription = readSub;
    }
    else{
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
    readSub.push(read);
    postjson.PermissionTo.Subscription = readSub;
    }
    else{
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
    readSub.push(read);
    postjson.PermissionTo.Subscription = readSub;
    }
    else{
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
    readSub.push(read);
    postjson.PermissionTo.Subscription = readSub;
    }
    else{
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
  read.filterType = "ALL";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateUser=true;
  readUser.push(read);
  postjson.PermissionTo.User = readUser;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadUser=true;
  readUser.push(read);
  postjson.PermissionTo.User = readUser;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateUser=true;
  readUser.push(read);
  postjson.PermissionTo.User = readUser;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteUser=true;
  readUser.push(read);
  postjson.PermissionTo.User = readUser;
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
  readUser.push(read);
  postjson.PermissionTo.User = readUser;
    }
    else{
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
  readUser.push(read);
  postjson.PermissionTo.User = readUser;
    }
    else{
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
  readUser.push(read);
  postjson.PermissionTo.User = readUser;
    }
    else{
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
  readUser.push(read);
  postjson.PermissionTo.User = readUser;
    }
    else{
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
  read.filterType = "ALL";

//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateRole=true;
  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadRole=true;
  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableUpdateRole=true;
  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
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
  read.filterType = "ALL";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableDeleteRole=true;
  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
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
  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
    }
    else{
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
  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
    }
    else{
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
  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
    }
    else{
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
  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
    }
    else{
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
          controller:"permissionsCtrl",
            link: function (scope, element, attrs) {
                element.click(function(e) {

                  var mm = angular.element(this).text();
 
                  if(mm == "Subscription" || mm == "User"|| mm == "Role"){
                    aclinkROle = false;                 
                  }
                  else{
                    aclinkROle = true;
                  }
                   // e.preventDefault();   
          //e.stopPropagation();  
                    if(attrs.href == "#subscription" || attrs.href == "#user" || attrs.href == "#role") 
          {
          
                        //$scope.dropshowhide = true;
                        //$scope.$apply();
               // }]
          }           
                    $(element).tab('show');
          
                });
            }
        };
    });



    
    
