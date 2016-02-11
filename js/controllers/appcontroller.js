define([
	'dojo/dom',
	'dojo/_base/array',
	'dojo/_base/Color',
	'dojo/html',
	'controllers/mapcontroller',
    'esri/layers/FeatureLayer',
	'widgets/edit/editTools',
	'esri/tasks/query',
	'esri/tasks/QueryTask',
	'esri/symbols/SimpleMarkerSymbol',
	'esri/renderers/UniqueValueRenderer',
 	'dojo/on',
 	'services/rendererService',
	'esri/IdentityManager'
	], function(dom, array, Color, html, MapController, FeatureLayer,  EditTools, Query, QueryTask, SimpleMarkerSymbol, UniqueValueRenderer, on, Renderers) {


		var mapVar

		function mapLoaded(map) {
			var editTools = new EditTools({
			 	map:map
			 }, 'map-tools');
			 console.debug('map has been loaded ', map);
			this.mapVar = map;

			 //THIS IS THE PLACE FOR MAP CUSTOMIZATION??

		//Next three functions from page33,34 in manning book
		//var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, null, new Color([50,150,100]));


		//http://dojotoolkit.org/reference-guide/1.10/dojo/_base/array.html
		function getChangeAgentCounts(featureSet) {
			var featureCount = 0;
			array.forEach(featureSet.features, function(feature) {
				featureCount += 1;
			});
			var p = dom.byId('calcOutput')
			html.set(p,"There are " + featureCount + " redevelopment polygons in wria " + dom.byId('wrianm').value);
			console.log("feature count is " + featureCount);
		}

		 function onError(error){
		 	console.error("An error occurred  ", error);
		 }

				
		on(dom.byId('calcStuff'), 'click', function(){
				var queryTask = new QueryTask(hrcdLayer.url);
				var query = new Query();
				query.where = 'ChangeAgentCode = ' + 5 + 'And WRIAnumber = ' + dom.byId('wrianm').value;
				query.returnGeometry = false;
				console.log('query is :' + query.where);
				queryTask.execute(query).then(getChangeAgentCounts, onError);
		});





		on(dom.byId('zoom'), 'change', function(e){
			var zoom = e.target.value;
			console.log('zoom value is ' + zoom);
			if(zoom.length > 0) {
				map.setZoom(zoom);
			}
			});


		
		var hrcdLayer = map.getLayer('hrcd');
		var ugaLayer = map.getLayer('uga');
		var naip2009Layer = map.getLayer('naip2009');
		var naip2011Layer = map.getLayer('naip2011');
		var naip2013Layer = map.getLayer('naip2013');
		var naip2015Layer = map.getLayer('naip2015');
		//var nhdFlowLayer = map.getLayer('nhdFlow');
		var ecyBufferLayer = map.getLayer('ecyBuffer');

			var renderer = new UniqueValueRenderer(Renderers.uvrHRCD);

			hrcdLayer.setRenderer(renderer);


			on(dom.byId('uga_layer'), 'change', function(e){
			var ugaCheckBox = e.target.checked;
			console.log('ugaCheckBox value is ' + ugaCheckBox);
			if (ugaCheckBox == true) {
				ugaLayer.show();
			} else {
				ugaLayer.hide();
			}
			});

			on(dom.byId('hrcd0911_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				hrcdLayer.show();
			} else {
				hrcdLayer.hide();
			}
			});

			on(dom.byId('naip2009_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				naip2009Layer.show();
				
			} else {
				naip2009Layer.hide();
			}
			});

			on(dom.byId('naip2011_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				naip2011Layer.show();
				
			} else {
				naip2011Layer.hide();
			}
			});

				on(dom.byId('naip2013_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				naip2013Layer.show();
				
			} else {
				naip2013Layer.hide();
			}
			});

			on(dom.byId('naip2015_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				naip2015Layer.show();
				
			} else {
				naip2015Layer.hide();
			}
			});

			on(dom.byId('ecyBuffer_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				ecyBufferLayer.show();
				
			} else {
				ecyBufferLayer.hide();
			}
			});



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
			
		} //End maploaded function


		var varOnCtrl = "my var on the app ctrl";
		//just a test function, can delete
		function runClick(e){
			alert("got click");
		}
		function init(config){
			console.log("from app controller config", config);
			var mapCtrl = new MapController(config);
			mapCtrl.load().then(mapLoaded)

		}

		function getMap(){
			return this.varOnCtrl;
		}

		return {
			init: init,
			map: mapVar
		};
	});