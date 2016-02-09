define([
	'dojo/dom',
	'dojo/_base/array',
	'dojo/_base/Color',
	'controllers/mapcontroller',
    'esri/layers/FeatureLayer',
	'widgets/edit/editTools',
	'esri/tasks/query',
	'esri/tasks/QueryTask',
	'esri/symbols/SimpleMarkerSymbol',
	'esri/renderers/UniqueValueRenderer',
 	'dojo/on',
	'esri/IdentityManager'
	], function(dom, array, Color, MapController, FeatureLayer,  EditTools, Query, QueryTask, SimpleMarkerSymbol, UniqueValueRenderer, on) {

		function mapLoaded(map) {
			var editTools = new EditTools({
			 	map:map
			 }, 'map-tools');
			 console.debug('map has been loaded ', map);


			 //THIS IS THE PLACE FOR MAP CUSTOMIZATION??

		//Next three functions from page33,34 in manning book
		var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, null, new Color([50,150,100]));

		function onQuerySuccess(featureSet) {
			map.graphics.clear();
			array.forEach(featureSet.features, function(feature) {
				feature.setSymbol(markerSymbol);
				map.graphics.add(feature);
			});
		}

		function onError(error){
			console.error("An error occurred  ", error);
		}

				
		on(dom.byId('zoom'), 'change', function(e){
			var zoom = e.target.value;
			console.log('zoom value is ' + zoom);
			if(zoom.length > 0) {
				map.setZoom(zoom);
			}
			});

		// on(dom.byId('changeAgent'), 'change', function(e){
		// 	var changeAgent = e.target.value;
		// 	console.log('changeAgent value is ' + changeAgent);
		// 	if(changeAgent.length > 0) {
		// 		var queryTask = new QueryTask(HRCD_URL);
		// 		var query = new Query();
		// 		query.where = 'ChangeAgentCode = ' + changeAgent;
		// 		query.returnGeometry = true;
		// 		console.log('query is :' + query.where);
		// 		queryTask.execute(query).then(onQuerySuccess, onError);
		// 	}

		// });



		var hrcdLayer = map.getLayer('hrcd');

		var uvrHRCD = {"type" : "uniqueValue",
			"field1":"ChangeAgentCode",
			"defaultSymbol" : {
				"color" : [100, 100, 100, 255],
				"outline": {
					"color" : [0, 25, 0, 255],
					"width": 1,
					"type" : "esriSLS",
					"style": "esriSLSNull"
					},
				"type" : "esriSFS",
				"style": "esriSFSNull"
			},
			"uniqueValueInfos" : [
			{
				"value": 1,
      			"symbol": {
        			"color": [255, 0, 0, 128],
        			"outline": {
          				"color": [0, 0, 0, 255],
          				"width": 1,
          				"type": "esriSLS",
          				"style": "esriSLSSolid"
        				},
       			 "type": "esriSFS",
        		 "style": "esriSFSSolid"
      			}
    		},
    		{
				"value": 2,
      			"symbol": {
        			"color": [145, 78,255, 128],
        			"outline": {
          				"color": [0, 255, 0, 255],
          				"width": 1,
          				"type": "esriSLS",
          				"style": "esriSLSSolid"
        				},
       			 "type": "esriSFS",
        		 "style": "esriSFSSolid"
      			}
    		},
    		{
				"value": 3,
      			"symbol": {
        			"color": [57, 125, 155, 128],
        			"outline": {
          				"color": [0, 125, 0, 255],
          				"width": 1,
          				"type": "esriSLS",
          				"style": "esriSLSSolid"
        				},
       			 "type": "esriSFS",
        		 "style": "esriSFSSolid"
      			}
    		},
    		{
				"value": 5,
      			"symbol": {
        			"color": [200, 0, 55, 128],
        			"outline": {
          				"color": [0, 255, 200, 255],
          				"width": 1,
          				"type": "esriSLS",
          				"style": "esriSLSSolid"
        				},
       			 "type": "esriSFS",
        		 "style": "esriSFSSolid"
      			}
    		}]
			}

			var renderer = new UniqueValueRenderer(uvrHRCD);

			hrcdLayer.setRenderer(renderer);

		//	 map.on('click', runClick); //need to pass function literal, not runClick(e)

			// var requestLayer, layers = [], templatePicker;
			// requestLayer = map.getLayer('Requests');
			// layers.push(requestLayer);
			// templatePicker = new TemplatePicker({
			// 	featureLayers: layers,
			// 	rows: 'auto',
			// 	columns: 1
			// }, 'template-div');
			// templatePicker.startup();

			// var layerInfos = array.map(layers, function(layer) {
			// 	return {
			// 		featureLayer: layer
			// 	};
			// });
			// var settings = {
			// 	map:map,
			// 	templatePicker: templatePicker,
			// 	layerInfos: layerInfos
			// };
			// var params = {settings: settings};
			// var editorWidget = new Editor(params);
			
		}


		//just a test function, can delete
		function runClick(e){
			alert("got click");
		}
		function init(config){
			console.log("from app controller config", config);
			var mapCtrl = new MapController(config);
			mapCtrl.load().then(mapLoaded)

		}
		return {
			init: init
		};
	});