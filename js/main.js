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