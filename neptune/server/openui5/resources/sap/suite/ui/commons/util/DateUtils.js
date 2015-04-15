/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.util.DateUtils");
sap.suite.ui.commons.util.DateUtils=function(){throw new Error()};
sap.suite.ui.commons.util.DateUtils.resetDateToStartOfDay=function(d){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)){d.setHours(0);d.setMinutes(0);d.setSeconds(0);d.setMilliseconds(0)}};
sap.suite.ui.commons.util.DateUtils.resetDateToEndOfDay=function(d){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)){d.setHours(23);d.setMinutes(59);d.setSeconds(59);d.setMilliseconds(999)}};
sap.suite.ui.commons.util.DateUtils.resetDateToStartOfMonth=function(d){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)){d.setDate(1);sap.suite.ui.commons.util.DateUtils.resetDateToStartOfDay(d)}};
sap.suite.ui.commons.util.DateUtils.resetDateToEndOfMonth=function(d){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)){d.setDate(1);d.setMonth(d.getMonth()+1);d.setDate(0);sap.suite.ui.commons.util.DateUtils.resetDateToEndOfDay(d)}};
sap.suite.ui.commons.util.DateUtils.resetDateToStartOfYear=function(d){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)){d.setMonth(0);sap.suite.ui.commons.util.DateUtils.resetDateToStartOfMonth(d)}};
sap.suite.ui.commons.util.DateUtils.resetDateToEndOfYear=function(d){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)){d.setMonth(11);sap.suite.ui.commons.util.DateUtils.resetDateToEndOfMonth(d)}};
sap.suite.ui.commons.util.DateUtils.resetDateToStartOfWeek=function(d,f){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)){if(f===undefined){f=1}else if(isNaN(f)||!isFinite(f)){jQuery.sap.log.error("DateUtils iFirstDayOfWeek value ='"+f+"' is invalid.");return}d.setDate(d.getDate()-(d.getDay()-f+7)%7);sap.suite.ui.commons.util.DateUtils.resetDateToStartOfDay(d)}};
sap.suite.ui.commons.util.DateUtils.resetDateToEndOfWeek=function(d,s){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)){var a;if(s&&!(s instanceof Object)){jQuery.sap.log.error("DateUtils oSettings is not an object.");return}if(!s){s={}}if(s.iDuration===undefined){a=7}else{a=s.iDuration;if(isNaN(a)||!isFinite(a)){jQuery.sap.log.error("DateUtils duration value ='"+a+"' is invalid.");return}}sap.suite.ui.commons.util.DateUtils.resetDateToStartOfWeek(d,s.iFirstDayOfWeek);d.setDate(d.getDate()+a-1);sap.suite.ui.commons.util.DateUtils.resetDateToEndOfDay(d)}};
sap.suite.ui.commons.util.DateUtils.isValidDate=function(d){if(Object.prototype.toString.call(d)!=="[object Date]"||isNaN(d.getTime())){jQuery.sap.log.error("DateUtils invalid date="+d);return false}return true};
sap.suite.ui.commons.util.DateUtils.dateDaysEqual=function(d,D){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)&&sap.suite.ui.commons.util.DateUtils.isValidDate(D)){return(d.getFullYear()===D.getFullYear()&&d.getMonth()===D.getMonth()&&d.getDate()===D.getDate())}return false};
sap.suite.ui.commons.util.DateUtils.dateMonthsEqual=function(d,D){if(sap.suite.ui.commons.util.DateUtils.isValidDate(d)&&sap.suite.ui.commons.util.DateUtils.isValidDate(D)){return(d.getFullYear()===D.getFullYear()&&d.getMonth()===D.getMonth())}return false};
sap.suite.ui.commons.util.DateUtils.incrementDateByIndex=function(s,i){var r=null;if(sap.suite.ui.commons.util.DateUtils.isValidDate(s)&&isFinite(i)){r=new Date(s);r.setDate(s.getDate()+parseInt(i,10))}return r};
sap.suite.ui.commons.util.DateUtils.incrementMonthByIndex=function(s,i){var r=null;if(sap.suite.ui.commons.util.DateUtils.isValidDate(s)&&isFinite(i)){r=new Date(s);sap.suite.ui.commons.util.DateUtils.resetDateToStartOfMonth(r);r.setMonth(s.getMonth()+parseInt(i,10))}return r};
sap.suite.ui.commons.util.DateUtils.numberOfMonthsApart=function(s,e){s=new Date(s);e=new Date(e);sap.suite.ui.commons.util.DateUtils.resetDateToStartOfMonth(s);sap.suite.ui.commons.util.DateUtils.resetDateToStartOfMonth(e);var f=s.getTime()<=e.getTime();var F=0,b=0,n=0;for(F=0,b=0;!(s.getDate()===e.getDate()&&s.getMonth()===e.getMonth()&&s.getFullYear()===e.getFullYear());F++,b--){if(f){s.setMonth(s.getMonth()+1)}else{s.setMonth(s.getMonth()-1)}}if(f){n=F}else{n=b}return n};
sap.suite.ui.commons.util.DateUtils.numberOfDaysApart=function(s,e){s=new Date(s);e=new Date(e);sap.suite.ui.commons.util.DateUtils.resetDateToStartOfDay(s);sap.suite.ui.commons.util.DateUtils.resetDateToStartOfDay(e);var f=s.getTime()<=e.getTime();var F=0,b=0,n=0;for(F=0,b=0;!(s.getDate()===e.getDate()&&s.getMonth()===e.getMonth()&&s.getFullYear()===e.getFullYear());F++,b--){if(f){s.setDate(s.getDate()+1)}else{s.setDate(s.getDate()-1)}}if(f){n=F}else{n=b}return n};
