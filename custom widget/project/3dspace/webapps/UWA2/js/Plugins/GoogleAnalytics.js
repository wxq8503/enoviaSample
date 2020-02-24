define("UWA/Plugins/GoogleAnalytics",["UWA/Core","UWA/Plugins/Abstract","UWA/Utils","UWA/Utils/Client","UWA/Json"],function(f,e,b,d,a){var c=e.extend({init:function(h,g){this._parent(h,g);this.initScript();this.addEvent("beforeLoad",this.loadScript)},initScript:function(){var i,l,j,g,h=this.options,k=window._gaq||[];for(i in h){if(h.hasOwnProperty(i)){l=h[i];j=f.typeOf(l);if(i.contains("UA-")){if(g){k.push(["_trackPageview"])}g=true;k.push(["_setAccount",i])}if(a.isJson(l)){l=a.decode(l);j=f.typeOf(l)}if(j==="array"){k.push(l)}else{if(j==="string"||j==="number"){if(!g&&j==="string"){g=l.contains("UA-")}k.push([i,l])}else{throw new Error('Invalid GoogleAnalytics Plugin option with value "'+a.encode(l)+'".')}}}}if(g){this.addCustomVars(k);k.push(["_trackPageview"])}window._gaq=k;this.addEvent("onOpenURL",this.openURL)},addCustomVars:function(j){var i,g=b.parseUrl(this.widget.getUrl());try{i=String(window.top.location)}catch(h){i=this.widget.widgetDomain||String(window.location)}j.push(["_setCustomVar",1,"widget_url",g.source,5]);j.push(["_setCustomVar",2,"widget_platform",this.widget.environment.name,5]);j.push(["_setCustomVar",3,"widget_referer",i,5])},loadScript:function(){var g=document.getElementsByTagName("script")[0];f.createElement("script",{src:("https:"===document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js",async:true,type:"text/javascript"}).inject(g||document.body||document.head,g?"after":"bottom");this.removeEvent("afterLoad",this.loadScript)},openURL:function(){}});return f.namespace("Plugins/GoogleAnalytics",c,f)});