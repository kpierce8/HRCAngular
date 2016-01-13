(function (define, angular) {
    'use strict';
    
    require(['esri/map'], function (Map) {
        var esriMap = angular.module('esri.map', []);
        
        // Continued
    });
    
}(window.define, window.angular));

esriMap.directive('esriMap', function () {
    return {
        restrict: 'EA',
        controller: 'MapController',
        link: function (scope, element, attrs, ctrl) {
            ctrl.init(element);
        }
    };
});