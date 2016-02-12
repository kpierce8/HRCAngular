define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/on',
	'dojo/Deferred',
	'esri/map'
	], function(declare, lang, on, Deferred, Map) {
		
		var renderers = {};

      var outline09 = [200, 100, 100, 255];
      var outline11 = [100, 100, 200, 255];
      var devColor = [255, 0, 0, 128];
      var forestryColor = [0, 255, 0, 128];
      var treeColor = [100, 255, 100, 128];


			var uvrHRCD09 = {"type" : "uniqueValue",
			"field1":"ChangeAgentCode",
			"defaultSymbol" : {
				"color" : [100, 100, 100, 255],
				"outline": {
					"color" : outline09,
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
        			"color": devColor,
        			"outline": {
          				"color": outline09,
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
        			"color": forestryColor,
        			"outline": {
          				"color": outline09,
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
        			"color": treeColor,
        			"outline": {
          				"color": outline09,
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
          				"color": outline09,
          				"width": 1,
          				"type": "esriSLS",
          				"style": "esriSLSSolid"
        				},
       			 "type": "esriSFS",
        		 "style": "esriSFSSolid"
      			}
    		}]
			}


var uvrHRCD11 = {"type" : "uniqueValue",
      "field1":"ChangeAgentCode",
      "defaultSymbol" : {
        "color" : [100, 100, 100, 255],
        "outline": {
          "color" : outline11,
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
              "color": devColor,
              "outline": {
                  "color": outline11,
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
              "color": forestryColor,
              "outline": {
                  "color": outline11,
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
              "color": treeColor,
              "outline": {
                  "color": outline11,
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
                  "color": outline11,
                  "width": 1,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
                },
             "type": "esriSFS",
             "style": "esriSFSSolid"
            }
        }]
      }


		renderers.uvrHRCD09 = uvrHRCD09;
    renderers.uvrHRCD11 = uvrHRCD11;

		return renderers;

	});