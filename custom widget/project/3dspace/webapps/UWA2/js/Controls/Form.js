define("UWA/Controls/Form",["UWA/Core","UWA/String","UWA/Utils","UWA/Event","UWA/Json","UWA/Controls/Abstract","UWA/Controls/Input"],function(h,e,d,b,a,g,f){var c=g.extend({id:null,defaultOptions:{className:"uwa-form",fields:[],labelPreffix:":",nativeInputs:false,darkBackground:false},init:function(i){this._parent(i);this.id=d.random(10);this.buildSkeleton()},buildSkeleton:function(){var o,n,r,q=this,s=q.options,p=q.options.fields,j=q.fields,m=[],k=h.createElement("form",{"class":s.className,id:this.id,events:{submit:function(i){b.stop(i);this.dispatchEvent("onSubmit",[i,this.getFormValues()])}.bind(this)}});if(!s.nativeInputs){k.addClassName("uwa-form-uikit")}for(o=0,n=p.length;o<n;o++){r=p[o];if(r.type!=="hidden"){if(j[r.type]===undefined){r.type="text"}r.id="m_"+q.id+"_"+r.name;m.push(j[r.type](r,s,this))}}h.createElement("fieldset",{html:m}).inject(k);q.elements.container=k},getFields:function(){var i=this.elements.container,k=d.toArray(i.getElementsByTagName("textarea")),j=d.toArray(i.getElementsByTagName("input")),l=d.toArray(i.getElementsByTagName("select"));return j.concat(l).concat(k)},getField:function(k){var n,j,m,o=this.getFields();for(n=0,j=o.length;n<j;n++){m=o[n];if(m.name===k){return m}}},getFormValues:function(){var n,j,k={},o=this.getFields();function p(i){return i.getElements("option").filter(function(l){return l.selected}).map(function(l){return l.value})}for(n=0,j=o.length;n<j;n++){var m=o[n];switch(m.type){case"button":case"submit":break;case"password":if(m.value!==""){k[m.name]=m.value}break;case"checkbox":k[m.name]=Boolean(m.checked);if(typeof m.value==="string"){k[m.name]=String(k[m.name])}break;case"radio":if(m.checked){k[m.name]=m.value}break;default:if(m.getTagName()==="select"&&m.multiple){k[m.name]=p(m)}else{k[m.name]=m.value}break}}return k},getFormValue:function(i){return this.getFormValues()[i]},setFormValues:function(k){var n,j,m,p,o=this.getFields();for(n=0,j=o.length;n<j;n++){m=o[n];if(k.hasOwnProperty(m.name)){p=k[m.name];switch(m.type){case"password":case"button":case"submit":break;case"checkbox":m.checked=Boolean(p);break;case"radio":if(m.checked&&String(m.value)===p){m.checked=Boolean(p)}break;default:m.value=p;break}}}},setFormValue:function(j,k){var i={};i[j]=k;this.setFormValues(i)},fields:{text:function(l,j,k){var i=h.createElement("input",{type:"text",id:l.id,"class":l.type+" small",name:l.name,value:l.value||"",autocomplete:"off",autocorrect:"off",autocapitalize:"off"});if(l.onchange){i.addEvent("keyup",function(){this.dispatchEvent("onChange",[l.onchange,l.name,i.value])}.bind(k))}return h.createElement("div",{"class":"field field"+e.ucfirst(l.type),html:[{tag:"label","for":l.id,text:h.i18n((l.label||l.name)+j.labelPreffix)},{tag:"span",content:j.nativeInputs?i:new f.Text({_root:false,element:i,className:"small"})}]})},password:function(l,j,k){var i=h.createElement("input",{type:"password",id:l.id,"class":l.type,name:l.name,value:l.value||""});if(l.onchange){i.addEvent("keyup",function(){this.dispatchEvent("onChange",[l.onchange,l.name,i.value])}.bind(k))}return h.createElement("div",{"class":"field field"+e.ucfirst(l.type),html:[{tag:"label","for":l.id,text:h.i18n((l.label||l.name)+j.labelPreffix)},{tag:"span",content:j.nativeInputs?i:new f.Text({_root:false,element:i,className:"small"})}]})},submit:function(k,j){var i=h.createElement("input",{id:k.id,"class":k.type,type:"submit",name:k.name,value:k.value||h.i18n("Done")});return h.createElement("div",{"class":"field field"+e.ucfirst(k.type),html:{tag:"span",content:j.nativeInputs?i:new f.Button({_root:false,element:i,className:"light-grey small"})}})},button:function(k,j){var i=h.createElement("button",{id:k.id,"class":k.type,name:k.name,text:k.value||h.i18n("Done")});return h.createElement("div",{"class":"field field"+e.ucfirst(k.type),html:{tag:"span",content:j.nativeInputs?i:new f.Button({_root:false,element:i,className:"light-grey small"})}})},reset:function(k,j){var i=h.createElement("button",{id:k.id,type:"reset","class":k.type,name:k.name,value:k.value||h.i18n("Done")});return h.createElement("div",{"class":"field field"+e.ucfirst(k.type),html:{tag:"span",content:j.nativeInputs?i:new f.Button({_root:false,element:i,className:"light-grey small"})}})},"boolean":function(m,j,l){var i,p=m.id,n=h.createElement("div",{"class":"field field"+e.ucfirst(m.type)}),k=typeof m.value==="string"?"true":true,o=(m.value&&(m.value===true||m.value==="true"));h.createElement("label",{"for":p,text:h.i18n((m.label||m.name))}).inject(n);i=h.createElement("input",{id:p,value:k,type:"checkbox","class":m.type+" "+(o?"checked":"unchecked"),name:m.name});if(o){i.setAttribute("checked","checked");i.defaultChecked=true}i.addEvent("change",function(){var q=i.checked;i.addClassName(q?"checked":"unchecked");i.removeClassName(q?"unchecked":"checked");if(m.onchange){this.dispatchEvent("onChange",[m.onchange,m.name,q?"true":"false"])}}.bind(l));h.createElement("span",{html:j.nativeInputs?i:new f.Checkbox({_root:false,element:i,className:j.darkBackground?"green":""})}).inject(n);return n},textarea:function(l,j,k){var i=h.createElement("textarea",{id:l.id,"class":l.type+" small",name:l.name,text:l.value||""});if(l.onchange){i.addEvent("keyup",function(){this.dispatchEvent("onChange",[l.onchange,l.name,i.value])}.bind(k))}return h.createElement("div",{"class":"field field"+e.ucfirst(l.type),html:[{tag:"label","for":l.id,text:h.i18n((l.label||l.name)+j.labelPreffix)},j.nativeInputs?i:new f.Text({_root:false,element:i})]})},range:function(o,r,l){var m,n,j,p,k=o.id,q=h.createElement("div",{"class":"field field"+e.ucfirst(o.type)});h.createElement("label",{"for":k,text:h.i18n((o.label||o.name)+r.labelPreffix)}).inject(q);j=h.createElement("span").inject(q);p=h.createElement("select",{id:"m_"+l.id+"_"+o.name,"class":"range",name:o.name}).inject(j);o.step=parseInt(o.step,10);o.max=parseInt(o.max,10);o.min=parseInt(o.min,10);if(o.step>0){for(m=o.min;m<=o.max;m+=o.step){n=h.createElement("option",{value:m,text:String(m)});if(o.value&&parseInt(o.value,10)===m){n.setAttribute("selected","selected");n.selected=true}p.appendChild(n)}}if(o.onchange){p.addEvent("change",function(){this.dispatchEvent("onChange",[o.onchange,o.name,p.value])}.bind(l))}if(!r.nativeInputs){new f.Select({_root:false,element:p,className:"small"})}return q},list:function(s,v,m){var p,o,q,n,j,r,k="m_"+m.id+"_"+s.name,u=h.createElement("div",{"class":"field field"+e.ucfirst(s.type)});h.createElement("label",{"for":k,text:h.i18n((s.label||s.name)+v.labelPreffix)}).inject(u);j=h.createElement("span").inject(u);r=h.createElement("select",{id:"m_"+m.id+"_"+s.name,"class":"list",name:s.name,multiple:Boolean(s.multiple)}).inject(j);if(h.is(s.options,"array")&&s.options.length>0){var t=d.splat(s.value).map(function(i){return String(i)});for(p=0,o=s.options.length;p<o;p++){q=s.options[p];q.label=q.label||q.value;n=h.createElement("option",{text:h.i18n(q.label),value:q.value}).inject(r);if(t.indexOf(String(q.value))>=0){n.setAttribute("selected","selected");n.selected=true}}if(s.onchange){r.addEvent("change",function(){this.dispatchEvent("onChange",[s.onchange,s.name,r.value])}.bind(m))}}else{u.hide()}if(!v.nativeInputs){new f.Select({_root:false,element:r,className:"small"})}return u},checklist:function(x,A,o){var t,s,u,j,r,v=[],n="m_"+o.id+"_"+x.name,z=h.createElement("div",{"class":"field field"+e.ucfirst(x.type)});h.createElement("label",{"for":n,text:h.i18n((x.label||x.name)+A.labelPreffix)}).inject(z);j=h.createElement("span",{"class":x.type}).inject(z);r=h.createElement("input",{id:"m_"+o.id+"_"+x.name,name:x.name,type:"hidden",value:h.is(x.value,"array")?a.encode(x.value):x.value}).inject(j);if(h.is(x.options,"array")&&x.options.length>0){var m=h.is(x.value,"array")?x.value:a.decode(x.value);var y=d.splat(m).map(function(i){return String(i)});for(t=0,s=x.options.length;t<s;t++){u=x.options[t];u.label=u.label||u.value;var q=y.indexOf(String(u.value))>=0;var k=h.createElement("p").inject(j);var w=h.createElement("input",{value:u.value,type:"checkbox",name:u.value,checked:q});v.push(w);w.addEvent("change",function(){var i=[];v.forEach(function(l){if(l.checked){i.push(l.value)}});r.value=a.encode(i);if(x.onchange){this.dispatchEvent("onChange",[x.onchange,x.name,r.value])}}.bind(o));h.createElement("span",{html:A.nativeInputs?w:new f.Checkbox({_root:false,className:A.darkBackground?"green":"",element:w})}).inject(k);h.createElement("label",{text:h.i18n(u.label)}).inject(k)}}else{z.hide()}return z},html:function(i){return h.createElement("div",{"class":"field field"+e.ucfirst(i.type),html:{tag:"div",html:i.html}})},img:function(j){var i=h.i18n(j.label||j.name)||"";return h.createElement("div",{"class":"field field"+e.ucfirst(j.type),html:{tag:"img",src:j.src,height:j.height||"auto",width:j.width||"100%",alt:i,title:i}})}}});return h.namespace("Controls/Form",c,h)});