'use strict';
//var app = angular.module('app', ["ui.bootstrap"]);
//app.controller('HomeController', HomeController);
var app = angular.module('app').controller('HomeController', HomeController);
//var ucrsui = angular.module("app", ["ui.bootstrap"]).config();
HomeController.$inject = ['UserService', '$rootScope', '$scope', '$http'];
//angular.module("app", ["ui.bootstrap"]).config();


function HomeController(UserService,  $rootScope, $scope, $http) {
	//code for showall button visibility
	$rootScope.userIndustryName =  localStorage.getItem("showallbutt");

	if($rootScope.userIndustryName =="ALL"){
		$scope.showAllmode=true;
	}
	//logout
	$scope.localStorageclear=function(){
	   localStorage.clear();
	}
	//local storage
	$rootScope.role = localStorage.getItem("rolerip");
	$rootScope.surrId = localStorage.getItem("surrrip");
	$rootScope.user_name = localStorage.getItem("namerip");
	$rootScope.username = localStorage.getItem("fullname");
	$rootScope.compSurrId = localStorage.getItem("surrComprip");

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




    //code for user role specific access
	
	  $scope.$watch(function () {
		    if ($rootScope.role == "ADMIN") {
		        $scope.useCaseMaintain = true;
		        $scope.userAccountManagement = true;
		        $scope.ucrlPackage = true;
		        $scope.alertMenu = true;
		        $scope.searchMenu = true;
		        $scope.feedback = true;
		        $scope.showAllmode=false;
		        $rootScope.exported = true;
		    }
		    if ($rootScope.role == "SALES_PERSON") {
		        $scope.searchMenu = true;
		        $rootScope.exported = true;
		        $scope.useCaseMaintain = true;
		        $scope.userAccountManagement = false;
		        $scope.showAllmode=false;
		    }
		    if ($rootScope.role == "USER_VIEW") {
		        $scope.searchMenu = true;
		        $rootScope.exported = false;
		        $scope.feedback = false;
		        $scope.userAccountManagement = false;
		        $scope.showAllmode=true;
		    }
		    if ($rootScope.role == "USER_EXPORT") {
		        $scope.searchMenu = true;
		        $scope.feedback = true;
		        $rootScope.exported = true;
		        $scope.userAccountManagement = false;
		        $scope.showAllmode=true;
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


    $scope.name = $rootScope.username;
    /*-------/code for search pages------*/

    var vm = this;
    vm.user = null;
    vm.allUsers = [];
    vm.deleteUser = deleteUser;

    initController();

    function initController() {
        loadCurrentUser();
        loadAllUsers();
    }

    function loadCurrentUser() {
        UserService.GetByUsername($rootScope.globals.currentUser.username).then(function(user) {
                vm.user = user;
            });
    }

    function loadAllUsers() {
        UserService.GetAll()
            .then(function(users) {
                vm.allUsers = users;
            });
    }

    function deleteUser(id) {
        UserService.Delete(id).then(function() {
                loadAllUsers();
            });
    }

  $scope.selection=[];
}
