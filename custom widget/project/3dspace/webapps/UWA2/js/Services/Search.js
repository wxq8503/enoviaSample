define("UWA/Services/Search",["UWA/Core","UWA/Utils","UWA/Data"],function(d,c,b){var a={getFromProvider:function(h,g){var f,e="";if(g.lang!==undefined){e+="&lang="+g.lang}if(g.locale!==undefined){e+="&locale="+g.locale}if(g.mode!==undefined){e+="&mode="+g.mode}if(g.category!==undefined){e+="&category="+g.category}if(g.shop!==undefined){e+="&shop="+g.shop}switch(g.type){case"websearch":case"blogsearch":case"imagesearch":case"videosearch":case"podcastsearch":case"shoppingsearch":case"opensearch":f=d.hosts.netvibes+"/data/"+g.type+"/?q="+c.encodeUrl(g.query)+"&engine="+c.encodeUrl(h)+e;return b.request(f,{method:"GET",type:"json",onComplete:g.onComplete});default:d.log("invalid request type");break}}};return d.namespace("Services/Search",a,d)});