import{a as l,S as h,i as y}from"./assets/vendor-91c99ba8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const u="https://api.thecatapi.com/v1",_=`${u}/breeds`,E=`${u}/images/search?`,f="x-api-key",d="cat_breeds",C="cat_by_breed",m={}.CAT_API_KEY,A="live_bytNC2cujaqiVi4NMgtPCYmpdjwwzI4YqMM94fNkWsEQBwt71pQFtm3yT5u5YsHM",g=m||A;console.log("Does CAT_API_KEY exist: ",!!m);function B(){const t=localStorage.getItem(d);if(t){const e=JSON.parse(t);return console.log("[fetchBreeds] cachedCatBreeds: ",e),Promise.resolve(e)}return l.defaults.headers.common[f]=g,l.get(`${_}`).then(e=>(localStorage.setItem(d,JSON.stringify(e.data)),console.log("[fetchBreeds] response: ",e),e.data))}function S(t){const e=`${C}_${t}`,s=localStorage.getItem(e);if(s){const o=JSON.parse(s);return console.log("[fetchCatByBreed] cachedCatByBreed: ",o),Promise.resolve(o)}return l.defaults.headers.common[f]=g,l.get(`${E}breed_ids=${t}`).then(o=>(localStorage.setItem(e,JSON.stringify(o.data)),console.log("[fetchCatByBreed] response: ",o),o.data))}function c(t,e){t.classList.toggle("is-hidden-compeletely",!e)}function b(t,e,s){B().then(function(o){t.classList.remove("is-invisible");const r=o.map(({id:n,name:i})=>`<option value="${n}">${i}</option>`);t.insertAdjacentHTML("afterbegin",r.join("")),new h({select:t})}).catch(function(o){p(o)}).finally(function(){c(t,!0),c(e,!1),c(s,!0)})}function I(t,e,s,o){c(o,!1),c(s,!0),c(e,!0);const r=t.currentTarget.value;S(r).then(function(n){if(console.log("catData: ",n),n.length===0){o.innerHTML="";return}let{url:i,breeds:a}=n[0];o.innerHTML=`
        <img src="${i}" alt="${a[0].name}" width="400" loading="lazy" />
        <div class="text-box">
          <h2>${a[0].name}</h2>
          <p>${a[0].description}</p>
          <p><b>Temperament: </b>${a[0].temperament}</p>
          <p><b>Origin: </b>${a[0].origin}</p>
        </div>`}).catch(function(n){p(n)}).finally(function(){c(s,!1),c(e,!0),c(o,!0)})}function p(t){y.error({title:"🔻 Oops!",message:t.message??"Something went wrong!",position:"topCenter"})}(()=>{const t=document.querySelector(".breed-select"),e=document.querySelector(".loader"),s=document.querySelector(".cat-description");t.addEventListener("change",o=>I(o,t,e,s)),b(t,e,s)})();
//# sourceMappingURL=commonHelpers.js.map
