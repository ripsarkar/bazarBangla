 angular.module('app').factory('AuthenticationFactory', function($window) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($window.sessionStorage.token && $window.sessionStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  }

  return auth;
});

 angular.module('app').factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  return {
    login: function(username) {
      return $http.post('http://devuclapi.mybluemix.net/test/login', {
        UserID: username,
        //Password: password
      });
    },
   /* logout: function() {

      if (AuthenticationFactory.isLogged) {

        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.user;
        delete AuthenticationFactory.userRole;

        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.userRole;

        $location.path("/login");
      }

    }*/
  }
});


 angular.module('app').factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
	  console.log($window.sessionStorage.token)
      if ($window.sessionStorage.token) {
          config.headers['authorization'] = $window.sessionStorage.token;
          config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function(response) {
      return response || $q.when(response);
    }
  };
});