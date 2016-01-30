angular.module('hrcdApp').controller('methodCtrl', function($scope, $http) {
	$scope.name = 'Ken Pierce';

	$http.get('./js/methods.json').success(function(data){
		$scope.methodList = data;


		
	});
});
