/*global define, require, location*/
/*jshint laxcomma:true*/
(function(){
	'use strict';
	console.log("run.js");
	var pathRX = new RegExp(/\/[^\/]+$/)
	, locationPath = location.pathname.replace(pathRX, '/');


	require({
		async: true,
		aliases:[
		['text', 'dojo/text']
		],
		packages: [{
			name: 'controllers',
			location: locationPath + 'js/controllers'
		}, {
			name: 'services',
			location: locationPath + 'js/services'
		}, {
			name: 'utils',
			location: locationPath + 'js/utils'
		}, {
			name: 'widgets',
			location: locationPath + 'js/widgets'
		}, {
			name: 'app',
			location: locationPath + 'js',
		}]

	}, ['app']);

}) ();