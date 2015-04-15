/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.viz.ui5.vizcontainer.services.FakeDataService");jQuery.sap.require("sap.viz.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.viz.ui5.vizcontainer.services.FakeDataService",{metadata:{library:"sap.viz",properties:{"vizType":{type:"string",group:"Misc",defaultValue:null}},aggregations:{"feedItem":{type:"sap.viz.ui5.vizcontainer.common.feeds.FeedItem",multiple:false},"rawDataSet":{type:"sap.viz.ui5.data.Dataset",multiple:false}}}});jQuery.sap.require("sap.viz.ui5.vizcontainer.common.feeds.AnalysisObject");jQuery.sap.reuqire("sap.viz.ui5.vizcontainer.common.feeds.FeedItem");jQuery.sap.reuqire("sap.viz.ui5.data.Dataset");
sap.viz.ui5.vizcontainer.services.FakeDataService._create=function(v,r,f){if(v&&r&&f){this._instance=new sap.viz.controls.services.FakeDataService(v,r,f.getFeedItem())}else{this._sVizType=v;this._oRawDataSet=r;this._oFeedItem=f}};
sap.viz.ui5.vizcontainer.services.FakeDataService.prototype.init=function(){this._sVizType=null;this._oRawDataSet=null;this._oFeedItem=null};
sap.viz.ui5.vizcontainer.services.FakeDataService.prototype.setVizType=function(v){this._create(v,this.getRawDataSet(),this.getFeedItem());return this};
sap.viz.ui5.vizcontainer.services.FakeDataService.prototype.getVizType=function(){return this._instance?this._instance.vizType():this._sVizType};
sap.viz.ui5.vizcontainer.services.FakeDataService.prototype.setRawDataSet=function(v){this.setAggregation('rawDataSet',v);this._create(this.getVizType(),v,this.getFeedItem());return this};
sap.viz.ui5.vizcontainer.services.FakeDataService.prototype.setFeedItem=function(v){this.setAggregation('feedItem',v);this._create(this.getVizType(),this.getRawDataSet(),v);return this};
sap.viz.ui5.vizcontainer.services.FakeDataService.prototype.getVizDataset=function(){return this._instance?this._instance.getVizDataset():undefined};
