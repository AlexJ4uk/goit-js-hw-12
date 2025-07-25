import{a as g,s as h,i as n}from"./assets/vendor-CHHihKwO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y="51378434-708cb4473fdf89ff203a412e8";function b(a){return g("https://pixabay.com/api/",{params:{key:y,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:33}}).then(t=>t.data)}const f=document.querySelector(".gallery"),u=document.querySelector(".loader"),L=new h(".gallery a",{captionsData:"alt",captionDelay:250});function v(a){const t=a.map(({webformatURL:o,largeImageURL:i,tags:e,likes:r,views:s,comments:d,downloads:m})=>`<li class="gallery-item">
        <a class="gallery-link" href="${i}">
        <img
        class="gallery-image"
        src="${o}"
        alt="${e}"/>
        <div class="info-wrap">
        <p><span><b>Likes</b></span>${r}</p>
        <p><span><b>Views</b></span>${s}</p>
        <p><span><b>Comments</b></span>${d}</p>
        <p><span><b>Downloads</b></span>${m}</p>
        </div>
        </a>
    </li>`).join("");f.insertAdjacentHTML("beforeend",t),L.refresh()}function q(){f.innerHTML=""}function P(){u.classList.add("is-active")}function l(){u.classList.remove("is-active")}const p=document.querySelector(".form"),c=p.querySelector("input");p.addEventListener("submit",w);function w(a){a.preventDefault();const t=c.value.trim();if(c.value="",!t){n.warning({message:"Please enter a search query.",position:"topRight",backgroundColor:"#ef4040",messageColor:"#ffffff",maxWidth:432});return}P(),q(),b(t).then(o=>{if(l(),o.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",messageColor:"#ffffff",maxWidth:432});return}v(o.hits)}).catch(o=>{l(),n.error({message:"Failed to fetch images. Please try again later.",position:"topRight",backgroundColor:"#ef4040",messageColor:"#ffffff",maxWidth:432})})}
//# sourceMappingURL=index.js.map
