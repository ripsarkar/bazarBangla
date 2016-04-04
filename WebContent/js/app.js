(function () {
    'use strict';
    
    angular
        .module('app', ['ngCookies','ui.router','ui.bootstrap'])
        .config(function($stateProvider, $urlRouterProvider,$httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
        $httpProvider.defaults.headers.common = {'SESSION_ID':localStorage.getItem("tFSession")}
    	  // For any unmatched url, redirect to /login
    	  $urlRouterProvider.otherwise("/login");
    	  // Now set up the states

        $stateProvider
            .state('login', {
              url: "/login",
              templateUrl: "login.html",
              controller: 'LoginController',
              access: {
  		        requiredLogin: false
  		      }
            //  controllerAs: 'vm'
          })
          .state('home', {
            url: "/home",
            templateUrl: "html/home.html",
             //autoActivateChild: 'home.search'
            access: {
		        requiredLogin: true
		      }
          })
    	     .state("home.search", {
    	      url:"/search",
              controller: 'searchController',
              templateUrl: "html/search.html",
              access: {
			        requiredLogin: true
			      }
    	    })
    	    .state('register', {
    	      url: "/register",
    	      templateUrl: "html/reg.html",
    	      controller:'RegisterController',
    	      access: {
			        requiredLogin: true
			      }
    	    })
          .state('home.createusecase',{
                url:"/createusecase",
                templateUrl:"html/createusecase.html",
                access: {
			        requiredLogin: true
			      }
            })
            .state('home.createReg',{
                url:"/createReg",
                templateUrl:"html/createReg.html",
                access: {
			        requiredLogin: true
			      }
            })
            .state('home.createrule',{
                url:"/createrule",
                templateUrl:"html/createrule.html",
                access: {
			        requiredLogin: true
			      }
            })
            .state("home.uamanagement", {
            	url:"/uamanagement",
            	templateUrl: "html/uamanagement.html",
            	controller:'uamanagement',
            	access: {
			        requiredLogin: true
			      }
    	    })
            .state("home.updateUsecase", {
    	      url:"/updateUsecase",
              templateUrl: "html/updateUsecase.html",
              access: {
			        requiredLogin: true
			      }
    	    })
            .state("home.updateReg", {
    	      url:"/updateReg",
              templateUrl: "html/updateReg.html"
    	    })
            .state("home.updateRule", {
    	      url:"/updateRule",
              templateUrl: "html/updateRule.html",
              access: {
			        requiredLogin: true
			      }
    	    })
            .state("home.feedback", {
    	      url:"/feedback",
              templateUrl: "html/feedback.html",
              access: {
			        requiredLogin: true
			      }
    	    })
    	    .state("home.viewfeedback", {
    	      url:"/viewfeedback",
              templateUrl: "html/viewfeedback.html",
              access: {
			        requiredLogin: true
			      }
    	    })
			  .state("home.organization", {
			url:"/organization",
			  templateUrl: "html/organization.html",
			  access: {
			        requiredLogin: true
			      }
			  })
			  .state("home.subscription", {
			url:"/subscription",
			  templateUrl: "html/subscription.html",
			  access: {
			        requiredLogin: true
			      }
			  })
			  .state("home.updatesubscription", {
			  url:"/updatesubscription",
			 // templateUrl: "html/viewsubscription.html"
			  templateUrl: "html/updatepermissions.html",
			  controller: 'updateOrgCtrl'
			})
        .state("home.viewsubscription", {
        url:"/viewsubscription",
       // templateUrl: "html/viewsubscription.html"
        templateUrl: "html/viewsubscriptionMain.html",
        controller: 'updateOrgCtrl',
        access: {
	        requiredLogin: true
	      }
      })
			.state("home.createrole", {
			  url:"/createrole",
			  templateUrl: "html/createrole.html",
			  access: {
			        requiredLogin: true
			      }
			})
			.state("home.updaterole", {
			  url:"/updaterole",
			  templateUrl: "html/updatepermissions.html",
			  controller: 'updateRoleCtrl',
			  access: {
			        requiredLogin: true
			      }
			 // templateUrl: "html/updaterole.html"
			})
      .state("home.viewrole", {
        url:"/viewrole",
        templateUrl: "html/viewroleMain.html",
        controller: 'viewrole',
        access: {
	        requiredLogin: true
	      }
       // templateUrl: "html/updaterole.html"
      }) 
            .state("home.UpdateOrganisation", {
            url:"/UpdateOrganisation",
              templateUrl: "html/updateOrganization.html",
              access: {
			        requiredLogin: true
			      }
          })            
            .state("home.permissions", {
              url:"/permissions",
              templateUrl: "html/permissions.html",
              access: {
			        requiredLogin: true
			      }
            });
        }).run(run);


    
    
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','AuthenticationFactory'];
    function run($rootScope, $location, $cookieStore, $http,AuthenticationFactory) {
    	
    	AuthenticationFactory.check();
    		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options){ 
				if ((toState.access && toState.access.requiredLogin) && !AuthenticationFactory.isLogged) {
				
				 $location.path("/home");
			    } else {
			    	
			      // check if user object exists else fetch it. This is incase of a page refresh
			      //if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
			      
			    }
		
				});
    	
    	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    	    if(toState && toState.params && toState.params.autoActivateChild){
    	        $state.go(toState.params.autoActivateChild);
    	    }
    	    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
				//alert();
				 // $location.path('/home');
				}
    	});
    	
        // keep user logged in after page refresh
//        $rootScope.globals = $cookieStore.get('globals') || {};
//        if ($rootScope.globals.currentUser) {
//            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//        }

//        $rootScope.$on('$locationChangeStart', function (event, next, current) {
//            // redirect to login page if not logged in and trying to access a restricted page
//            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
//            var loggedIn = $rootScope.globals.currentUser;
//            if (restrictedPage && !loggedIn) {
//                $location.path('/login');
//            }
//        });
    	
    	
      
        /**
         * change the value of $rootscope.url for 
         * pointing to different db
         */
     
       
        // test db url
       //  $rootScope.url = 'http://ucsrinternaltest.mybluemix.net';
        
        // main db url
         //$rootScope.url = 'http://ucsr.mybluemix.net';
        
        //dev url
       // $rootScope.url = 'http://uclapimain.mybluemix.net';
        
        
        // UAT test url       
        // $rootScope.url = 'http://uclapireleasetwo.mybluemix.net';
        
        // UAT test url       
        $rootScope.url = 'https://devuclapi.mybluemix.net';
        
         
        //    $location.path('/login');
  	//  initController();

    }

})();
