YUI.add("selector-css2",function(C){var J="parentNode",I="tagName",E="attributes",F="combinator",D="pseudos",G="previous",H="previousSibling",B=[],A=C.Selector,K={SORT_RESULTS:true,_children:function(N){var L=N.children,M,O;if(!L&&N[I]){L=[];for(M=0,O;O=N.childNodes[M++];){if(O.tagName){L[L.length]=O;}}B[B.length]=N;N.children=L;}return L||[];},_regexCache:{},_re:{attr:/(\[.*\])/g,urls:/^(?:href|src)/},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[className~=$1]"},operators:{"":function(M,L){return C.DOM.getAttribute(M,L[0])!=="";},"=":"^{val}$","~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(L){return C.Selector._children(L[J])[0]===L;}},_brute:{query:function(L,M,O){var N=[];if(L){N=A._query(L,M,O);}A._cleanup();return(O)?(N[0]||null):N;}},_cleanup:function(){for(var L=0,M;M=B[L++];){delete M.children;}B=[];},_query:function(P,U,V,N){var S=[],M=P.split(","),L=[],T,O,Q,R;if(M.length>1){for(Q=0,R=M.length;Q<R;++Q){S=S.concat(arguments.callee(M[Q],U,V,true));}S=A.SORT_RESULTS?A._sort(S):S;A._clearFoundCache();}else{U=U||C.config.doc;if(U.nodeType!==9){if(!U.id){U.id=C.guid();}if(U.ownerDocument.getElementById(U.id)){P="#"+U.id+" "+P;U=U.ownerDocument;}}T=A._tokenize(P,U);O=T.pop();if(O){if(N){O.deDupe=true;}if(T[0]&&T[0].id&&U.nodeType===9&&U.getElementById(T[0].id)){U=U.getElementById(T[0].id);}if(U&&!L.length&&O.prefilter){L=O.prefilter(U,O);}if(L.length){if(V){C.Array.some(L,A._testToken,O);}else{C.Array.each(L,A._testToken,O);}}S=O.result;}}return S;},_testToken:function(M,Q,L,N){N=N||this;var U=N.tag,P=N[G],V=N.result,O=0,T=P&&P[F]?A.combinators[P[F]]:null,S,R;if((U==="*"||U===M[I])&&!(N.last&&M._found)){while((R=N.tests[O])){O++;S=R.test;if(S.test){if(!S.test(C.DOM.getAttribute(M,R.name))){return false;}}else{if(!S(M,R.match)){return false;}}}if(T&&!T(M,N)){return false;}if(N.root&&N.root.nodeType!==9&&!C.DOM.contains(N.root,M)){return false;}V[V.length]=M;if(N.deDupe&&N.last){M._found=true;A._foundCache.push(M);}return true;}return false;},_getRegExp:function(N,L){var M=A._regexCache;L=L||"";if(!M[N+L]){M[N+L]=new RegExp(N,L);}return M[N+L];},combinators:{" ":function(N,L){var O=A._testToken,M=L[G];while((N=N[J])){if(O(N,null,null,M)){return true;}}return false;},">":function(M,L){return A._testToken(M[J],null,null,L[G]);},"+":function(N,M){var L=N[H];while(L&&L.nodeType!==1){L=L[H];}if(L&&C.Selector._testToken(L,null,null,M[G])){return true;}return false;}},_parsers:[{name:I,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(M,L){M.tag=L[1].toUpperCase();M.prefilter=function(N){return N.getElementsByTagName(M.tag);};return true;}},{name:E,re:/^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,fn:function(N,M){var O=M[3],L=!(M[2]&&O)?"":M[2],P=A.operators[L];if(typeof P==="string"){P=A._getRegExp(P.replace("{val}",O));}if(M[1]==="id"&&L==="="&&O){N.id=O;N.prefilter=function(Q){var S=Q.nodeType===9?Q:Q.ownerDocument,R=S.getElementById(O);return R?[R]:[];};}else{if(document.documentElement.getElementsByClassName&&M[1].indexOf("class")===0){if(!N.prefilter){N.prefilter=function(Q){return Q.getElementsByClassName(O);};P=true;}}}return P;}},{name:F,re:/^\s*([>+~]|\s)\s*/,fn:function(M,L){M[F]=L[1];return !!A.combinators[M[F]];}},{name:D,re:/^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,fn:function(M,L){return A[D][L[1]];}}],_getToken:function(L){return{previous:L,combinator:" ",tag:"*",prefilter:function(M){return M.getElementsByTagName("*");},tests:[],result:[]};},_tokenize:function(N,T){N=N||"";N=A._replaceShorthand(C.Lang.trim(N));var M=A._getToken(),S=N,R=[],U=false,Q,P,O,L;outer:do{U=false;for(O=0,L;L=A._parsers[O++];){if((P=L.re.exec(N))){Q=L.fn(M,P);if(Q){if(Q!==true){M.tests.push({name:P[1],test:Q,match:P.slice(1)});}U=true;N=N.replace(P[0],"");if(!N.length||L.name===F){M.root=T;R.push(M);M=A._getToken(M);}}else{U=false;break outer;}}}}while(U&&N.length);if(!U||N.length){R=[];}else{if(R.length){R[R.length-1].last=true;}}return R;},_replaceShorthand:function(M){var N=A.shorthand,O=M.match(A._re.attr),Q,P,L;if(O){M=M.replace(A._re.attr,"REPLACED_ATTRIBUTE");}for(Q in N){if(N.hasOwnProperty(Q)){M=M.replace(A._getRegExp(Q,"gi"),N[Q]);}}if(O){for(P=0,L=O.length;P<L;++P){M=M.replace("REPLACED_ATTRIBUTE",O[P]);}}return M;}};C.mix(C.Selector,K,true);if(!C.Selector._supportsNative()){C.Selector.query=A._brute.query;}},"@VERSION@",{requires:["selector-native"],skinnable:false});