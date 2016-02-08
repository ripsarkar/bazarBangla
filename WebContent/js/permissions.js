//wrting the controller for viewuser page
app.controller("permissionsCtrl",["$scope","$http", "$rootScope", function($scope, $http,$rootScope){
	

                 $scope.fnSubsTab=function(){			 
						$http.get($rootScope.url + '/getCompany').success(function(data) {
							$scope.companyListli = data.Company;						
													
						}).error(function(data, status, headers, config) {								
								alert('Sorry Application error in serverside');
					});
			
			
	 };
	 
	  $scope.expandAll = function (expanded) {
                // $scope is required here, hence the injection above, even though we're using "controller as" syntax
                $scope.$broadcast('onExpandAll', {expanded: expanded});
            };

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
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                   // e.preventDefault();		
					//e.stopPropagation();					
                    $(element).tab('show');
					
                });
            }
        };
    });


    
    
