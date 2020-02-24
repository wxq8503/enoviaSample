define("UWA/Environments/Standalone",["UWA/Core","UWA/Utils","UWA/Element","UWA/Environment","UWA/Storage/Adapter/Cookies","UWA/Storage/Adapter/Object"],function(f,d,b,c){function a(g,h){var i="http://www.netvibes.com/ns/",k="widget",j=[];document.createElement(k+":"+h);if(g.getElementsByTagNameNS){j=g.getElementsByTagNameNS(i,h)}if(j.length===0){j=g.getElementsByTagName(k+":"+h)}if(j.length===0){j=g.getElementsByTagName(h)}if(j.length===0&&g!==document){j=a(document,h);j=j.filter(function(m){var n=m,l=g.tagName;while(n.previousSibling&&n.tagName!==l){n=n.previousSibling}return n===g&&m})}return d.toArray(j)}var e=c.extend({name:"uwa",onInit:function(){var g=b.getElement.bind(document.querySelector("body"));if(!g(".moduleUwa")){this.buildSkeleton()}this.html={viewport:window,wrapper:g(".module"),header:g(".moduleHeader"),content:g(".moduleWrapper"),body:g(".moduleContent"),edit:g(".moduleEdit"),menus:g(".moduleHeader > menu"),footer:g(".moduleFooter"),counter:g(".counter"),title:g(".title"),icon:g(".icon"),shareAction:g(".share"),refreshAction:g(".refresh"),editAction:g(".edit")}},getWidgetContent:function(){var i=document.head,j=a(document,"style"),h=a(document,"preferences"),g=a(document,"plugins");[h,g,j].forEach(function(k){k.forEach(function(l){if(!f.Element.isInjected.call(l,i)){i.appendChild(l)}})});return b.getHTML.call(document.querySelector("body"))},buildSkeleton:function(){var i=f.hosts,k=f.i18n,l=i.uwa+f.paths.img+"icon.png",h=16,j=document.querySelector("body"),g=this.getWidgetContent();b.setContent.call(j,{tag:"div","class":"module moduleUwa",html:[{tag:"div","class":"moduleHeader",html:[{tag:"span","class":"icon",html:{tag:"img",height:h,width:h,src:l}},{tag:"span","class":"counter"},{tag:"span","class":"title",text:k(document.title)},{tag:"menu",type:"toolbar","class":"menus"}]},{tag:"div","class":"moduleWrapper",html:[{tag:"div","class":"moduleEdit"},{tag:"div","class":"moduleContent",html:g}]},{tag:"div","class":"moduleFooter",html:[{tag:"a","class":"powered",href:i.netvibes,text:k("© Netvibes")},{tag:"a","class":"share",href:i.ecosystem,text:k("Subscribe to this app")}]}]})},onRegisterWidget:function(){this._parent();this.loadMetas();this.loadPreferencesXML();this.loadPluginsXML()},loadMetas:function(){var k,h,j,n,o,p,m=this.widget,g={};p=document.getElementsByTagName("meta");for(k=0,h=p.length;k<h;k++){o=p[k];j=o.getAttribute("name");n=o.getAttribute("content");n=(n==="false"?false:(n==="true")?true:n);if(j){g[j]=n}}m.setMetas(g);p=document.getElementsByTagName("link");for(k=0,h=p.length;k<h;k++){o=p[k];if(o.getAttribute("rel")==="icon"){m.setIcon(o.getAttribute("href"));break}}},loadPluginsXML:function(){var n,j,g,p,o=this,h=[],m=a(document,"plugin"),k=function(l,s){s=s||{};var i,u,r,t,q;r=a(l,"option",true);for(i=0,u=r.length;i<u;i++){t=r[i];q=t.getAttribute("name");s[q]=t.getAttribute("value")}r=a(l,"options",true);for(i=0,u=r.length;i<u;i++){t=r[i];q=t.getAttribute("name");s[q]=k(t,s[q])}return s};for(n=0,j=m.length;n<j;n++){g=m[n];p=g.getAttribute("name");if(p!==null){h.push({name:p,options:k(g)})}}if(h.length>0){o.widget.setPlugins(h)}},loadPreferencesXML:function(){var x,t,w,u,r,s,q,g,D,A,v,C,h,B=this,z=[],y=a(document,"preference");for(x=0,t=y.length;x<t;x++){C=y[x];v={};for(w=0,u=C.attributes.length;w<u;w++){h=C.attributes[w];v[h.nodeName]=h.value}if(v.defaultvalue!==undefined){v.defaultValue=v.defaultvalue;delete v.defaultvalue}if(v.type==="list"){v.options=[];D=a(C,"option");for(r=0,s=D.length;r<s;r++){A={};for(q=0,g=D[r].attributes.length;q<g;q++){h=D[r].attributes[q];A[h.nodeName]=h.value}if(A.label&&A.hasOwnProperty("value")){v.options.push(A)}}}if(v.name&&v.type){z.push(v)}}if(z.length>0){B.widget.setPreferences(z)}}});return f.namespace("Environments/Standalone",e,f)});define("widget",["UWA/Core","UWA/Event","UWA/Widget","UWA/Environments/Standalone"],function(e,a,c,b){var d=new c();a.onDomReady(function(){var f=new b();f.registerWidget(d);f.launchWidget()});return e.namespace("widget",d)});