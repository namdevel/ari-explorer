const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DJXtD2CZ.js","./BPBCcK3Z.js"])))=>i.map(i=>d[i]);
import{an as l,u as d,B as m,p as c,o as p,w as u,a as r,ao as f}from"./jBqvOCDX.js";import{r as g}from"./BPBCcK3Z.js";class h extends HTMLElement{constructor(){super(),this.mode="padding",this.attachShadow({mode:"open"})}connectedCallback(){this.renderElement()}static get observedAttributes(){return["mode","edges"]}attributeChangedCallback(s,a,t){a!==t&&(this[s]=t,this.renderElement())}async renderElement(){var s;if(this.shadowRoot){const a=await v.getSafeAreaInsets(),t=this.mode==="margin",e=(s=this.edges)===null||s===void 0?void 0:s.split(",").map(i=>i.trim()),o={top:e&&!(e!=null&&e.includes("top"))?0:a.top,bottom:e&&!(e!=null&&e.includes("bottom"))?0:a.bottom,left:e&&!(e!=null&&e.includes("left"))?0:a.left,right:e&&!(e!=null&&e.includes("right"))?0:a.right};this.shadowRoot.innerHTML=`
            <style>
              #wrapper {
                ${t?"margin":"padding"}-top: ${o.top}px;
                ${t?"margin":"padding"}-bottom: ${o.bottom}px;
                ${t?"margin":"padding"}-left: ${o.left}px;
                ${t?"margin":"padding"}-right: ${o.right}px;
              }
            </style>
            <div id="wrapper">
              <slot></slot>
            </div>
          `}}}const _=()=>{customElements.get("safe-area")||customElements.define("safe-area",h)},v=g("SafeArea",{web:()=>l(()=>import("./DJXtD2CZ.js"),__vite__mapDeps([0,1]),import.meta.url).then(n=>new n.SafeAreaWeb)}),b={class:"content shadow-inset"},A={__name:"default",setup(n){return _(),d({link:[{rel:"stylesheet",href:"//site-assets.fontawesome.com/releases/v6.2.0/css/all.css"}]}),(s,a)=>{const t=m("safe-area");return p(),c(t,null,{default:u(()=>[r("div",null,[r("main",b,[f(s.$slots,"default")])])]),_:3})}}};export{A as default};
