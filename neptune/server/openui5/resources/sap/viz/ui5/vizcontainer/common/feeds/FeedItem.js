/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.viz.ui5.vizcontainer.common.feeds.FeedItem");jQuery.sap.require("sap.viz.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.viz.ui5.vizcontainer.common.feeds.FeedItem",{metadata:{library:"sap.viz",properties:{"uid":{type:"string",group:"Misc",defaultValue:null},"type":{type:"string",group:"Misc",defaultValue:null}},aggregations:{"values":{type:"sap.viz.ui5.vizcontainer.common.feeds.AnalysisObject",multiple:true,singularName:"value"}}}});jQuery.sap.require("sap.viz.ui5.vizcontainer.common.feeds.AnalysisObject");
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype._create=function(u,t,v){if(u&&t){var n=[];if(v){n=sap.viz.ui5.vizcontainer.common.feeds.AnalysisObject.toInstances(v)}this._instance=new sap.viz.controls.common.feeds.FeedItem(u,t,n)}else{this._requestedUid=u;this._requestedType=t}};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype.init=function(){this._requestedUid=null;this._requestedType=null};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype.getUid=function(){return this._instance?this._instance.id():this._requestedUid};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype.setUid=function(i){this._create(i,this.getType(),this.getValues());return this};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype.getType=function(){return this._instance?this._instance.type():this._requestedType};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype.setType=function(t){this._create(this.getUid(),t,this.getValues());return this};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype.addValue=function(v){this.addAggregation('values',v);this._create(this.getUid(),this.getType(),this.getValues());return this};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype.destroyValues=function(){this.destroyAggregation('values');this._create(this.getUid(),this.getType(),this.getValues());return this};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.prototype._setValues=function(v){this.destroyValues();if(v&&v.length){for(var i=0;i<v.length;i++){this.addValue(v[i])}}return this};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.fromJSON=function(j){return sap.viz.controls.common.feeds.FeedItem.fromJSON(j)};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.toJSON=function(o){return sap.viz.controls.common.feeds.FeedItem.toJSON(o)};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.toFeeds=function(a){return Array.prototype.map.call(a,function(b,i,c){return new sap.viz.ui5.vizcontainer.common.feeds.FeedItem({'uid':b.id(),'type':b.type(),'values':sap.viz.ui5.vizcontainer.common.feeds.AnalysisObject.toAnalysisObjects(b.values())})})};
sap.viz.ui5.vizcontainer.common.feeds.FeedItem.toInstances=function(f){return Array.prototype.map.call(f,function(a,i,b){return a._instance})};
