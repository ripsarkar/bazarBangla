app.controller("createrolecrt", ["$scope", "$rootScope", "$state", '$http', '$modal', 'feedback_model', '$filter',function($scope, $rootScope, $state, $http, $modal, feedback_model, $filter) {
    
    $scope.cmpyId = localStorage.getItem("cmpyId");
    $scope.usrId = localStorage.getItem("surrrip");

    $scope.reSet = function(){
        $scope.createroleid =""
        $scope.createrolename =""
        $scope.createroledescp =""
        $scope.orgName ="";
    }
    $scope.reSet();
    
    $scope.cpmysurrid = function() {
        var URLviewcomp = $rootScope.url+'/getCompany';
        var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
        if(obj.Users.Role !=undefined){
            var permissiontypeList = obj.Users.Role.PermissionTypeDet;
            for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
                if(permissiontypeList[int2].PermissionName=="create"){
                     $scope.vfbselPckg = permissiontypeList[int2].ObjectList;
                }
            }
        }

        /*$http.get(URLviewcomp).success(function(data, status, headers, config) {
                $scope.vfbselPckg = data.Company;
        }).error(function(data, status, headers, config) {
            alert("Please contact your adminstrator");
        });*/
    }

    $scope.cpmysurrid();
    
    $scope.submitrole = function(){
        if( $scope.createroleid !="" && $scope.createroleid != 'undefined' && $scope.createrolename !="" && $scope.createrolename !='undefined'  && typeof $scope.orgName != 'undefined' && $scope.orgName !=""){
            var crtrole = {
                role_id : $scope.createroleid,
                role_name : $scope.createrolename,
                role_desc : $scope.createroledescp,
                company_surr_id : $scope.orgName
            }
            
            var postURLrole = $rootScope.url+'/createNewRole';
           $http.post(postURLrole, crtrole).success(function(data, status, headers, config) {
               alert('Role Created succesfully');
               $scope.reSet();
           }).error(function(data, status, headers, config) {
               alert("Please contact your adminstrator");
               $scope.reSet();
           });
        }else{
            alert('Please fill all *mandatory fields')
        }
    }

}]);



