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
var postjson = {
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
        $scope.disableCreateSpe = true;
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
        $scope.disableCreate = false;
        $scope.disableCreateSpe = false;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "IndustryName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableCreateAll = true;
              $scope.disableCreateSpe = true;

      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
    }
    else{
              $scope.disableCreateAll = false;
              $scope.disableCreateSpe = false;

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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
$scope.createindSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
              $scope.disableCreateAll = true;
              $scope.disableCreate = true;
      readSubscription.push(read);
      postjson.PermissionTo.UseCase = readSubscription;
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

}
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      postjson.PermissionTo.UseCase = readSubscription;
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
      $scope.disableCreateRule = true;
      $scope.disableCreateRuleSpe = true;

      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
      $scope.disableCreateRule = false;
      $scope.disableCreateRuleSpe = false;

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
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
$scope.createindRule = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().text();
  read.filterType = "RegCatName";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateRuleAll = true;
      $scope.disableCreateRuleSpe = true;

      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
      $scope.disableCreateRuleAll = false;
      $scope.disableCreateRuleSpe = false;
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
      $scope.disableReadRuleAll = true;
      $scope.disableReadRuleSpe = true;
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
$scope.createindRuleSpe = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableCreateRuleAll = true;
      $scope.disableCreateRule = true;

      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
    }
    else{
      $scope.disableCreateRuleAll = false;
      $scope.disableCreateRule = false;
        for(var i=0;i<=postjson.PermissionTo.Rule.length;i++){
          if(postjson.PermissionTo.Rule[i].operation == angular.element($event.currentTarget).val() && postjson.PermissionTo.Rule[i].objectval == angular.element($event.currentTarget).parent().prev().attr('value'))
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
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().attr('value');
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadRuleAll = true;
      $scope.disableReadRule = true;
      readRule.push(read);
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
      postjson.PermissionTo.Rule = readRule;
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
      $scope.disableCreateOrgAll=true;

    readOrg.push(read);
    postjson.PermissionTo.Organization = readOrg;
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

}
$scope.readindOrg = function($event){
  var read = {};
  read.operation = angular.element($event.currentTarget).val();
  read.objectval = angular.element($event.currentTarget).parent().prev().prev().text();
  read.filterType = "id";
//push and pop data
    if(angular.element($event.currentTarget).is(':checked') == true){
      $scope.disableReadOrgAll=true;

    readOrg.push(read);
    postjson.PermissionTo.Organization = readOrg;
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
    postjson.PermissionTo.Organization = readOrg;
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
    postjson.PermissionTo.Organization = readOrg;
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
    postjson.PermissionTo.Organization = readOrg;
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
            $scope.disableCreateSubAll=true;

    readSub.push(read);
    postjson.PermissionTo.Subscription = readSub;
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
    postjson.PermissionTo.Subscription = readSub;
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
    postjson.PermissionTo.Subscription = readSub;
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
    postjson.PermissionTo.Subscription = readSub;
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
            $scope.disableCreateUserAll=true;

  readUser.push(read);
  postjson.PermissionTo.User = readUser;
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
  postjson.PermissionTo.User = readUser;
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
  postjson.PermissionTo.User = readUser;
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
  postjson.PermissionTo.User = readUser;
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
            $scope.disableCreateRoleAll=true;

  readRole.push(read);
  postjson.PermissionTo.Role = readRole;
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
  postjson.PermissionTo.Role = readRole;
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
  postjson.PermissionTo.Role = readRole;
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
  postjson.PermissionTo.Role = readRole;
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



    
    