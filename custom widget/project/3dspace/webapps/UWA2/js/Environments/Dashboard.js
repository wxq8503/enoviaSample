define("UWA/Environments/Dashboard",["UWA/Core","UWA/Utils","UWA/Element","UWA/Environment","UWA/Data","UWA/Storage/Adapter/Dashboard","UWA/Storage/Adapter/Object"],function(f,e,b,d,c){c.useOfflineCache=true;var a=d.extend({name:"dashboard",growboxInset:-1,minWidth:358,minHeight:570,onInit:function(){var h=document.body,g=b.getElement.bind(h);this.html={wrapper:g(".module"),header:g(".moduleHeader"),content:g(".moduleWrapper"),body:g(".moduleContent"),edit:g(".moduleEdit"),footer:g(".moduleFooter"),counter:g(".counter"),title:g(".title"),icon:g(".icon"),shareAction:g(".share"),refreshAction:g(".refresh"),editAction:g(".edit")};this.onResize();window.resizeTo(this.minWidth,this.minHeight)},onRegisterWidget:function(){this.html.resizeButton=f.createElement("img",{"class":"resizeButton",src:"/System/Library/WidgetResources/resize.png",events:{mousedown:this.onResizeButtonDown.bind(this)}}).inject(this.html.footer);if(window.widget){this.html.editAction.empty();this.html.editAction.addClassName("infoButton");new AppleInfoButton(this.html.editAction,this.html.wrapper,"black","black",this.dispatchEvent.bind(this,"toggleEdit"))}this._parent()},onResize:function(){var i=this,j=i.html.wrapper,h=j.offsetWidth,g=j.offsetHeight;if(g>0&&g!==i.prevHeight){i.prevHeight=g}if(i.prevWidth!==h){i.prevWidth=h}else{return false}},onEdit:function(){window.resizeTo(this.html.wrapper.offsetWidth,this.minHeight);if(window.widget){window.widget.prepareForTransition("ToBack")}this._parent()},onShowEdit:function(){if(window.widget){setTimeout("window.widget.performTransition();",100)}},endEdit:function(){window.resizeTo(this.html.wrapper.offsetWidth,this.minHeight);if(window.widget){window.widget.prepareForTransition("ToFront")}this._parent()},onHideEdit:function(){if(window.widget){setTimeout("window.widget.performTransition();",100)}},onResizeButtonMove:function(h){if(this.growboxInset===-1){return}h.stopPropagation();h.preventDefault();var g=h.x+this.growboxInset.x,i=h.y+this.growboxInset.y;g=(g<this.minWidth?this.minWidth:g);i=(i<this.minHeight?this.minHeight:i);this.html.resizeButton.style.top=(i-12);if(window.widget){window.resizeTo(g,i)}},onResizeButtonDown:function(g){g.stopPropagation();g.preventDefault();document.addEventListener("mousemove",this.onResizeButtonMove.bind(this),true);document.addEventListener("mouseup",this.onResizeButtonUp.bind(this),true);this.growboxInset={x:(window.innerWidth-g.x),y:(window.innerHeight-g.y)}},onResizeButtonUp:function(g){g.stopPropagation();g.preventDefault();this.growboxInset=-1;document.removeEventListener("mousemove",this.onResizeButtonMove.bind(this),true);document.removeEventListener("mouseup",this.onResizeButtonUp.bind(this),true)},onOpenURL:function(g){g=e.parseUrl(g);if(window.widget&&window.widget.openURL&&!g.subprotocol){window.widget.openURL(g.source);return false}}});f.extend(d.prototype,a.prototype);return f.namespace("Environments/Dashboard",a,f)});