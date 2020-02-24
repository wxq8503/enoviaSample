define("UWA/Class/Collection",["UWA/Core","UWA/Array","UWA/Utils","UWA/Class","UWA/Class/Debug","UWA/Class/Events","UWA/Class/Listener","UWA/Class/Model"],function(f,c,g,a,j,l,k,d){var h,i,b,e;h={add:true,remove:true,merge:true};i={add:true,remove:false};b=function(m){return f.is(m,"function")?m:function(n){return n.get(m)}};e=a.extend(l,k,{init:function(n,m){if(!f.is(m)){m={}}if(m.url){this.url=m.url}if(m.model){this.model=m.model}if(m.comparator!==undefined){this.comparator=m.comparator}this._reset();this._modelListener=function(q,p,r,o){return this._onModelEvent(q,p,r,o)};this.setup(n,m);if(n){this.reset(n,f.extend({silent:true},m))}},clone:function(){return new this.constructor(this._models)},setup:function(){return},sync:function(){return d.prototype.sync.apply(this,arguments)},parse:function(m){return m},model:d,add:function(n,m){return this.set(n,f.extend(f.extend({merge:false},m),i))},push:function(n,m){return this.add(n,f.merge({at:this.length},m))},unshift:function(n,m){return this.add(n,f.merge({at:0},m))},remove:function(s,p){var o,n,q,m,r;if(!f.is(p)){p={}}r=!Array.isArray(s);s=r?[s]:f.clone(s,false);for(q=0,m=s.length;q<m;q++){n=s[q]=this.get(s[q]);if(n){delete this._byId[n.id];delete this._byId[n.cid];o=this.indexOf(n);this._models.splice(o,1);this.length--;if(!p.silent){p.index=o;n.dispatchEvent("onRemove",[n,this,p])}this._removeReference(n)}}return r?s[0]:s},pop:function(n){var m;m=this.at(this.length-1);this.remove(m,n);return m},shift:function(n){var m;m=this.at(0);this.remove(m,n);return m},sort:function(m){if(!f.is(m)){m={}}if(!this.comparator){throw new Error("Cannot sort a collection without a comparator")}if(f.is(this.comparator,"string")||this.comparator.length===1){this._models=this.sortBy(this.comparator,this)}else{this._models.sort(this.comparator.bind(this))}if(!m.silent){this.dispatchEvent("onSort",[this,m])}return this},set:function(K,n){var w,m,H,L,D,B,x,p,M,F,G,E,A,I,o,C,z,J,v,u,t,s,r=this;n=f.merge(f.merge({},n),h);if(n.parse){K=r.parse(K,n)}s=!Array.isArray(K);K=s?(K?[K]:[]):f.clone(K,false);w=n.at;I=r.model;m=r.comparator&&(!f.is(w))&&n.sort!==false;H=(f.typeOf(r.comparator)==="string")?r.comparator:null;L=[];D=[];B={};x=n.add;p=n.merge;M=n.remove;F=!m&&x&&M?[]:false;for(G=0,E=K.length;G<E;G++){C=K[G];if(C instanceof d){A=o=C}else{A=C[I.prototype.idAttribute]}z=r.get(A);if(z){if(M){B[z.cid]=true}if(p){C=C===o?o._attributes:C;if(n.parse){C=z.parse(C,n)}z.set(C,n);if(m&&!J&&z.hasChanged(H)){J=true}}K[G]=z}else{if(x){o=K[G]=r._prepareModel(C,n);if(o){K[G]=o;L.push(o);o.addEvent("onAnyEvent",r._modelListener,r);r._byId[o.cid]=o;if(f.is(o.id)){r._byId[o.id]=o}}}}var y=z||o;if(F&&y){var q=F.indexOf(y);if(q>=0){F.splice(q,1)}F.push(z||o)}}if(M){for(G=0,E=r.length;G<E;++G){o=r._models[G];if(!B[o.cid]){D.push(o)}}if(D.length){r.remove(D,n)}}if(L.length||(F&&F.length)){if(m){J=true}r.length+=L.length;if(f.is(w)){for(u=0,t=L.length;u<t;u++){r._models.splice(w+u,0,L[u])}}else{if(F){r._models.length=0}v=F||L;for(u=0,t=v.length;u<t;u++){r._models.push(v[u])}}}if(J){r.sort({silent:true})}if(!n.silent){for(G=0,E=L.length;G<E;G++){o=L[G];o.dispatchEvent("onAdd",[o,r,n])}if(J||(F&&F.length)){r.dispatchEvent("onSort",[r,n])}}return s?K[0]:K},reset:function(r,p){var o,q,m,n;p=p?f.clone(p,false):{};n=this._models;for(q=0,m=n.length;q<m;q++){o=n[q];this._removeReference(o)}p.previousModels=this._models;this._reset();r=this.add(r,f.extend({silent:true},p));if(!p.silent){this.dispatchEvent("onReset",[this,p])}return r},get:function(m){if(f.is(m)){return this._byId[m.id]||this._byId[m.cid]||this._byId[m]}},at:function(m){return this._models[m]},first:function(o,m){if(f.is(o)&&!m){return this._models.slice(0,o)}return this._models[0]},last:function(o,m){if(f.is(o)&&!m){return this._models.slice(Math.max(this._models.length-o,0))}return this._models[this._models.length-1]},toArray:function(){return this.slice()},slice:function(n,m){return this._models.slice(n,m)},rest:function(o,m){return this._models.slice(((!f.is(o))||m?1:o))},initial:function(o,m){return this._models.slice(0,this._models.length-((!f.is(o))||m?1:o))},without:function(){var m;m=Array.prototype.concat.apply([],Array.prototype.slice.call(arguments));return this._models.filter(function(n){return(m.indexOf(n))===-1})},indexOf:function(m,n){return this._models.indexOf(m,n)},lastIndexOf:function(m,n){return this._models.lastIndexOf(m,n)},contains:function(m){return this.indexOf(m)!==-1},size:function(){return this._models.length},isEmpty:function(){return this._models.length===0},toJSON:function(m){return this.map(function(n){return n.toJSON(m)})},pluck:function(m){return this._models.map(function(n){return n.get(m)})},shuffle:function(){var n,m;m=[];this.forEach(function(p,o){n=g.random(o);m[o]=m[n];m[n]=p});return m},where:function(m,n){if(!f.is(m)){return(n?undefined:[])}return this[n?"find":"filter"](function(o){var p;for(p in m){if(m[p]!==o.get(p)){return false}}return true})},findWhere:function(m){return this.where(m,true)},invoke:function(){var m=Array.prototype.slice.call(arguments);m.unshift(this._models);return c.invoke.apply(null,m)},forEach:function(n,m){return this._models.forEach(n,m)},map:function(n,m){return this._models.map(n,m)},every:function(n,m){return this._models.every(n,m)},some:function(n,m){return this._models.some(n,m)},sortBy:function(n,m){var p,o;p=b(n);o=this._models.map(function(r,q,s){return{model:r,index:q,criteria:p.call(m,r,q,s)}});o.sort(function(t,s){var r,q;r=t.criteria;q=s.criteria;if(r!==q){if(r>q||r===undefined){return 1}if(r<q||q===undefined){return -1}}if(t.index<s.index){return -1}return 1});return o.map(function(q){return q.model})},groupBy:function(p,n){var o,m,q=this._models;o=b(p);m={};this.forEach(function(s,r){var t=o.call(n,s,r,q);if(!f.owns(m,t)){m[t]=[]}m[t].push(s)});return m},countBy:function(p,n){var o,m,q=this._models;o=b(p);m={};this.forEach(function(s,r){var t=o.call(n,s,r,q);if(!f.owns(m,t)){m[t]=0}m[t]++});return m},find:function(o,n){var m;this.some(function(q,p,r){if(o.call(n,q,p,r)){m=q;return true}});return m},filter:function(n,m){return this._models.filter(n,m)},reject:function(n,m){return this.filter(function(p,o,q){return !n(p,o,q)},m)},reduce:function(p,m,o){var n=p;if(o){n=n.bind(o)}if(arguments.length>1){return this._models.reduce(n,m)}return this._models.reduce(n)},reduceRight:function(p,m,o){var n=p;if(o){n=n.bind(o)}if(arguments.length>1){return this._models.reduceRight(n,m)}return this._models.reduceRight(n)},max:function(o,n){var m,p;if(!o||this.isEmpty()){return undefined}p=b(o);m={computed:-Infinity,model:undefined};this.forEach(function(r,q,t){var s;s=p.call(n,r,q,t);if(s>=m.computed){m={model:r,computed:s};return m}});return m.model},min:function(o,n){var m,p;if(!o||this.isEmpty()){return undefined}p=b(o);m={computed:Infinity,model:undefined};this.forEach(function(r,q,t){var s;s=p.call(n,r,q,t);if(s<m.computed){m={model:r,computed:s};return m}});return m.model},fetch:function(m){var p,n,o=this;m=m?f.clone(m,false):{};if(m.parse===undefined){m.parse=true}p=m.onComplete;m.onComplete=function(q){var r;r=m.reset?"reset":"set";o[r](q,m);if(p){p(o,q,m)}return o.dispatchEvent("onSync",[o,q,m])};n=m.onFailure;m.onFailure=function(q){if(n){n(o,q,m)}o.dispatchEvent("onError",[o,q,m])};return o.sync("read",o,m)},create:function(m,o){var n,q,p=this;o=o?f.clone(o,false):{};n=p._prepareModel(m,o);if(!n){return false}if(!o.wait){p.add(n,o)}q=o.onComplete;o.onComplete=function(s,r){if(o.wait){p.add(s,o)}if(q){return q(s,r,o)}};n.save(null,o);return n},_reset:function(){this.length=0;this._models=[];this._byId={};return this._byId},_prepareModel:function(o,n){var m;if(o instanceof d){if(!o.collection){o.collection=this}return o}n=f.is(n)?f.clone(n,false):{};n.collection=this;m=new this.model(o,n);if(!m.validationError){return m}this.dispatchEvent("onValidationFailure",[this,m.validationError,n]);return false},_removeReference:function(m){if(this===m.collection){delete m.collection}return m.removeEvent("onAnyEvent",this._modelListener,this)},_onModelEvent:function(o,n,p,m){if((o==="onAdd"||o==="onRemove")&&p!==this){return}if(o==="onDestroy"){this.remove(n,m)}if(n&&o===("onChange:"+n.idAttribute)){delete this._byId[n.previous(n.idAttribute)];if(f.is(n.id)){this._byId[n.id]=n}}return this.dispatchEvent(o,[n,p,m])}});return f.namespace("Collection",e,a)});