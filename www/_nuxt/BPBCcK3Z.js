/*! Capacitor: https://capacitorjs.com/ - MIT License */var P;(function(r){r.Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE"})(P||(P={}));class x extends Error{constructor(e,t,i){super(e),this.message=e,this.code=t,this.data=i}}const q=r=>{var e,t;return r!=null&&r.androidBridge?"android":!((t=(e=r==null?void 0:r.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},_=r=>{const e=r.CapacitorCustomPlatform||null,t=r.Capacitor||{},i=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:q(r),n=()=>s()!=="web",a=o=>{const c=w.get(o);return!!(c!=null&&c.platforms.has(s())||d(o))},d=o=>{var c;return(c=t.PluginHeaders)===null||c===void 0?void 0:c.find(E=>E.name===o)},u=o=>r.console.error(o),w=new Map,L=(o,c={})=>{const E=w.get(o);if(E)return console.warn(`Capacitor plugin "${o}" already registered. Cannot register plugins twice.`),E.proxy;const p=s(),v=d(o);let b;const W=async()=>(!b&&p in c?b=typeof c[p]=="function"?b=await c[p]():b=c[p]:e!==null&&!b&&"web"in c&&(b=typeof c.web=="function"?b=await c.web():b=c.web),b),D=(l,f)=>{var g,y;if(v){const m=v==null?void 0:v.methods.find(h=>f===h.name);if(m)return m.rtype==="promise"?h=>t.nativePromise(o,f.toString(),h):(h,C)=>t.nativeCallback(o,f.toString(),h,C);if(l)return(g=l[f])===null||g===void 0?void 0:g.bind(l)}else{if(l)return(y=l[f])===null||y===void 0?void 0:y.bind(l);throw new x(`"${o}" plugin is not implemented on ${p}`,P.Unimplemented)}},O=l=>{let f;const g=(...y)=>{const m=W().then(h=>{const C=D(h,l);if(C){const k=C(...y);return f=k==null?void 0:k.remove,k}else throw new x(`"${o}.${l}()" is not implemented on ${p}`,P.Unimplemented)});return l==="addListener"&&(m.remove=async()=>f()),m};return g.toString=()=>`${l.toString()}() { [capacitor code] }`,Object.defineProperty(g,"name",{value:l,writable:!1,configurable:!1}),g},U=O("addListener"),j=O("removeListener"),F=(l,f)=>{const g=U({eventName:l},f),y=async()=>{const h=await g;j({eventName:l,callbackId:h},f)},m=new Promise(h=>g.then(()=>h({remove:y})));return m.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await y()},m},$=new Proxy({},{get(l,f){switch(f){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?F:U;case"removeListener":return j;default:return O(f)}}});return i[o]=$,w.set(o,{name:o,proxy:$,platforms:new Set([...Object.keys(c),...v?[p]:[]])}),$};return t.convertFileSrc||(t.convertFileSrc=o=>o),t.getPlatform=s,t.handleError=u,t.isNativePlatform=n,t.isPluginAvailable=a,t.registerPlugin=L,t.Exception=x,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},B=r=>r.Capacitor=_(r),A=B(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),H=A.registerPlugin;class R{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let i=!1;this.listeners[e]||(this.listeners[e]=[],i=!0),this.listeners[e].push(t);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n),i&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,t);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,i){const s=this.listeners[e];if(!s){if(i){let n=this.retainedEventArguments[e];n||(n=[]),n.push(t),this.retainedEventArguments[e]=n}return}s.forEach(n=>n(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:i=>{this.notifyListeners(t,i)}}}unimplemented(e="not implemented"){return new A.Exception(e,P.Unimplemented)}unavailable(e="not available"){return new A.Exception(e,P.Unavailable)}async removeListener(e,t){const i=this.listeners[e];if(!i)return;const s=i.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(i=>{this.notifyListeners(e,i)}))}}const S=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),T=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class I extends R{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[s,n]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=T(s).trim(),n=T(n).trim(),t[s]=n}),t}async setCookie(e){try{const t=S(e.key),i=S(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,n=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${i||""}${s}; path=${n}; ${a};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}H("CapacitorCookies",{web:()=>new I});const M=async r=>new Promise((e,t)=>{const i=new FileReader;i.onload=()=>{const s=i.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},i.onerror=s=>t(s),i.readAsDataURL(r)}),K=(r={})=>{const e=Object.keys(r);return Object.keys(r).map(s=>s.toLocaleLowerCase()).reduce((s,n,a)=>(s[n]=r[e[a]],s),{})},G=(r,e=!0)=>r?Object.entries(r).reduce((i,s)=>{const[n,a]=s;let d,u;return Array.isArray(a)?(u="",a.forEach(w=>{d=e?encodeURIComponent(w):w,u+=`${n}=${d}&`}),u.slice(0,-1)):(d=e?encodeURIComponent(a):a,u=`${n}=${d}`),`${i}&${u}`},"").substr(1):null,z=(r,e={})=>{const t=Object.assign({method:r.method||"GET",headers:r.headers},e),s=K(r.headers)["content-type"]||"";if(typeof r.data=="string")t.body=r.data;else if(s.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[a,d]of Object.entries(r.data||{}))n.set(a,d);t.body=n.toString()}else if(s.includes("multipart/form-data")||r.data instanceof FormData){const n=new FormData;if(r.data instanceof FormData)r.data.forEach((d,u)=>{n.append(u,d)});else for(const d of Object.keys(r.data))n.append(d,r.data[d]);t.body=n;const a=new Headers(t.headers);a.delete("content-type"),t.headers=a}else(s.includes("application/json")||typeof r.data=="object")&&(t.body=JSON.stringify(r.data));return t};class V extends R{async request(e){const t=z(e,e.webFetchExtra),i=G(e.params,e.shouldEncodeUrlParams),s=i?`${e.url}?${i}`:e.url,n=await fetch(s,t),a=n.headers.get("content-type")||"";let{responseType:d="text"}=n.ok?e:{};a.includes("application/json")&&(d="json");let u,w;switch(d){case"arraybuffer":case"blob":w=await n.blob(),u=await M(w);break;case"json":u=await n.json();break;case"document":case"text":default:u=await n.text()}const L={};return n.headers.forEach((o,c)=>{L[c]=o}),{data:u,headers:L,status:n.status,url:n.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}H("CapacitorHttp",{web:()=>new V});export{R as W,H as r};
