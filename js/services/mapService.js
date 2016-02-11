define([
	'dojo/on',
	'dojo/dom',
	'esri/layers/FeatureLayer',
	'esri/layers/ArcGISImageServiceLayer',
	'esri/renderers/SimpleRenderer',
	"esri/dijit/Popup", 
	"esri/dijit/PopupTemplate",
	"esri/InfoTemplate",
	'utils/symbolUtil']
	, function(on, dom, FeatureLayer, ArcGISImageServiceLayer, SimpleRenderer, Popup, PopupTemplate, InfoTemplate, symbolUtil) {
		function _loadServices(config){

		
			var REQUEST_URL = 'http://services.arcgis.com/rcya3vExsaVBGUDp/arcgis/rest/services/testTrees/FeatureServer/0'
   			var HRCD_URL = 'http://gispublic.dfw.wa.gov/arcgis/rest/services/ApplicationServices/PugetSoundHighResolutionChangeDetection/MapServer/1'
			var wa_countyURL = 'https://services.arcgis.com/jsIt88o09Q0r1j8h/arcgis/rest/services/StateBoundary/FeatureServer/0/query?outFields=*&where=&geometry={"xmin":-15181111.166244071,"ymin":5623514.765600957,"xmax":-11717596.540587086,"ymax":6357310.237138454,"spatialReference":{"wkid":102100}}'

			var ugaURL = 'https://services.arcgis.com/6lCKYNJLvwTXqrmp/arcgis/rest/services/Urban_Growth_Areas/FeatureServer/0/query?outFields=*&where=1%3D1'

			var wriaURL = 'https://services.arcgis.com/6lCKYNJLvwTXqrmp/arcgis/rest/services/WAECY_WRIA/FeatureServer/0/query?outFields=*&where=1%3D1'
			var ecyRiparian = 'https://services.arcgis.com/6lCKYNJLvwTXqrmp/arcgis/rest/services/Riparian_Buffer_Width_50/FeatureServer/1/query?outFields=*&where=1%3D1'
			var smaWater = 'https://services.arcgis.com/6lCKYNJLvwTXqrmp/arcgis/rest/services/ShorelineManagementActJurisdiction/FeatureServer/1/query?outFields=*&where=1%3D1'

			var nhdFlowWA = 'https://fortress.wa.gov/ecy/ecyprodgislb/arcgis/rest/services/NHD/NHD_Hydro_Cache/MapServer/0/query?outFields=*&where=&geometry={"xmin":-17087417.732927736,"ymin":5365255.679137867,"xmax":-9685867.410019517,"ymax":6832846.622212861,"spatialReference":{"wkid":102100}}'


			var naip2015 = 'http://gis.apfo.usda.gov/arcgis/rest/services/NAIP/Washington_2015_1m/ImageServer'
			var naip2013 = 'http://wagda.lib.washington.edu:6080/arcgis/rest/services/Imagery_services/NAIP_2013/ImageServer'
			var naip2011 = 'http://wagda.lib.washington.edu:6080/arcgis/rest/services/Imagery_services/NAIP_2011/ImageServer'
			var naip2009 = 'http://wagda.lib.washington.edu:6080/arcgis/rest/services/Imagery_services/NAIP_2009/ImageServer'
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


		var hrcdInfoTemplate = new InfoTemplate("Attributes", "Change percentage: ${TotalChangePercent}<br>Change Agent: ${ChangeAgentName}<br>Canopy Loss: ${TreeDecreasePercent}<br>Increased impervious surface: ${ImperviousIncreasePercent}<br>Acres: ${AreaAcres}<br>WRIA: ${WRIAnumber}");


			var hrcdLayer = new FeatureLayer(HRCD_URL, {
				id: 'hrcd',
				outFields: ['*'],
				infoTemplate: hrcdInfoTemplate,
				visible: false
			});

 			var ugaLayer = new FeatureLayer(ugaURL, {
 				id: 'uga',
 				outFields: ['*'],
 				visible: false
 			});

			var naip2015Layer = new ArcGISImageServiceLayer(naip2015, {
 				id: 'naip2015',
 				visible: false
 			});

			var naip2013Layer = new ArcGISImageServiceLayer(naip2013, {
 				id: 'naip2013',
 				visible: false
 			});
 			var naip2011Layer = new ArcGISImageServiceLayer(naip2011, {
 				id: 'naip2011',
 				visible: false
 			});
			var naip2009Layer = new ArcGISImageServiceLayer(naip2009, {
 				id: 'naip2009',
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
	layers.push(naip2009Layer);
	layers.push(naip2011Layer);
	layers.push(naip2013Layer);
	layers.push(naip2015Layer);
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