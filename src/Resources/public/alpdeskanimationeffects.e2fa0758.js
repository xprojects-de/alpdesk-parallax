(()=>{"use strict";document.addEventListener("DOMContentLoaded",(function(){if("requestAnimationFrame"in window){var e=[],t=[],n=null;p(),e.length&&(window.addEventListener("scroll",a),window.addEventListener("resize",p))}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=e.getBoundingClientRect(),s=n.top+window.scrollY,o=n.height;0!==t&&(s+=window.innerHeight/100*t);var i=s+o,a=window.scrollY,r=a+window.innerHeight;return i>a&&s<r}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"left",n=0,s=e.parentElement.offsetWidth;return"right"===t?n=s-e.offsetWidth:"center"===t&&(n=s/2-e.offsetWidth/2),n}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n=0,s=e.parentElement.offsetHeight;return"bottom"===t?n=s-e.offsetHeight:"center"===t&&(n=s/2-e.offsetHeight/2),n}function a(){for(var o=0;o<e.length;o++){s(e[o].node.parentElement,e[o].viewport)&&!r(e[o].node)&&t.push({node:e[o].node,effect:e[o].effect,startposition:e[o].startposition,speed:e[o].speed,viewport:e[o].viewport,animateCssOptions:e[o].animateCssOptions,type:e[o].type,triggered:!1})}cancelAnimationFrame(n),e.length&&(n=requestAnimationFrame(l))}function r(e){for(var n=0;n<t.length;n++)if(t[n].node===e)return!0;return!1}function l(){for(var e=0;e<t.length;e++)d(t[e])}function d(e){if(!1===e.triggered){var t=function(e){switch(e){case"slow":return 4e3;case"middle":default:return 2500;case"fast":return 1e3}}(e.speed);e.node.style.display="block",2===e.type&&(e.node.style.opacity=1),""!==e.animateCssOptions&&(e.node.style.animationDuration=t+"ms",e.node.classList.add("animate__animated"),e.node.classList.add("animate__"+e.animateCssOptions)),e.node.style.transition="top ".concat(t,"ms, left ").concat(t,"ms"),e.node.style.top=i(e.node,"top")+"px",e.node.style.left=o(e.node,"left")+"px",e.triggered=!0}}function p(){t.length=0,e.length=0,document.querySelectorAll(".has-animationeffects").forEach((function(t){t.querySelectorAll("div.animation-effect").forEach((function(t){if(null!==t){var n=t.dataset.effect,s=t.dataset.startposition,a=t.dataset.speed,r=t.dataset.viewport,l=t.dataset.hide,d=t.dataset.ignoremotionreduce,p=t.dataset.animationcss;"1"===l&&(t.style.display="none"),function(e,t){switch(t){case"s1":e.style.top=i(e,"top")+"px",e.style.left=o(e,"left")+"px";break;case"s2":e.style.top=i(e,"top")+"px",e.style.left=o(e,"center")+"px";break;case"s3":e.style.top=i(e,"top")+"px",e.style.left=o(e,"right")+"px";break;case"s4":e.style.top=i(e,"bottom")+"px",e.style.left=o(e,"left")+"px";break;case"s5":e.style.top=i(e,"bottom")+"px",e.style.left=o(e,"center")+"px";break;case"s6":e.style.top=i(e,"bottom")+"px",e.style.left=o(e,"right")+"px";break;case"s7":e.style.top=i(e,"center")+"px",e.style.left=o(e,"left")+"px";break;case"s8":e.style.top=i(e,"center")+"px",e.style.left=o(e,"center")+"px";break;case"s9":e.style.top=i(e,"center")+"px",e.style.left=o(e,"right")+"px"}}(t,s);var c=!0;if("1"!==d){var f=window.matchMedia("(prefers-reduced-motion: reduce)");f&&!0!==f.matches||(c=!1,t.style.display="none")}!0===c&&e.push({node:t,effect:n,startposition:s,speed:a,viewport:r,animateCssOptions:p,type:1})}}))})),document.querySelectorAll(".animation-effect-ce").forEach((function(t){if(null!==t){var n=t.dataset.speed,s=t.dataset.viewport,o=t.dataset.hide,i=t.dataset.animationcss;"1"===o&&(t.style.opacity=0),e.push({node:t,effect:"",startposition:"",speed:n,viewport:s,animateCssOptions:i,type:2})}})),e.length>0&&a()}}))})();