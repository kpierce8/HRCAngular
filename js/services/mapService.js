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
			var wa_countyURL = 'https://services.arcgis.com/jsIt88o09Q0r1j8h/arcgis/rest/services/StateBoundary/FeatureServer/0/query?outFields=*&where=&geometry={"xmin":-15181111.166244071,"ymin":5623514.765600957,"xmax":-11717596.540587086,"ymax":6357310.237138454,"spatialReference":{"wkid":102100}}'

			var ugaURL = 'https://services.arcgis.com/6lCKYNJLvwTXqrmp/arcgis/rest/services/Urban_Growth_Areas/FeatureServer/0/query?outFields=*&where=1%3D1'

			var wriaURL = 'https://services.arcgis.com/6lCKYNJLvwTXqrmp/arcgis/rest/services/WAECY_WRIA/FeatureServer/0/query?outFields=*&where=1%3D1'


			var layers = [];

			// var	requestLayer = new FeatureLayer(REQUEST_URL, {
			// 	id: 'testTrees',
			// 	mode: FeatureLayer.MODE_ONDEMAND,
			// 	outFields: ['*']
			// });

		var hrcdTemplate = new PopupTemplate({
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
				infoTemplate: hrcdTemplate
			});

 			var ugaLayer = new FeatureLayer(ugaURL, {
 				id: 'uga',
 				outFields: ['*'],
 				visible: false
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
	layers.push(ugaLayer);
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