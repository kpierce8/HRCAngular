

angular.module('hrcdRoutes', ['ngRoute'])
.config(function($routeProvider) {
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
	.when('/data', {
		    controller: 'dataCtrl',
			templateUrl: '/data/data.html'
		})
	.otherwise('/intro');
});