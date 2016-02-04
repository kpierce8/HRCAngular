define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/on',
	'dojo/query',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/dom-attr',
	'dojo/dom-class',
	'esri/graphic',
	'text!widgets/edit/editTools.tpl.html'
	], function(declare, lang, on, query, _WidgetBase, _TemplatedMixin, domAttr, domClass, Graphic, template) {
		return declare([_WidgetBase, _TemplatedMixin], 
			{	
			//declaredClass: 'widgets.edit.EditTools',
			templateString: template,
			options: {},
			editing: false,
			map: null,
			handler: null,
			constructor: function(options) {
				//this.inherited(arguments);
				this.options = options || {};
				this.map = this.options.map;
				this.requestLayer = this.map.getLayer('testTrees');
			},
			postCreate: function() {
				this.handler = on.pausable(
					this.map, 'click', lang.hitch(this, '_addPoint'));
				this.handler.pause();
				this.own(
					this.handler,
					on(this.editNode, 'click', lang.hitch(this, '_addRequest'))
					);
			},

			startup: function(){
				this._init();
			},

			destroy: function(){
				this.inherited(arguments);
			},

			_init: function() {
			},

			_addRequest: function() {
			if (this.editing == false) {
				this.editing = true;
			}
				
				this._toggleEditButton();
			},
			_addPoint: function(e){
				console.log(e);
				console.log("post e");
				var mapPt = e.mapPoint
				, census = e.graphic
				, attributes = {}
				, graphic;
				description = prompt('Add a description');
				attributes.description = description;
				attributes.collectionDate = new Date().getTime();
				if (typeof census != 'undefined') {
				attributes.userName = census.attributes.NAME;
				} else {
					attributes.userName = "ken";
				}
				graphic = new Graphic(mapPt, null, attributes);
				this.requestLayer.applyEdits([graphic]).then(lang.hitch(this,
					function(){
						this._toggleEditButton();
						alert('Request submitted');
					}))

				
			},
			_toggleEditButton: function() {
				console.log("toggling")
				this.Editing = !this.Editing;

				if (this.editing == true) {
					console.log("toggling with this.editing true");
					this.editNode.innerHTML = 'Adding Request';
					this.handler.resume();
				} else {
					this.editNode.innerHTML = 'Add Request';
					this.handler.pause();
					console.log("toggling with this.editing false");
				}
				domClass.toggle(this.editNode, 'btn-primary');
				domClass.toggle(this.editNode, 'btn-success');
			}

		});
	});