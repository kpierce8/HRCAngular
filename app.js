angular.module('hrcdApp', [ 'ngRoute', 'hrcdRoutes']);

//require('./routes/routes');



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




angular.module('hrcdApp').controller('methodCtrl', function($scope, $http) {
	$scope.name = 'Ken Pierce';

	$http.get('./js/methods.json').success(function(data){
		$scope.methodList = data;


		
	});
});


angular.module('hrcdApp').controller('dataCtrl', function($scope, $http) {
	$scope.name = 'Ken Pierce';
	
	$scope.zoom = 16
	var map;
	// var layers;
 //      require(["esri/map", "services/mapService", "dojo/domReady!"], function(Map, mapService) {
 //        map = new Map("mapDiv", {
 //          basemap: "topo",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
 //          center: [-122.8965, 47.03676], // longitude, latitude
 //          zoom: $scope.zoom
 //        });
 //        layers = mapService.loadServices();
 //    	map.addLayers([layers]);
 //    		}
 //        );

      

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






 