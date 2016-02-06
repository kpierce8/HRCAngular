define([
	'esri/layers/FeatureLayer',
	'esri/renderers/SimpleRenderer',
	"esri/dijit/Popup", 
	"esri/dijit/PopupTemplate",
	'utils/symbolUtil']
	, function(FeatureLayer, SimpleRenderer, Popup, PopupTemplate, symbolUtil) {
		function _loadServices(config){

		
			var REQUEST_URL = 'http://services.arcgis.com/rcya3vExsaVBGUDp/arcgis/rest/services/testTrees/FeatureServer/0'
   			var HRCD_URL = 'http://gispublic.dfw.wa.gov/arcgis/rest/services/ApplicationServices/PugetSoundHighResolutionChangeDetection/MapServer/1'
			

			var layers = [];

			// var	requestLayer = new FeatureLayer(REQUEST_URL, {
			// 	id: 'testTrees',
			// 	mode: FeatureLayer.MODE_ONDEMAND,
			// 	outFields: ['*']
			// });

var template = new PopupTemplate({
          title: "from Arc Popup Page",
          description: "{WRIAnumber} : {ChangeAgentName}",
          fieldInfos: [{ //define field infos so we can specify an alias
            fieldName: "WRIA",
            label: "Entrants"
          }]
        });


			var hrcdLayer = new FeatureLayer(HRCD_URL, {
				id: 'Census',
				outFields: ['*'],
				infoTemplate: template
			});

 		

			var renderer = new SimpleRenderer(symbolUtil.renderSymbol());

			hrcdLayer.setRenderer(renderer);


	//layers.push(requestLayer);
	layers.push(hrcdLayer);
	return layers;
	}

	// this function returns a property that is the load services function
	return {
		loadServices: _loadServices
		};

	});

// From the manning arc js book