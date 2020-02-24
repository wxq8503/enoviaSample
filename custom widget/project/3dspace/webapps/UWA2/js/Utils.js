define("UWA/Utils",["UWA/Core","UWA/Array","UWA/Internal/Immediate"],function(f,a,b){var e,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var d=f.getGlobal();e={buildUrl:(function(){var h=(d.location&&d.location.protocol?d.location.protocol:"http:");function g(k){var j=[];function i(l){if(l==="/.."){j.pop()}else{j.push(l)}}k.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^/]*/g,i);return j.join("").replace(/^\//,k.charAt(0)==="/"?"/":"")}return function(j,k){j=String(j);k=String(k);if(!e.isAbsoluteUrl(j)){throw new Error("First argument should be a absolute url.")}if(j.substring(0,2)==="//"){j=h+j}var r,p,s=String(j).split("://"),n=s[0],o=s[1],m=o.split("/"),q=m[0],t="";if(k.substring(0,2)==="//"){j=n+":"+k}else{if(k.split("://").length>1){j=k}else{if(k.substring(0,1)==="/"){j=n+"://"+q+k}else{for(r=1,p=m.length-1;r<p;r++){t+="/"+m[r]}j=n+"://"+q+g(t+"/"+k)}}}return j}}()),parseUrl:(function(){var g=["source","subprotocol","protocol","authority","user","password","domain","port","path","directoryPath","fileName","query","anchor"],h=new RegExp("^(?:(?:(?:([^#.:]+):)?([^#.:]+):)?//)?((?:([^:/]+)(?::([^/]*?))?@)?([^:/?#]*)(?::(\\d*))?)?((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[\\?#]|$)))*/?)?([^?#/]*))?(?:\\?([^#]*))?(?:#(.*))?");return function(m){var k,j=h.exec(m),l={};for(k=0;k<g.length;k++){l[g[k]]=(j[k]||"")}if(l.subprotocol){l.source=l.source.substr(l.subprotocol.length+1)}if(!l.port){l.port=l.protocol==="https"?"443":"80"}if(l.directoryPath&&l.directoryPath.length>0){l.directoryPath=l.directoryPath.replace(/\/?$/,"/")}l.domain=l.domain.toLocaleLowerCase();l.protocol=l.protocol.toLocaleLowerCase();return l}}()),composeUrl:function(h){var g="";if(h.protocol){g=h.protocol+"://";if(h.subprotocol){g=h.subprotocol+":"+g}}if(h.domain){g+=h.domain;if(h.port&&(h.protocol!=="http"||parseInt(h.port,10)!==80)&&(h.protocol!=="https"||parseInt(h.port,10)!==443)){g+=":"+h.port}}else{if(h.authority){g+=h.authority}}if(h.path){g+=h.path}if(h.query){g+="?"+h.query}if(h.anchor){g+="#"+h.anchor}return g},matchUrl:function(i,l){var j,h,k=false,g=e.isAbsoluteUrl(i),m=e.isAbsoluteUrl(l);if(!g&&!m){k=true}else{if(!g){i=e.buildUrl(l,i)}else{if(!m){l=e.buildUrl(i,l)}}j=e.parseUrl(i);h=e.parseUrl(l);k=["domain","protocol","port"].every(function(n){return j[n]===h[n]||(n==="protocol"&&(j[n]===""||h[n]===""))})}return k},isAbsoluteUrl:(function(){var g=/^((https?|ftp|file):)?\/\//;return function(h){return g.test(h)}}()),isValidUrl:(function(){var s="(?:((?:https?|ftp|file):)?//)";var x="(?:\\S+(?::\\S*)?@)?";var u="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))";var k="[a-z\\u00a1-\\uffff0-9]+";var v="(?:"+k+"-)*"+k;var n=v;var z="(?:\\."+v+")*";var r="\\.(?:[a-z\\u00a1-\\uffff]{2,})";var q="(?::\\d{2,5})?";var y="[a-z0-9._~\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF!\\$&'\\(\\)\\*\\+,;=:@-]";var p="(?:%[\\da-f]{2})";var g="("+y+"|"+p+")";var w=g+"*";var o="("+g+"|[\\uE000-\\uF8FF]|\\/|\\?)*";var t="(\\/(?!/)"+w+")*";var l="(\\?"+o+")?";var h="(\\#"+o+")?";var j=t+l+h;var i=new RegExp("^"+s+x+"(?:"+u+"|"+n+z+r+")"+q+j+"$","i");var m=new RegExp("^"+j+"$","i");return function(A){return(e.isAbsoluteUrl(A)?i:m).test(A)}}()),encodeUrl:function(g){return encodeURIComponent(g).replace(/\./g,"%2e")},parseQuery:function(i){var h=i.substring((i.indexOf("?"))+1).split(/[&;]/),g={};if(h.length){h.forEach(function(n){var j=n.indexOf("=")+1,l=j?n.substr(j):"",k=j?n.substr(0,j-1).match(/([^\][]+|(\B)(?=\]))/g):[n],m=g;if(k){l=decodeURIComponent(l);k.forEach(function(p,o){p=decodeURIComponent(p);var q=m[p];if(o<k.length-1){m=m[p]=q||{}}else{if(Array.isArray(q)){q.push(l)}else{m[p]=f.is(q)?[q,l]:l}}})}})}return g},toQueryString:function(i,l){var h,k,g,m,j=f.is;if(j(i,"string")){m=i}else{if(j(i.toQueryString,"function")){m=i.toQueryString()}else{m=[];for(h in i){if(i.hasOwnProperty(h)){k=i[h];if(l){h=l+"["+h+"]"}if(j(k)){if(j(k,"object")||j(k,"array")){g=e.toQueryString(k,h)}else{if(!j(k,"function")){g=e.encodeUrl(h)+"="+e.encodeUrl(k)}}}if(g){m.push(g)}g=undefined}}m=m.join("&")}}return m},getQueryString:function(h,g,j){g=g.replace(/[[]/,"\\[").replace(/[\]]/,"\\]");var i=new RegExp(g+"=([^&#]*)").exec(h);return(i?decodeURIComponent(i[1]):j)},loadXml:(function(){var h=/<(DOCTYPE|xml)[^><]*>|<.(DOCTYPE|xml)[^><]*>/g,g=/(<(style|script)[^>]*>)([\u0001-\uFFFF]*?)(<\/(style|script)>)/img,i=/<!\[CDATA\[/;return function(l,n){var p,k,o,m,j;if(typeof l==="object"&&l.nodeType){p=l}else{l=l.replace(h,"");l=l.replace(g,function(){var u=arguments,t=u[1],s=u[3],r=u[4];if(!i.test(s)){s="<![CDATA[\n"+s+"\n]]>"}return t+s+r});if(d.DOMParser){try{p=new d.DOMParser();p=p.parseFromString(l,"application/xml");j=p.getElementsByTagName("parsererror")[0];if(j){throw new Error(j.textContent||j.innerText)}}catch(q){throw new Error("Invalid XML: "+q.message)}}else{if(d.ActiveXObject){p=new d.ActiveXObject("MSXML2.DOMDocument");p.setProperty("SelectionLanguage","XPath");p.validateOnParse=false;p.resolveExternals=false;p.preserveWhiteSpace=false;p.async=false;p.loadXML(l);if(p.parseError.errorCode!==0){throw new Error("Invalid XML: "+p.parseError.line+", "+p.parseError.reason)}}else{throw new Error("No native XML parser available.")}}}if(n){if(d.XSLTProcessor){k=new d.XSLTProcessor();k.importStylesheet(e.loadXml(n));p=k.transformToDocument(p,document)}else{k=new d.ActiveXObject("Msxml2.FreeThreadedDOMDocument");k.loadXML(e.xmlToString(n));o=new d.ActiveXObject("Msxml2.XSLTemplate");o.stylesheet=k;m=o.createProcessor();m.input=p;m.transform();p=e.loadXml(m.output)}}return p}}()),loadHtml:(function(){var i=new RegExp("</?(script|embed|object|frameset|frame|iframe|meta|link|style)(.|\n)*?>","img"),h=new RegExp("<([a-z][a-z0-9]*)(?:[^>]*(\\s(src|href|title|style|alt|height|width|data-([a-z][a-z0-9]*))=['\"][^'\"]*['\"]))?[^>]*?(\\/?)>","im");function g(j){j=j.replace(i,"");j=j.replace(h,"<$1$2$4>");return j}return function(l){var q,p,m,n;if(d.DOMParser){try{q=new d.DOMParser().parseFromString(l,"text/html")}catch(k){}}if(!q&&document.implementation.createHTMLDocument){try{q=document.implementation.createHTMLDocument("");p=q.documentElement;p.innerHTML=l;m=p.firstElementChild;if(p.childElementCount===1&&m.localName.toLowerCase()==="html"){q.replaceChild(m,p)}}catch(j){q=null}}l=g(l);if(!q&&d.ActiveXObject){try{q=new d.ActiveXObject("htmlfile");q.write(l);q.close()}catch(o){q=null}}if(!q){n=document.createElement("iframe");n.style.display="none";document.body.appendChild(n);q=n.contentDocument||n.contentWindow.document;q.write(l);q.close();document.body.removeChild(n)}return q}}()),xmlToHtml:function(o){if(typeof o==="string"){o=e.loadXml(o)}if(o.nodeType===9){o=o.childNodes[0]}var h,g,m,j,p=o.nodeName.toLowerCase(),n=document.createElement(p),q=o.childNodes,k=o.attributes||[];for(m=0,j=k.length;m<j;m++){h=k[m];n.setAttribute(h.name,h.value)}for(m=0,j=q.length;m<j;m++){g=q[m];switch(g.nodeType){case 1:n.appendChild(e.xmlToHtml(g));break;case 3:if(p==="style"&&n.styleSheet){n.styleSheet.cssText=g.nodeValue}else{n.appendChild(document.createTextNode(g.nodeValue))}break;case 4:case 8:if(p==="script"){n.text=g.nodeValue}else{n.appendChild(document.createComment(g.nodeValue))}break}}return n},xmlToString:(function(){function g(i){var m,h,k,j,l=0;m=i.trim().replace(/(>)(\s+)?(<)(\/*)/g,"$1\r\n$3$4").split(">\r\n");i="";m.forEach(function(r,p){var q,o=0,s="",n="\r\n";if(p!==m.length-1){r=r+">"}k=j;j=h;h=/(<!\[CDATA\[)|(\]\]>)/.test(m[p+1]||"");if(r.match(/.+<\/\w[^>]*>$/)){o=0}else{if(r.match(/^<\/\w/)){if(l!==0){l-=1}}else{if(r.match(/^<\w[^>]*[^/]>.*$/)){o=1}}}for(q=0;q<l;q++){s+="  "}if(h||(j&&!h)){n=""}if(j||(k&&!j)){s=""}i+=s+r+n;l+=o});return i}return function(j,h){var i;if(typeof j==="string"){i=j}else{if(d.XMLSerializer){i=new d.XMLSerializer();i=i.serializeToString(j)}else{i=j.xml}}if(h){i=g(i)}return i.trim()}}()),setCss:(function(){function m(w){var o=/\{/g;var u=/\}/g;var r=0;var t=u.test(w);var q=o.test(w);var v=[];var p={children:v};while(true){if(q&&o.lastIndex<u.lastIndex){var n={prefix:w.slice(r,o.lastIndex-1),parent:p,content:"",children:[]};p.children.push(n);p=n;r=o.lastIndex;q=o.test(w)}else{if(t){p.content=w.slice(r,u.lastIndex-1);if(p.parent){p=p.parent}r=u.lastIndex;t=u.test(w)}else{break}}}return v}function l(n,o){n.forEach(function(q){var p=q.prefix.trim();if(p[0]!=="@"&&o!==false){q.selectors=a.invoke(p.split(","),"trim")}l(q.children,!p.startsWith("@keyframes"))})}function h(q,n){var o=n.match(/^[\s\S]*(?:^|\s)(?:body|html)\b(\S*)/);var p,r;if(o){p=n.slice(0,o[0].length).trim()+" ";r=n.slice(o[0].length).trim()}else{p="";r=n}r=r.replace(/^\.module\b\S*\s/,"");if(!r.startsWith(q+" ")){r=q+" "+r}return p+r}function k(n,o){n.forEach(function(r){if(r.selectors){var q,p;for(q=0,p=r.selectors.length;q<p;q++){r.selectors[q]=h(o,r.selectors[q])}}else{k(r.children,o)}})}function j(o,n){o.forEach(function(p){p.content=p.content.replace(/\burl\(["']?([\s\S]*?)["']?\)/g,function(r,q){if(!e.isAbsoluteUrl(q)){q=e.buildUrl(n,q)}return'url("'+q+'")'})})}function i(n){return n.map(function(p){var o=p.selectors?p.selectors.join(",\n")+" ":p.prefix;return o+"{"+i(p.children)+p.content+"}"}).join("\n")}function g(p,q){var o=document.getElementById(q);if(!o){o=document.createElement("style");o.setAttribute("id",q);o.setAttribute("type","text/css");var n=document.getElementsByTagName("head").item(0);n.appendChild(o)}if(o.styleSheet){o.styleSheet.cssText=p}else{o.appendChild(document.createTextNode(p))}}return function(r,q,p,n){p=p?p.trim():"";q=Array.isArray(q)?q.join("\n"):String(q);if(!r){r=e.getCheckSum(q)}q=q.replace(/\/\*[\s\S]*?\*\//g,"");var o=m(q);if(p){l(o);k(o,p)}if(n){j(o,n)}q=i(o);g(q,r);return q}}()),toArray:function(k){var j,g,h=typeof k,m=[];if(h==="string"){m=k.split("")}else{if(h==="object"&&Array.isArray(k)===false){if(k.length!==undefined){for(j=0,g=k.length;j<g;j++){m[j]=k[j]}}else{for(j in k){if(k.hasOwnProperty(j)){m.push(k[j])}}}}else{if(k){m=Array.prototype.slice.call(k)}}}return m},splat:function(h){var g;if(!f.is(h)){g=[]}else{if(Array.isArray(h)){g=h}else{if(f.is(h,"arguments")){g=e.toArray(h)}else{g=[h]}}}return g},getUUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){var h=(Math.random()*16|0),g=i==="x"?h:(h&3|8);return g.toString(16)})},getUniqueId:(function(){var g=0,h=Math.pow(32,4);return function(i){g++;var j=(Math.random()*h|0)*h+g;return(i||"u")+("0000"+j.toString(32)).slice(-8)}}()),getCheckSum:function(h,k){h=String(h);var j,g;k=k||305419896;for(j=0,g=h.length;j<g;j++){k+=(h.charCodeAt(j)*j)}return Math.abs(parseInt(k,10)).toString(36)},getCRC32:(function(){var g="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";return function(j){j=String(j);var k,m,l=0,h=0,n=0;l=l^(-1);for(k=0,m=j.length;k<m;k++){n=(l^j.charCodeAt(k))&255;h="0x"+g.substr(n*9,8);l=(l>>>8)^h}return l^(-1)}}()),base64Encode:(function(){function h(i){return unescape(encodeURIComponent(i))}var g=d.btoa||function(m){var t,r,p,s,q,o,n,j=m.length,k="",l=0;while(l<j){t=m.charCodeAt(l++);r=m.charCodeAt(l++);p=m.charCodeAt(l++);s=t>>2;q=((t&3)<<4)|(r>>4);o=((r&15)<<2)|(p>>6);n=p&63;if(isNaN(r)){o=n=64}else{if(isNaN(p)){n=64}}k=k+c.charAt(s)+c.charAt(q)+c.charAt(o)+c.charAt(n)}return k};return function(i){i=String(i);return g(h(i))}}()),base64Decode:(function(){function g(j){return decodeURIComponent(escape(j))}var i=/[^A-Za-z0-9+/=]/g,h=d.atob||function(m){var j,t,r,p,s,q,o,n,k="",l=0;if(typeof m!=="string"){m=String(m)}m=m.replace(i,"");j=m.length;if(j%4===1){throw new Error("InvalidCharacterError: DOM Exception 5")}while(l<j){s=c.indexOf(m.charAt(l++));q=c.indexOf(m.charAt(l++));o=l<j&&c.indexOf(m.charAt(l++));n=l<j&&c.indexOf(m.charAt(l++));t=(s<<2)|(q>>4);k=k+String.fromCharCode(t);if(o!==false&&o!==64){r=((q&15)<<4)|(o>>2);k=k+String.fromCharCode(r)}if(n!==false&&n!==64){p=((o&3)<<6)|n;k=k+String.fromCharCode(p)}}return k};return function(l){var j=h(l);try{j=g(j)}catch(k){}return j}}()),attempt:function(k,h,j){var i=Array.prototype.slice.call(arguments,3),g;if(f.debug){g=k.apply(j,i)}else{try{g=k.apply(j,i)}catch(l){if(h){g=h.apply(j,[l].concat(i))}else{f.log("Error in Utils.attempt: "+l)}}}return g},memoize:function(j,i){var h={},g=Array.prototype.slice;i=i||JSON.stringify;return function(){var k=i(g.call(arguments));if(!h.hasOwnProperty(k)){h[k]=j.apply(this,arguments)}return h[k]}},getOwnPropertyMatchName:function(j,i){var g,h;i=String(i);if(j.hasOwnProperty(i)){h=i}else{i=i.toLowerCase();for(g in j){if(j.hasOwnProperty(g)){if(g.toLowerCase()===i){h=g;break}}}}return h},getOwnPropertyMatchValue:function(i,h){var g=e.getOwnPropertyMatchName(i,h);return g?i[g]:undefined},setImmediate:b.set,clearImmediate:b.clear,random:function(h,g){if(!f.is(g)){g=h;h=0}return h+Math.floor(Math.random()*(g-h+1))}};return f.namespace("Utils",e,f,true)});