(()=>{"use strict";document.addEventListener("DOMContentLoaded",(function(){if("requestAnimationFrame"in window){var n,e=[],t=[],o=.25;l(),e.length&&(window.addEventListener("scroll",a),window.addEventListener("resize",l))}function a(){e.forEach((function(n){var e=n.node.parentNode;e.classList.contains("parallax")&&function(n){var e=n.getBoundingClientRect().top+window.scrollY,t=e+n.offsetHeight,o=window.scrollY,a=o+window.innerHeight;return t>o&&e<a}(e)&&!function(n){return t.some((function(e){return e.node===n}))}(n.node)&&t.push(n)})),cancelAnimationFrame(n),t.length&&(n=requestAnimationFrame(i))}function i(){t.forEach(r)}function r(n){if(!(n.parent.getBoundingClientRect().top>window.innerHeight)){var e=parseInt(n.node.dataset.parallaxValign),t=n.node.dataset.parallaxHalign,a=n.node.dataset.vparallax,i=window.scrollY-function(n){var e=n.getBoundingClientRect().top-window.innerHeight;return e<0?0:e}(n.parent),r=e+o*i;"bottom"===n.vAlign&&"cover"!==n.sizeModus&&(r=e-o*i),n.node.style.backgroundPositionY=r+"px";var l=t;"left"===a&&"center"!==n.hAlign?l=-r+"px":"right"===a&&"center"!==n.hAlign&&(l=window.innerWidth-r+"px"),n.node.style.backgroundPositionX=l}}function l(){e=[],t=[],document.querySelectorAll(".has-responsive-background-image").forEach((function(n){var t=n.querySelector("div.parallax-bgimage");if(t){var i=t.dataset.isparallax,r=t.dataset.sizemodus,l=t.dataset.halign,s=t.dataset.valign,d=t.dataset.src,c=t.dataset.srcheight;if(t.style.backgroundImage="url(".concat(d,")"),t.style.backgroundSize=r,"1"===i){var g=n.offsetHeight,u="cover"===r?g+g*o+o*window.innerHeight:0;"cover"===r&&(t.style.height=u+"px",t.style.top=-(u-g)+"px",t.style.backgroundPositionY="0%"),t.dataset.parallaxValign=function(n,e,t,o){var a=0;return"cover"===o||("center"===t?a=Math.floor(n/2-e/2):"bottom"===t&&(a=Math.floor(n-e))),a}(t.offsetHeight,c,s,r).toString(),t.dataset.parallaxHalign=l,e.push({node:t,vAlign:s,hAlign:l,sizeModus:r,coverH:u,elementH:g}),a()}else t.style.backgroundPositionX=l,t.style.backgroundPositionY=s}}))}}))})();