import{a as L,S as w,i as c}from"./assets/vendor-CNqCr-V-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();async function S(t,o=1){const i="53391690-3e647f595737bbf778d07baf8",n="https://pixabay.com/api/",e={key:i,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:o};try{return(await L.get(n,{params:e})).data}catch(r){throw r}}const p=document.querySelector(".gallery"),d=document.querySelector(".loader"),v=new w(".gallery a",{captionsData:"alt",captionDelay:250});function E(t){const o=t.map(({webformatURL:i,largeImageURL:n,tags:e,likes:r,views:l,comments:h,downloads:b})=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${n}">
              <img 
                class="gallery-image" 
                src="${i}" 
                alt="${e}" 
                loading="lazy"
              />
            </a>
            <div class="info">
              <p><b>Likes:</b> ${r}</p>
              <p><b>Views:</b> ${l}</p>
              <p><b>Comments:</b> ${h}</p>
              <p><b>Downloads:</b> ${b}</p>
            </div>
          </li>
        `).join("");p.insertAdjacentHTML("beforeend",o),v.refresh()}function q(){p.innerHTML=""}function $(){d.classList.add("is-visible")}function P(){d.classList.remove("is-visible")}const u=document.querySelector(".form"),m=u?u.querySelector('input[name="search-text"]'):null;let g="",s=1,a=0,f=!1;(!u||!m)&&console.error();u.addEventListener("submit",x);window.addEventListener("scroll",A);async function x(t){t.preventDefault();const o=m.value.trim();if(!o){c.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}g=o,s=1,q(),a=0,await y()}async function y(){if(!f){f=!0,$();try{const t=await S(g,s);if(!t||!Array.isArray(t.hits)){c.error({title:"Error",message:"Unexpected response from the server.",position:"topRight"});return}if(t.hits.length===0&&s===1){c.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}a=t.totalHits,E(t.hits),c.success({title:"Success",message:`Found ${a} images. Showing ${s*40<=a?s*40:a}.`,position:"topRight",timeout:2e3})}catch(t){console.error(t),c.error({title:"Error",message:"Something went wrong while fetching images.",position:"topRight"})}finally{P(),f=!1}}}function A(){const{scrollTop:t,scrollHeight:o,clientHeight:i}=document.documentElement;if(t+i>=o-5){if(s*40>=a)return;s+=1,y()}}
//# sourceMappingURL=index.js.map