app.controller("updaterole", ["$scope", "$rootScope", "$state", '$http', '$modal', 'feedback_model', '$filter',function($scope, $rootScope, $state, $http, $modal, feedback_model, $filter) {
    
	 $scope.cmpyId = localStorage.getItem("cmpyId");
     $scope.usrId = localStorage.getItem("surrrip");
     $rootScope.loadinganimation = true;
     //$scope.orgName ={};
     $scope.orgName = parseInt($scope.cmpyId);
     $scope.currentPage = 0;
     $scope.pageSize = 20;
     $scope.pgnation = function() {
         if (typeof $scope.rolePckg != 'undefined' && $scope.rolePckg.length > 0 && $scope.rolePckg != null) {
             $scope.numberOfPages = function() {
                 console.clear();
                 if($scope.rolePckg != null){
                 return Math.ceil($scope.rolePckg.length / $scope.pageSize);
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
         var viewPagedata = $rootScope.url+'/listRoles/';
         URLviewpage = viewPagedata + $scope.orgName;
         $scope.rolePckg = null;
         $scope.role_tb= [];
         var pckgrole = null;
         $http.get(URLviewpage).success(function(data, status, headers, config) {
             $rootScope.loadinganimation = false;
             if (typeof data != 'undefined' && data.rolesView.length > 0) {
                 $rootScope.dataLoading=true;
                 pckgrole = data.rolesView;
                 $scope.role_tb.length = 0;
                 $scope.rolePckg = null;
                 for (var i = 0; i < pckgrole.length; i++) {
                     var roledata = {};
                     roledata.role_id = pckgrole[i].role_id;
                     roledata.role_name = pckgrole[i].role_name;
                     roledata.role_desc = pckgrole[i].role_desc;
                     roledata.role_surr_id = pckgrole[i].role_surr_id;
                     $scope.role_tb.push(roledata);
                 }

                 $scope.rolePckg = $scope.role_tb;
                 $scope.pgnation();
                 $rootScope.loadinganimation = false;
             } else {
                 $rootScope.loadinganimation = false;
                 $scope.rolePckg= null;
                 alert("Sorry, No subscription under this company");
             }
         }).error(function(data, status, headers, config) {
             $rootScope.loadinganimation = false;
             $scope.rolePckg= null;
             alert("Technical Error.Please contact administrator for further details");
         });
     };
 
/*     $scope.orgcmpname = function(){
         $rootScope.loadinganimation = true;
         
     }*/
       $scope.orgcmpname = function(){
         $rootScope.loadinganimation = true;
         $scope.pageLoad();
     }
    /*$scope.cmpinit =  function(){
        $scope.orgName = $scope.cmpyId;
     }*/
     $scope.cpmysurrid = function() {
         var URLviewpage = $rootScope.url+'/getCompany';

        var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
        if(obj.Users.Role !=undefined){
            var permissiontypeList = obj.Users.Role.PermissionTypeDet;
            for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
                if(permissiontypeList[int2].PermissionName=="update"){
                     $scope.vspselPckgs = permissiontypeList[int2].ObjectList;
                     $scope.orgName = parseInt($scope.cmpyId);
                     $scope.pageLoad();
                }
            }
        }

         /*$http.get(URLviewpage).success(function(data, status, headers, config) {
             $scope.vspselPckgs = data.Company;
             $scope.orgName = parseInt($scope.cmpyId);
             $scope.pageLoad();
         }).error(function(data, status, headers, config) {
             $rootScope.dataLoading=true;
             alert("Please contact your adminstrator");
         });*/
     }

     $scope.cpmysurrid();
 
     $scope.updateroleForm = function(id, roleId, roleName, roleDesc, index) {
         var roleselecteddata = {
             id: id,
             roleid:roleId,
             rolename:roleName,
             roleDesc:roleDesc,
             index:index,
             orgName:$scope.orgName
         };
         feedback_model.setroleselected_data(roleselecteddata);
         var modalInstance = $modal.open({
             templateUrl: 'updaterolepop.html',
             controller: 'updaterolepop',
             size: 'md'
         });
     };
    
}]);

app.controller('updaterolepop', ['$scope', '$modalInstance', '$rootScope', '$state', '$http', 'feedback_model', '$filter',
 function($scope, $modalInstance, $rootScope, $state, $http, feedback_model, $filter) {
     
     $scope.usrId = localStorage.getItem("surrrip");
     var rolemodeldata = feedback_model.getroleselected_data();
     $rootScope.loadinganimation = true;
     $scope.size = 'md';
     
     

     $scope.cancel = function() {
         $modalInstance.dismiss('cancel');
     };
     
     $scope.roleuptFrm = {
         roleId:"",
         rolename:"",
         role_desc:""
     };
     $scope.reSet = function(){
         $scope.roleuptFrm.roleId ="";
         $scope.roleuptFrm.rolename ="";
         $scope.roleuptFrm.role_desc ="";
     };
     $scope.reSet();
     
     $scope.gteComparator = function(a,b) {
       return new Date(a) >= new Date(b);
     };

     $scope.cancel = function() {
         $modalInstance.dismiss('cancel');
     };
     
     $scope.roleForm = function(mdldata) {
         if (mdldata.id != null && typeof mdldata.id != 'undefined') {
             var URLrolemode = $rootScope.url + '/retrieveRole/'+ mdldata.id;
             $http.get(URLrolemode).success(function(data, status, headers, config) {
                 $scope.roleuptFrm.roleId = data.role_id;
                 $scope.roleuptFrm.rolename =  data.role_name;
                 $scope.roleuptFrm.role_desc = data.role_desc;
                 $scope.roleuptFrm.id = data.role_surr_id;
                 $rootScope.loadinganimation = false;
             }).error(function(data, status, headers, config){
                alert("Error loading data.Please contact administrator for further details");
                 $scope.reSet();
                 $scope.cancel();
             });
         }else{
            $scope.cancel();
         }
     };
     
     
     $scope.roleForm(rolemodeldata);

     $scope.updatarolesubmit = function(id) {
             if($scope.roleuptFrm.roleId !="" && $scope.roleuptFrm.roleId !="" &&typeof $scope.roleuptFrm.roleId !='undefined' && $scope.roleuptFrm.rolename !="" && $scope.roleuptFrm.rolename !=null && typeof $scope.roleuptFrm.rolename != 'undefined' ){
             $scope.PostJson_role = {
                 "role_id": $scope.roleuptFrm.roleId,
                 "role_name": $scope.roleuptFrm.rolename,
                 "role_desc": $scope.roleuptFrm.role_desc,
                 "company_surr_id": rolemodeldata.orgName,
                 "role_surr_id": $scope.roleuptFrm.id
             };
             $http.post($rootScope.url + '/updateRole/', $scope.PostJson_role).success(function(data, status, headers, config) {
                 $scope.cancel();
                 $scope.reSet();
                 $rootScope.loadinganimation = false;
                 alert("Update Role saved successfully");
                 $rootScope.dataUpdated = true;
             }).error(function(data, status, headers, config) {
                 $scope.cancel();
                 $scope.reSet();
                 $rootScope.loadinganimation = false;
                 alert(data.ErrMsg);
             });
             }else{
             	alert('Please fill all *Mandatory fields');
             }
         };

 }]);

app.filter('startFrom', function() {
 return function(input, start) {
     start = +start;
     console.clear();
     if (input != null && typeof input != 'undefined') {
         return input.slice(start);
     }
 };
});
app.controller("viewrole", ["$scope", "$rootScope", "$state", '$http', '$modal', 'feedback_model', '$filter',function($scope, $rootScope, $state, $http, $modal, feedback_model, $filter) {
    
     $scope.cmpyId = localStorage.getItem("cmpyId");
     $scope.usrId = localStorage.getItem("surrrip");
     $rootScope.loadinganimation = true;
     //$scope.orgName ={};
     $scope.orgName = parseInt($scope.cmpyId);
     $scope.currentPage = 0;
     $scope.pageSize = 20;
     $scope.pgnation = function() {
         if (typeof $scope.rolePckg != 'undefined' && $scope.rolePckg.length > 0 && $scope.rolePckg != null) {
             $scope.numberOfPages = function() {
                 console.clear();
                 if($scope.rolePckg != null){
                 return Math.ceil($scope.rolePckg.length / $scope.pageSize);
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
         var viewPagedata = $rootScope.url+'/listRoles/';
         URLviewpage = viewPagedata + $scope.orgName;
         $scope.rolePckg = null;
         $scope.role_tb= [];
         var pckgrole = null;
         $http.get(URLviewpage).success(function(data, status, headers, config) {
             $rootScope.loadinganimation = false;
             if (typeof data != 'undefined' && data.rolesView.length > 0) {
                 $rootScope.dataLoading=true;
                 pckgrole = data.rolesView;
                 $scope.role_tb.length = 0;
                 $scope.rolePckg = null;
                 for (var i = 0; i < pckgrole.length; i++) {
                     var roledata = {};
                     roledata.role_id = pckgrole[i].role_id;
                     roledata.role_name = pckgrole[i].role_name;
                     roledata.role_desc = pckgrole[i].role_desc;
                     roledata.role_surr_id = pckgrole[i].role_surr_id;
                     $scope.role_tb.push(roledata);
                 }

                 $scope.rolePckg = $scope.role_tb;
                 $scope.pgnation();
                 $rootScope.loadinganimation = false;
             } else {
                 $rootScope.loadinganimation = false;
                 $scope.rolePckg= null;
                 alert("Sorry, No subscription under this company");
             }
         }).error(function(data, status, headers, config) {
             $rootScope.loadinganimation = false;
             $scope.rolePckg= null;
             alert("Technical Error.Please contact administrator for further details");
         });
     };
 
/*     $scope.orgcmpname = function(){
         $rootScope.loadinganimation = true;
         
     }*/
       $scope.orgcmpname = function(){
         $rootScope.loadinganimation = true;
         $scope.pageLoad();
     }
    /*$scope.cmpinit =  function(){
        $scope.orgName = $scope.cmpyId;
     }*/
     $scope.cpmysurrid = function() {
         var URLviewpage = $rootScope.url+'/getCompany';

        var obj =JSON.parse(sessionStorage.getItem("fetchPermission"));
        if(obj.Users.Role !=undefined){
            var permissiontypeList = obj.Users.Role.PermissionTypeDet;
            for (var int2 = 0; int2 < permissiontypeList.length; int2++) {
                if(permissiontypeList[int2].PermissionName=="read"){
                     $scope.vspselPckgs = permissiontypeList[int2].ObjectList;
                     $scope.orgName = parseInt($scope.cmpyId);
                     $scope.pageLoad();
                }
            }
        }

         /*$http.get(URLviewpage).success(function(data, status, headers, config) {
             $scope.vspselPckgs = data.Company;
             $scope.orgName = parseInt($scope.cmpyId);
             $scope.pageLoad();
         }).error(function(data, status, headers, config) {
             $rootScope.dataLoading=true;
             alert("Please contact your adminstrator");
         });*/
     }

     $scope.cpmysurrid();
 
     $scope.updateroleForm = function(id, roleId, roleName, roleDesc, index) {
         var roleselecteddata = {
             id: id,
             roleid:roleId,
             rolename:roleName,
             roleDesc:roleDesc,
             index:index,
             orgName:$scope.orgName
         };
         feedback_model.setroleselected_data(roleselecteddata);
         var modalInstance = $modal.open({
             templateUrl: 'updaterolepop.html',
             controller: 'updaterolepop',
             size: 'md'
         });
     };
    
}]);