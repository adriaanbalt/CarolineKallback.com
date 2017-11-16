// document.addEventListener("DOMContentLoaded", (event) => { 
// 	var iframes = document.getElementsByTagName('iframe')
// 	var loaders = document.getElementsByClassName('loader')
// 	var iframesLength = iframes.length
// 	function setup() {
// 		var index = 0
// 		for (i = 0; i < iframes.length; i++) { 
// 			iframes[i].onload = (e) => { 
// 				console.log('myframe is loaded', index);
// 				iframes[i].setAttribute('height', "600px");
// 				loaders[i].classList.add('hidden');
// 			};
// 		}
// 	}
// 	function go() {
// 		for (i = 0; i < iframes.length; i++) { 
// 			if ( document.documentElement.scrollTop > iframes[i].offsetTop - 150 ) {
// 				// iframesLength--
// 				// placeHolders.splice(i,1)
// 				if ( iframes[i].dataset.src ){
// 					iframes[i].setAttribute('src', iframes[i].dataset.src );
// 					iframes[i].removeAttribute('data-src');
// 					console.log( 'change!', i, ( document.documentElement.scrollTop > iframes[i].offsetTop ) );
// 				}
// 		    	// remove from iframes array
// 			}
// 		}
// 	}
// 	setup()
// 	window.addEventListener("scroll", go );
// });

var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.LazyLoad=t()}(this,function(){"use strict";var e={elements_selector:"img",container:document,threshold:300,data_src:"src",data_srcset:"srcset",class_loading:"loading",class_loaded:"loaded",class_error:"error",callback_load:null,callback_error:null,callback_set:null},t=function(e,t){return e.getAttribute("data-"+t)},n=function(e,t,n){return e.setAttribute("data-"+t,n)},r=function(e){return e.filter(function(e){return!t(e,"was-processed")})},s=function(e,t){var n=new e(t),r=new CustomEvent("LazyLoad::Initialized",{detail:{instance:n}});window.dispatchEvent(r)},o=function(e,n){var r=n.data_srcset,s=e.parentElement;if("PICTURE"===s.tagName)for(var o,a=0;o=s.children[a];a+=1)if("SOURCE"===o.tagName){var i=t(o,r);i&&o.setAttribute("srcset",i)}},a=function(e,n){var r=n.data_src,s=n.data_srcset,a=e.tagName,i=t(e,r);if("IMG"===a){o(e,n);var c=t(e,s);return c&&e.setAttribute("srcset",c),void(i&&e.setAttribute("src",i))}"IFRAME"!==a?i&&(e.style.backgroundImage='url("'+i+'")'):i&&e.setAttribute("src",i)},i="classList"in document.createElement("p"),c=function(e,t){i?e.classList.add(t):e.className+=(e.className?" ":"")+t},l=function(e,t){i?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},u=function(e,t){e&&e(t)},f=function(e,t,n){e.removeEventListener("load",t),e.removeEventListener("error",n)},d=function(e,t){var n=function n(s){_(s,!0,t),f(e,n,r)},r=function r(s){_(s,!1,t),f(e,n,r)};e.addEventListener("load",n),e.addEventListener("error",r)},_=function(e,t,n){var r=e.target;l(r,n.class_loading),c(r,t?n.class_loaded:n.class_error),u(t?n.callback_load:n.callback_error,r)},v=function(e,t){["IMG","IFRAME"].indexOf(e.tagName)>-1&&(d(e,t),c(e,t.class_loading)),a(e,t),n(e,"was-processed",!0),u(t.callback_set,e)},m=function(t,n){this._settings=_extends({},e,t),this._setObserver(),this.update(n)};m.prototype={_setObserver:function(){var e=this;if("IntersectionObserver"in window){var t=this._settings;this._observer=new IntersectionObserver(function(n){n.forEach(function(n){if(n.intersectionRatio>0){var r=n.target;v(r,t),e._observer.unobserve(r)}}),e._elements=r(e._elements)},{root:t.container===document?null:t.container,rootMargin:t.threshold+"px"})}},update:function(e){var t=this,n=this._settings,s=e||n.container.querySelectorAll(n.elements_selector);this._elements=r(Array.prototype.slice.call(s)),this._observer?this._elements.forEach(function(e){t._observer.observe(e)}):(this._elements.forEach(function(e){v(e,n)}),this._elements=r(this._elements))},destroy:function(){var e=this;this._observer&&(r(this._elements).forEach(function(t){e._observer.unobserve(t)}),this._observer=null),this._elements=null,this._settings=null}};var b=window.lazyLoadOptions;return b&&function(e,t){if(t.length)for(var n,r=0;n=t[r];r+=1)s(e,n);else s(e,t)}(m,b),m});
var myLazyLoad = new LazyLoad({
    elements_selector: "iframe"
});
console.log('myLazyLoad', myLazyLoad)