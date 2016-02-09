define([
	'dojo/on',
	'dojo/dom',
	'esri/layers/FeatureLayer',
	'esri/renderers/SimpleRenderer',
	"esri/dijit/Popup", 
	"esri/dijit/PopupTemplate",
	'utils/symbolUtil']
	, function(on, dom, FeatureLayer, SimpleRenderer, Popup, PopupTemplate, symbolUtil) {
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
          description: "{WRIAnumber} : {ChangeAgentName} \n Plus the size was {AreaAcres}",
          fieldInfos: [{ //define field infos so we can specify an alias
            fieldName: "WRIAnumber",
            label: "Entrants"
          }]
        });


			var hrcdLayer = new FeatureLayer(HRCD_URL, {
				id: 'hrcd',
				outFields: ['*'],
				infoTemplate: template
			});

 			

			var renderer = new SimpleRenderer(symbolUtil.renderSymbol());

			hrcdLayer.setRenderer(renderer);


			on(dom.byId('changeAgent'), 'change', function(e){
			var changeAgent = e.target.value;
			console.log('changeAgent value is ' + changeAgent);
			if(changeAgent.length > 0) {
				hrcdLayer.setDefinitionExpression('ChangeAgentCode > ' + changeAgent);
			}
			});

			
		
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
/*
Webpages for reference
https://developers.arcgis.com/javascript/jsapi/popuptemplate.html#

https://developers.arcgis.com/javascript/jshelp/intro_formatinfowindow.html


HRCD Field information
OBJECTID ( type: esriFieldTypeOID , alias: OBJECTID )
WRIAnumber ( type: esriFieldTypeInteger , alias: WRIA number )
LandCover06ClassCode ( type: esriFieldTypeInteger , alias: 2006 Land Cover Classification code )
LandCover06ClassName ( type: esriFieldTypeString , alias: 2006 Land Cover Classification name , length: 45 )
ChangeAgentCode ( type: esriFieldTypeInteger , alias: Change Agent code )
ChangeAgentName ( type: esriFieldTypeString , alias: Change Agent name , length: 20 )
TotalChangePercent ( type: esriFieldTypeDouble , alias: Total Change (percent) )
TreeDecreasePercent ( type: esriFieldTypeDouble , alias: Tree Decrease (percent) )
ImperviousIncreasePercent ( type: esriFieldTypeDouble , alias: Impervious Increase (percent) )
SemiperviousIncreasePercent ( type: esriFieldTypeDouble , alias: Semi-pervious Increase (percent) )
StartYear ( type: esriFieldTypeInteger , alias: Start Year )
EndYear ( type: esriFieldTypeInteger , alias: End Year )
AreaAcres ( type: esriFieldTypeDouble , alias: Area (acres) )
ElevationFeet ( type: esriFieldTypeDouble , alias: Elevation (feet) )
Phase1IDNumber ( type: esriFieldTypeString , alias: Phase 1 Identification Number , length: 15 )
Shape ( type: esriFieldTypeGeometry , alias: Shape )
Shape.STArea() ( type: esriFieldTypeDouble , alias: Shape.STArea() )
Shape.STLength() ( type: esriFieldTypeDouble , alias: Shape.STLength() )
*/