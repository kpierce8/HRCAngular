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
	'esri/graphicsUtils',
 	'dojo/on',
 	'services/rendererService',
	'esri/IdentityManager'
	], function(dom, array, Color, html, MapController, FeatureLayer,  EditTools, Query, QueryTask, SimpleMarkerSymbol, UniqueValueRenderer, graphicsUtils, on, Renderers) {


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


		function sumsByCategory(featureSet) {
			var sumArray = {};
			array.forEach(featureSet.features, function(feature){
				if (sumArray[feature.attributes.ChangeAgentName] > 0){
					sumArray[feature.attributes.ChangeAgentName] += feature.attributes.AreaAcres;
				} else {
					sumArray[feature.attributes.ChangeAgentName] = feature.attributes.AreaAcres;
				}
			});
			console.log(sumArray);
			

			d3.select("body")
				.selectAll("#graph1")
				.data(d3.entries(sumArray))
				.enter()
				.append("div")
				.attr("class","bar")
				.style("width", "50px")
				.style("height", function(d){
					var barHeight = d.value;
					console.log("key: " + d.key + " and value: " + d.value);
					return barHeight + "px";
				});
			//var sumAcres2 = d3.sum(sumArray);
			//console.log("total area from featureArray is " + sumAcres2);

			//return sumArray
		}
		


		//http://dojotoolkit.org/reference-guide/1.10/dojo/_base/array.html
		function getChangeAgentCounts(featureSet) {
			sumsByCategory(featureSet);
			var featureCount = 0;
			var featureArray = [];
			array.forEach(featureSet.features, function(feature) {
				featureCount += 1;
				//featureData = ;
				featureArray.push({"AreaAcres" : feature.attributes.AreaAcres, "ChangeAgentCode": feature.attributes.ChangeAgentCode});
			//	console.log("feature attributes are" + feature.attributes.AreaAcres);
			});
			var p = dom.byId('calcOutput')
			html.set(p,"There are " + featureCount + " redevelopment polygons in wria " + dom.byId('wrianm').value);
			console.log(featureArray);
			//var sumAcres = d3.sum(featureSet.features.AreaAcres);
			//console.log("total area from featureSet is " + sumAcres);
			//var sumAcres2 = d3.sum(featureArray.AreaAcres);
			//console.log("total area from featureArray is " + sumAcres2);
			console.log("feature array is an array: " + Array.isArray(featureArray));
			console.log("featureSet is an array: " + Array.isArray(featureSet.features));
		}

		 function onError(error){
		 	console.error("An error occurred  ", error);
		 }

				

		 function getWRIA(featureSet) {
		
		 	var wriaExtent = graphicsUtils.graphicsExtent(featureSet.features);
		 	map.setExtent(wriaExtent);
			var featureArray = [];
			array.forEach(featureSet.features, function(feature) {
				featureData = {"AreaAcres" : feature.attributes.AreaAcres, "ChangeAgentCode": feature.attributes.ChangeAgentCode};
				featureArray.push(featureData);
			});
			//console.log("featureSet.features is a " + featureSet.features.Attributes.AreaAcres);
			//var sumAcres = d3.sum(featureSet.features.AreaAcres);
			//console.log("total area is " + sumAcres);
			

		}


		// on(dom.byId('updateGraph'), 'click', function(){
		// 		var queryTask = new QueryTask(hrcd11Layer.url);
		// 		var query = new Query();
		// 		query.outFields = ["WRIAnumber", "AreaAcres", "ChangeAgentCode", "ChangeAgentName", "TotalChangePercent", "TreeDecreasePercent", "ImperviousIncreasePercent", "SemiperviousIncreasePercent"];
		// 		query.where = 'ChangeAgentCode > ' + 0 + 'And WRIAnumber = ' + dom.byId('wrianm').value;
		// 		query.returnGeometry = false;
		// 		console.log('query is :' + query.where);
		// 		queryTask.execute(query).then(sumsByCategory, onError);
		// });


		on(dom.byId('calcStuff'), 'click', function(){
				var queryTask = new QueryTask(hrcd11Layer.url);
				var query = new Query();
				query.outFields = ["WRIAnumber", "AreaAcres", "ChangeAgentCode", "ChangeAgentName", "TotalChangePercent", "TreeDecreasePercent", "ImperviousIncreasePercent", "SemiperviousIncreasePercent"];
				query.where = 'ChangeAgentCode = ' + 5 + 'And WRIAnumber = ' + dom.byId('wrianm').value;
				query.returnGeometry = false;
				console.log('query is :' + query.where);
				queryTask.execute(query).then(getChangeAgentCounts, onError);
		});


		on(dom.byId('zoomToWria'), 'click', function(){
				var queryTask = new QueryTask(hrcd11Layer.url);
				var query = new Query();
				query.where = 'WRIAnumber = ' + dom.byId('wrianm').value;
				query.returnGeometry = true;
				console.log('query is :' + query.where);
				queryTask.execute(query).then(getWRIA, onError);
				hrcd09Layer.setDefinitionExpression('WRIAnumber = ' + dom.byId('wrianm').value);
				hrcd11Layer.setDefinitionExpression('WRIAnumber = ' + dom.byId('wrianm').value);
		});


		on(dom.byId('zoom'), 'change', function(e){
			var zoom = e.target.value;
			console.log('zoom value is ' + zoom);
			if(zoom.length > 0) {
				map.setZoom(zoom);
			}
			});


		
		var hrcd11Layer = map.getLayer('hrcd11');
		var hrcd09Layer = map.getLayer('hrcd09');
		var ugaLayer = map.getLayer('uga');
		var naip2006Layer = map.getLayer('naip2006');
		var naip2009Layer = map.getLayer('naip2009');
		var naip2011Layer = map.getLayer('naip2011');
		var naip2013Layer = map.getLayer('naip2013');
		var naip2015Layer = map.getLayer('naip2015');
		//var nhdFlowLayer = map.getLayer('nhdFlow');
		var ecyBufferLayer = map.getLayer('ecyBuffer');

			var renderer09 = new UniqueValueRenderer(Renderers.uvrHRCD09);
			var renderer11 = new UniqueValueRenderer(Renderers.uvrHRCD11);

			hrcd11Layer.setRenderer(renderer11);
			hrcd09Layer.setRenderer(renderer09);

			on(dom.byId('uga_layer'), 'change', function(e){
			var ugaCheckBox = e.target.checked;
			console.log('ugaCheckBox value is ' + ugaCheckBox);
			if (ugaCheckBox == true) {
				ugaLayer.show();
			} else {
				ugaLayer.hide();
			}
			});

			on(dom.byId('hrcd11_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				hrcd11Layer.show();
			} else {
				hrcd11Layer.hide();
			}
			});

			on(dom.byId('hrcd09_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				hrcd09Layer.show();
			} else {
				hrcd09Layer.hide();
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

			on(dom.byId('naip2006_layer'), 'change', function(e){
			var hrcdCheckBox = e.target.checked;
			//console.log('hrcdcheckBox value is ' + hrcdCheckBox);
			if (hrcdCheckBox == true) {
				naip2006Layer.show();
				
			} else {
				naip2006Layer.hide();
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