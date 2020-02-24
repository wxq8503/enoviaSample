define("UWA/Controls/Input",["UWA/Core","UWA/Event","UWA/Element","UWA/Utils","UWA/Utils/Client","UWA/Utils/Scroll","UWA/Controls/Abstract","UWA/Controls/DropDown","UWA/Controls/ThemedScroller","UWA/Class/Timed"],function(e,k,c,i,d,a,f,b,j,g){var h=f.extend({options:{className:"",element:null,attributes:{},value:"",clickable:true},name:"uwa-input",_hiddenInput:true,init:function(m){if(this.constructor===h){throw new Error("Use a subclass of Input")}this._parent(m);var n=m&&m.element,l=n&&n.parentNode,o=n&&n.nextSibling;if(l){l.removeChild(n)}this.events=null;this.getContent();if(e.owns(m,"value")){this.setValue(m.value)}if(l){this.inject(o||l,o&&"before")}},buildSkeleton:function(){var l=this.elements;if(this._hiddenInput){l.input=this.options.element||this.buildInput();l.content=e.createElement("div",{"class":this.getClassNames("-content")});l.input.addClassName(this.getClassNames("-input")+" hidden-input");l.container=(this.options.container||e.createElement("div")).addContent(l.input,l.content)}else{l.content=l.container=l.input=this.options.element||this.options.container||this.buildInput()}l.input.set(this.options.attributes);l.container.addClassName(this.getClassNames());if(!this.options.clickable){this.elements.container.addClassName("not-clickable")}this.setDisabled(this.isDisabled())},_syncEvents:function(m){var n=this,o=this.elements;function l(p){return n.dispatchEvent.bind(n,p)}if(!n.events){n.events={container:{mouseenter:l("onMouseEnter"),mouseleave:l("onMouseLeave"),mousedown:function(p){this.addClassName("active");n.dispatchEvent("onMouseDown",[p])},mouseup:function(){this.removeClassName("active")},click:l("onClick")},input:{change:l("onChange"),keydown:l("onKeyDown"),focus:n.focus.bind(n,true,false),blur:n.focus.bind(n,false,false)}}}if(n.isDisabled()){o.container.removeEvents(n.events.container);o.input.removeEvents(n.events.input)}else{if(!n._hiddenInput||!m){o.container.addEvents(n.events.container)}o.input.addEvents(n.events.input)}},buildInput:function(){return e.createElement("input",{type:"text"})},syncInput:function(){if(this._hiddenInput&&this.elements.content){this.elements.content.setText(this.getValue())}},focus:function(m,l){if(m===undefined){m=true}c.toggleClassName.call(this.elements.container,"focus",m);if(l!==false){this.elements.input[m?"focus":"blur"]()}return this},isDisabled:function(){return Boolean(this.elements.input.disabled)},setDisabled:function(l){if(l===undefined){l=true}this.elements.input.disabled=l;this.elements.container.toggleClassName("disabled",l);this._syncEvents();return this},getValue:function(){var m=this.elements.input,l=m.getTagName();return l==="input"||l==="textarea"?m.value:m.getText()},setValue:function(n){var m=this.elements.input,l=m.getTagName();if(l==="input"||l==="textarea"){m.value=n}else{m.setText(n)}this.syncInput();return this},getContent:function(){if(!this.elements.container){this.buildSkeleton();this.syncInput()}return this.elements.container},getInputElement:function(){return this.elements.input},_dispatchOnChange:function(){if(this.isDisabled()){this.syncInput()}else{k.dispatchEvent(this.elements.input,"change")}},onMouseEnter:function(){this.elements.container.addClassName("hover")},onMouseLeave:function(){this.elements.container.removeClassName("hover")},onMouseDown:function(l){if(this._hiddenInput&&!d.Features.touchEvents){k.preventDefault(l);this.focus()}},onChange:function(l){this.syncInput();this._bubbleOnChange(l)},_bubbleOnChange:(function(){var m;function l(){if(m===undefined){m=false;var n=document.createElement("div"),o=document.createElement("input");o.type="text";n.appendChild(o);n.style.display="none";document.body.appendChild(n);c.addEvent.call(n,"change",function(p){m=true;k.stop(p)});k.dispatchEvent(o,"change");c.remove.call(n);c.removeEvents.call(n)}return m}return function(p){var o,n=this.elements.input.parentNode;if(!l()){while(n&&n.nodeType===1&&(p.event||p).returnValue!==false){o=n._events&&n._events.change;if(o){o.handleEvent(p)}n=n.parentNode}}}}()),onKeyDown:function(){this.syncInput()}});h._ToggleInput=h.extend({name:"uwa-toggle",buildSkeleton:function(){this._parent();this.elements.content.addClassName("uwa-icon")},isChecked:function(){return this.elements.input.checked},focus:function(l){this._parent(l);this.syncInput();return this},check:function(l){this.elements.input.checked=l!==false;this.syncInput();return this}});h.Radio=h._ToggleInput.extend({name:"uwa-radio",buildInput:function(){return e.createElement("input",{type:"radio"})},onClick:function(m){this._parent(m);var l=this.elements.input;if(!l.checked){l.checked=true;this._dispatchOnChange()}},syncInput:function(){var n=this.elements.input,m=n.name,l=false;function o(p){var q=p.parentNode;if(q&&c.hasClassName.call(q,"uwa-radio")){c.toggleClassName.call(q,"checked",p.checked)}l|=n===p}if(m){Array.prototype.forEach.call(document.getElementsByName(m),o)}if(!l){o(n)}}});h.Checkbox=h._ToggleInput.extend(g,{name:"uwa-checkbox",buildInput:function(){return e.createElement("input",{type:"checkbox"})},onClick:function(l){this._parent(l);if(!this.hasDelayed("extern-change-prevention")){this.setDelayed("extern-change-prevention",function(){this.elements.input.checked=!this.elements.input.checked;this.syncInput();this._dispatchOnChange()},1)}},onChange:function(l){this._parent(l);this.setDelayed("extern-change-prevention",function(){},1)},syncInput:function(){this.elements.container.toggleClassName("checked",this.elements.input.checked)}});h.Select=h.extend(g,{name:"uwa-select",options:{options:[]},init:function(l){this._parent(l);if(e.owns(l,"options")){this.putOptions(l.options)}if(e.owns(l,"value")){this.setValue(l.value)}},focus:function(l){this._parent(l);if(l===false){this.elements.dropdown.hide()}return this},buildInput:function(){return e.createElement("select")},buildSkeleton:function(){var m,n=this.elements;this._parent();var l=n.container.getDocument().body;n.content.addContent([m=e.createElement("div",{"class":this.getClassNames("-split"),html:[{tag:"div","class":this.getClassNames("-text")},{tag:"div","class":this.getClassNames("-button"),html:{tag:"div","class":"uwa-icon uwa-icon-only"}}]})]);n.dropdown=new b({className:this.options.className,global:true,_root:false,position:function(){var s=n.dropdown.getInnerElement();var r=n.container.getBoundingClientRect();var q=r.top;var p=d.getSize().height-r.top-r.height;var o=q>p;s.toggleClassName("uwa-select-dropdown-top",o);s.getElement("> .uwa-select-split").inject(s,o?"bottom":"top");s.setStyle("width",r.width);n.scroller.getContent().setStyle("height",Math.min(n.options.offsetHeight,o?q:p));n.scroller.update();return{x:r.left,y:n.container.getOffsets().y-(o?Math.min(r.top,n.options.offsetHeight):0)}},positionOptions:{fit:"resize-max",relative:l},events:{onShow:function(){if(n.container){n.container.addClassName("dropdown-visible");this._scrollToSelected()}}.bind(this),onHide:function(){if(n.container){n.container.removeClassName("dropdown-visible")}},onRemoved:function(){if(n.container){n.container.removeClassName("dropdown-visible")}}}});n.dropdown.getInnerElement().addClassName("uwa-select-dropdown");n.dropdown.inject(n.content);n.options=e.createElement("div",{"class":this.getClassNames("-options"),events:{mousedown:this._selectionHandler.bind(this)}});n.scroller=new j({shadows:false});n.scroller.getInnerElement().addContent(n.options);n.dropdown.getInnerElement().setContent([m.cloneNode(true),n.scroller]);if(this._isSingleLine()){n.container.addClassName("single-line")}},getValue:function(){return this._getSelectedOptions().map(function(l){return l.value})},setValue:function(l){var m=[];l=i.splat(l);this._getOptions().forEach(function(o,n){if(l.indexOf(o.value)!==-1){m.push(n)}});return this.setSelection(m)},setSelection:function(l){if(!this._isMultiple()){l=l.slice(0,1)}this._getOptions().forEach(function(n,m){n.selected=l.indexOf(m)!==-1});this._dispatchOnChange();return this},getSelection:function(){var l=[];this._getOptions().forEach(function(n,m){if(n.selected){l.push(m)}});return l},_isMultiple:function(){return this.elements.input.multiple},_isSingleLine:function(){return this.options.singleLine},_getOptions:function(){return this.elements.input.getElements("option")},_getSelectedOptions:function(){return this._getOptions().filter(function(l){return l.selected})},_dispatchOnChange:function(){this.clearDelayed("on-change-debounce");this._parent()},_selectionHandler:function(s){k.stop(s);if(!this._isMultiple()){this.elements.dropdown.hide();this.elements.container.removeClassName("hover")}var r,q,p=k.findElement(s,".option,.optgroup"),n=0,m=[],l=p.hasClassName("option"),o=false;p.getParent().getChildren().some(function(t){if(l){if(p===t){m.push(n);return true}}else{if(o){if(t.hasClassName("option")){m.push(n)}else{return true}}else{if(p===t){o=true}}}if(t.hasClassName("option")){n+=1}});if(this._isMultiple()){r=this.getSelection();if(l){q=r.indexOf(m[0]);if(q===-1){r.push(m[0])}else{r.splice(q,1)}}else{if(m.some(function(t){return r.indexOf(t)<0})){m.forEach(function(t){if(r.indexOf(t)<0){r.push(t)}})}else{r=r.filter(function(t){return m.indexOf(t)<0})}}m=r}this.setSelection(m)},syncInput:function(){var l=this.elements.input,n=this.elements;function m(){var q,p;p=Array.prototype.map.call(l.getElementsByTagName("*"),function(t){var r=c.getTagName.call(t),s=e.createElement("div",{"class":r+(t.selected?" selected":""),text:t.label||c.getText.call(t)||"\u00A0"});if(r==="optgroup"){if(q){q.addClassName("selected")}q=s}else{if(!t.selected){q=null}}return s});if(q){q.addClassName("selected")}return p}if(this._getOptions().length&&!this._getSelectedOptions().length&&!this._isMultiple()){this._getOptions()[0].selected=true}var o=this._getSelectedOptions().map(c.getText.call,c.getText).join(", ")||"\u00A0";n.content.getElement(".uwa-select-text").setText(o);n.dropdown.getInnerElement().getElement(".uwa-select-text").setText(o);n.options.empty(true).setContent(m())},_scrollToSelected:function(){var l=this.elements.dropdown&&this.elements.dropdown.getInnerElement().getElement(".option.selected");if(l){a.scrollToElement(l)}},onClick:function(l){this._parent(l);this.elements.dropdown.show()},onKeyDown:function(n){var m=k.whichKey(n),l=true;if(m==="space"){this.elements.dropdown.show()}else{if(m==="return"){this.elements.dropdown.toggle()}else{if(m==="esc"){this.elements.dropdown.hide()}else{l=false}}}if(l){k.preventDefault(n)}else{this._parent(n);this.setDelayed("scroll-to-selected",this._scrollToSelected,1)}},putOptions:function(m,n){var l=this.elements.input;function o(p,s){var q,r=l.getElementsByTagName("*");for(q=0;q<r.length;q+=1){if(r[q][p]===s){return r[q]}}}if(n){c.empty.call(l,true)}i.splat(m).forEach(function(q){var s=o("value",q.value),p,r;if(q.label!==undefined){if(!s){s=e.createElement("option")}c.set.call(s,{text:q.label,value:q.value,selected:q.selected});if(q.group){r=o("label",q.group);if(!r){r=l.appendChild(e.createElement("optgroup",{label:q.group}))}r.appendChild(s)}else{l.appendChild(s)}}else{if(s){p=s.parentNode;c.remove.call(s);if(p&&c.getTagName.call(p)==="optgroup"&&p.childNodes.length===0){c.remove.call(p)}}}});this.syncInput();return this},removeOptions:function(l){this.putOptions(i.splat(l).map(function(m){return{value:typeof m==="string"?m:m.value}}))}});h.File=h.extend({name:"uwa-file",options:{button:{tag:"div",text:e.i18n("Browse...")}},buildInput:function(){return e.createElement("input",{type:"file"})},buildSkeleton:function(){this._parent();if(!this.options.buttonOnly){this.elements.text=e.createElement("div",{"class":this.getClassNames("-text")})}else{this.elements.content.addClassName("button-only")}this.elements.content.addClassName(this.getClassNames("-split")).setContent([this.elements.text,e.createElement("div",{"class":this.getClassNames("-button"),html:this.options.button})])},setValue:function(m){if(m){throw new Error("You can't set a value to a file input")}var l=this.elements.input,n;l.value="";if(l.value){n=e.extendElement(e.clone(l));n.inject(l,"before");l.destroy();this.elements.input=n;this._syncEvents(true)}this.syncInput()},syncInput:function(){if(this.elements.text){this.elements.text.setText(this.elements.input.value.replace(/^c:\\fakepath\\/i,"")||"\u00A0")}}});h.Text=h.extend(g,{name:"uwa-text",_hiddenInput:false,options:{multiline:false},buildInput:function(){return this.options.multiline?e.createElement("textarea"):e.createElement("input",{type:"text"})},buildSkeleton:function(){this._parent();this.elements.input.addClassName(this.getClassNames("-text"))},onKeyDown:function(l){this._parent(l);this.setDelayed("placeholder-sync",this.syncInput,1)},onHide:function(){this._parent();this.setDelayed("placeholder-sync",this.syncInput,1)},onShow:function(){this._parent();this.setDelayed("placeholder-sync",this.syncInput,1)},onPostInject:function(){this.setDelayed("placeholder-sync",this.syncInput,50)},getInputElement:function(){this.setDelayed("placeholder-sync",this.syncInput,1);return this._parent()},syncInput:function(){var l=this.elements.input;if(!d.Features.inputPlaceholder){if(!l.parentNode||this.getValue()||!l.getAttribute("placeholder")||!l.offsetHeight){this._hidePlaceholder()}else{this._showPlaceholder()}}},_showPlaceholder:function(){var l,o,p=this.elements,m=p.input,n=m.getDimensions();if(!p.placeholder){this.setPeriodical("placeholder-sync",this.syncInput,1000);p.placeholder=e.createElement("div",{"class":this.getClassNames("-placeholder"),events:{click:this.focus.bind(this,true)}})}if(!n.width||!n.height){this._hidePlaceholder();return}o=m.getStyles(["font"]);o.height=n.innerHeight;o.width=n.innerWidth;if(m.getTagName()!=="textarea"){o.lineHeight=n.innerHeight+"px";o.whiteSpace="nowrap"}l=m.getPosition();l.x+=m.getComputedSize("marginLeft","paddingLeft","borderLeftWidth");l.y+=m.getComputedSize("marginTop","paddingTop","borderTopWidth");p.placeholder.set({text:m.getAttribute("placeholder"),styles:o}).setPosition(l);if(p.placeholder.previousSibling!==m){p.placeholder.inject(m,"after")}},_hidePlaceholder:function(){var l=this.elements.placeholder;if(l){l.remove()}}});h.Password=h.Text.extend({options:{multiline:false,attributes:{type:"password"}}});h.Button=h.extend({name:"uwa-button",options:{className:"dark-grey"},_hiddenInput:false,init:function(l){if(e.owns(l,"className")){l.className=l.className.replace(/\bblack\b/,"dark-grey");if(/\b(?:iconl|iconr|icon-only)\b/.test(l.className)){l.className+=" uwa-icon"}if(/\b(?:dark-grey)\b/.test(l.className)){l.className+=" icon-separated"}}this._parent(l);if(/\b(?:icon-only)\b/.test(this.options.className)){this.setValue("\u00A0")}},buildInput:function(){return e.createElement("button",{type:"button"})}});return e.namespace("Controls/Input",h,e)});