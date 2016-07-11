/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.viz.ui5.vizcontainer.common.managers.DragManager");jQuery.sap.require("sap.viz.ui5.vizcontainer.common.feeds.AnalysisObject");sap.viz.ui5.vizcontainer.common.managers.DragManager={};
sap.viz.ui5.vizcontainer.common.managers.DragManager.enableDraggableFeeding=function(d,a){var i=a?sap.viz.ui5.vizcontainer.common.feeds.AnalysisObject.toInstances([a])[0]:undefined;if(i)sap.viz.controls.common.managers.DragManager.enableDraggableFeeding(d,i)};
sap.viz.ui5.vizcontainer.common.managers.DragManager.disableDraggableFeeding=function(d){sap.viz.controls.common.managers.DragManager.disableDraggableFeeding(d)};
sap.viz.ui5.vizcontainer.common.managers.DragManager.getDefaultHelper=function(d){return sap.viz.controls.common.managers.DragManager.getDefaultHelper(d)};
