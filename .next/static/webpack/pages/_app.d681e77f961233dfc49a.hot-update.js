webpackHotUpdate_N_E("pages/_app",{

/***/ "./components/ErrorMessage.js":
/*!************************************!*\
  !*** ./components/ErrorMessage.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);


var _jsxFileName = "C:\\Users\\tasta\\Documents\\coding\\Advanced React course by WesBos\\sick-fits\\frontend\\components\\ErrorMessage.js",
    _this = undefined;




var ErrorStyles = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "ErrorMessage__ErrorStyles",
  componentId: "sc-11u5fgj-0"
})(["padding:2rem;background:white;margin:2rem 0;border:1px solid rgba(0,0,0,0.05);border-left:5px solid red;p{margin:0;font-weight:100;}strong{margin-right:1rem;}"]);
_c = ErrorStyles;

var DisplayError = function DisplayError(_ref) {
  var error = _ref.error;
  if (!error || !error.message) return null;

  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map(function (error, i) {
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(ErrorStyles, {
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
          "data-testid": "graphql-error",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("strong", {
            children: "Shoot!"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 31,
            columnNumber: 11
          }, _this), error.message.replace('GraphQL error: ', '')]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 9
        }, _this)
      }, i, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 7
      }, _this);
    });
  }

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(ErrorStyles, {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
      "data-test": "graphql-error",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("strong", {
        children: "Shoot!"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }, _this), error.message.replace('GraphQL error: ', '')]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, _this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 38,
    columnNumber: 5
  }, _this);
};

_c2 = DisplayError;
DisplayError.defaultProps = {
  error: {}
};
DisplayError.propTypes = {
  error: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (DisplayError);

var _c, _c2;

$RefreshReg$(_c, "ErrorStyles");
$RefreshReg$(_c2, "DisplayError");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9FcnJvck1lc3NhZ2UuanMiXSwibmFtZXMiOlsiRXJyb3JTdHlsZXMiLCJzdHlsZWQiLCJkaXYiLCJEaXNwbGF5RXJyb3IiLCJlcnJvciIsIm1lc3NhZ2UiLCJuZXR3b3JrRXJyb3IiLCJyZXN1bHQiLCJlcnJvcnMiLCJsZW5ndGgiLCJtYXAiLCJpIiwicmVwbGFjZSIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFFQSxJQUFNQSxXQUFXLEdBQUdDLHlEQUFNLENBQUNDLEdBQVY7QUFBQTtBQUFBO0FBQUEsc0tBQWpCO0tBQU1GLFc7O0FBZU4sSUFBTUcsWUFBWSxHQUFHLFNBQWZBLFlBQWUsT0FBZTtBQUFBLE1BQVpDLEtBQVksUUFBWkEsS0FBWTtBQUNsQyxNQUFJLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxLQUFLLENBQUNDLE9BQXJCLEVBQThCLE9BQU8sSUFBUDs7QUFDOUIsTUFDRUQsS0FBSyxDQUFDRSxZQUFOLElBQ0FGLEtBQUssQ0FBQ0UsWUFBTixDQUFtQkMsTUFEbkIsSUFFQUgsS0FBSyxDQUFDRSxZQUFOLENBQW1CQyxNQUFuQixDQUEwQkMsTUFBMUIsQ0FBaUNDLE1BSG5DLEVBSUU7QUFDQSxXQUFPTCxLQUFLLENBQUNFLFlBQU4sQ0FBbUJDLE1BQW5CLENBQTBCQyxNQUExQixDQUFpQ0UsR0FBakMsQ0FBcUMsVUFBQ04sS0FBRCxFQUFRTyxDQUFSO0FBQUEsMEJBQzFDLHFFQUFDLFdBQUQ7QUFBQSwrQkFDRTtBQUFHLHlCQUFZLGVBQWY7QUFBQSxrQ0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixFQUVHUCxLQUFLLENBQUNDLE9BQU4sQ0FBY08sT0FBZCxDQUFzQixpQkFBdEIsRUFBeUMsRUFBekMsQ0FGSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixTQUFrQkQsQ0FBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUQwQztBQUFBLEtBQXJDLENBQVA7QUFRRDs7QUFDRCxzQkFDRSxxRUFBQyxXQUFEO0FBQUEsMkJBQ0U7QUFBRyxtQkFBVSxlQUFiO0FBQUEsOEJBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERixFQUVHUCxLQUFLLENBQUNDLE9BQU4sQ0FBY08sT0FBZCxDQUFzQixpQkFBdEIsRUFBeUMsRUFBekMsQ0FGSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUFRRCxDQXhCRDs7TUFBTVQsWTtBQTBCTkEsWUFBWSxDQUFDVSxZQUFiLEdBQTRCO0FBQzFCVCxPQUFLLEVBQUU7QUFEbUIsQ0FBNUI7QUFJQUQsWUFBWSxDQUFDVyxTQUFiLEdBQXlCO0FBQ3ZCVixPQUFLLEVBQUVXLGlEQUFTLENBQUNDO0FBRE0sQ0FBekI7QUFJZWIsMkVBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvX2FwcC5kNjgxZTc3Zjk2MTIzM2RmYzQ5YS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5cclxuY29uc3QgRXJyb3JTdHlsZXMgPSBzdHlsZWQuZGl2YFxyXG4gIHBhZGRpbmc6IDJyZW07XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgbWFyZ2luOiAycmVtIDA7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJlZDtcclxuICBwIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XHJcbiAgfVxyXG4gIHN0cm9uZyB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XHJcbiAgfVxyXG5gO1xyXG5cclxuY29uc3QgRGlzcGxheUVycm9yID0gKHsgZXJyb3IgfSkgPT4ge1xyXG4gIGlmICghZXJyb3IgfHwgIWVycm9yLm1lc3NhZ2UpIHJldHVybiBudWxsO1xyXG4gIGlmIChcclxuICAgIGVycm9yLm5ldHdvcmtFcnJvciAmJlxyXG4gICAgZXJyb3IubmV0d29ya0Vycm9yLnJlc3VsdCAmJlxyXG4gICAgZXJyb3IubmV0d29ya0Vycm9yLnJlc3VsdC5lcnJvcnMubGVuZ3RoXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gZXJyb3IubmV0d29ya0Vycm9yLnJlc3VsdC5lcnJvcnMubWFwKChlcnJvciwgaSkgPT4gKFxyXG4gICAgICA8RXJyb3JTdHlsZXMga2V5PXtpfT5cclxuICAgICAgICA8cCBkYXRhLXRlc3RpZD1cImdyYXBocWwtZXJyb3JcIj5cclxuICAgICAgICAgIDxzdHJvbmc+U2hvb3QhPC9zdHJvbmc+XHJcbiAgICAgICAgICB7ZXJyb3IubWVzc2FnZS5yZXBsYWNlKCdHcmFwaFFMIGVycm9yOiAnLCAnJyl9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICA8L0Vycm9yU3R5bGVzPlxyXG4gICAgKSk7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8RXJyb3JTdHlsZXM+XHJcbiAgICAgIDxwIGRhdGEtdGVzdD1cImdyYXBocWwtZXJyb3JcIj5cclxuICAgICAgICA8c3Ryb25nPlNob290ITwvc3Ryb25nPlxyXG4gICAgICAgIHtlcnJvci5tZXNzYWdlLnJlcGxhY2UoJ0dyYXBoUUwgZXJyb3I6ICcsICcnKX1cclxuICAgICAgPC9wPlxyXG4gICAgPC9FcnJvclN0eWxlcz5cclxuICApO1xyXG59O1xyXG5cclxuRGlzcGxheUVycm9yLmRlZmF1bHRQcm9wcyA9IHtcclxuICBlcnJvcjoge30sXHJcbn07XHJcblxyXG5EaXNwbGF5RXJyb3IucHJvcFR5cGVzID0ge1xyXG4gIGVycm9yOiBQcm9wVHlwZXMub2JqZWN0LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlzcGxheUVycm9yO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9