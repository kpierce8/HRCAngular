/*global define*/
define([
	'esri/Color',
	'esri/symbols/SimpleFillSymbol',
	'esri/symbols/SimpleLineSymbol'
	], function(Color, SimpleFillSymbol, SimpleLineSymbol) {
		return {
			renderSymbol: function() {
				return new SimpleFillSymbol(
					//outline of symbol
					SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,255,255]), 1),
					//fill of symbol
					new Color([128,178,120, 0.4]));
			}
		};
	});