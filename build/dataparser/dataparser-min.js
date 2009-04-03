YUI.add("dataparser-base",function(C){C.namespace("DataParser");var A=C.DataParser,B=function(){B.superclass.constructor.apply(this,arguments);};C.mix(B,{NAME:"DataParser.Base",ATTRS:{schema:{value:{}}}});C.extend(B,C.Base,{initializer:function(){},_parse:function(D){return D;},parse:function(E){var D=this.fire("parse",null,E);if(D){return this._parse(E);}}});A.Base=B;},"@VERSION@",{requires:["base"]});YUI.add("dataparser-json",function(C){var A=C.Lang,B=function(){B.superclass.constructor.apply(this,arguments);};C.mix(B,{NAME:"DataParser.JSON",ATTRS:{schema:{value:{}}}});C.extend(B,C.DataParser.Base,{_parse:function(a){var Y=(a.responseText&&C.JSON.parse(a.responseText))||a,S=this.get("schema"),G={results:[],meta:{}};if(A.isObject(Y)&&S.resultsList){var T=S.fields,H=Y,U=[],N=S.metaFields||{},J=[],M=[],L=[],Z=false,W,X,V,O,b,F,R;var D=function(f){var e=null,d=[],c=0;if(f){f=f.replace(/\[(['"])(.*?)\1\]/g,function(h,g,i){d[c]=i;return".@"+(c++);}).replace(/\[(\d+)\]/g,function(h,g){d[c]=parseInt(g,10)|0;return".@"+(c++);}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(f)){e=f.split(".");for(c=e.length-1;c>=0;--c){if(e[c].charAt(0)==="@"){e[c]=d[parseInt(e[c].substr(1),10)];}}}else{}}return e;};var I=function(g,e){var d=e,f=0,c=g.length;for(;f<c&&d;++f){d=d[g[f]];}return d;};R=D(S.resultsList);if(R){H=I(R,Y);if(H===undefined){Z=true;}}else{Z=true;}if(!H){H=[];}if(!A.isArray(H)){H=[H];}if(!Z){if(S.fields){var E;for(W=0,X=T.length;W<X;W++){E=T[W];b=E.key||E;F=((typeof E.parser==="function")?E.parser:C.DataParser[E.parser+""])||E.converter;R=D(b);if(F){J[J.length]={key:b,parser:F};}if(R){if(R.length>1){M[M.length]={key:b,path:R};}else{L[L.length]={key:b,path:R[0]};}}else{}}for(W=H.length-1;W>=0;--W){var P=H[W],K={};if(P){for(V=L.length-1;V>=0;--V){K[L[V].key]=(P[L[V].path]!==undefined)?P[L[V].path]:P[V];}for(V=M.length-1;V>=0;--V){K[M[V].key]=I(M[V].path,P);}for(V=J.length-1;V>=0;--V){var Q=J[V].key;K[Q]=J[V].parser(K[Q]);if(K[Q]===undefined){K[Q]=null;}}}U[W]=K;}}else{U=H;}for(b in N){if(A.hasOwnProperty(N,b)){R=D(N[b]);if(R){O=I(R,Y);G.meta[b]=O;}}}}else{G.error=true;}G.results=U;}else{G.error=true;}return G;}});C.DataParser.JSON=B;},"@VERSION@",{requires:["dataparser-base"]});YUI.add("dataparser",function(A){},"@VERSION@",{use:["dataparser-base","dataparser-json"]});