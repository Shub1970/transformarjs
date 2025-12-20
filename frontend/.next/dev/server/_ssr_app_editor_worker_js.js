/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "(ssr)/./app/editor/worker.js":
/*!******************************!*\
  !*** ./app/editor/worker.js ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _huggingface_transformers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @huggingface/transformers */ \"@huggingface/transformers\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_huggingface_transformers__WEBPACK_IMPORTED_MODULE_0__]);\n_huggingface_transformers__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n_huggingface_transformers__WEBPACK_IMPORTED_MODULE_0__.env.allowLocalModels = false;\nclass PipelineSingleton {\n    static{\n        this.task = \"translation\";\n    }\n    static{\n        this.model = \"Xenova/nllb-200-distilled-600M\";\n    }\n    static{\n        this.instance = null;\n    }\n    static async getInstance(progress_callback = null) {\n        if (this.instance === null) {\n            this.instance = (0,_huggingface_transformers__WEBPACK_IMPORTED_MODULE_0__.pipeline)(this.task, this.model, {\n                progress_callback\n            });\n        }\n        return this.instance;\n    }\n}\nself.addEventListener(\"message\", async (event)=>{\n    self.postMessage({\n        status: \"initialize worker\"\n    });\n    let translator = await PipelineSingleton.getInstance((x)=>{});\n    self.postMessage({\n        status: \"pipline constracted\"\n    });\n    let output = await translator(event.data.text, {\n        src_lang: event.data.input_language,\n        tgt_lang: event.data.output_language\n    });\n    self.postMessage({\n        status: \"translation complete\",\n        output: output\n    });\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9hcHAvZWRpdG9yL3dvcmtlci5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUEwRDtBQUUxREMsMERBQUdBLENBQUNDLGdCQUFnQixHQUFHO0FBRXZCLE1BQU1DOzthQUNHQyxPQUFPOzs7YUFDUEMsUUFBUTs7O2FBQ1JDLFdBQVc7O0lBQ2xCLGFBQWFDLFlBQVlDLG9CQUFvQixJQUFJLEVBQUU7UUFDakQsSUFBSSxJQUFJLENBQUNGLFFBQVEsS0FBSyxNQUFNO1lBQzFCLElBQUksQ0FBQ0EsUUFBUSxHQUFHTixtRUFBUUEsQ0FBQyxJQUFJLENBQUNJLElBQUksRUFBRSxJQUFJLENBQUNDLEtBQUssRUFBRTtnQkFBRUc7WUFBa0I7UUFDdEU7UUFDQSxPQUFPLElBQUksQ0FBQ0YsUUFBUTtJQUN0QjtBQUNGO0FBRUFHLEtBQUtDLGdCQUFnQixDQUFDLFdBQVcsT0FBT0M7SUFDdENGLEtBQUtHLFdBQVcsQ0FBQztRQUFFQyxRQUFRO0lBQW9CO0lBQy9DLElBQUlDLGFBQWEsTUFBTVgsa0JBQWtCSSxXQUFXLENBQUMsQ0FBQ1EsS0FBTztJQUM3RE4sS0FBS0csV0FBVyxDQUFDO1FBQUVDLFFBQVE7SUFBc0I7SUFDakQsSUFBSUcsU0FBUyxNQUFNRixXQUFXSCxNQUFNTSxJQUFJLENBQUNDLElBQUksRUFBRTtRQUM3Q0MsVUFBVVIsTUFBTU0sSUFBSSxDQUFDRyxjQUFjO1FBQ25DQyxVQUFVVixNQUFNTSxJQUFJLENBQUNLLGVBQWU7SUFDdEM7SUFFQWIsS0FBS0csV0FBVyxDQUFDO1FBQUVDLFFBQVE7UUFBd0JHLFFBQVFBO0lBQU87QUFDcEUiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zay9EZXZlbG9wZXIvbGVhcm5pbmcvYWlodG1sY29udmVydGVyL2Zyb250ZW5kL2FwcC9lZGl0b3Ivd29ya2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBpcGVsaW5lLCBlbnYgfSBmcm9tIFwiQGh1Z2dpbmdmYWNlL3RyYW5zZm9ybWVyc1wiO1xuXG5lbnYuYWxsb3dMb2NhbE1vZGVscyA9IGZhbHNlO1xuXG5jbGFzcyBQaXBlbGluZVNpbmdsZXRvbiB7XG4gIHN0YXRpYyB0YXNrID0gXCJ0cmFuc2xhdGlvblwiO1xuICBzdGF0aWMgbW9kZWwgPSBcIlhlbm92YS9ubGxiLTIwMC1kaXN0aWxsZWQtNjAwTVwiO1xuICBzdGF0aWMgaW5zdGFuY2UgPSBudWxsO1xuICBzdGF0aWMgYXN5bmMgZ2V0SW5zdGFuY2UocHJvZ3Jlc3NfY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBwaXBlbGluZSh0aGlzLnRhc2ssIHRoaXMubW9kZWwsIHsgcHJvZ3Jlc3NfY2FsbGJhY2sgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG59XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gIHNlbGYucG9zdE1lc3NhZ2UoeyBzdGF0dXM6IFwiaW5pdGlhbGl6ZSB3b3JrZXJcIiB9KTtcbiAgbGV0IHRyYW5zbGF0b3IgPSBhd2FpdCBQaXBlbGluZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgoeCkgPT4ge30pO1xuICBzZWxmLnBvc3RNZXNzYWdlKHsgc3RhdHVzOiBcInBpcGxpbmUgY29uc3RyYWN0ZWRcIiB9KTtcbiAgbGV0IG91dHB1dCA9IGF3YWl0IHRyYW5zbGF0b3IoZXZlbnQuZGF0YS50ZXh0LCB7XG4gICAgc3JjX2xhbmc6IGV2ZW50LmRhdGEuaW5wdXRfbGFuZ3VhZ2UsXG4gICAgdGd0X2xhbmc6IGV2ZW50LmRhdGEub3V0cHV0X2xhbmd1YWdlLFxuICB9KTtcblxuICBzZWxmLnBvc3RNZXNzYWdlKHsgc3RhdHVzOiBcInRyYW5zbGF0aW9uIGNvbXBsZXRlXCIsIG91dHB1dDogb3V0cHV0IH0pO1xufSk7XG4iXSwibmFtZXMiOlsicGlwZWxpbmUiLCJlbnYiLCJhbGxvd0xvY2FsTW9kZWxzIiwiUGlwZWxpbmVTaW5nbGV0b24iLCJ0YXNrIiwibW9kZWwiLCJpbnN0YW5jZSIsImdldEluc3RhbmNlIiwicHJvZ3Jlc3NfY2FsbGJhY2siLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicG9zdE1lc3NhZ2UiLCJzdGF0dXMiLCJ0cmFuc2xhdG9yIiwieCIsIm91dHB1dCIsImRhdGEiLCJ0ZXh0Iiwic3JjX2xhbmciLCJpbnB1dF9sYW5ndWFnZSIsInRndF9sYW5nIiwib3V0cHV0X2xhbmd1YWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./app/editor/worker.js\n");

/***/ }),

/***/ "@huggingface/transformers":
/*!********************************************!*\
  !*** external "@huggingface/transformers" ***!
  \********************************************/
/***/ ((module) => {

module.exports = import("@huggingface/transformers");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("(ssr)/./app/editor/worker.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;