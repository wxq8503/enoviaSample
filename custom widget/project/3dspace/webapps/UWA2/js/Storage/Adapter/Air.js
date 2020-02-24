define("UWA/Storage/Adapter/Air",["UWA/Core","UWA/Storage/Adapter/Abstract"],function(c,b){var a=b.extend({type:"Air",limit:64*1024,connect:function(d){this.database=d;this.db=null;this.storage.isReady=true},isAvailable:function(){return window.air!==undefined},getKey:function(d){return"uwa-"+this.database+"-"+d},get:function(d){this.interruptAccess();var e=air.EncryptedLocalStore.getItem(this.getKey(d));if(e===undefined||e===null){return undefined}return String(e)},set:function(e,f){this.interruptAccess();var d=new air.ByteArray();d.writeUTFBytes(f);air.EncryptedLocalStore.setItem(this.getKey(e),d);return f},rem:function(d){this.interruptAccess();var e=this.get(d);air.EncryptedLocalStore.removeItem(this.getKey(d));return e}});return c.namespace("Storage/Adapter/Air",a,c)});