app.directive('subscription', ['apiforsubscription','$http','$rootScope', function(apiforsubscription,$http,$rootScope) {
    return {
        restrict: "E",
        templateUrl:"html/templates/subscription-template.html",
        link: function(scope, element, attr, mCtrl) {



        }
    };
}]);

app.factory('apiforsubscription', function($http,$rootScope){
  var apiurl, myData;
  return {
    getData: function(){

    }
  };
});