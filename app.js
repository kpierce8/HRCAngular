var app = angular.module('hrcdApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/intro', {
		controller: 'MainCtrl',
		templateUrl: '/views/intro.html'
	})
	.when('/projects', {
		controller: 'projCtrl',
		templateUrl: '/views/projects.html'
	})
	.when('/methods', {
		controller: 'methodCtrl',
		templateUrl: '/views/methods.html'
	})
	.when('/imageProcessing', {
			templateUrl: '/methods/image_processing.html'
		})
	.when('/landCoverModeling', {
			templateUrl: '/methods/land_cover_modeling.html'
		})
	.when('/trainingData', {
			templateUrl: '/methods/training_data.html'
		})
	.when('/stratifiedSampling', {
			templateUrl: '/methods/stratified_sampling.html'
		})
	.when('/statisticalModeling', {
			templateUrl: '/methods/statistical_modeling.html'
		})
	.when('/commissionAssessment', {
			templateUrl: '/methods/commission_assessment.html'
		})
	.when('/omissionAssessment', {
			templateUrl: '/methods/omission_assessment.html'
		})
	.when('/segmentation', {
			templateUrl: '/methods/segmentation.html'
		})
	.otherwise('/intro');
});


app.controller('MainCtrl', function($scope, $http) {
	$scope.name = 'Ken Pierce';

	$http.get('./js/projects.json').success(function(data){
		$scope.projectList = data;
	});
});

app.controller('DropdownCtrl', function($scope) {

	$scope.items = [
	"Choice 1",
	"And another choice for you.",
	"but wait! A third!"
	];
});

app.controller('projCtrl', function($scope, $http) {

	$http.get('./js/projects.json').success(function(data){
		$scope.projectList = data;
	});
});

app.controller('methodCtrl', function($scope, $http) {
	$scope.name = 'Ken Pierce';

	$http.get('./js/methods.json').success(function(data){
		$scope.methodList = data;


		
	});
});
