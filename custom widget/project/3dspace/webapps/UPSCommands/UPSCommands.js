/*!  COPYRIGHT DASSAULT SYSTEMES 2016   */
define("DS/UPSCommands/commands/UPSAuthCmdCutCopyPaste",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/AppContext","DS/AuthGenericCommands/AuthGenericCmdUtils","DS/AuthGenericCommands/AuthGenericCmdWSAccess","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json"],function(b,c,f,g,h,e,i){const j=true;var a=[{modeler:"Unknown type is not yet supported for reparent service",user:e.reparent_failed_unsupported_type_child_unknown},{modeler:"Input parameters are not valid",user:e.ERR_008},{modeler:"Error  from  [moveProductInstance]  Id  [Cannot paste an instance under a terminal reference]",user:i.reparent_failed_target_3DPart},{modeler:"Target for reparent service is invalid",user:i.reparent_failed_target_invalid},{modeler:"cannot be cast to com.dassault_systemes.vplm.modeler.entity.PLMxReferenceEntity",user:e.insert_unsupported_unkowntype_parent,type:i.type_PhysicalProduct},{modeler:"You don't have the required license for this command.",user:e.error_license},{modeler:"Embedded Component not supported",user:i.authoring_failed_EC},{modeler:"Reparent disabled if parent reference has config modeler",user:i.reparent_failed_parent_config},{modeler:"ERR_FUN092398",user:i.ERR_FUN092398}];var d=b.extend(c,{defaultOptions:{modeler:"product",version:"1.0",bAllOrNothing:true,chunkSize:50},_getResourceId:function(k){if(!Array.isArray(k)||k.length===0){return""}return k[k.length-1]},_getRelationId:function(k){if(!Array.isArray(k)||k.length<2){return""}return k[k.length-2]},_getPathInstance:function(m){var k=[];var l=m.slice();while(Array.isArray(l)&&l.length>2){k.unshift(this._getRelationId(l));l.length=l.length-2}return k},init:function(k){if(k.context){f.setContext(k.context)}this._parent(k,{mode:"exclusive",isAsynchronous:false})},execute:function(M){var u=this;var F=M.data.ordering;u.existingChildren={};var N=[];var B=0;var p=M.data.parents.length;if(j){console.log("nTarget =",p)}for(var G=0;G<p;G++){var L=M.data.parents[G];var n=f.getNodesById(u._getResourceId(L))[0];if(j){console.log("Target["+G+"] is",f.getName(n))}var J=u._getResourceId(L);var O={isInstanceOf:J,pathArray:L,node:n};if(F!=undefined){O.order=F}var w=undefined;var I=f.getChildren(n);if(null!==I&&I.length>0){w=[];I.forEach(function(s){var t=f.getRelationID(s);if(t!==undefined){w.push(t)}})}if(w!==undefined){u.existingChildren[O.isInstanceOf]=w}N.push(O)}var k=[];var l=[];B=0;var P=M.data.children.length;if(j){console.log("nSource =",P)}for(G=0;G<P;G++){var L=M.data.children[G];var q=u._getResourceId(L);var E=f.getNodesById(q)[0];if(j){console.log("Source["+G+"] is",f.getName(E))}var D=u._getPathInstance(L);var K=u._getRelationId(L);var C={isInstanceOf:q,instance:K};if(D.length>0){C.pathArray=D}k.push(C);l.push(q)}for(G=0;G<p;G++){var o=N[G].isInstanceOf;if(!g.canInstantiate(o,l,i.operationAborted_Cycle)){if(M.onFailure){M.onFailure()}return}}var H=[];for(var y=0;y<p;y++){var x=(y===p-1)?M.mode:"CopyPaste";for(var z=0;z<P;z++){var v={target:N[y],source:k[z]};if(x==="CutPaste"){v.mode=x}H.push(v)}}var r=M.data.chunkSize||u.defaultOptions.chunkSize;var m={chunkSize:r,requests:H,cbOnProgress:function(Q,s,t){if(j){console.log("reparentMassOperations.cbOnProgress",s)}},cbOnComplete:function(R,U){var T=[],t=[];var S=R.getAnswers();S.forEach(function(V){var W=V.answer;if(W.status==="success"){f.author(true);T.push({hasParent:W.hasParent,resourceid:W.childIsInstanceOf,relationid:W.childInstance,instanceName:W.instanceName})}else{t.push(W)}});if(T.length>0&&M.onSuccess){if(j){console.log("reparentMassOperations.cbOnComplete done, start refresh onSuccess (",T.length,")");console.timeEnd("ccp-ws")}M.onSuccess(T)}if(t.length>0&&M.onFailure){var Q=t[0].messages;var s=t[0].targets;if(j){console.log("reparentMassOperations.cbOnComplete done, start refresh onFailure");console.timeEnd("ccp-ws")}M.onFailure({messages:[Q],targets:[s]})}}};if(j){console.log("reparentMassOperations need to process",H.length,"operation(s)");console.time("ccp-ws")}var A=u._reparentMassOperations(m,M)},_optimize:function(y){var v=this;var u=[];var A=y.length;var l={};var w={};var n=0;var z=0;for(var m=0;m<A;m++){var r=y[m];var x=r.target.isInstanceOf;if(!l[x]){l[x]={count:1,cacheId:n++};if(r.target.pathArray){l[x].pathArray=r.target.pathArray}if(v.existingChildren[x]){l[x].children=v.existingChildren[x]}if(r.target.order){l[x].order=r.target.order}}else{l[x].count++}var k=r.source.isInstanceOf;if(!w[k]){w[k]={count:1,cacheId:z++}}else{w[k].count++}if(r.source.pathArray){w[k].pathArray=r.source.pathArray}if(r.source.instance){w[k].instance=r.source.instance}}var B={};for(var C in l){B[C]={isInstanceOf:C};if(l[C].pathArray){B[C].pathArray=l[C].pathArray}if(l[C].children){B[C].children=l[C].children}if(l[C].order){B[C].order=l[C].order}if(l[C].count>1){B[C].cacheId=l[C].cacheId}}var p={};for(var D in w){p[D]={isInstanceOf:D};if(w[D].pathArray){p[D].pathArray=w[D].pathArray}if(w[D].instance){p[D].instance=w[D].instance}if(w[D].count>1){p[D].cacheId=w[D].cacheId}}for(m=0;m<A;m++){var r=y[m];var C=r.target.isInstanceOf;var D=r.source.isInstanceOf;var x={};if(l[C].used===undefined){x=B[C];l[C].used=true}else{x={cacheId:B[C].cacheId}}var k={};if(r.mode==="CutPaste"){k=r.source}else{if(w[D].used===undefined){k=p[D];w[D].used=true}else{k={cacheId:p[D].cacheId}}}var q={target:x,source:k};if(r.mode){q.mode=r.mode}u.push(q)}return u},_reparentMassOperations:function(k,p){var o=this;var m=k;var n=(p.mode==="CutPaste");var l=n?i.reparent_failed:i.insert_existing_failed;m.cbOnProcess=function(r,q){if(j){console.log("reparentMassOperations.cbOnProcess: size=",q.length)}q=o._optimize(q);if(j){console.log(q)}h.reparent({data:{version:o.defaultOptions.version,bAllOrNothing:o.defaultOptions.bAllOrNothing,operations:q},modeler:o.defaultOptions.modeler,onComplete:function(w){w=(typeof w==="string")?JSON.parse(w):w;if(w.status==="success"){var B=[];for(var x=0,u=q.length;x<u;x++){var t=q[x];var A=w.results[x];var z=A.hasParent;if(o.existingChildren[z]){o.existingChildren[z].push(A.childInstance)}else{o.existingChildren[z]=[A.childInstance]}A.status="success";r.setAnswer(t,A)}}if(w.status==="failure"){var C;if(w.messages!==undefined){C=g.buildErrorMessage(w.messages,{remapErrors:a})}var s=l+" "+C;var v=[s];var y=q[0].target.pathArray;for(var x=0,u=q.length;x<u;x++){var t=q[x];var A={status:"failure",messages:v,targets:y};r.setAnswer(t,A)}r.cancel()}},onFailure:function(s,A){if(j){console.log("reparentMassOperations.onFailure")}var A=(typeof A==="string")?JSON.parse(A):A;var B=g.buildErrorMessage(A.messages,{remapErrors:a});var t=l+" "+B;var w=[t];var y=q[0].target.pathArray;for(var x=0,v=q.length;x<v;x++){var u=q[x];var z={status:"failure",messages:w,targets:y};r.setAnswer(u,z)}r.cancel()}})};return new h.MassChunkedRequests(m)}});return d});define("DS/UPSCommands/commands/UPSAuthCmdAvailability",["UWA/Class","DS/PADUtils/PADContext","DS/Selection/CSOManager","DS/Utilities/Utils"],function(c,j,f,k){const o="pad_component",i="ENOPAD3DViewer";const h=200,m=200;const b="always",g="monoSelection",d="multiSelection",l="empty_or_monoSelection",e="empty_no_authoring_or_monoSelection",a="empty_no_authoring_or_multiSelection";var n=true;var q={};var p=c.extend({init:function(u){var w=this;w._parent(u);w._tokens={};var v=j.get();if(v){if(typeof v.getEditMode==="function"){n=v.getEditMode();v.addEvent("editModeModified",w._check_onUpdateAuthoring.bind(w))}w.defaultOptions._check_onAdd=k.debounce(w._check_onAdd,h);w.defaultOptions._check_onRemove=k.debounce(w._check_onRemove,m);var t=v.name;if(t===o){w._check_onAdd();var s=v.getPADTreeDocument().getXSO();w._tokens.onAdd2D=s.onPostAdd(w.defaultOptions._check_onAdd.bind(w));w._tokens.onAdd2D=s.onPostRemove(w.defaultOptions._check_onRemove.bind(w))}if(t===i){w._check_onAdd();w._tokens.onAdd3D=f.onPostAdd(w.defaultOptions._check_onAdd.bind(w));w._tokens.onRemove3D=f.onPostRemove(w.defaultOptions._check_onRemove.bind(w))}}var r=this._destroy;this._destroy=function(){if(w._tokens!==undefined){if(w._tokens.onAdd3D){f.unsubscribe(w._tokens.onAdd3D);w._tokens.onAdd3D=undefined}if(w._tokens.onRemove3D){f.unsubscribe(w._tokens.onRemove3D);w._tokens.onRemove3D=undefined}}r.call(w)}},_check_onAdd:function(){var t=this;var s=undefined;var u=this.defaultOptions.availability;if(u){var v=t._getSelectionCount();var r=true;if(((u===e)||(u===a))&&(v===0)){r=false}if(r&&!n){t._enableCommand(false);return}if((u===b)||(u===a)){s=true}else{if((u===l)||(u===e)){s=(v<=1)}else{if(u===g){s=(v===1)}else{if(u===d){s=(v>=1)}}}}}if(s&&this.defaultOptions.fnCmdAvailability){t.defaultOptions.fnCmdAvailability(function(w){s=w;t._enableCommand(s)})}else{t._enableCommand(s)}},_check_onRemove:function(){var t=this;var s=undefined;var u=this.defaultOptions.availability;if(u){var v=t._getSelectionCount();var r=true;if(((u===e)||(u===a))&&(v===0)){r=false}if(r&&!n){t._enableCommand(false);return}if((u===b)||(u===a)){s=true}else{if((u===l)||(u===e)){if(v===0){t._enableCommand(true);return}s=(v===1)}else{if(u===g){s=(v===1)}else{if(u===d){s=(v>=1)}}}}}if(s&&this.defaultOptions.fnCmdAvailability){t.defaultOptions.fnCmdAvailability(function(w){s=w;if(u===l){var x=t._getSelectionCount();if(x===0){s=true}}t._enableCommand(s)})}else{t._enableCommand(s)}},_check_onUpdateAuthoring:function(u){n=u;var t=this;var s=undefined;var v=this.defaultOptions.availability;if(v){var w=t._getSelectionCount();var r=true;if((v===a)&&(w===0)){r=false}if(r&&!n){t._enableCommand(false);return}if((v===b)||(v===a)){s=true}else{if((v===l)||(v===e)){s=(w<=1)}else{if(v===g){s=(w===1)}else{if(v===d){s=(w>=1)}}}}}if(s&&this.defaultOptions.fnCmdAvailability){this.defaultOptions.fnCmdAvailability(function(x){t._enableCommand(x)})}else{t._enableCommand(s)}},_getSelectionCount:function(){var r=j.get();if(r&&r.name){if(r.name===o){return r.getPADTreeDocument().getXSO().get().length}else{if(r.name===i){return f.get().length}}}return -1},_enableCommand:function(r){if(r===true){this.enable()}else{this.disable()}},_destroy:function(){this._parent()}});return p});define("DS/UPSCommands/UPSCmdUtils",["DS/AuthGenericCommands/AuthGenericCmdWSAccess"],function(e){var g={};var b={};var d={};function a(n,p){var k=p.commandName;var h=d[k];if(h[n]!==undefined){return h[n]}if(g[n]===undefined){return undefined}if(g[n]===null){return null}var j=g[n];var m=j.length;for(var l=0;l<m;l++){var o=j[l];if(h[o]===true){h[n]=true;return true}}h[n]=false;return false}function f(o){var j={};var n=o.length;for(var x=0;x<n;x++){var r=o[x];var s=g[r];var p=b[r];var l=p.length;for(var q=0;q<l;q++){var w=p[q];var k=w.params;var v=k.commandName;if(j[v]!==null){if(j[v]===undefined){j[v]={params:k,supported:w.supported}}else{j[v].supported.push(w.supported)}var u=a(r,k);if(u===true){j[v].supported.push(r)}else{if(u===false){k.onComplete(w.supported);j[v]=null}else{if(u===undefined){}}}}}}for(var m in j){if(j[m]!==null){var h=j[m].supported.filter(function(t,y,i){return(i.indexOf(t)===y)});j[m].params.onComplete(h)}}o.forEach(function(i){b[i]=undefined})}var c={isTypesAuthorized:function(l){var v=l.commandName;if(!d[v]){d[v]={};var h=d[v];if(l.supported){for(var n in l.supported){h[n]=l.supported[n]}}}var q=[];var j=[];var r=l.types;var o=r.length;for(var w=0;w<o;w++){var s=r[w];var m=a(s,l);switch(m){case true:if(q.indexOf(s)===-1){q.push(s)}break;case false:break;case null:if(b[s]===undefined){b[s]=[]}b[s].push({params:l,supported:q});break;case undefined:default:j.push(s)}}var k=j.length;if(k===0){l.onComplete(q);return}var u=[];for(w=0;w<k;w++){var s=j[w];var p=false;if(g[s]===undefined){u.push(s);g[s]=null;p=true}else{if(g[s]===null){p=true}else{if(a(s,l)){q.push(s)}}}if(p===true){if(b[s]===undefined){b[s]=[]}b[s].push({params:l,supported:q})}}if(u.length===0){l.onComplete(q);return}e.getTypesHierarchy({modeler:"product",data:{types:u},onComplete:function(i){var i=(typeof i==="string")?JSON.parse(i):i;i.types_hierarchies.forEach(function(y){var x=y.type;var t=y.hierarchy;g[x]=t});f(u)},onFailure:function(i){f(u)}})},move3D:function(h){var i=this;var j={version:"1.0",bAllOrNothing:true,instances:h.instances};e.move3D({data:j,modeler:"product",onComplete:function(k){if(h.onComplete){var l=UWA.is(k,"string")?JSON.parse(k):k;h.onComplete(l)}},onFailure:function(k){if(h.onFailure){var l=UWA.is(k,"string")?JSON.parse(k):k;h.onFailure(l)}}})}};return c});define("DS/UPSCommands/commands/UPSAuthCmdRevisionUpdate",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/commands/AuthGenericCmdRevisionUpdate","DS/UPSCommands/commands/UPSAuthCmdAvailability","DS/AuthGenericCommands/AppContext","DS/UPSCommands/UPSCmdUtils","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json"],function(a,b,h,i,f,j,g,d){var e={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:false,};var c=a.extend(b,h,i,{defaultOptions:{className:"UPSAuthCmdRevisionUpdate",modeler:"product",version:"1.0",bAllOrNothing:false,availability:"multiSelection",commandName:g.UPSAuthRevisionUpdate,reportTitle:g.UPSAuthRevisionUpdate_report,commandMode:"TreeList",remapErrors:[{modeler:"Input parameters are not valid",user:d.ERR_008},{modeler:"You don't have the required license for this command.",user:d.error_license},{modeler:"Embedded Component not supported",user:g.authoring_failed_EC},{modeler:"ERR_FUN092398",user:g.ERR_FUN092398}],fnCmdAvailability:function(n){var m=false;var l=f.getSelectedNodes()[0];var k=f.getType(l);j.isTypesAuthorized({commandName:this.className,supported:e,types:[k],onComplete:function(o){m=(o.indexOf(k)!==-1);n(m)}})},isValidSelection:function(r,q){var o=[];for(var n=0;n<r.length;n++){var p=r[n].getAllDescendants();if(p&&p.length){for(var l=0;l<r.length;l++){if(n===l){continue}var k=r[l];if(p.indexOf(k)!==-1){o.push(k);r.splice(l,1);l=0;n=0}}}}var m=[];r.forEach(function(t){m.push(f.getType(t));var s=t.getChildren();if(s&&s.length>0){s.forEach(function(u){m.push(f.getType(u))})}});m=m.filter(function(t,u,s){return(s.indexOf(t)==u)});j.isTypesAuthorized({commandName:this.className,supported:e,types:m,onComplete:function(t){var s={valid:[],invalid:[],status:true};r.forEach(function(x,w){if(t.indexOf(f.getType(x))!==-1){var v=x.getChildren();if(v&&v.length>0){var y=0;v.forEach(function(z){if(t.indexOf(f.getType(z))!==-1){y++}});if(y>0){s.valid.push(x)}else{s.invalid.push({node:x,why:"ROOT_NO_CHILD"});s.status=false}}else{s.invalid.push({node:x,why:"ROOT_NO_CHILD"});s.status=false}}else{var u=f.getName(x);s.invalid.push({node:x,why:"BADTYPE"});s.status=false}});o.forEach(function(u){s.invalid.push({node:u,why:"CYCLE"});s.status=false});q(s)}})}}});return c});define("DS/UPSCommands/commands/UPSAuthCmdUnparent",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/commands/AuthGenericCmdUnparent","DS/UPSCommands/commands/UPSAuthCmdAvailability","DS/AuthGenericCommands/AppContext","DS/UPSCommands/UPSCmdUtils","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json"],function(a,b,h,i,f,j,g,d){var e={VPMReference:true,VPMRepReference:true,"3DShape":true,Drawing:true,CATProduct:true,CATPart:true,CATShape:true};var c=a.extend(b,h,i,{defaultOptions:{className:"UPSAuthCmdUnparent",modeler:"product",version:"1.0",availability:"multiSelection",bAllOrNothing:true,remapErrors:[{modeler:"Error  from  [PLMCoreAccess : convertM1IDinPLMID]  Id  [Error while converting Ids: Unable to solve all ids]",user:d.ERR_008},{modeler:"Input parameters are not valid",user:d.ERR_008},{modeler:"You don't have the required license for this command.",user:d.error_license},{modeler:"Embedded Component not supported",user:g.authoring_failed_EC},{modeler:"ERR_FUN092398",user:g.ERR_FUN092398}],fnCmdAvailability:function(o){var n=false;if(f.isThereARootSelected()){o(false);return}var k=f.getSelectedNodes();if(k.length>0){var m=k[k.length-1];var l=f.getType(m);j.isTypesAuthorized({commandName:this.className,supported:e,types:[l],onComplete:function(p){n=(p.indexOf(l)!==-1);o(n)}})}},isValidSelection:function(k,m){var l=[];k.forEach(function(n){l.push(f.getType(n))});j.isTypesAuthorized({commandName:this.className,supported:e,types:l,onComplete:function(o){var n={valid:[],invalid:[],status:true};k.forEach(function(q,p){if(o.indexOf(l[p])!==-1){n.valid.push(q)}else{n.invalid.push(q);n.status=false}});m(n)}})}}});return c});define("DS/UPSCommands/commands/UPSAuthCmdReplaceByLatestRevision",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/commands/AuthGenericCmdReplaceByLatestRevision","DS/UPSCommands/commands/UPSAuthCmdAvailability","DS/UPSCommands/UPSCmdUtils","DS/AuthGenericCommands/AppContext","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json"],function(a,b,h,i,j,f,g,d){var e={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:false,};var c=a.extend(b,h,i,{defaultOptions:{className:"UPSAuthCmdReplaceByLatestRevision",modeler:"product",version:"1.0",bAllOrNothing:false,availability:"multiSelection",commandName:g.UPSAuthReplaceByLatestRevision,reportTitle:g.UPSAuthReplaceByLatestRevision_report,remapErrors:[{modeler:"Input parameters are not valid",user:d.ERR_008},{modeler:"You don't have the required license for this command.",user:d.error_license},{modeler:"Embedded Component not supported",user:g.authoring_failed_EC},{modeler:"ERR_FUN092398",user:g.ERR_FUN092398}],fnCmdAvailability:function(o){var n=false;if(f.isThereARootSelected()){o(n);return}var k=f.getSelectedNodes();if(k.length>0){var m=k[k.length-1];var l=f.getType(m);j.isTypesAuthorized({commandName:this.className,supported:e,types:[l],onComplete:function(p){n=(p.indexOf(l)!==-1);o(n)}})}},isValidSelection:function(k,m){var l=[];k.forEach(function(n){l.push(f.getType(n))});j.isTypesAuthorized({commandName:this.className,supported:e,types:l,onComplete:function(o){var n={valid:[],invalid:[],status:true};k.forEach(function(q,p){if(o.indexOf(l[p])!==-1){n.valid.push(q)}else{n.invalid.push(q);n.status=false}});m(n)}})}}});return c});define("DS/UPSCommands/commands/UPSAuthCmdInsertProductConfiguration",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/commands/AuthGenericCmdInsertProductConfiguration","DS/UPSCommands/commands/UPSAuthCmdAvailability","DS/AuthGenericCommands/AppContext","DS/UPSCommands/UPSCmdUtils","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json"],function(a,b,i,j,f,k,e,h){var c={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:false};var g={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:false,};var d=a.extend(b,i,j,{defaultOptions:{className:"UPSAuthCmdInsertProductConfiguration",modeler:"product",version:"1.0",bAllOrNothing:true,availability:"monoSelection",chunkSize:50,chooser:{precondFilter:'flattenedtaxonomies:"types/VPMReference"',source:["3dspace"],multiSel:false,advanced_search:{showByDefault:true}},remapErrors:[{modeler:"Input parameters are not valid",user:e.ERR_007},{modeler:"Embedded Component not supported",user:h.authoring_failed_EC},{modeler:"ERR_FUN092398",user:h.ERR_FUN092398}],fnCmdAvailability:function(o){var m=this;var n=false;var l=f.getSelectedNodes();if(l.length>0){m.isValidParentSelection(l,function(p){n=p.status;o(n)})}else{n=false;o(n)}},isValidParentSelection:function(l,n){var m=[];l.forEach(function(o){m.push(f.getType(o))});k.isTypesAuthorized({commandName:this.className,supported:c,types:m,onComplete:function(p){var o={valid:[],invalid:[],status:true};l.forEach(function(r,q){if(p.indexOf(m[q])!==-1){o.valid.push(r)}else{o.invalid.push(r);o.status=false}});n(o)}})},isValidChildrenSelection:function(m,n){var l=[];m.forEach(function(o){l.push(o["ds6w:type_value"])});k.isTypesAuthorized({commandName:this.className,name:"children",supported:g,types:l,onComplete:function(p){var o={valid:[],invalid:[],status:true};m.forEach(function(r,q){if(p.indexOf(l[q])!==-1){o.valid.push(r)}else{o.invalid.push(r);o.status=false}});n(o)}})}}});return d});define("DS/UPSCommands/commands/UPSAuthCmdReplaceByRevision",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/commands/AuthGenericCmdRevisionUpdate","DS/UPSCommands/commands/UPSAuthCmdAvailability","DS/UPSCommands/UPSCmdUtils","DS/AuthGenericCommands/AppContext","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json"],function(a,b,h,i,j,f,g,d){var e={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:false,};var c=a.extend(b,h,i,{defaultOptions:{className:"UPSAuthCmdReplaceByRevision",modeler:"product",version:"1.0",bAllOrNothing:false,availability:"multiSelection",commandName:g.UPSAuthReplaceByRevision,reportTitle:g.UPSAuthReplaceByRevision_report,commandMode:"FlatList",remapErrors:[{modeler:"Input parameters are not valid",user:d.ERR_008},{modeler:"You don't have the required license for this command.",user:d.error_license},{modeler:"Embedded Component not supported",user:g.authoring_failed_EC},{modeler:"ERR_FUN092398",user:g.ERR_FUN092398}],fnCmdAvailability:function(o){var n=false;if(f.isThereARootSelected()){o(n);return}var k=f.getSelectedNodes();if(k.length>0){var m=k[k.length-1];var l=f.getType(m);j.isTypesAuthorized({commandName:this.className,supported:e,types:[l],onComplete:function(p){n=(p.indexOf(l)!==-1);o(n)}})}},isValidSelection:function(m,q){var o=[];var l=[];var k=f.getSelectedRoots();m.forEach(function(s){if(k.indexOf(s)===-1){o.push(s)}else{var r=f.getName(s);l.push({node:s,why:"ROOT",name:r})}});var p=f.getParentWithChild(o);p.forEach(function(t){var u=t.child;var s=o.indexOf(u);if(s>-1){o.splice(s,1);var r=f.getName(u);l.push({node:u,why:"CHILD",name:r,parent:t.parent})}});var n=[];o.forEach(function(r){n.push(f.getType(r))});j.isTypesAuthorized({commandName:this.className,supported:e,types:n,onComplete:function(t){var r={valid:[],invalid:[],status:true};var s=[];o.forEach(function(x,w){if(t.indexOf(n[w])!==-1){s.push(x)}else{var v=o.indexOf(x);if(v>-1){var u=f.getName(x);l.push({node:x,why:"BADTYPE",name:u})}}});r.valid=s;r.invalid=l;r.status=(l.length===0);q(r)}})}}});return c});define("DS/UPSCommands/commands/UPSAuthCmdReorder",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/commands/AuthGenericCmdReorder","DS/UPSCommands/commands/UPSAuthCmdAvailability","DS/AuthGenericCommands/AppContext","DS/UPSCommands/UPSCmdUtils","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json"],function(a,b,i,j,g,c,h,e){var f={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:false,};var d=a.extend(b,i,j,{defaultOptions:{className:"UPSAuthCmdReorder",modeler:"product",version:"1.0",availability:"monoSelection",remapErrors:[{modeler:"Error  from  [PLMCoreAccess : convertM1IDinPLMID]  Id  [Error while converting Ids: Unable to solve all ids]",user:e.ERR_006},{modeler:"Input parameters are not valid",user:e.ERR_006},{modeler:"You don't have the required license for this command.",user:e.error_license},{modeler:"Embedded Component not supported",user:h.authoring_failed_EC}],fnCmdAvailability:function(n){var m=false;var k=g.getSelectedNodes();if(k.length>0){var l=g.getType(k[0]);c.isTypesAuthorized({commandName:this.className,supported:f,types:[l],onComplete:function(o){m=(o.indexOf(l)!==-1);n(m)}})}},isValidParentSelection:function(l,m){var k=g.getType(l);c.isTypesAuthorized({commandName:this.className,supported:f,types:[k],onComplete:function(o){var n={valid:[],invalid:[],status:null};if(o.indexOf(k)!==-1){n.valid.push(l);n.status=true}else{n.invalid.push(l);n.status=false}m(n)}})},isChildrenOrderable:function(k,n){var m=[];var l=[];k.forEach(function(p){var o=g.getType(p);m.push(o);if(l.indexOf(o)===-1){l.push(o)}});c.isTypesAuthorized({commandName:this.className,supported:f,types:l,onComplete:function(p){var o={valid:[],invalid:[],status:[]};k.forEach(function(r,q){if(p.indexOf(m[q])!==-1){o.valid.push(r);o.status.push(true)}else{o.invalid.push(r);o.status.push(false)}});n(o)}})}}});return d});define("DS/UPSCommands/commands/UPSAuthCmdInsertExistingProductOrPart",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/commands/AuthGenericCmdInsertExisting","DS/UPSCommands/commands/UPSAuthCmdAvailability","DS/AuthGenericCommands/AppContext","DS/UPSCommands/UPSCmdUtils","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json"],function(a,b,j,k,g,l,e,i){var c={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:false,};var h={VPMReference:true,VPMRepReference:true,"3DShape":true,Drawing:true,};var f={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:true,};var d=a.extend(b,j,k,{defaultOptions:{className:"UPSAuthCmdInsertExisting",modeler:"product",version:"1.0",bAllOrNothing:true,availability:"empty_no_authoring_or_multiSelection",chunkSize:50,chooser:{precondFilter:'(flattenedtaxonomies:"types/VPMReference" OR (flattenedtaxonomies:"types/VPMRepReference" AND [ds6w:composed]:FALSE))',precondFilterAddRoot:'(flattenedtaxonomies:"types/VPMReference" OR (flattenedtaxonomies:"types/VPMRepReference" AND [ds6w:composed]:FALSE))',source:["3dspace"],multiSel:true,advanced_search:{showByDefault:true}},remapErrors:[{modeler:"Input parameters are not valid",user:e.ERR_007},{modeler:"Embedded Component not supported",user:i.authoring_failed_EC},{modeler:"ERR_FUN092398",user:i.ERR_FUN092398}],fnCmdAvailability:function(p){var n=this;var o=false;var m=g.getSelectedNodes();if(m.length>0){n.isValidParentSelection(m,function(q){o=q.status;p(o)})}else{o=true;p(o)}},isValidParentSelection:function(m,o){var n=[];m.forEach(function(p){n.push(g.getType(p))});l.isTypesAuthorized({commandName:this.className,supported:c,types:n,onComplete:function(q){var p={valid:[],invalid:[],status:true};m.forEach(function(s,r){if(q.indexOf(n[r])!==-1){p.valid.push(s)}else{p.invalid.push(s);p.status=false}});o(p)}})},isValidChildrenSelection:function(n,o){var m=[];n.forEach(function(p){m.push(p["ds6w:type_value"])});l.isTypesAuthorized({commandName:this.className+"_Children",supported:h,types:m,onComplete:function(q){var p={valid:[],invalid:[],status:true};n.forEach(function(s,r){if(q.indexOf(m[r])!==-1){p.valid.push(s)}else{p.invalid.push(s);p.status=false}});o(p)}})},isValidRootSelection:function(n,o){var m=[];n.forEach(function(p){m.push(p["ds6w:type_value"])});l.isTypesAuthorized({commandName:this.className+"_AddRoot",supported:f,types:m,onComplete:function(q){var p={valid:[],invalid:[],status:true};n.forEach(function(s,r){if(q.indexOf(m[r])!==-1){p.valid.push(s)}else{p.invalid.push(s);p.status=false}});o(p)}})}}});return d});define("DS/UPSCommands/commands/UPSAuthCmdReplaceByExisting",["UWA/Class","DS/ApplicationFrame/Command","DS/AuthGenericCommands/commands/AuthGenericCmdReplaceByExisting","DS/UPSCommands/commands/UPSAuthCmdAvailability","DS/UPSCommands/UPSCmdUtils","DS/AuthGenericCommands/AppContext","i18n!DS/UPSCommands/assets/nls/UPSAuthCatalog.json","i18n!DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog.json"],function(a,b,h,i,j,f,g,d){var e={VPMReference:true,VPMRepReference:false,"3DShape":false,Drawing:false,};var c=a.extend(b,h,i,{defaultOptions:{className:"UPSAuthCmdReplaceByExisting",modeler:"product",version:"1.0",bAllOrNothing:true,availability:"monoSelection",chooser:{precondFilter:'(flattenedtaxonomies:"types/VPMReference")',source:["3dspace"],multiSel:false,advanced_search:{showByDefault:true}},remapErrors:[{modeler:"Error from [ProductOperations : replaceReference] Id [Instance duplication failed] : Error from [PLMxKRefInstanceTemplate : checkAggregationBusinessRules] Id [Instance Aggregation forbidden [S_OK/False]]",user:g.replace_V6_under_V5},{modeler:"Input parameters are not valid",user:d.ERR_007},{modeler:"You don't have the required license for this command.",user:d.error_license},{modeler:"Embedded Component not supported",user:g.authoring_failed_EC},{modeler:"ERR_FUN092398",user:g.ERR_FUN092398}],fnCmdAvailability:function(n){var m=false;if(f.isThereARootSelected()){n(m);return}var l=f.getSelectedNodes()[0];var k=f.getType(l);j.isTypesAuthorized({commandName:this.className,supported:e,types:[k],onComplete:function(o){m=(o.indexOf(k)!==-1);n(m)}})},isValidSelection:function(l,m){var k=f.getType(l);j.isTypesAuthorized({commandName:this.className,supported:e,types:[k],onComplete:function(n){var o=(n.indexOf(k)!==-1);m(o)}})},isValidReplacer:function(l,m){var k=l["ds6w:type_value"];j.isTypesAuthorized({commandName:this.className,supported:e,types:[k],onComplete:function(n){var o=(n.indexOf(k)!==-1);m(o)}})}}});return c});