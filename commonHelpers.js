import{a as l,S as p,i as g}from"./assets/vendor-91c99ba8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const f="https://api.thecatapi.com/v1",h=`${f}/breeds`,y=`${f}/images/search?`,d="cat_breeds",u="cat_by_breed",S={}.CAT_API_KEY;l.defaults.headers.common["x-api-key"]=S;function E(){const t=localStorage.getItem(d);if(t){const e=JSON.parse(t);return console.log("[fetchBreeds] cachedCatBreeds: ",e),JSON.parse(e)}return l.get(`${h}`).then(e=>(localStorage.setItem(d,JSON.stringify(e.data)),console.log("[fetchBreeds] response: ",e),e.data))}function _(t){const e=localStorage.getItem(u);if(e){const n=JSON.parse(e);return console.log("[fetchCatByBreed] cachedCatByBreed: ",n),JSON.parse(n)}return l.get(`${y}breed_ids=${t}`).then(n=>(localStorage.setItem(u,JSON.stringify(n.data)),console.log("[fetchCatByBreed] response: ",n),n.data))}const B="cat_breeds";function c(t,e){t.classList.toggle("is-hidden-compeletely",!e)}function C(t,e,n){E().then(function(s){t.classList.remove("is-invisible");const r=s.map(({id:o,name:a})=>`<option value="${o}">${a}</option>`);t.insertAdjacentHTML("afterbegin",r.join("")),new p({select:t}),localStorage.setItem(B,s)}).catch(function(s){m(s)}).finally(function(){c(t,!0),c(e,!1),c(n,!0)})}function b(t,e,n,s){c(s,!1),c(n,!0),c(e,!0);const r=t.currentTarget.value;_(r).then(function(o){if(console.log("catData: ",o),o.length===0){s.innerHTML="";return}let{url:a,breeds:i}=o[0];s.innerHTML=`
        <img src="${a}" alt="${i[0].name}" width="400" loading="lazy" />
        <div class="text-box">
          <h2>${i[0].name}</h2>
          <p>${i[0].description}</p>
          <p><b>Temperament: </b>${i[0].temperament}</p>
          <p><b>Origin: </b>${i[0].origin}</p>
        </div>`}).catch(function(o){m(o)}).finally(function(){c(n,!1),c(e,!0),c(s,!0)})}function m(t){g.error({title:"🔻 Oops!",message:t.message??"Something went wrong!",position:"topCenter"})}(()=>{const t=document.querySelector(".breed-select"),e=document.querySelector(".loader"),n=document.querySelector(".cat-description");t.addEventListener("change",s=>b(s,t,e,n)),C(t,e,n)})();
//# sourceMappingURL=commonHelpers.js.map
