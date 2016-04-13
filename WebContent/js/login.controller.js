(function () {
    'use strict';

    angular.module('app').controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$http','$location', 'AuthenticationService', 'FlashService','$rootScope','$window'];
    function LoginController($scope, $http, $location, AuthenticationService, FlashService, $rootScope,$window) {
        /*$scope.gotoCustomer = function(){
            $http.get($rootScope.url+"/auth").success(function(result){
                $location.path('/home/search');
                $rootScope.usernameFromLogin = result.userid;
                $rootScope.userSessionIdFromLogin = result.userSessionId;
                console.log($rootScope.usernameFromLogin);
                console.log($rootScope.userSessionIdFromLogin);
            }).error(function(result){
                alert("try sometime later");
            });
        }*/
    ////////////////////////////////////////
        var usernameId2;
        angular.element(document).ready(function(){
        usernameId2 = window.location.href;
        });
        var mj2 = usernameId2.split("=");
        if(mj2[1] == "true"){
            alert("There could be some temporary technical problem. Please refresh / try again  and contact your system administrator");
        }
    ////////////////////////////////////////
    	if ($location.protocol() !== 'https') {
            $window.location.href = $location.absUrl().replace('http', 'https');
        }
    	
    	if(localStorage.isLoggedIn=="true"){
			
			 //$location.path('/home?userName='+localStorage.namerip);
    		   //localStorage.clear();
    		   //sessionStorage.clear();
    		   //$location.path('/login');
			 
		}
    	
    	if($rootScope.loginError){
    		$rootScope.loginError=false;
    		document.getElementById("logErr").className = "";
    		document.getElementById("logErr").className = "conditional_form_part_enable alert alert-danger msg-alert";
    	}
    	
    	var vm = this;

        vm.login = login;
       
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
           //vm.dataLoading = true;
            $rootScope.username = vm.username;
            $rootScope.disabled=true;

            AuthenticationService.SetCredentials(vm.username, vm.password);
            AuthenticationService.Login(vm.username, vm.password, function (response) {
            	if (response.success) {
                    //$rootScope.disabled=false;
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/home/search');

                } else {
                    FlashService.Error(response.message);
                    //vm.dataLoading = false;
                    //$rootScope.disabled=false;
                }
            });
        }; 
    }

})();




