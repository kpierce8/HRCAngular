angular.module('hrcdApp').controller('dataCtrl', 
	['$scope', 
	'$http', 
	function($scope, $http) {
	$scope.name = 'Ken Pierce';
	
	$scope.zoom = 14;
	var map;
	$scope.test2 = "bob";


 require([
	'controllers/appcontroller',
	'services/mapService',
	"esri/dijit/Popup", 
	 "dojo/dom-class", 
	 "dojo/dom-construct",
	 "esri/symbols/SimpleFillSymbol", 
	 "esri/Color",
	'dojo/domReady!'
	], 

	function(appCtrl, mapService, Popup, domClass, domConstruct, SimpleFillSymbol, Color) {

	var fill = new SimpleFillSymbol("solid", null, new Color("#11CE67"));
	var popup = new Popup({
            fillSymbol: fill,
            titleInBody: false
        }, domConstruct.create("div"));

	appCtrl.init({
			elem: 'mapDiv',
			mapOptions: {
				basemap: 'gray',
				center: [-122.8961, 47.0366],
				zoom: $scope.zoom,
				infoWindow: popup
			},
			layers: mapService.loadServices()
		});
	
	//$scope.test = appCtrl.mapCtrl.basemap;
	$scope.$apply(function(){
		$scope.test2 = "test2data";
	});
	
	console.debug("in function test2 is ", $scope.test2);   
	console.debug("data controller ran", appCtrl.map);    
	});

console.debug("outside function test2 is ", $scope.test2);   
$scope.test3 = "test3data";



}]);

