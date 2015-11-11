var app = angular.module('plunker', ['ui.bootstrap']);

app.controller('MainCtrl', function($scope) {
    $scope.name = 'Ken Pierce';
});

app.controller('DropdownCtrl', function($scope) {
 
    $scope.items = [
        "Choice 1",
        "And another choice for you.",
        "but wait! A third!"
    ];
});