define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/on',
	'dojo/Deferred',
	'esri/map'
	], function(declare, lang, on, Deferred, Map) {
		
		var renderers = {};

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
        			"color": [90, 0, 55, 128],
        			"outline": {
          				"color": [180, 105, 100, 255],
          				"width": 1,
          				"type": "esriSLS",
          				"style": "esriSLSSolid"
        				},
       			 "type": "esriSFS",
        		 "style": "esriSFSSolid"
      			}
    		}]
			}

		renderers.uvrHRCD = uvrHRCD;

		return renderers;

	});