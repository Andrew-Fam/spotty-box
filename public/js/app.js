var spottyBox = angular.module('spottyBox',['checkoutControllers','ngRoute','ui.bootstrap',"angucomplete"]);

spottyBox.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

spottyBox.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/checkout',{
		controller: 'checkoutCtrl'
	});
}]);

spottyBox.config(['$interpolateProvider', function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    }
]);