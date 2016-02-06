define([
	'dojo/_base/array',
	'controllers/mapcontroller',
	"esri/dijit/Popup", 
	"esri/dijit/PopupTemplate",
    "esri/layers/FeatureLayer",
	'widgets/edit/editTools',
	 "esri/symbols/SimpleFillSymbol", "esri/Color",
        "dojo/dom-class", "dojo/dom-construct", "dojo/on",
	'esri/IdentityManager'
	], function(array, MapController, Popup, PopupTemplate, FeatureLayer,  EditTools, SimpleFillSymbol, Color,
		domClass, domConstruct, on) {

		function mapLoaded(map) {
			var editTools = new EditTools({
			 	map:map
			 }, 'map-tools');
			 console.debug('map has been loaded ', map);

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
		function runClick2(){
				alert("function runs automatically");
		}
		function runClick(e){
			alert("got click");
		}
		function init(config){
			var mapCtrl = new MapController(config);
			mapCtrl.load().then(mapLoaded)

		}
		return {
			init: init
		};
	});