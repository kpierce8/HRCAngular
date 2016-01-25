esriMap.controller('MapController', ['$rootScope', '$scope', '$attrs', function ($rootScope, $scope, $attrs) {

    var self = this; // Reference to 'this' to use in functions
    var mapDiv, layers = [];

    this.init = function (element) {
        if (!$attrs.id) { throw new Error('\'id\' is required for a map.'); }
        self.$element = element;
        self.createDiv();
        self.createMap();
    };
    
    this.createDiv = function () {
        mapDiv = document.createElement('div');
        mapDiv.setAttribute('id', $attrs.id);
        self.$element.removeAttr('id');
        self.$element.append(mapDiv);
    };
 
    this.createMap = function () {
        var options = {
            center: $attrs.center ? JSON.parse($attrs.center) : [-122, 48.485],
            zoom: $attrs.zoom ? parseInt($attrs.zoom) : 10,
            basemap: $attrs.basemap ? $attrs.basemap : 'streets'
        };
        $scope.map = new Map($attrs.id, options);
        
        $scope.map.on('load', function () { $rootScope.$broadcast('map-load'); });
        $scope.map.on('click', function (e) { $rootScope.$broadcast('map-click', e); });
        
        if (layers.length > 0) {
            $scope.map.addLayers(layers);
            layers = [];
        }
    };
    
    $scope.addLayer = function (layer) {
        if ($scope.map) {
            $scope.map.addLayer(layer);
        } else {
            layers.push(layer);
        }
    };

}]);

//from http://justinchmura.com/2014/06/16/using-angularjs-esri-javascript-api/