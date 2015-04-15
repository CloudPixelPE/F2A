function initPushWoosh(){if("undefined"!=typeof window.plugins){var e=window.plugins.pushNotification;"Android"===sap.ui.Device.os.name?(document.addEventListener("push-notification",function(e){var a=e.notification.title;e.notification.foreground===!0&&navigator.notification.alert(a)}),e.onDeviceReady({projectid:AppCache.GoogleID,appid:AppCache.PushWooshID}),e.registerDevice(function(e){AppCache.PhoneID=JSON.stringify(e)},function(){})):"winphone"==sap.ui.Device.os.name?(document.addEventListener("push-notification",function(e){var a=e.notification.content;e.notification.onStart===!1&&navigator.notification.alert(a.replace(/\+/g," "))}),e.onDeviceReady({appid:AppCache.PushWooshID,serviceName:""}),e.registerDevice(function(e){AppCache.PhoneID=JSON.stringify(e)},function(){})):"iOS"===sap.ui.Device.os.name&&(document.addEventListener("push-notification",function(a){var p=a.notification;a.notification.foreground===!0&&navigator.notification.alert(p.aps.alert),e.setApplicationIconBadgeNumber(0)}),e.onDeviceReady({pw_appid:AppCache.PushWooshID}),e.registerDevice(function(e){var a=e.deviceToken;AppCache.PhoneID=a},function(){}),e.setApplicationIconBadgeNumber(0))}}function initPushSMP(){if("undefined"!=typeof window.plugins){var e=window.plugins.pushNotification;"Android"===sap.ui.Device.os.name?e.register(pushSuccessHandler,pushErrorHandler,{senderID:AppCache.GoogleID,ecb:"onNotificationGCM"}):"iOS"===sap.ui.Device.os.name&&e.register(pushTokenHandler,pushErrorHandler,{badge:"true",sound:"true",alert:"true",ecb:"onNotificationAPNS"})}}function pushSuccessHandler(){}function pushErrorHandler(e){alert("Push Notification Error:"+e)}function pushTokenHandler(e){AppCache.PhoneID=e}function onNotificationGCM(e){switch(e.event){case"registered":e.regid.length>0&&(AppCache.PhoneID=e.regid);break;case"message":navigator.notification.alert(e.payload.alert);break;case"error":alert("GCM Error: "+e.msg);break;default:alert("An unknown GCM event has occurred")}}function onNotificationAPNS(e){e.alert&&navigator.notification.alert(e.alert),e.badge&&pushNotification.setApplicationIconBadgeNumber(pushSuccessHandler,e.badge)}function pushSMPRegisterAndroid(e){var a='<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"><content type="application/xml"><m:properties><d:AndroidGcmRegistrationId>'+e+"</d:AndroidGcmRegistrationId ></m:properties></content></entry>",p=AppCache.Url+"/odata/applications/latest/"+AppCache.smpApplication+"/Connections('"+AppCache.deviceID+"')";$.ajax({type:"POST",headers:{"X-HTTP-METHOD":"MERGE","Content-Type":"application/atom+xml"},url:p,data:a})}function pushSMPRegisteriOS(e){var a='<?xml version="1.0" encoding="UTF-8"?> <entry xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"><content type="application/xml"><m:properties><d:ApnsDeviceToken>'+e+"</d:ApnsDeviceToken></m:properties></content></entry>",p=AppCache.Url+"/odata/applications/latest/"+AppCache.smpApplication+"/Connections('"+AppCache.deviceID+"')";$.ajax({type:"POST",headers:{"X-HTTP-METHOD":"MERGE","Content-Type":"application/atom+xml"},url:p,data:a})}var AppCache={Initialized:!1,Encrypted:"",CurrentUser:"",CurrentUname:"",CurrentApp:"",CurrentConfig:"",PreviousApp:new Array,AppVersion:"",StartApp:"",Url:"",UrlBase:"",Client:"",Passcode:"",Auth:"",enablePasscode:!0,enableMocana:!1,enableSMP:!1,enablePush:!1,enablePortal:!1,enableTwoFactor:!1,enableEncryption:!1,alwaysTwoFactor:!1,pushProvider:"",numPasscode:5,PasscodeApp:"",deviceType:"",deviceID:"",smpApplication:"",GoogleID:"",PushWooshID:"",PhoneID:"",AppID:"",xmlString:"",PortalUrl:"",PortalLogoffUrl:"",inLogon:!1,Load:function(e){e=e.toUpperCase(),sap.ui.core.BusyIndicator.show(),AppCache.CurrentApp&&AppCache.PreviousApp.unshift(AppCache.CurrentApp),AppCache.CurrentApp=e,AppCache.setEnableLogonScreen(!1),$.sap.require("jquery.sap.storage");var a=$.sap.storage(jQuery.sap.storage.Type.local),p="AppCache_"+e,t=a.get(p);if(t){AppCache.Initialized===!0&&"function"==typeof AppDestroy&&AppDestroy();var s=!!window.Windows&&/^ms-appx:/.test(location.href);s===!0?MSApp.execUnsafeLocalFunction(function(){$("#AppCache_Wrapper").html(t).trigger("create");var e=document.getElementById("AppCache_Wrapper"),a=e.getElementsByTagName("script"),p=a[0],s=p.textContent;$.globalEval(s)}):$("#AppCache_Wrapper").html(t).trigger("create"),AppCache.Initialized=!0;var n=ModelData.Find(AppCacheData,"APPLID",e);if(0===n.length){var o={};o.APPLID=e,ModelData.Add(AppCacheData,o),setCacheAppCacheData()}}else{if(modelAppCacheData.getData().length){var c=modelAppCacheData.getData();$.each(c,function(a,p){p&&p.APPLID==e&&c.splice(a,1)}),modelAppCacheData.setData(c),setCacheAppCacheData()}getOnlineAppCacheContent(e)}},Update:function(){var e,a;AppCache.inLogon=!1,sap.ui.core.BusyIndicator.show(),getOnlineAppCacheData(AppCache.CurrentConfig),AppCache.enablePush===!0&&(e=AppCache.UrlBase+"/neptune/native/neptune_login_ping.html",a="SMP"===AppCache.pushProvider?"phone-os="+sap.ui.Device.os.name+"&phone-id="+AppCache.deviceID+"&key="+AppCache.CurrentConfig+"&phone-provider="+AppCache.pushProvider:"phone-os="+sap.ui.Device.os.name+"&phone-id="+AppCache.PhoneID+"&key="+AppCache.CurrentConfig+"&phone-provider="+AppCache.pushProvider,$.ajax({type:"POST",url:e,data:a,success:function(){},error:function(){}})),AppCache.enablePush===!0&&"SMP"===AppCache.pushProvider&&AppCache.PhoneID&&("Android"===sap.ui.Device.os.name&&pushSMPRegisterAndroid(AppCache.PhoneID),"iOS"===sap.ui.Device.os.name&&pushSMPRegisteriOS(AppCache.PhoneID))},Back:function(){AppCache.PreviousApp.length>0&&(AppCache.PreviousApp==AppCache.PasscodeApp?AppCache.Lock():AppCache.Load(AppCache.PreviousApp[0]),AppCache.PreviousApp.splice(0,2))},setEnableCaptchaScreen:function(e){AppCache_boxCaptcha.setVisible(e),AppCache_statusItem.setInfo(),setTimeout(function(){AppCache_inCaptcha.focus()},200)},setEnablePasscodeScreen:function(e){AppCache_boxPasscode.setVisible(e),AppCache_statusItem.setInfo(),setTimeout(function(){AppCache_inPasscode1.focus()},200)},setEnablePasswordScreen:function(e){AppCache_boxPassword.setVisible(e),AppCache_statusItem.setInfo(),setTimeout(function(){AppCache_inPassOld.focus()},200)},setEnableUsersScreen:function(e){AppCache_boxUsers.setVisible(e),AppCache_statusItem.setInfo(),AppCacheUsers.removeSelections()},setEnableLogonScreen:function(e){AppCache_boxLogon.setVisible(e),AppCache_statusItem.setInfo(),setTimeout(function(){AppCache_inUsername.focus()},200)},Logout:function(){AppCache.Initialized===!0&&"function"==typeof AppDestroy&&AppDestroy(),AppCache.setEnableLogonScreen(!0),AppCache.setEnablePasscodeScreen(!1),AppCache.setEnableUsersScreen(!1),AppCache_listStatus.setVisible(!0),AppCache.Initialized=!1,NumPad.numPasscode=0,NumPad.numValue="",AppCache.Encrypted="",AppCache_inUsername.setValue(),setTimeout(function(){AppCache_inUsername.focus()},200);var e;e=AppCache.enablePortal===!0?AppCache.PortalLogoffUrl:AppCache.UrlBase+"/neptune/native/neptune_login_ping.html?sap-clearsso2",$.ajax({type:"POST",url:e,success:function(){AppCache_statusItem.setInfo(AppCacheText.userLogout)}}),AppCache.Auth="",$.ajaxSetup({headers:{Authorization:AppCache.Auth}}),AppCache.enableMocana!==!0&&modelAppCacheUsers.getData().length&&AppCache_butSelect.setVisible(!0)},PortalRelog:function(){var e=AppCache.PortalUrl,a=AppCache.Auth;$.ajax({type:"POST",url:e,data:a,success:function(e,a,p){var t=p.getResponseHeader("SAPLoginStatus");switch(null===t&&($(e).find("#logonretypepassfield").length>0?t="Password":$(e).find("#logonuidfield").length>0&&(t="Logon")),t){case"Logon":return AppCache_inPassword.setValue(),AppCache_statusItem.setInfo(AppCacheText.wrongUserPass),void setTimeout(function(){AppCache_inPassword.focus()},200);case"Password":return AppCache_statusItem.setInfo(p.getResponseHeader("SAPLoginMessage")),AppCache.setEnablePasswordScreen(!0),AppCache.setEnableLogonScreen(!1),AppCache.setEnableUsersScreen(!1),AppCache_inPassOld.setValue(AppCache_inPassword.getValue()),void setTimeout(function(){AppCache_inPassNew.focus()},200)}},error:function(){}}),AppCache.Encrypted="",AppCache.Update()},Logon:function(){if(AppCache.setEnableLogonScreen(!0),AppCache.inLogon=!0,""===AppCache_inUsername.getValue())return AppCache_statusItem.setInfo(AppCacheText.enterUsername),void setTimeout(function(){AppCache_inUsername.focus()},200);if(""===AppCache_inPassword.getValue())return AppCache_statusItem.setInfo(AppCacheText.enterPassword),void setTimeout(function(){AppCache_inPassword.focus()},200);var e,a;sap.ui.core.BusyIndicator.show();var p=AppCache_inUsername.getValue()+":"+AppCache_inPassword.getValue(),t=Base64.encode(p);AppCache.enablePortal===!0?(AppCache.Auth="j_user="+AppCache_inUsername.getValue()+"&j_password="+AppCache_inPassword.getValue()+"&login_submit=on&login_do_redirect=1",e=AppCache.PortalUrl,a=AppCache.Auth):(AppCache.Auth="Basic "+t,e=AppCache.UrlBase+"/neptune/native/neptune_login_ping.html",a="sap-user="+AppCache_inUsername.getValue()+"&sap-password="+AppCache_inPassword.getValue()+"&sap-client="+AppCache.Client,$.ajaxSetup({headers:{Authorization:AppCache.Auth}})),$.ajax({type:"POST",url:e,data:a,statusCode:{401:function(){AppCache.enableSMP===!0&&AppCache.Onboard()},404:function(){AppCache.enableSMP===!0&&AppCache.Onboard()}},success:function(e,a,p){AppCache_statusItem.setInfo(p.getResponseHeader("SAPLoginMessage")),sap.ui.core.BusyIndicator.hide();var t=p.getResponseHeader("SAPLoginMessage"),s=p.getResponseHeader("SAPLoginStatus");switch(AppCache.enablePortal===!0&&($(e).find("#logonretypepassfield").length>0?s="Password":$(e).find("#logonuidfield").length>0&&(s="Logon",t="Wrong username or password")),s){case"Logon":return AppCache_inPassword.setValue(),AppCache_statusItem.setInfo(t),void setTimeout(function(){AppCache_inPassword.focus()},200);case"Password":return AppCache.setEnablePasswordScreen(!0),AppCache.setEnableLogonScreen(!1),AppCache.setEnableUsersScreen(!1),AppCache_inPassOld.setValue(AppCache_inPassword.getValue()),void setTimeout(function(){AppCache_inPassNew.focus()},200)}return AppCache_inPassword.setValue(),AppCache.enableMocana===!0?(NumPad.Verify=!0,AppCache_listStatus.setVisible(!1),getOnlineAppCacheUsers(AppCache.CurrentConfig),void AppCache.Update()):void(AppCache.enablePasscode===!0?(AppCache.setEnablePasscodeScreen(!0),AppCache.setEnableLogonScreen(!1),AppCache.setEnableUsersScreen(!1)):(NumPad.Verify=!0,AppCache_listStatus.setVisible(!1),AppCache.Update()))},error:function(){}})},Onboard:function(){AppCache.setEnableLogonScreen(!1),AppCache.setEnableCaptchaScreen(!0),$.ajax({type:"POST",data:AppCache.xmlString,beforeSend:function(e){e.setRequestHeader("Content-Type","application/atom+xml")},url:AppCache.Url+"/odata/applications/latest/"+AppCache.smpApplication+"/Connections",statusCode:{201:function(){AppCache.Logon()},401:function(e){AppCache_imgCaptcha.setSrc("data:image/jpeg;base64,"+e.responseText)}}})},SetPassword:function(){if(AppCache_inPassNew.getValue()!=AppCache_inPassRepeat.getValue())return AppCache_statusItem.setInfo(AppCacheText.newPasswordNoMatch),AppCache_inPassNew.setValue(),void AppCache_inPassRepeat.setValue();var e="",a="";AppCache.enablePortal===!0?(a="j_user="+AppCache_inUsername.getValue()+"&j_sap_current_password="+AppCache_inPassOld.getValue()+"&oldPassword="+AppCache_inPassOld.getValue()+"&j_sap_password="+AppCache_inPassNew.getValue()+"&j_password="+AppCache_inPassNew.getValue()+"&confirmNewPassword="+AppCache_inPassRepeat.getValue()+"&j_sap_again="+AppCache_inPassRepeat.getValue(),e=AppCache.PortalUrl):(a="sap-system-login-password="+AppCache_inPassOld.getValue()+"&sap-system-login-passwordnew="+AppCache_inPassNew.getValue()+"&sap-system-login-passwordrepeat="+AppCache_inPassRepeat.getValue()+"&sap-system-login-oninputprocessing=onDoChangePwd&sap-system-login=onContinuePwd&sap-client="+AppCache.Client,e=AppCache.UrlBase+"/neptune/native/neptune_login_ping.html"),$.ajax({type:"POST",url:e,data:a,success:function(e,a,p){AppCache_statusItem.setInfo(p.getResponseHeader("SAPLoginMessage")),AppCache_inPassword.setValue(AppCache_inPassNew.getValue()),AppCache_inPassNew.setValue(),AppCache_inPassRepeat.setValue(),0===AppCache_statusItem.getInfo().length&&(AppCache.setEnablePasswordScreen(!1),AppCache.setEnableLogonScreen(!0),AppCache.Logon())}})},Lock:function(){if(AppCache.enableMocana!==!0){if(AppCache.enablePasscode===!1)return void AppCache.Logout();var e;if(e=AppCache.enablePortal===!0?AppCache.PortalLogoffUrl:AppCache.UrlBase+"/neptune/native/neptune_login_ping.html?sap-clearsso2",navigator.onLine&&$.ajax({type:"POST",url:e,success:function(){}}),AppCache.Auth="",$.ajaxSetup({headers:{Authorization:AppCache.Auth}}),NumPad.numPasscode=0,NumPad.numValue="",NumPad.Verify=!1,AppCache.enableEncryption===!0&&AppCache.enablePasscode===!0&&AppCache.encryptDB(),modelAppCacheUsers.getData().length>1)"function"==typeof AppDestroy&&(AppDestroy(),AppDestroy=null),AppCache.setEnableUsersScreen(!0);else{var a=modelAppCacheUsers.getData();AppCache.Encrypted=a[0].AUTH,AppCache.Load(AppCache.PasscodeApp)}}},RemoveAllCache:function(){AppCache.Logout(),$.sap.require("jquery.sap.storage");var e=$.sap.storage(jQuery.sap.storage.Type.local);e.removeAll();try{AppDB.transaction(function(e){e.executeSql("DROP TABLE model")})}catch(a){console.log("Error processing SQL: "+a.message)}modelAppCacheUsers.setData({}),AppCache_butSelect.setVisible(!1)},SetPasscode:function(){return jQuery.sap.require("sap.m.MessageToast"),""===AppCache_inPasscode1.getValue()?(AppCache_statusItem.setInfo(AppCacheText.enterNewPasscode),void setTimeout(function(){AppCache_inPasscode1.focus()},200)):""===AppCache_inPasscode2.getValue()?(AppCache_statusItem.setInfo(AppCacheText.enterRepeatPasscode),void setTimeout(function(){AppCache_inPasscode2.focus()},200)):4!=AppCache_inPasscode2.getValue().length?(AppCache_statusItem.setInfo(AppCacheText.PasscodeToShort),AppCache_inPasscode1.setValue(),AppCache_inPasscode2.setValue(),void setTimeout(function(){AppCache_inPasscode1.focus()},200)):AppCache_inPasscode1.getValue()!==AppCache_inPasscode2.getValue()?(AppCache_statusItem.setInfo(AppCacheText.noPasscodeMatch),AppCache_inPasscode1.setValue(),AppCache_inPasscode2.setValue(),void setTimeout(function(){AppCache_inPasscode1.focus()},200)):(AppCache.setEnablePasscodeScreen(!1),AppCache.setEnableUsersScreen(!1),AppCache_listStatus.setVisible(!1),AppCache.Passcode=AppCache_inPasscode1.getValue(),AppCache_inPasscode1.setValue(),AppCache_inPasscode2.setValue(),AppCache.Load(AppCache.PasscodeApp),void getOnlineAppCacheUsers(AppCache.CurrentConfig))},genID:function(){var e=(new Date).getTime(),a="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var p=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==a?p:7&p|8).toString(16)});return a},encryptDB:function(){AppCacheBusyEncrypt.open();try{AppDB.transaction(function(e){e.executeSql("SELECT * FROM model",[],function(e,a){for(var p=0;p<a.rows.length;p++){var t=a.rows.item(p).KEY,s=a.rows.item(p).VALUE;if(0===s.indexOf("[")||0===s.indexOf("{")){var n=CryptoJS.AES.encrypt(s,AppCache.deviceID);AppCache.updateDB(t,n.toString())}}AppCacheBusyEncrypt.close()},null)})}catch(e){return AppCacheBusyEncrypt.close(),void console.log("Error processing SQL: "+e.message)}},decryptDB:function(){AppCacheBusyDecrypt.open();try{AppDB.transaction(function(e){e.executeSql("SELECT * FROM model",[],function(e,a){for(var p=0;p<a.rows.length;p++){var t=a.rows.item(p).KEY,s=a.rows.item(p).VALUE;if(0!==s.indexOf("[")&&0!==s.indexOf("{")){var n=CryptoJS.AES.decrypt(s,AppCache.deviceID);AppCache.updateDB(t,n.toString(CryptoJS.enc.Utf8))}}AppCacheBusyDecrypt.close()},null)})}catch(e){return AppCacheBusyDecrypt.close(),void console.log("Error processing SQL: "+e.message)}},updateDB:function(e,a){try{AppDB.transaction(function(p){p.executeSql("INSERT OR REPLACE INTO model (KEY,VALUE) VALUES (?,?)",[e,a])})}catch(p){return void console.log("Error processing SQL: "+p.message)}},Startup:function(){if(""===AppCache.CurrentConfig)return jQuery.sap.require("sap.m.MessageToast"),void sap.m.MessageToast.show("No CurrentConfig");switch(window.openDatabase&&(AppDB="undefined"==typeof window.sqlitePlugin?window.openDatabase("AppCache","1.0","AppCache",5e7):window.sqlitePlugin.openDatabase({name:"AppCache"}),AppDB.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS model (KEY VARCHAR PRIMARY KEY, VALUE VARCHAR)")})),getCacheAppCacheData(),getCacheAppCacheUsers(),AppCache.UrlBase=AppCache.enableSMP===!0?AppCache.Url+"/"+AppCache.smpApplication:AppCache.Url,sap.ui.Device.os.name){case"win":AppCache.deviceType="Windows";break;case"winphone":AppCache.deviceType="WinPhone8";break;case"mac":AppCache.deviceType="iOS";break;case"bb":AppCache.deviceType="Blackberry";break;default:AppCache.deviceType=sap.ui.Device.os.name}if(AppCache.deviceID=localStorage.getItem("AppCacheID"),AppCache.deviceID||(AppCache.deviceID=AppCache.genID(),localStorage.setItem("AppCacheID",AppCache.deviceID)),AppCache.xmlString='<?xml version="1.0" encoding="utf-8"?><entry xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"><title type="text"/><updated>2012-06-15T02:23:29Z</updated><author><name/></author><category term="applications.Connection" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme"/><content type="application/xml"><m:properties><d:DeviceType>'+AppCache.deviceType+"</d:DeviceType></m:properties></content></entry>",$.ajaxSetup({headers:{"sap-client":AppCache.Client,NeptuneServer:AppCache.UrlBase,"Access-Control-Allow-Origin":"*","X-SUP-APPCID":AppCache.deviceID}}),AppCache.enablePasscode===!0){if(!modelAppCacheUsers.getData().length)return AppCache.setEnableLogonScreen(!0),void AppCache_listStatus.setVisible(!0);if(AppCache.enableMocana===!0)return void AppCache.Load(AppCache.StartApp);if(modelAppCacheUsers.getData().length>1)AppCache.setEnableUsersScreen(!0),AppCacheUsers.removeSelections();else{var e=modelAppCacheUsers.getData();AppCache.Encrypted=e[0].AUTH,AppCache.CurrentUser=e[0].NAME,AppCache.CurrentUname=e[0].UNAME,AppCache.setEnableLogonScreen(!1),AppCache_listStatus.setVisible(!1),AppCache.Load(AppCache.PasscodeApp)}}else AppCache.setEnableLogonScreen(!0),AppCache_listStatus.setVisible(!0)}},Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var a,p,t,s,n,o,c,r="",i=0;for(e=Base64._utf8_encode(e);i<e.length;)a=e.charCodeAt(i++),p=e.charCodeAt(i++),t=e.charCodeAt(i++),s=a>>2,n=(3&a)<<4|p>>4,o=(15&p)<<2|t>>6,c=63&t,isNaN(p)?o=c=64:isNaN(t)&&(c=64),r=r+this._keyStr.charAt(s)+this._keyStr.charAt(n)+this._keyStr.charAt(o)+this._keyStr.charAt(c);return r},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");for(var a="",p=0;p<e.length;p++){var t=e.charCodeAt(p);128>t?a+=String.fromCharCode(t):t>127&&2048>t?(a+=String.fromCharCode(t>>6|192),a+=String.fromCharCode(63&t|128)):(a+=String.fromCharCode(t>>12|224),a+=String.fromCharCode(t>>6&63|128),a+=String.fromCharCode(63&t|128))}return a}},NumPad={numValue:"",Verify:!1,numPasscode:0,enterKey:function(e){return Passcode1.getSelected()===!1?(Passcode1.setSelected(!0),void(NumPad.numValue=NumPad.numValue+e)):Passcode2.getSelected()===!1?(Passcode2.setSelected(!0),void(NumPad.numValue=NumPad.numValue+e)):Passcode3.getSelected()===!1?(Passcode3.setSelected(!0),void(NumPad.numValue=NumPad.numValue+e)):Passcode4.getSelected()===!1?(Passcode4.setSelected(!0),NumPad.numValue=NumPad.numValue+e,void butNumpadLogin.setEnabled(!0)):void 0},Clear:function(){NumPad.numValue="",Passcode1.setSelected(!1),Passcode2.setSelected(!1),Passcode3.setSelected(!1),Passcode4.setSelected(!1),butNumpadLogin.setEnabled(!1)},Logon:function(){var e=CryptoJS.AES.decrypt(AppCache.Encrypted,NumPad.numValue);try{var a=e.toString(CryptoJS.enc.Utf8)}catch(p){a=""}if(""===a)return NumPad.Clear(),AppCache.numPasscode==NumPad.numPasscode?(NumPad.numPasscode=0,AppCache.Logout(),void AppCache.RemoveAllCache()):(jQuery.sap.require("sap.m.MessageToast"),sap.m.MessageToast.show(AppCacheText.noPasscodeMatch),void NumPad.numPasscode++);NumPad.numPasscode=0,NumPad.Clear(),NumPad.Verify=!0;var t=ModelData.Find(AppCacheUsers,"UNAME",AppCache.CurrentUname);return"X"!==t[0].ENABLE_TWOFACTOR||t[0].TWOFACTOR?(AppCache.enableEncryption===!0&&AppCache.enablePasscode===!0&&AppCache.decryptDB(),AppCache.enablePortal===!0?(AppCache.Auth=a,void AppCache.PortalRelog()):($.ajaxSetup({headers:{Authorization:a,"sap-client":AppCache.Client,"X-SUP-APPCID":AppCache.deviceID,"Access-Control-Allow-Origin":"*"}}),AppCache.Encrypted="",void AppCache.Update())):(AppCache_inTwoFactor.setValue(),AppCache_errorTwoFactor.setVisible(!1),AppCache_popTwoFactor.open(),void setTimeout(function(){AppCache_popTwoFactor.rerender()},800))}};$(document).ajaxError(function(e,a){switch(sap.ui.core.BusyIndicator.hide(),a.status){case 0:if(NumPad.Verify===!0){NumPad.Verify=!1;var p=!!window.Windows&&/^ms-appx:/.test(location.href);p===!0?a.statusText.indexOf("resource")>-1||(jQuery.sap.require("sap.m.MessageToast"),sap.m.MessageToast.show(AppCacheText.noConnection),AppCache.CurrentApp==AppCache.PasscodeApp&&AppCache.Load(AppCache.StartApp)):(jQuery.sap.require("sap.m.MessageToast"),sap.m.MessageToast.show(AppCacheText.noConnection),AppCache.CurrentApp==AppCache.PasscodeApp&&AppCache.Load(AppCache.StartApp))}break;case 401:AppCache.enableSMP===!1&&AppCache.Logout();break;case 404:AppCache.enableSMP===!0&&AppCache.inLogon===!1&&(AppCache.inLogon=!0,ModelData.Delete(AppCacheUsers,"UNAME",AppCache.CurrentUname),setCacheAppCacheUsers(),AppCache.Logout());break;case 200:var t=a.getResponseHeader("SAPLoginStatus");switch(AppCache.enablePortal===!0&&($(e.currentTarget.body.textContent).find("#logonretypepassfield").length>0?t="Password":$(e.currentTarget.body.textContent).find("#logonuidfield").length>0&&(t="Logon")),t){case"Password":return void AppCache.Logout();case"Logon":return void(AppCache.enablePortal===!0?AppCache.PortalRelog():AppCache.Logout())}default:jQuery.sap.require("sap.m.MessageToast"),sap.m.MessageToast.show(a.status+" - "+a.statusText)}});