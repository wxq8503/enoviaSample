define("UWA/Utils/Asset",["UWA/Promise","vendors/webcomponents/WeakMap"],function(h){var f=new WeakMap();function b(j){return j.container.ownerDocument}var g;function i(j){if(!g){g=document.createElement("a")}g.href=j;return g.href}function c(n,l,m){if(l.force){return m()}var j=b(l);var k=f.get(j);if(!k){k={};f.set(j,k)}if(!k.hasOwnProperty(n)){k[n]=m()}return k[n]}function d(k,j){return function(m,l){m=i(m);l=Object.assign({force:false,timeout:60000,container:document.head},l);return c(m,l,function(){var n;var p;var o=new h(function(r,q){n=j(m,l,r,q);p=setTimeout(function(){n();q(new Error("Asset."+k+": Timeout while loading "+m))},l.timeout)});o.fin(function(){clearTimeout(p)});return o})}}var a=d("js",function(n,k,m,l){var j=b(k).createElement("script");j.setAttribute("type","text/javascript");if(j.addEventListener){j.addEventListener("load",function(){m(j)});j.addEventListener("error",function(){l(new Error("Asset.js: Error while loading "+n))})}else{j.attachEvent("onreadystatechange",function(){if(j.readyState==="loaded"||j.readyState==="complete"){m(j)}})}k.container.appendChild(j);j.src=n;return function(){k.container.removeChild(j)}});var e=d("css",function(n,j,m,l){var k=b(j).createElement("link");k.setAttribute("rel","stylesheet");k.setAttribute("type","text/css");if(k.addEventListener){k.addEventListener("load",function(){m(k.sheet)});k.addEventListener("error",function(){l(new Error("Asset.css: Error while loading "+n))})}else{k.attachEvent("onload",function(){m(k.styleSheet)})}j.container.appendChild(k);k.setAttribute("href",n);return function(){j.container.removeChild(k)}});return{js:a,css:e}});