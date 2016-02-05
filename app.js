angular.module('hrcdApp', [ 'ngRoute', 'hrcdRoutes']);



angular.module('hrcdApp').controller('MainCtrl', function($scope, $http) {
	$scope.name = 'Ken Pierce';

	$http.get('./js/projects.json').success(function(data){
		$scope.projectList = data;
	});
});

angular.module('hrcdApp').controller('DropdownCtrl', function($scope) {

	$scope.items = [
	"Choice 1",
	"And another choice for you.",
	"but wait! A third!"
	];
});

angular.module('hrcdApp').controller('projCtrl', function($scope, $http) {

	$http.get('./js/projects.json').success(function(data){
		$scope.projectList = data;
	});
});


angular.module('hrcdApp').controller('dataCtrl', function($scope, $http) {
	$scope.name = 'Ken Pierce';
	
	$scope.zoom = 16
	var map;

 require([
	'controllers/appcontroller',
	'services/mapService',
	'dojo/domReady!'
	], function(appCtrl, mapService) {
		appCtrl.init({
			elem: 'mapDiv',
			mapOptions: {
				basemap: 'gray',
				center: [-122.8961, 47.0366],
				zoom: 12
			},
			layers: mapService.loadServices()
		});
	});

console.debug("main ran");     

$scope.map = map

});


/*angular.module('hrcdApp').directive('esriMap', function () {
    return {
        restrict: 'EA',
        controller: 'MapController',
        link: function (scope, element, attrs, ctrl) {
            ctrl.init(element);
        }
    };
});
*/






 