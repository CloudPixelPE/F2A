/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/format/FileSizeFormat','sap/ui/model/SimpleType'],function(q,F,S){"use strict";var a=S.extend("sap.ui.model.type.FileSize",{constructor:function(){S.apply(this,arguments);this.sName="FileSize"}});a.prototype.formatValue=function(v,i){var V;if(v==undefined||v==null){return null}if(this.oInputFormat&&typeof v==="string"){V=this.oInputFormat.parse(v);if(isNaN(V)){throw new sap.ui.model.FormatException("Cannot format file size: "+v+" has the wrong format")}}else if(!this.oInputFormat&&typeof v==="string"){throw new sap.ui.model.FormatException("Cannot format file size: "+v+" of type string without input/source formatter")}else if(typeof v==="number"){V=v}else{throw new sap.ui.model.FormatException("Cannot format file size: "+v+" has wrong type: "+(typeof v))}if(V==undefined||V==null){return null}switch(i){case"string":return this.oOutputFormat.format(V);case"int":return Math.floor(V);case"float":return V;default:throw new sap.ui.model.FormatException("Don't know how to format FileSize to "+i)}};a.prototype.parseValue=function(v,i){var r;if(v==undefined||v==null){return null}switch(i){case"string":r=this.oOutputFormat.parse(v);if(isNaN(r)){throw new sap.ui.model.ParseException(v+" is not a valid FileSize value")}break;case"int":case"float":r=v;break;default:throw new sap.ui.model.ParseException("Don't know how to parse FileSize from "+i)}if(this.oInputFormat){r=this.oInputFormat.format(r)}return r};a.prototype.validateValue=function(v){if(this.oConstraints){var V=[],i=this.oInputFormat;if(i&&typeof v==="string"){v=i.parse(v)}else if(!i&&typeof v==="string"){throw new Error("No Validation possible: '"+v+"' is of type string but not input/source format specified.")}q.each(this.oConstraints,function(n,c){if(i&&typeof c==="string"){c=i.parse(c)}else if(!i&&typeof c==="string"){throw new Error("No Validation possible: Compare value ("+n+") '"+c+"' is of type string but not input/source format specified.")}switch(n){case"minimum":if(v<c){V.push("minimum")}break;case"maximum":if(v>c){V.push("maximum")}}});if(V.length>0){throw new sap.ui.model.ValidateException("Validation of type constraints failed",V)}}};a.prototype.setFormatOptions=function(f){this.oFormatOptions=f;this._handleLocalizationChange()};a.prototype._handleLocalizationChange=function(){this.oOutputFormat=F.getInstance(this.oFormatOptions);if(this.oFormatOptions.source){this.oInputFormat=F.getInstance(this.oFormatOptions.source)}};return a},true);