define("UWA/Controls/Scroller",["UWA/Core","UWA/Class/Timed","UWA/Controls/Abstract","UWA/Utils/Client","UWA/Event","UWA/Element","UWA/Fx"],function(d,a,o,m,t,l,e){var q,p=/input|textarea|select/i,n=/auto|scroll/i,h=m.Features,s=m.Platform,k=(m.Engine.version>=5.1&&Boolean(s.ios));function f(u){return u>>0}function j(w){var v,y,x=true,u=t.getElement(w);if(u){v=u.getTagName();y=u.getStyle("overflow");x=(v&&!v.match(p))&&!y.match(n)}return x}function c(u){return(u.type==="touchstart"||t.whichButton(u)===0)}function b(u){return(u.scroll.x||u.scroll.y||u.options.bounce)}function r(u){return(!q.activeScroller||q.activeScroller===u)}function g(v){var u=v.type;return u.indexOf("mouse")!==-1?"mouse":u.indexOf("touch")!==-1?"touch":u.indexOf("ointer")!==-1?"pointer":"none"}function i(w,v,u){if(w==="init"){l.addEvents.call(v,{touchstart:u,mousedown:u,MSPointerDown:u})}else{if(w==="start"){l.addEvents.call(v,{touchmove:u,mousemove:u,MSPointerMove:u,touchend:u,touchcancel:u,mouseup:u,MSPointerUp:u})}else{if(w==="stop"){l.removeEvents.call(v,{touchmove:u,mousemove:u,MSPointerMove:u,touchcancel:u,touchend:u,mouseup:u,MSPointerUp:u})}else{if(w==="destroy"){l.removeEvents.call(v,{touchstart:u,mousedown:u,MSPointerDown:u,touchmove:u,mousemove:u,MSPointerMove:u,touchcancel:u,touchend:u,mouseup:u,MSPointerUp:u})}}}}}q=o.extend(a,{name:"uwa-scroller",position:null,direction:null,scroll:null,maxScroll:null,scroller:null,maxPage:null,scrollBars:null,isScrolling:false,isTracking:false,isDragging:false,isPulling:false,enabled:true,defaultOptions:{className:"",width:"",height:"",bounce:false,momentum:false,snap:false,threshold:6,lockDirection:true,scrollableX:true,scrollableY:true,scrollbarH:true,scrollbarV:true,scrollTime:250,scrollSize:40,scrollDrag:h.dragAndDrop&&!s.blackberry,useTransform:h.transitionsCSS&&!s.webos,useNative:s.blackberry,isTouch:h.touchEvents,has3d:h.cssMatrix,preventDefaultMouseWheel:false,debugPixel:false},init:function(v,u){var w=this;w._parent(u);u=w.options;d.extend(w,{position:{x:0,y:0},direction:{x:0,y:0},scroll:{x:false,y:false,width:0,height:0},maxScroll:{x:0,y:0},scroller:{width:0,height:0},page:{x:0,y:0},maxPage:{x:0,y:0},scrollBars:{x:null,y:null}});if(!u.useNative){w.buildSkeleton(v)}else{w.buildNative(v)}w.initEvents();w.setPosition(0,0,0,true)},destroy:function(){var y=this,z=y.elements,x=z.element,u=z.scroller,A=z.wrapper,v=z.scrollerParent,w=y.eventHandler;if(q.activeScroller===y){delete q.activeScroller}if(x){l.removeEvent.call(x,"resize",w);l.inject.call(x,u,"before")}if(v){l.removeEvent.call(v,"resize",w)}i("destroy",u,y.eventHandler);l.removeEvents.call(u,{keydown:w,mousewheel:w});u.destroy();A.destroy()},setOptions:function(v){this._parent(v);v=this.options;var u=v.snap;v.snap=u===true?{x:null,y:null}:typeof u==="number"?{x:u,y:u}:u;return this},buildNative:function(v){var w=this,y=(s.android||s.blackberry||k?"scroll":"auto"),u=w.options,x=w.elements={element:v,scroller:d.createElement("div",{"class":w.getClassNames("","-native"),styles:{overflow:y,overflowScrolling:"touch",zIndex:"0",position:"relative",height:u.height||"100%",width:u.width||"100%",userSelect:"none",zoom:"1"}}),wrapper:d.createElement("div",{"class":u.className+"-wrapper"}),ghost:d.createElement("div",{styles:{height:"10px",width:"10px",background:"#000",position:"absolute",zIndex:"1",opacity:u.debugPixel?1:0},events:{click:function(z){t.stop(z);return false}}})};x.scroller.style.webkitOverflowScrolling="touch";w.body=u.body===false?x.scroller:u.body||document.body;x.scroller.inject(v,"before");x.wrapper.inject(x.scroller);x.ghost.inject(x.scroller);v.inject(x.wrapper);x.scrollerParent=x.scroller.getParent();x.scroller.addEvent("scroll",function(){w.position=w.getPosition();w.setAnimate("onScroll",function(){w.triggerOnScroll();w.triggerOnScrollEnd()})});w.onRefresh()},buildSkeleton:function(w){var x=this,v=x.options,u=x.scrollBars,y=x.elements={element:w,scroller:d.createElement("div",{"class":x.getClassNames("","-fake"),tabindex:"0",styles:{overflow:"hidden",position:"relative",userSelect:"none",outline:0,zoom:"1"}}),wrapper:d.createElement("div",{"class":v.className+"-wrapper",styles:{width:"100%",height:"100%",position:"relative"}}),ghost:d.createElement("div",{styles:{height:"10px",width:"10px",background:"#000",position:"absolute",zIndex:"1",opacity:v.debugPixel?1:0},events:{click:function(z){t.stop(z);x.updateGhostPosition({y:0,x:0})}}})};x.body=v.body||m.Engine.ie?document.body:window;y.scroller.addContent([y.wrapper,y.ghost]).inject(w,"before");w.inject(y.wrapper);y.scrollerParent=y.scroller.getParent();u.x=v.scrollableX&&v.scrollbarH&&new q.Scrollbar(d.extend({dir:"horizontal"},v.scrollbar),x);u.y=v.scrollableY&&v.scrollbarV&&new q.Scrollbar(d.extend({dir:"vertical"},v.scrollbar),x);x.onRefresh()},initEvents:function(){var v,w=this,u=w.options,x=w.elements;v=w.eventHandler=w.handleEvent.bind(w);x.scroller.addEvents({keydown:v,mousewheel:v});if(u.scrollDrag){i("init",x.scroller,w.eventHandler);w.setCursor("grab");x.scroller.addEvents({mousemove:t.preventDefault,touchmove:t.preventDefault})}x.element.addEvent("resize",v);x.scrollerParent.addEvent("resize",v)},handleEvent:function(x){var u,w=this,v=x.type;switch(v){case"touchstart":case"mousedown":case"MSPointerDown":u=w.dispatchEvent("onScrollInit",[x]);break;case"touchmove":case"mousemove":case"MSPointerMove":u=w.dispatchEvent("onScrollMove",[x]);break;case"touchend":case"touchcancel":case"mouseup":case"MSPointerUp":u=w.dispatchEvent("onScrollStop",[x]);break;case"DOMMouseScroll":case"onmousewheel":case"mousewheel":u=w.dispatchEvent("onMouseWheel",[x]);break;case"keydown":u=w.dispatchEvent("onKeyDown",[x]);break;case"DOMSubtreeModified":case"orientationchange":case"resize":u=w.dispatchEvent("onRefresh",[x]);break}return u},scrollTo:function(v,B,A){var u,z=this,w=z.options;A=!isNaN(A)?A:w.scrollTime;if(z.options.snap){u=z.snap(v,B);v=u.x;B=u.y;A=Math.min(u.time,A)}z.setPosition(v,B,A)},scrollToPage:function(y,x,A){var z=this,w=z.options,B=z.getPage(),v=z.position,u=z.getSnapSize();if(!w.snap){B.x=-f(v.x/u.x);B.y=-f(v.y/u.y)}if(y==="next"){y=++B.x}else{if(y==="prev"){y=--B.x}}if(x==="next"){x=++B.y}else{if(x==="prev"){x=--B.y}}y=y!==false?-y*u.x:v.x;x=x!==false?-x*u.y:v.y;A=!isNaN(A)?A:w.scrollTime;u=z.snap(y,x);y=u.x;x=u.y;A=Math.min(u.time,A);z.setPosition(y,x,A)},scrollToElement:function(A,C,z){if(typeof C==="string"){C={x:C,y:C}}else{if(C===undefined){C={x:"center",y:"center"}}}var B,x,w,G,E=this,H=E.scroll,F=E.maxScroll,D=l.getPosition.call(A,E.elements.wrapper),v=l.getDimensions.call(A),y=E.getSnapSize(),u={x:H.width,y:H.height},I={};v={x:v.outerWidth,y:v.outerHeight};for(B=0;B<2;B+=1){x=B?"x":"y";if(H[x]){w=-D[x];if(C[x]==="center"){w+=(u[x]-v[x])/2}else{if(C[x]==="end"){w+=u[x]-v[x]}}}else{w=0}G=w<F[x];w=w>0?0:G?F[x]:w;if(!G&&E.options.snap){w=Math[B?"floor":"round"](w/y[x])*y[x]}if(w<F[x]){w=F[x]}I[x]=w}E.setPosition(I.x,I.y,z)},setPosition:function(D,B,w,u){var E,v,A=this,G=A.options,F=A.scrollBars,C=A.scroll,z=A.getPosition();w=!isNaN(w)?w:G.scrollTime;v={x:D,y:B};if(!G.bounce){v=A.bounce(v)}E={x:z.x-v.x,y:z.y-v.y};A.direction={x:E.x===0?0:(E.x>0?-1:1),y:E.y===0?0:(E.y>0?-1:1)};if(E.x!==0||E.y!==0){A.scrollToPosition(v,w);if(F.x&&C.x&&E.x!==0){F.x.setPosition(v.x,w,u)}if(F.y&&C.y&&E.y!==0){F.y.setPosition(v.y,w,u)}if(!A.isPulling&&((A.isMaxPosition("x")&&E.x!==0)||(A.isMaxPosition("y")&&E.y!==0))){A.dispatchEvent("onScrollPull")}}},stopScroll:function(){this.scrollToPosition(this.getPosition(true),0)},scrollToPosition:function(w,y){y=y||0;var x,B,A=this,u=A.elements,z=u.scroller,v=u.wrapper,C=A.options;A.triggerOnScrollStart();A.position=w;if(C.useNative){z.scrollTop=-w.y;z.scrollLeft=-w.x;A.triggerOnScroll();A.triggerOnScrollEnd()}else{if(C.useTransform){v.removeEvent("transitionEnd");if(y>0){v.addEvent("transitionEnd",function(){v.removeEvent("transitionEnd");A.triggerOnScrollEnd()})}B={transformOrigin:"0 0",transform:"translateZ(0)",fontSmoothing:"antialiased",perspective:800,transformStyle:"preserve-3d",transitionDelay:"0ms",transitionDuration:y+"ms",transitionProperty:v.getStyleName("transform",true),transitionTimingFunction:"cubic-bezier(0.33, 0.66, 0.66, 1)"};if(C.has3d){B.transform="translate3d("+w.x+"px,"+w.y+"px, 0)"}else{B.transform="translate("+w.x+"px,"+w.y+"px)"}v.setStyles(B);if(y===0){A.triggerOnScrollEnd()}}else{x=A.fx=A.fx||new e(v,{transition:"cubicOut",wait:false,events:{onComplete:function(){A.triggerOnScrollEnd()},onAnimate:function(){A.triggerOnScroll()}}});x.setOptions({duration:y});x.start({top:w.y,left:w.x})}}},triggerOnScrollStart:function(){var x=this,w=x.options,u=x.isScrolling;function v(){x.triggerOnScroll();x.setAnimate("onScroll",v)}x.clearDelayed("onScrollEnd");if(!u){x.dispatchEvent("onScrollStart");if(w.useNative||w.useTransform){x.setAnimate("onScroll",v)}}x.dispatchEvent("onScroll")},triggerOnScroll:function(){this.dispatchEvent("onScroll")},triggerOnScrollEnd:function(){var v=this,u=v.options;v.setDelayed("onScrollEnd",function(){if(u.useNative||u.useTransform){v.clearAnimate("onScroll")}v.dispatchEvent("onScrollEnd")},100)},getPosition:function(B){var z,v,x,w=this,A=false,C=w.options,u=w.elements;if(C.useNative){v={y:-u.scroller.scrollTop,x:-u.scroller.scrollLeft}}else{if(C.useTransform){v={y:0,x:0};z=l.getStyle.call(u.wrapper,"transform",true);if(z&&z!=="none"){if(h.matrixCSS){try{x=window.WebKitCSSMatrix||window.MSCSSMatrix||window.MOZCSSMatrix||window.CSSMatrix;z=new x(z);v={y:z.f,x:z.e}}catch(y){}}else{A=z.indexOf("matrix3d")===0;z=z.replace(/[^0-9-.,]/g,"").split(",");v={y:Number(z[A?13:5]),x:Number(z[A?12:4])}}}if(B){v={x:f(v.x),y:f(v.y)}}}else{v={y:(B?parseInt:parseFloat)(u.wrapper.style.top||0,10),x:(B?parseInt:parseFloat)(u.wrapper.style.left||0,10)}}}if(isNaN(v.x)||isNaN(v.y)){throw new Error("Invalid scroller position")}return v},getResetPosition:function(){var x=this,v=x.scroll,u=x.getPosition(),w=x.maxScroll,z=u.x,y=u.y;if(u.x>=0||!v.x){z=0}else{if(u.x<w.x){z=w.x}}if(u.y>0||!v.y){y=0}else{if(u.y<w.y){y=w.y}}return{x:f(z),y:f(y)}},isInViewport:function(x,L,y){var M=this.elements.wrapper,D=l.getOffsets,F=l.getDimensions,E=D.call(M,true),C=D.call(x),v=F.call(M),G=F.call(x),B=this.getPosition(),z=v.outerHeight,K=v.outerWidth,J=G.width,I=G.height,H=C.y,A=C.x,w,u;E.y=E.y-B.y;E.x=E.x-B.x;if(L){w=A<(E.x+K)&&(A+J)>E.x;u=H<(E.y+z)&&(H+I)>E.y}else{w=A>=E.x&&(A+J)<=(E.x+K);u=H>=E.y&&(H+I)<=(E.y+z)}return(y==="x")?w:(y==="y")?u:w&&u},isMaxPosition:function(v,u,y){u=u||this.getPosition();y=y||this.direction[v];var x=this,w=x.maxScroll;return(y>0?(u[v]>=0):(u[v]<=w[v]))},hasOverflow:function(z){var y,A=this,v=A.scroll,u=A.scroller,x=v.width<u.width,w=v.height<u.height;if(z==="x"){y=x}else{if(z==="y"){y=w}else{y=x||w}}return y},setSize:function(w){var x=this,u=x.options,v=false;if(u.width!==w.width){v=true;this.setOption("width",w.width)}if(u.height!==w.height){v=true;this.setOption("height",w.height)}if(v){this.dispatchEvent("onRefresh")}},setCursor:function(w){var v=this,u=v.scroll;if(w==="grabbing"&&(!u.x||!u.y)){w=u.x?"col-resize":"row-resize"}v.elements.scroller.setStyle("cursor",w)},focus:function(){if(this.elements.scroller){this.elements.scroller.focus()}return this},updateGhostPosition:function(v){var w=this,u=5,x=w.elements,y=x.scroller.getOffsets();if(w.options.useNative){y.y-=x.scroller.scrollTop;y.x-=x.scroller.scrollLeft}x.ghost.setStyles({top:v.y-y.y-u,left:v.x-y.x-u})},createDebugPixel:function(w,x,B,v){var A,y=this,u=2,z=y.elements;if(y.options.debugPixel){y.debugPixels=y.debugPixels||[];if(v){y.debugPixels.forEach(function(C){C.remove()})}A=z.scroller.getOffsets();if(y.options.useNative){A.y-=z.scroller.scrollTop;A.x-=z.scroller.scrollLeft}y.debugPixels.push(d.createElement("div",{title:(B||"")+" x:"+w.x+" y:"+w.y,styles:{height:"4px",width:"4px",background:x||"red",position:"absolute",zIndex:"1",top:w.y-A.y-u,left:w.x-A.x-u}}).inject(z.scroller))}},getPage:function(){var y,w,x,A=this,v=A.getPosition(),u=A.getSnapSize(),z=A.maxScroll,B={};for(w=0;w<2;w++){x=w?"x":"y";y=(v[x]/u[x]);B[x]=-y;y*=u[x];if(isNaN(y)||y>0){B[x]=0}else{if(y<z[x]){B[x]=A.maxPage[x]}}}return B},getSnapSize:function(){var v=this.options.snap,u=this.scroll;return{x:(v&&v.x)||u.width,y:(v&&v.y)||u.height}},getScrollSize:function(){var v=this.options,u=v.snap;return{x:(u&&u.x)||v.scrollSize,y:(u&&u.y)||v.scrollSize}},bounce:function(v){var u,w,y=this,x=y.maxScroll;for(u=0;u<2;u+=1){w=u?"x":"y";if(v[w]>=0||v[w]<x[w]){v[w]=v[w]>=0||x[w]>=0?0:x[w]}}return v},momentum:function(I,H,J,M,u){var Q,A,E,R,O,L,N,z,v,C,F=this,G=350,U=1.9,S=0.0006,D=6,w=F.scroll,T=F.scroller,B={x:I,y:H},P={x:0,y:0},K={x:Number(B.x),y:Number(B.y),time:u};for(Q=0;Q<2;Q++){A=Q?"x":"y";E=Q?"width":"height";O=M[A]-J[A];if(w[A]&&u<=G&&O!==0){R=Math.min(Math.abs(O)/u,U);z=(R*R)/(2*S);N=w[E];v=-B[A];C=T[E]-w[E]+B[A];L=N/(D/(z/R*S));if(O>0&&z>v){v=v+L;R=R*v/z;z=v}else{if(O<0&&z>C){C=C+L;R=R*C/z;z=C}}K[A]=f(B[A]+z*(O<0?-1:1));P[A]=R/S}}K.time=Math.max(P.y,P.x);return K},snap:function(G,E,A){var u,z,v,H,F,B=this,C=B.getPage(),w=B.getSnapSize(),D=B.maxScroll,I={x:G,y:E};A=A||B.position;H={x:A.x-G,y:A.y-E};F={x:H.x===0?0:(H.x>0?-1:1),y:H.y===0?0:(H.y>0?-1:1)};for(z=0;z<2;z++){v=z?"x":"y";if(H[v]!==0){u=Math[F[v]<0?"floor":F[v]?"ceil":"round"](I[v]/w[v]);C[v]=-u;u*=w[v];if(isNaN(u)||u>0){u=C[v]=0}else{if(u<D[v]){C[v]=B.maxPage[v];u=D[v]}}I[v]=u}}I.time=f(Math.max(Math.abs(A.x-I.x)/w.x*500,Math.abs(A.y-I.y)/w.y*500));return I},onScrollInit:function(z){var u,v,y,A,x=this,w=x.options;if(!t.isDefaultPrevented(z)&&r(x)&&b(x)&&c(z)&&j(z)){v=g(z);y=t.getPosition(z);A=z.timeStamp;u=x.getPosition(true);q.activeScroller=x;if(v==="mouse"){t.stop(z)}x.createDebugPixel(y,"green","onScrollInit",true);x.isTracking=v;i("start",x.body,x.eventHandler);if(x.isPulling||x.isScrolling){x.updateGhostPosition(y)}x.scrollStart={time:A,position:u,event:y};x.scrollMove={time:A,direction:false,event:y};x.positions=[];if(w.momentum&&x.isScrolling){x.setDelayed("stopOnScrollInit",function(){var B=x.getPosition(true);if(x.isDragging===false&&(B.x!==u.x||B.y!==u.y)){x.setPosition(u.x,u.y,0);x.createDebugPixel(y,"purple","stopOnScrollInit")}},150)}x.setDelayed("focusOnScrollInit",function(){var B=x.elements.scroller,C=B.getDocument().activeElement;if(!C||!l.isInjected.call(C,B)){x.focus()}},75);x.setCursor("grabbing")}},onScrollMove:function(G){var M,y,v,z,w,E,L,K,I,H,x,u,C=this,B=C.options,D=C.positions,J=t.getPosition(G),F=B.lockDirection?B.threshold:0,A=B.threshold;if(C.isTracking===g(G)){t.stop(G);C.updateGhostPosition(J);C.clearDelayed("stopOnScrollInit");if(C.isDragging){z=C.scrollMove;y=C.maxScroll;M=d.clone(C.position);E=G.timeStamp;K=J.y-z.event.y;L=J.x-z.event.x;x=L===0?0:(L>0?-1:1);u=K===0?0:(K>0?-1:1);if(C.enableScrollX){M.x+=L;if(M.x<y.x||M.x>0){if(B.bounce){M.x-=(L/2)}else{if(M.x<y.x){M.x=y.x}else{M.x=0}}}}if(C.enableScrollY){M.y+=K;if(M.y<y.y||M.y>0){if(B.bounce){M.y-=(K/2)}else{if(M.y<y.y){M.y=y.y}else{M.y=0}}}}if(D.length>60){D.splice(0,30)}D.push(M.x,M.y,E);C.setPosition(M.x,M.y,0);if(C.scrollMove.direction&&((C.enableScrollX&&z.direction.x!==0&&z.direction.x!==x)||(C.enableScrollY&&z.direction.y!==0&&z.direction.y!==u))){C.createDebugPixel(J,"yellow","onScrollMove:directionChange");C.scrollStart={time:E,position:M,event:J}}else{C.createDebugPixel(J,"orange","onScrollMove:isDragging")}C.scrollMove={time:E,direction:{x:x,y:u},position:M,event:J}}else{v=C.scroll;w=C.scrollStart;I=Math.abs(J.x-w.event.x);H=Math.abs(J.y-w.event.y);C.enableScrollX=v.x&&I>=F;C.enableScrollY=(v.y||(!v.x&&!v.y))&&H>=F;C.isDragging=(C.enableScrollX||C.enableScrollY)&&(I>=A||H>=A);if(C.isDragging&&C.isScrolling){C.stopScroll()}C.createDebugPixel(J,"red","onScrollMove:notDragging")}}},onScrollStop:function(u){var w,y,z,D,A,x,C,B=this,E=B.options,v=E.scrollTime;if(B.isTracking===g(u)){B.isTracking=false;if(q.activeScroller===B){delete q.activeScroller}i("stop",B.body,B.eventHandler);x=t.getPosition(u);w=B.getResetPosition(true);C=u.timeStamp;B.createDebugPixel(x,"blue","onScrollMove");B.setCursor("grab");if(B.isDragging){B.isDragging=false;A=B.scrollStart;B.scrollEnd=D={time:C,position:w,event:x};t.stop(u);B.updateGhostPosition(x);if(D.event.x!==A.event.x||D.event.y!==A.event.y){if(E.momentum){y=B.momentum(w.x,w.y,A.event,D.event,D.time-A.time);w=y;v=Math.max(w.time,v)}if(E.snap){z=B.snap(w.x,w.y,A.position);w=z;v=Math.max(w.time,v)}}}B.setPosition(w.x,w.y,v,false);B.positions.length=0;B.scrollStart=null;B.scrollMove=null;B.scrollEnd=null;B.setDelayed("resetGhostPosition",function(){B.updateGhostPosition({x:0,y:0})},500)}},onScrollStart:function(){var u=this;u.isScrolling=true},onScroll:function(){},onScrollEnd:function(){var v=this,u=v.options;if(v.isScrolling){v.isScrolling=false;if(u.useTransform){v.elements.wrapper.removeEvent("transitionEnd",v.eventHandler)}}if(!v.isTracking){v.isPulling=false;v.setAnimate("onResetPosition",function(){var x,z=v.getResetPosition(),w=v.getPosition(),y=v.scrollBars;if(v.options.snap){x=v.snap(z.x,z.y);z.x=x.x;z.y=x.y}if(w.x!==z.x||w.y!==z.y){v.setPosition(z.x,z.y)}else{if(y.x){y.x.onScrollEnd()}if(y.y){y.y.onScrollEnd()}}})}},onScrollPull:function(){this.isPulling=true},onKeyDown:function(v){var B=this,A=B.position,D=B.scroll,u=B.getScrollSize(),G=v.keyCode,w=G===40,z=G===38,E=G===37,C=G===39,y=(w||z?"y":C||E?"x":false),F=(z||E?1:-1),x={x:A.x,y:A.y};if(D[y]&&j(v)&&!B.isMaxPosition(y,A,F)){t.stop(v);x[y]+=F*u[y];B.scrollTo(x.x,x.y)}},onMouseWheel:function(v){var z=this,C=z.options,y=z.position,A=z.scroll,x=(A.x&&!A.y)||t.whichKey(v)==="shift"?"x":"y",u=z.getScrollSize(),B=t.wheelDelta(v),w={x:y.x,y:y.y};if(B&&A[x]&&!z.isMaxPosition(x,y,B)){t.stop(v);w[x]+=B*u[x];z.scrollTo(w.x,w.y)}else{if(C.preventDefaultMouseWheel){t.stop(v)}}},onRefresh:function(){if(!this.elements.scroller.isInjected()||this.isScrolling){return false}var z,B,x,D,A=this,E=A.options,u=A.elements,w=A.position,C=A.scrollBars,v=l.getScrolls.call(u.element),y=l.getDimensions.call(u.scrollerParent);x={width:v.width,height:v.height};B={width:(E.width||y.innerWidth),height:(E.height||y.innerHeight)};if((B.width!==A.scroll.width||B.height!==A.scroll.height)||(x.width!==A.scroller.width||x.height!==A.scroller.height)){D={};if(E.scrollableX!==false){D.width=B.width}if(E.scrollableY!==false){D.height=B.height}u.scroller.setStyles(D);B.x=E.scrollableX&&B.width<v.width;B.y=E.scrollableY&&B.height<v.height;A.maxScroll={x:x.width<B.width?0:B.width-x.width,y:x.height<B.height?0:B.height-x.height};A.maxPage={x:Math.ceil(x.width/B.width),y:Math.ceil(x.height/B.height)};A.scroll=B;A.scroller=x;if(C.x){C.x.setSize(B.width,x.width)}if(C.y){C.y.setSize(B.height,x.height)}z=A.getResetPosition();if(!A.moved&&(z.x!==w.x||z.y!==w.y)){A.setPosition(z.x,z.y,0,true)}u.scroller.toggleClassName("scrollable",B.y||B.x);u.scroller.toggleClassName("scrollable-x",B.x);u.scroller.toggleClassName("scrollable-y",B.y)}else{return false}}});q.Scrollbar=o.extend({name:"uwa-scroller-scrollbar",defaultOptions:{className:"",barColor:"#555",bgColor:"#EEE",opacity:1,dir:"vertical",padding:2,width:6,roundCorder:true,autoHide:true,draggable:true,elastic:false,debugPixel:false},position:{x:0,y:0},scroller:null,visible:true,init:function(v,u){this._parent(v);this.scroller=u;this.buildSkeleton();this.initEvents();if(this.options.autoHide){this.hide()}},destroy:function(){this.elements.wrapper.remove()},createDebugPixel:function(y,x,w,z){var C,A=this,v=2,B=A.isHorizontal,u=A.elements;if(A.options.debugPixel){A.debugPixels=A.debugPixels||[];if(z){A.debugPixels.forEach(function(D){D.remove()})}C=u.wrapper.getOffsets();A.debugPixels.push(d.createElement("div",{title:(w||"")+" x:"+y.x+" y:"+y.y,styles:{height:"2px",width:"4px",background:x||"red",position:"absolute",zIndex:"11",top:!B?y.y-C.y-v:0,left:B?y.x-C.x-v:0}}).inject(A.scroller.elements.scroller))}},buildSkeleton:function(){var z,v,y=this,D=y.options,C=y.scroller.options,A=D.dir==="horizontal",u=parseInt(D.padding,10),w=parseInt(D.width,10),B=D.roundCorder?f(((D.width/2)*100)/100):0,x=y.scroller.elements.scroller;y.isHorizontal=A;y.axis=A?"x":"y";y.reverseAxis=A?"y":"x";y.elements.wrapper=v=d.createElement("div",{"class":y.getClassNames("","-"+D.dir),styles:{zIndex:"10",position:"absolute",overflow:"hidden",opacity:D.opacity}}).inject(x);if(D.bgColor){v.setStyle("background",D.bgColor)}if(A){v.setStyles({bottom:u+"px",left:u+"px",height:w+"px"})}else{v.setStyles({top:u+"px",right:u+"px",width:w+"px"})}y.elements.bar=z=d.createElement("div",{styles:{background:D.barColor,zIndex:"10",position:"absolute",top:0,left:0}}).inject(v);if(m.Engine.ie<7){z.setHTML("&nbsp;&nbsp;&nbsp;")}if(A){z.setStyles({borderRadius:B+"px "+B+"px",width:w+"px",minWidth:(w+1)+"px",minHeight:w+"px"})}else{z.setStyles({borderRadius:B+"px "+B+"px",height:w+"px",minWidth:w+"px",minHeight:(w+1)+"px"})}if(D.useTransform){z.setStyles({transformOrigin:"0 0",transform:"translateZ(0)"});if(C.has3d){z.setStyles({perspective:800,transformStyle:"preserve-3d"})}}},initEvents:function(){var v=this,u=v.options,w=v.elements;v.eventHandler=v.handleEvent.bind(v);if(u.draggable){i("init",w.bar,v.eventHandler);w.bar.setStyle("cursor","grab")}if(u.autoHide){w.wrapper.addEvents({mouseenter:function(){v.focused=true;v.show()},mouseleave:function(){v.focused=false;v.hide()}})}},handleEvent:function(w){var u,v=this;switch(w.type){case"touchstart":case"mousedown":u=v.dispatchEvent("onScrollInit",[w]);break;case"touchmove":case"mousemove":u=v.dispatchEvent("onScrollMove",[w]);break;case"touchend":case"touchcancel":case"mouseup":u=v.dispatchEvent("onScrollStop",[w]);break}return u},setSize:function(A,B){var y=this,C=y.options,w=y.scroller.scroll,z=y.isHorizontal,x=z?w.y:w.x,v=parseInt(C.width,10),u=parseInt(C.padding,10);if(B<=A){y.hide(true)}else{if(!C.autoHide){y.show()}y.maxSize=f(A-(u*2)-(x?v:0));y.minSize=v;y.size=Math.min(Math.max(y.maxSize*y.maxSize/B,v*3),y.maxSize);y.maxScroll=y.maxSize-y.size;y.minScroll=0;y.toWrapperProp=y.maxScroll/(A-B);y.toPropWrapper=B/y.maxSize;y.elements.wrapper.setStyle(z?"width":"height",y.maxSize+"px");y.elements.bar.setStyle(z?"width":"height",y.size+"px")}},onScrollInit:function(x){t.stop(x);var w=this,y="grabbing",u=w.scroller,v=t.getPosition(x);w.createDebugPixel(v,"#7FFF00",true);i("start",u.body,w.eventHandler);w.scrollStart={x:v.x,y:v.y};w.scrollMove={x:v.x,y:v.y};w.elements.bar.setStyle("cursor",y);u.setCursor(y);u.isTracking=true;u.isDragging=true},onScrollMove:function(u){t.stop(u);var C=this,x=C.axis,v=C.toPropWrapper,B=C.scroller,D=B.maxScroll,z=C.scrollMove,E=C.isHorizontal,A=B.position,y=t.getPosition(u),F={x:E?(y.x-z.x)*v:0,y:E?0:(y.y-z.y)*v},w={x:A.x-F.x,y:A.y-F.y};if(w[x]>D[x]&&w[x]<0){C.createDebugPixel(y,"orange");B.setPosition(w.x,w.y,0);C.scrollMove={x:y.x,y:y.y}}else{C.createDebugPixel(y,"red")}},onScrollStop:function(y){t.stop(y);var x=this,z="grab",v=x.scroller,w=t.getPosition(y),u=v.getResetPosition();x.createDebugPixel(w,"#00CED1");v.setPosition(u.x,u.y,NaN,false,true);i("stop",x.scroller.body,x.eventHandler);if(!x.focused){x.hide()}x.elements.bar.setStyle("cursor",z);x.scroller.setCursor(z);x.scrollMove=null;x.scrollStart=null;v.isTracking=false;v.isDragging=false},setPosition:function(v,I,G){var z,y,E,L,F,D=this,J=D.elements.bar,K=D.scroller,H=D.size,x=D.axis,M=D.dimension,u=D.minSize,O=D.position,w=D.maxScroll,C=D.minScroll,B=D.options,N=K.options,A={y:0,x:0};y=D.toWrapperProp*v;if(D.isHorizontal){L="width"}else{L="height"}if(y<0){if(B.elastic){F=Math.max(H+y,u);A[x]=C}else{A[x]=C}}else{if(y>w){if(B.elastic){F=Math.max(H-(y-w),u);A[x]=Math.min(y,w+H-u)}else{A[x]=w}}else{F=H;A[x]=y}}if(A.x!==O.x||A.y!==O.y||M!==F){if(!G){D.show()}else{I=0}A={x:A.x,y:A.y};if(N.useTransform){E={transitionDelay:"0ms",transitionDuration:I+"ms",transitionProperty:[J.getStyleName("transform",true)].concat([L]).join(","),transitionTimingFunction:"cubic-bezier(0.33, 0.66, 0.66, 1.0)"};if(F&&B.elastic){E[L]=F+"px"}if(B.has3d){E.transform="translate3d("+A.x+"px,"+A.y+"px, 0)"}else{E.transform="translate("+A.x+"px,"+A.y+"px)"}J.setStyles(E)}else{z=D.fx=D.fx||new e(J,{transition:"cubicOut",wait:false});z.setOptions({duration:I});E={top:[O.y,A.y],left:[O.x,A.x]};if(F&&B.elastic){E[L]=[H,F]}z.start(E)}}D.position=A;D.dimension=F},onScrollStart:function(){this.show()},onScrollEnd:function(){this.hide()},show:function(){var v,u=this;if(!u.visible){v={opacity:u.options.opacity};if(u.scroller.options.useTransform){d.merge(v,{transitionProperty:"opacity",transitionDelay:"0ms",transitionDuration:"50ms"})}u.elements.wrapper.setStyles(v);u.visible=true}},hide:function(w){var v,u=this;if(u.visible&&!u.focused&&!u.scrollMove&&(u.options.autoHide||w)){v={opacity:0};if(u.scroller.options.useTransform){d.merge(v,{transitionProperty:"opacity",transitionDelay:w?"0ms":"300ms",transitionDuration:w?"0ms":"150ms"})}u.elements.wrapper.setStyles(v);u.visible=false}}});return d.namespace("Controls/Scroller",q,d)});