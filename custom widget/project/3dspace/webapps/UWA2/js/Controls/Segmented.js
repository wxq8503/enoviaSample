define("UWA/Controls/Segmented",["UWA/Core","UWA/Event","UWA/Controls/Abstract"],function(d,a,c){var b=c.extend({name:"uwa-segmented",defaultOptions:{title:null,multiSelect:false,atLeastOneSelected:false,constantItemWidth:false,className:"",data:null},itemLength:0,init:function(e){this._parent(e);this.options.data=this.options.data||{};this.elements.items={};this.selectedItemsName={};this.buildSkeleton();if(this.options.data){this.addItems(this.options.data)}},buildSkeleton:function(){var f=this.elements,e=this.options;f.container=d.createElement("ul",{"class":this.getClassNames()});if(e.title){d.createElement("li",{"class":this.getClassNames("-title"),html:{tag:"span",text:e.title}}).inject(f.container)}f.itemContainer=f.container},updateItemClassNames:function(){var e,g,h=this.elements.items,f=0;for(e in h){if(h.hasOwnProperty(e)){g=h[e];g.removeClassName(this.getClassNames("-item-first"));g.removeClassName(this.getClassNames("-item-last"));g.addClassName(this.getClassNames("-item")+" "+e);if(f===0){g.addClassName(this.getClassNames("-item-first"))}if(f===this.itemLength-1){g.addClassName(this.getClassNames("-item-last"))}f++}}},createItem:function(i,h){var j,g=this.elements.items,f=h.text||"",e=this;j=d.createElement("li",{html:{tag:"a","class":i+"-title "+this.getClassNames("-item-title"),html:{tag:"span",text:f},title:d.i18n("Expand"),events:{click:function(k){a.stop(k);e.dispatchEvent("onClick",[i])}}}});if(j.getElement("a")&&h.tooltipText){j.getElement("a").title=h.tooltipText}if(h.title){this.options.data[i].text=h.title;j.getElement("span").setHTML(h.title)}g[i]=j;if(h.pinned){j.addClassName("uwa-pinned");this.selectItem(i,false)}return j},onResize:function(){var g,e,h=this.elements.items,f=0;if(this.options.constantItemWidth){for(g in h){if(h.hasOwnProperty(g)){e=h[g].getDimensions().width;f=(e>f)?e:f}}for(g in h){if(h.hasOwnProperty(g)&&f!==0){h[g].setStyle("width",f+"px")}}}},onClick:function(e){if(!this.options.multiSelect){this.selectItem(e)}else{this.toggleItem(e)}},addItems:function(e){var f;for(f in e){if(e.hasOwnProperty(f)){this.addItem(f,e[f])}}},addItem:function(g,e){var f,h,i;e=e||{};this.options.data[g]=e;if(!e.where){e.where="bottom"}h=e.where.split(" ");f=h[0];if(h.length===1&&(f==="top"||f==="bottom")){i=this.elements.itemContainer}else{if(h.length===2&&(f==="before"||f==="after")){i=this.elements.items[h[1]]}else{throw new Error('Has to be "top", "bottom", "before item" of "after item"')}}this.createItem(g,e).inject(i,f);this.itemLength++;this.updateItemClassNames()},setItemTitle:function(f,g){var e=this.elements.items[f];if(e){this.options.data[f].text=g;e.getElement("span").setHTML(g)}},setItemState:function(f,h,g){var e=this.options.data[f],i=this.elements.items[f];g=(!d.is(g)?true:g);if(!h&&this.options.atLeastOneSelected&&this.getSelectedItems().length===1){return}if(i||this.selectedItemsName[f]!==h){if(!this.options.multiSelect){this.unselectItems()}i.toggleClassName("selected",h);if(i.getElement("a")&&(!e||!e.tooltipText)){i.getElement("a").title=h?d.i18n("Collapse"):d.i18n("Expand")}this.selectedItemsName[f]=h;if(g){this.dispatchEvent("onChange",[f,h,e])}}},toggleItem:function(e,f){this.setItemState(e,!this.isSelected(e),f)},unselectItem:function(e,f){this.setItemState(e,false,f)},selectItem:function(e,f){this.setItemState(e,true,f)},getSelectedItems:function(){var g,e=this.selectedItemsName,f=[];for(g in e){if(e.hasOwnProperty(g)&&e[g]===true){f.push(g)}}return f},isSelected:function(e){return this.selectedItemsName[e]},unselectItems:function(f,h){var g,e=this.selectedItemsName,i=this.elements.items;f=(f===undefined)?true:f;for(g in i){if(i.hasOwnProperty(g)&&e[g]&&!i[g].hasClassName("uwa-pinned")&&h!==g){i[g].removeClassName("selected");e[g]=false;if(f){this.dispatchEvent("onChange",[g,false,this.options.data[g]])}}}},enable:function(){this.enabled=true;this.getContent().removeClassName("disabled")},disable:function(){this.enabled=false;this.getContent().addClassName("disabled")},isEnabled:function(){return this.enabled}});return d.namespace("Controls/Segmented",b,d)});