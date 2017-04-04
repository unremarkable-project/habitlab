System.registerDynamic("npm:underscore@1.8.3.json",[],!0,function(){return{main:"underscore.js",format:"cjs",meta:{"*.json":{format:"json"}}}}),System.registerDynamic("npm:underscore@1.8.3/underscore.js",[],!0,function(c,d,f){var g=this||self;(function(){function k(ba){function ca(da,ea,fa,ga,ha,ia){for(;0<=ha&&ha<ia;ha+=ba){var ja=ga?ga[ha]:ha;fa=ea(fa,da[ja],ja,da)}return fa}return function(da,ea,fa,ga){ea=F(ea,ga,4);var ha=!M(da)&&E.keys(da),ia=(ha||da).length,ja=0<ba?0:ia-1;return 3>arguments.length&&(fa=da[ha?ha[ja]:ja],ja+=ba),ca(da,ea,fa,ha,ja,ia)}}function m(ba){return function(ca,da,ea){da=G(da,ea);for(var fa=L(ca),ga=0<ba?0:fa-1;0<=ga&&ga<fa;ga+=ba)if(da(ca[ga],ga,ca))return ga;return-1}}function o(ba,ca,da){return function(ea,fa,ga){var ha=0,ia=L(ea);if("number"==typeof ga)0<ba?ha=0<=ga?ga:Math.max(ga+ia,ha):ia=0<=ga?Math.min(ga+1,ia):ga+ia+1;else if(da&&ga&&ia)return ga=da(ea,fa),ea[ga]===fa?ga:-1;if(fa!==fa)return ga=ca(w.call(ea,ha,ia),E.isNaN),0<=ga?ga+ha:-1;for(ga=0<ba?ha:ia-1;0<=ga&&ga<ia;ga+=ba)if(ea[ga]===fa)return ga;return-1}}function p(ba,ca){var da=R.length,ea=ba.constructor,fa=E.isFunction(ea)&&ea.prototype||t,ga="constructor";for(E.has(ba,ga)&&!E.contains(ca,ga)&&ca.push(ga);da--;)ga=R[da],ga in ba&&ba[ga]!==fa[ga]&&!E.contains(ca,ga)&&ca.push(ga)}var q=this,r=q._,s=Array.prototype,t=Object.prototype,u=Function.prototype,v=s.push,w=s.slice,x=t.toString,y=t.hasOwnProperty,z=Array.isArray,A=Object.keys,B=u.bind,C=Object.create,D=function(){},E=function(ba){return ba instanceof E?ba:this instanceof E?void(this._wrapped=ba):new E(ba)};"undefined"==typeof d?q._=E:("undefined"!=typeof f&&f.exports&&(d=f.exports=E),d._=E),E.VERSION="1.8.3";var F=function(ba,ca,da){if(void 0===ca)return ba;switch(null==da?3:da){case 1:return function(ea){return ba.call(ca,ea)};case 2:return function(ea,fa){return ba.call(ca,ea,fa)};case 3:return function(ea,fa,ga){return ba.call(ca,ea,fa,ga)};case 4:return function(ea,fa,ga,ha){return ba.call(ca,ea,fa,ga,ha)};}return function(){return ba.apply(ca,arguments)}},G=function(ba,ca,da){return null==ba?E.identity:E.isFunction(ba)?F(ba,ca,da):E.isObject(ba)?E.matcher(ba):E.property(ba)};E.iteratee=function(ba,ca){return G(ba,ca,Infinity)};var H=function(ba,ca){return function(da){var ea=arguments.length;if(2>ea||null==da)return da;for(var fa=1;fa<ea;fa++)for(var ka,ga=arguments[fa],ha=ba(ga),ia=ha.length,ja=0;ja<ia;ja++)ka=ha[ja],ca&&void 0!==da[ka]||(da[ka]=ga[ka]);return da}},I=function(ba){if(!E.isObject(ba))return{};if(C)return C(ba);D.prototype=ba;var ca=new D;return D.prototype=null,ca},J=function(ba){return function(ca){return null==ca?void 0:ca[ba]}},K=Math.pow(2,53)-1,L=J("length"),M=function(ba){var ca=L(ba);return"number"==typeof ca&&0<=ca&&ca<=K};E.each=E.forEach=function(ba,ca,da){ca=F(ca,da);var ea,fa;if(M(ba))for(ea=0,fa=ba.length;ea<fa;ea++)ca(ba[ea],ea,ba);else{var ga=E.keys(ba);for(ea=0,fa=ga.length;ea<fa;ea++)ca(ba[ga[ea]],ga[ea],ba)}return ba},E.map=E.collect=function(ba,ca,da){ca=G(ca,da);for(var ia,ea=!M(ba)&&E.keys(ba),fa=(ea||ba).length,ga=Array(fa),ha=0;ha<fa;ha++)ia=ea?ea[ha]:ha,ga[ha]=ca(ba[ia],ia,ba);return ga},E.reduce=E.foldl=E.inject=k(1),E.reduceRight=E.foldr=k(-1),E.find=E.detect=function(ba,ca,da){var ea;if(ea=M(ba)?E.findIndex(ba,ca,da):E.findKey(ba,ca,da),void 0!=ea&&-1!==ea)return ba[ea]},E.filter=E.select=function(ba,ca,da){var ea=[];return ca=G(ca,da),E.each(ba,function(fa,ga,ha){ca(fa,ga,ha)&&ea.push(fa)}),ea},E.reject=function(ba,ca,da){return E.filter(ba,E.negate(G(ca)),da)},E.every=E.all=function(ba,ca,da){ca=G(ca,da);for(var ha,ea=!M(ba)&&E.keys(ba),fa=(ea||ba).length,ga=0;ga<fa;ga++)if(ha=ea?ea[ga]:ga,!ca(ba[ha],ha,ba))return!1;return!0},E.some=E.any=function(ba,ca,da){ca=G(ca,da);for(var ha,ea=!M(ba)&&E.keys(ba),fa=(ea||ba).length,ga=0;ga<fa;ga++)if(ha=ea?ea[ga]:ga,ca(ba[ha],ha,ba))return!0;return!1},E.contains=E.includes=E.include=function(ba,ca,da,ea){return M(ba)||(ba=E.values(ba)),("number"!=typeof da||ea)&&(da=0),0<=E.indexOf(ba,ca,da)},E.invoke=function(ba,ca){var da=w.call(arguments,2),ea=E.isFunction(ca);return E.map(ba,function(fa){var ga=ea?ca:fa[ca];return null==ga?ga:ga.apply(fa,da)})},E.pluck=function(ba,ca){return E.map(ba,E.property(ca))},E.where=function(ba,ca){return E.filter(ba,E.matcher(ca))},E.findWhere=function(ba,ca){return E.find(ba,E.matcher(ca))},E.max=function(ba,ca,da){var ga,ha,ea=-Infinity,fa=-Infinity;if(null==ca&&null!=ba){ba=M(ba)?ba:E.values(ba);for(var ia=0,ja=ba.length;ia<ja;ia++)ga=ba[ia],ga>ea&&(ea=ga)}else ca=G(ca,da),E.each(ba,function(ka,la,ma){ha=ca(ka,la,ma),(ha>fa||ha===-Infinity&&ea==-Infinity)&&(ea=ka,fa=ha)});return ea},E.min=function(ba,ca,da){var ga,ha,ea=Infinity,fa=Infinity;if(null==ca&&null!=ba){ba=M(ba)?ba:E.values(ba);for(var ia=0,ja=ba.length;ia<ja;ia++)ga=ba[ia],ga<ea&&(ea=ga)}else ca=G(ca,da),E.each(ba,function(ka,la,ma){ha=ca(ka,la,ma),(ha<fa||ha===Infinity&&ea==Infinity)&&(ea=ka,fa=ha)});return ea},E.shuffle=function(ba){for(var ga,ca=M(ba)?ba:E.values(ba),da=ca.length,ea=Array(da),fa=0;fa<da;fa++)ga=E.random(0,fa),ga!==fa&&(ea[fa]=ea[ga]),ea[ga]=ca[fa];return ea},E.sample=function(ba,ca,da){return null==ca||da?(M(ba)||(ba=E.values(ba)),ba[E.random(ba.length-1)]):E.shuffle(ba).slice(0,Math.max(0,ca))},E.sortBy=function(ba,ca,da){return ca=G(ca,da),E.pluck(E.map(ba,function(ea,fa,ga){return{value:ea,index:fa,criteria:ca(ea,fa,ga)}}).sort(function(ea,fa){var ga=ea.criteria,ha=fa.criteria;if(ga!==ha){if(ga>ha||void 0===ga)return 1;if(ga<ha||void 0===ha)return-1}return ea.index-fa.index}),"value")};var N=function(ba){return function(ca,da,ea){var fa={};return da=G(da,ea),E.each(ca,function(ga,ha){var ia=da(ga,ha,ca);ba(fa,ga,ia)}),fa}};E.groupBy=N(function(ba,ca,da){E.has(ba,da)?ba[da].push(ca):ba[da]=[ca]}),E.indexBy=N(function(ba,ca,da){ba[da]=ca}),E.countBy=N(function(ba,ca,da){E.has(ba,da)?ba[da]++:ba[da]=1}),E.toArray=function(ba){return ba?E.isArray(ba)?w.call(ba):M(ba)?E.map(ba,E.identity):E.values(ba):[]},E.size=function(ba){return null==ba?0:M(ba)?ba.length:E.keys(ba).length},E.partition=function(ba,ca,da){ca=G(ca,da);var ea=[],fa=[];return E.each(ba,function(ga,ha,ia){(ca(ga,ha,ia)?ea:fa).push(ga)}),[ea,fa]},E.first=E.head=E.take=function(ba,ca,da){return null==ba?void 0:null==ca||da?ba[0]:E.initial(ba,ba.length-ca)},E.initial=function(ba,ca,da){return w.call(ba,0,Math.max(0,ba.length-(null==ca||da?1:ca)))},E.last=function(ba,ca,da){return null==ba?void 0:null==ca||da?ba[ba.length-1]:E.rest(ba,Math.max(0,ba.length-ca))},E.rest=E.tail=E.drop=function(ba,ca,da){return w.call(ba,null==ca||da?1:ca)},E.compact=function(ba){return E.filter(ba,E.identity)};var O=function(ba,ca,da,ea){for(var ja,fa=[],ga=0,ha=ea||0,ia=L(ba);ha<ia;ha++)if(ja=ba[ha],M(ja)&&(E.isArray(ja)||E.isArguments(ja))){ca||(ja=O(ja,ca,da));var ka=0,la=ja.length;for(fa.length+=la;ka<la;)fa[ga++]=ja[ka++]}else da||(fa[ga++]=ja);return fa};E.flatten=function(ba,ca){return O(ba,ca,!1)},E.without=function(ba){return E.difference(ba,w.call(arguments,1))},E.uniq=E.unique=function(ba,ca,da,ea){E.isBoolean(ca)||(ea=da,da=ca,ca=!1),null!=da&&(da=G(da,ea));for(var fa=[],ga=[],ha=0,ia=L(ba);ha<ia;ha++){var ja=ba[ha],ka=da?da(ja,ha,ba):ja;ca?((!ha||ga!==ka)&&fa.push(ja),ga=ka):da?!E.contains(ga,ka)&&(ga.push(ka),fa.push(ja)):!E.contains(fa,ja)&&fa.push(ja)}return fa},E.union=function(){return E.uniq(O(arguments,!0,!0))},E.intersection=function(ba){for(var ga,ca=[],da=arguments.length,ea=0,fa=L(ba);ea<fa;ea++)if(ga=ba[ea],!E.contains(ca,ga)){for(var ha=1;ha<da&&!!E.contains(arguments[ha],ga);ha++);ha===da&&ca.push(ga)}return ca},E.difference=function(ba){var ca=O(arguments,!0,!0,1);return E.filter(ba,function(da){return!E.contains(ca,da)})},E.zip=function(){return E.unzip(arguments)},E.unzip=function(ba){for(var ca=ba&&E.max(ba,L).length||0,da=Array(ca),ea=0;ea<ca;ea++)da[ea]=E.pluck(ba,ea);return da},E.object=function(ba,ca){for(var da={},ea=0,fa=L(ba);ea<fa;ea++)ca?da[ba[ea]]=ca[ea]:da[ba[ea][0]]=ba[ea][1];return da},E.findIndex=m(1),E.findLastIndex=m(-1),E.sortedIndex=function(ba,ca,da,ea){da=G(da,ea,1);for(var ia,fa=da(ca),ga=0,ha=L(ba);ga<ha;)ia=Math.floor((ga+ha)/2),da(ba[ia])<fa?ga=ia+1:ha=ia;return ga},E.indexOf=o(1,E.findIndex,E.sortedIndex),E.lastIndexOf=o(-1,E.findLastIndex),E.range=function(ba,ca,da){null==ca&&(ca=ba||0,ba=0),da=da||1;for(var ea=Math.max(Math.ceil((ca-ba)/da),0),fa=Array(ea),ga=0;ga<ea;ga++,ba+=da)fa[ga]=ba;return fa};var P=function(ba,ca,da,ea,fa){if(!(ea instanceof ca))return ba.apply(da,fa);var ga=I(ba.prototype),ha=ba.apply(ga,fa);return E.isObject(ha)?ha:ga};E.bind=function(ba,ca){if(B&&ba.bind===B)return B.apply(ba,w.call(arguments,1));if(!E.isFunction(ba))throw new TypeError("Bind must be called on a function");var da=w.call(arguments,2),ea=function(){return P(ba,ea,ca,this,da.concat(w.call(arguments)))};return ea},E.partial=function(ba){var ca=w.call(arguments,1),da=function(){for(var ea=0,fa=ca.length,ga=Array(fa),ha=0;ha<fa;ha++)ga[ha]=ca[ha]===E?arguments[ea++]:ca[ha];for(;ea<arguments.length;)ga.push(arguments[ea++]);return P(ba,da,this,this,ga)};return da},E.bindAll=function(ba){var ca,ea,da=arguments.length;if(1>=da)throw new Error("bindAll must be passed function names");for(ca=1;ca<da;ca++)ea=arguments[ca],ba[ea]=E.bind(ba[ea],ba);return ba},E.memoize=function(ba,ca){var da=function(ea){var fa=da.cache,ga=""+(ca?ca.apply(this,arguments):ea);return E.has(fa,ga)||(fa[ga]=ba.apply(this,arguments)),fa[ga]};return da.cache={},da},E.delay=function(ba,ca){var da=w.call(arguments,2);return setTimeout(function(){return ba.apply(null,da)},ca)},E.defer=E.partial(E.delay,E,1),E.throttle=function(ba,ca,da){var ea,fa,ga,ha=null,ia=0;da||(da={});var ja=function(){ia=!1===da.leading?0:E.now(),ha=null,ga=ba.apply(ea,fa),ha||(ea=fa=null)};return function(){var ka=E.now();ia||!1!==da.leading||(ia=ka);var la=ca-(ka-ia);return ea=this,fa=arguments,0>=la||la>ca?(ha&&(clearTimeout(ha),ha=null),ia=ka,ga=ba.apply(ea,fa),!ha&&(ea=fa=null)):!ha&&!1!==da.trailing&&(ha=setTimeout(ja,la)),ga}},E.debounce=function(ba,ca,da){var ea,fa,ga,ha,ia,ja=function(){var ka=E.now()-ha;ka<ca&&0<=ka?ea=setTimeout(ja,ca-ka):(ea=null,!da&&(ia=ba.apply(ga,fa),!ea&&(ga=fa=null)))};return function(){ga=this,fa=arguments,ha=E.now();var ka=da&&!ea;return ea||(ea=setTimeout(ja,ca)),ka&&(ia=ba.apply(ga,fa),ga=fa=null),ia}},E.wrap=function(ba,ca){return E.partial(ca,ba)},E.negate=function(ba){return function(){return!ba.apply(this,arguments)}},E.compose=function(){var ba=arguments,ca=ba.length-1;return function(){for(var da=ca,ea=ba[ca].apply(this,arguments);da--;)ea=ba[da].call(this,ea);return ea}},E.after=function(ba,ca){return function(){if(1>--ba)return ca.apply(this,arguments)}},E.before=function(ba,ca){var da;return function(){return 0<--ba&&(da=ca.apply(this,arguments)),1>=ba&&(ca=null),da}},E.once=E.partial(E.before,2);var Q=!{toString:null}.propertyIsEnumerable("toString"),R=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];E.keys=function(ba){if(!E.isObject(ba))return[];if(A)return A(ba);var ca=[];for(var da in ba)E.has(ba,da)&&ca.push(da);return Q&&p(ba,ca),ca},E.allKeys=function(ba){if(!E.isObject(ba))return[];var ca=[];for(var da in ba)ca.push(da);return Q&&p(ba,ca),ca},E.values=function(ba){for(var ca=E.keys(ba),da=ca.length,ea=Array(da),fa=0;fa<da;fa++)ea[fa]=ba[ca[fa]];return ea},E.mapObject=function(ba,ca,da){ca=G(ca,da);for(var ha,ea=E.keys(ba),fa=ea.length,ga={},ia=0;ia<fa;ia++)ha=ea[ia],ga[ha]=ca(ba[ha],ha,ba);return ga},E.pairs=function(ba){for(var ca=E.keys(ba),da=ca.length,ea=Array(da),fa=0;fa<da;fa++)ea[fa]=[ca[fa],ba[ca[fa]]];return ea},E.invert=function(ba){for(var ca={},da=E.keys(ba),ea=0,fa=da.length;ea<fa;ea++)ca[ba[da[ea]]]=da[ea];return ca},E.functions=E.methods=function(ba){var ca=[];for(var da in ba)E.isFunction(ba[da])&&ca.push(da);return ca.sort()},E.extend=H(E.allKeys),E.extendOwn=E.assign=H(E.keys),E.findKey=function(ba,ca,da){ca=G(ca,da);for(var fa,ea=E.keys(ba),ga=0,ha=ea.length;ga<ha;ga++)if(fa=ea[ga],ca(ba[fa],fa,ba))return fa},E.pick=function(ba,ca,da){var ga,ha,ea={},fa=ba;if(null==fa)return ea;E.isFunction(ca)?(ha=E.allKeys(fa),ga=F(ca,da)):(ha=O(arguments,!1,!1,1),ga=function(ma,na,oa){return na in oa},fa=Object(fa));for(var ia=0,ja=ha.length;ia<ja;ia++){var ka=ha[ia],la=fa[ka];ga(la,ka,fa)&&(ea[ka]=la)}return ea},E.omit=function(ba,ca,da){if(E.isFunction(ca))ca=E.negate(ca);else{var ea=E.map(O(arguments,!1,!1,1),String);ca=function(fa,ga){return!E.contains(ea,ga)}}return E.pick(ba,ca,da)},E.defaults=H(E.allKeys,!0),E.create=function(ba,ca){var da=I(ba);return ca&&E.extendOwn(da,ca),da},E.clone=function(ba){return E.isObject(ba)?E.isArray(ba)?ba.slice():E.extend({},ba):ba},E.tap=function(ba,ca){return ca(ba),ba},E.isMatch=function(ba,ca){var da=E.keys(ca),ea=da.length;if(null==ba)return!ea;for(var ha,fa=Object(ba),ga=0;ga<ea;ga++)if(ha=da[ga],ca[ha]!==fa[ha]||!(ha in fa))return!1;return!0};var S=function(ba,ca,da,ea){if(ba===ca)return 0!==ba||1/ba==1/ca;if(null==ba||null==ca)return ba===ca;ba instanceof E&&(ba=ba._wrapped),ca instanceof E&&(ca=ca._wrapped);var fa=x.call(ba);if(fa!==x.call(ca))return!1;switch(fa){case"[object RegExp]":case"[object String]":return""+ba==""+ca;case"[object Number]":return+ba==+ba?0==+ba?1/+ba==1/ca:+ba==+ca:+ca!=+ca;case"[object Date]":case"[object Boolean]":return+ba==+ca;}var ga="[object Array]"===fa;if(!ga){if("object"!=typeof ba||"object"!=typeof ca)return!1;var ha=ba.constructor,ia=ca.constructor;if(ha!==ia&&!(E.isFunction(ha)&&ha instanceof ha&&E.isFunction(ia)&&ia instanceof ia)&&"constructor"in ba&&"constructor"in ca)return!1}da=da||[],ea=ea||[];for(var ja=da.length;ja--;)if(da[ja]===ba)return ea[ja]===ca;if(da.push(ba),ea.push(ca),ga){if(ja=ba.length,ja!==ca.length)return!1;for(;ja--;)if(!S(ba[ja],ca[ja],da,ea))return!1}else{var la,ka=E.keys(ba);if(ja=ka.length,E.keys(ca).length!==ja)return!1;for(;ja--;)if(la=ka[ja],!(E.has(ca,la)&&S(ba[la],ca[la],da,ea)))return!1}return da.pop(),ea.pop(),!0};E.isEqual=function(ba,ca){return S(ba,ca)},E.isEmpty=function(ba){return!(null!=ba)||(M(ba)&&(E.isArray(ba)||E.isString(ba)||E.isArguments(ba))?0===ba.length:0===E.keys(ba).length)},E.isElement=function(ba){return!!(ba&&1===ba.nodeType)},E.isArray=z||function(ba){return"[object Array]"===x.call(ba)},E.isObject=function(ba){var ca=typeof ba;return"function"==ca||"object"==ca&&!!ba},E.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(ba){E["is"+ba]=function(ca){return x.call(ca)==="[object "+ba+"]"}}),E.isArguments(arguments)||(E.isArguments=function(ba){return E.has(ba,"callee")}),"function"!=typeof /./&&"object"!=typeof Int8Array&&(E.isFunction=function(ba){return"function"==typeof ba||!1}),E.isFinite=function(ba){return isFinite(ba)&&!isNaN(parseFloat(ba))},E.isNaN=function(ba){return E.isNumber(ba)&&ba!==+ba},E.isBoolean=function(ba){return!0===ba||!1===ba||"[object Boolean]"===x.call(ba)},E.isNull=function(ba){return null===ba},E.isUndefined=function(ba){return void 0===ba},E.has=function(ba,ca){return null!=ba&&y.call(ba,ca)},E.noConflict=function(){return q._=r,this},E.identity=function(ba){return ba},E.constant=function(ba){return function(){return ba}},E.noop=function(){},E.property=J,E.propertyOf=function(ba){return null==ba?function(){}:function(ca){return ba[ca]}},E.matcher=E.matches=function(ba){return ba=E.extendOwn({},ba),function(ca){return E.isMatch(ca,ba)}},E.times=function(ba,ca,da){var ea=Array(Math.max(0,ba));ca=F(ca,da,1);for(var fa=0;fa<ba;fa++)ea[fa]=ca(fa);return ea},E.random=function(ba,ca){return null==ca&&(ca=ba,ba=0),ba+Math.floor(Math.random()*(ca-ba+1))},E.now=Date.now||function(){return new Date().getTime()};var T={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#x27;","`":"&#x60;"},U=E.invert(T),V=function(ba){var ca=function(ga){return ba[ga]},da="(?:"+E.keys(ba).join("|")+")",ea=RegExp(da),fa=RegExp(da,"g");return function(ga){return ga=null==ga?"":""+ga,ea.test(ga)?ga.replace(fa,ca):ga}};E.escape=V(T),E.unescape=V(U),E.result=function(ba,ca,da){var ea=null==ba?void 0:ba[ca];return void 0===ea&&(ea=da),E.isFunction(ea)?ea.call(ba):ea};var W=0;E.uniqueId=function(ba){var ca=++W+"";return ba?ba+ca:ca},E.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var X=/(.)^/,Y={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},Z=/\\|'|\r|\n|\u2028|\u2029/g,$=function(ba){return"\\"+Y[ba]};E.template=function(ba,ca,da){!ca&&da&&(ca=da),ca=E.defaults({},ca,E.templateSettings);var ea=RegExp([(ca.escape||X).source,(ca.interpolate||X).source,(ca.evaluate||X).source].join("|")+"|$","g"),fa=0,ga="__p+='";ba.replace(ea,function(ka,la,ma,na,oa){return ga+=ba.slice(fa,oa).replace(Z,$),fa=oa+ka.length,la?ga+="'+\n((__t=("+la+"))==null?'':_.escape(__t))+\n'":ma?ga+="'+\n((__t=("+ma+"))==null?'':__t)+\n'":na&&(ga+="';\n"+na+"\n__p+='"),ka}),ga+="';\n",ca.variable||(ga="with(obj||{}){\n"+ga+"}\n"),ga="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+ga+"return __p;\n";try{var ha=new Function(ca.variable||"obj","_",ga)}catch(ka){throw ka.source=ga,ka}var ia=function(ka){return ha.call(this,ka,E)},ja=ca.variable||"obj";return ia.source="function("+ja+"){\n"+ga+"}",ia},E.chain=function(ba){var ca=E(ba);return ca._chain=!0,ca};var aa=function(ba,ca){return ba._chain?E(ca).chain():ca};E.mixin=function(ba){E.each(E.functions(ba),function(ca){var da=E[ca]=ba[ca];E.prototype[ca]=function(){var ea=[this._wrapped];return v.apply(ea,arguments),aa(this,da.apply(E,ea))}})},E.mixin(E),E.each(["pop","push","reverse","shift","sort","splice","unshift"],function(ba){var ca=s[ba];E.prototype[ba]=function(){var da=this._wrapped;return ca.apply(da,arguments),("shift"===ba||"splice"===ba)&&0===da.length&&delete da[0],aa(this,da)}}),E.each(["concat","join","slice"],function(ba){var ca=s[ba];E.prototype[ba]=function(){return aa(this,ca.apply(this._wrapped,arguments))}}),E.prototype.value=function(){return this._wrapped},E.prototype.valueOf=E.prototype.toJSON=E.prototype.value,E.prototype.toString=function(){return""+this._wrapped},"function"==typeof void 0}).call(d)});
