(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/about/about.component.css":
/*!*******************************************!*\
  !*** ./src/app/about/about.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Fib3V0L2Fib3V0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/about/about.component.html":
/*!********************************************!*\
  !*** ./src/app/about/about.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-expansion-panel class=\"app-card\"\n                     *ngIf=\"config.values?.brands!=null\"\n                     [ngStyle]=\"{'background-color': config.values.brands[config.activeBrand].colors.bkabout}\">\n  <mat-expansion-panel-header (click)=\"switchVisible()\" style=\"cursor: pointer;\">\n    <div style=\"text-align: center;width:100%;\">\n      {{config.values.brands[config.activeBrand].appname+\" - \"+config.values.brands[config.activeBrand].version}}<br>\n    </div>\n  </mat-expansion-panel-header>\n\n    <div style=\"width: 100%;text-align: center;font-size: small;margin-top:5px;\">\n      <div *ngIf=\"withlogo\">\n        <img\n          [src]=\"config.values.brands[config.activeBrand].logo\"\n          [ngStyle]=\"{'width':logosize,'margin':'15px'}\">\n        <br>\n      </div>\n      <table style=\"display: inline-block;text-align: left;\">\n        <tr><td>Réalisation</td>\n          <td>:\n            <a style=\"color:lightgray;font-variant: normal;font-weight: normal;\" [href]=\"config.values.editor?.link_author\" target=\"_blank\">\n              {{config.values.editor?.author}}\n            </a>\n          </td>\n        </tr>\n        <tr>\n          <td>Edition</td>\n          <td>:\n            <a style=\"color:lightgray;font-variant: normal;font-style: normal;font-weight: normal;\" [href]=\"config.values.brands[config.activeBrand].editor?.website\" target=\"_blank\">\n              <strong>{{config.values.brands[config.activeBrand].editor?.name}}</strong>\n            </a>\n          </td>\n        </tr>\n        <tr><td><br></td></tr>\n\n      </table>\n      <br><br>\n      <div style=\"width: 100%;text-align: center;font-size: medium;\">\n        <a href=\"mailto:{{config.values.brands[config.activeBrand].support?.email}}\" style=\"display:inline-block;width: 65px;\">\n          <mat-icon class=\"big-icon\">mail</mat-icon>\n        </a>\n\n        <div (click)=\"openFrame(config.values.brands[config.activeBrand].support?.forum)\" style=\"display:inline-block;width: 65px;pointer:cursor;\">\n          <mat-icon class=\"big-icon\">persons</mat-icon>\n        </div>\n\n        <div style=\"display:inline-block;width: 65px;margin-right: 10px;pointer:cursor;\"\n             (click)=\"openFrame(config.values.brands[config.activeBrand].support?.faq)\">\n          <mat-icon class=\"big-icon\">help</mat-icon>\n        </div>\n\n        <div (click)=\"openFrame(config.values.brands[config.activeBrand].support?.facebook,true)\"\n             style=\"display:inline-block;width: 60px;pointer:cursor;\">\n          <img style=\"width:40px;opacity: 0.5;\" src=\"./assets/icons/facebook.png\">\n        </div>\n\n        <div (click)=\"openFrame(config.values.brands[config.activeBrand].support?.website+'&tags='+user.tags)\"\n             style=\"display:inline-block;width: 60px;\">\n          <mat-icon class=\"big-icon\">home</mat-icon>\n        </div>\n      </div>\n    </div>\n</mat-expansion-panel>\n"

/***/ }),

/***/ "./src/app/about/about.component.ts":
/*!******************************************!*\
  !*** ./src/app/about/about.component.ts ***!
  \******************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");



var AboutComponent = /** @class */ (function () {
    function AboutComponent(config) {
        this.config = config;
        this.visible = false;
        this.withlogo = true;
        this.logosize = "150px";
        this.onopen = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.visible = (localStorage.getItem("about") == "true");
    };
    AboutComponent.prototype.switchVisible = function () {
        this.visible = !this.visible;
        localStorage.setItem("about", this.visible.toString());
    };
    AboutComponent.prototype.openFrame = function (url, forceOpen) {
        if (forceOpen === void 0) { forceOpen = false; }
        this.onopen.emit({ url: url, forceOpen: forceOpen });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("user"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], AboutComponent.prototype, "user", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("withlogo"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], AboutComponent.prototype, "withlogo", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("logosize"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], AboutComponent.prototype, "logosize", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])('open'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], AboutComponent.prototype, "onopen", void 0);
    AboutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.css */ "./src/app/about/about.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"]])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/api.service.ts":
/*!********************************!*\
  !*** ./src/app/api.service.ts ***!
  \********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools */ "./src/app/tools.ts");




var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.user = null;
    }
    ApiService.prototype._get = function (url) {
        return this.http.get(Object(_tools__WEBPACK_IMPORTED_MODULE_3__["api"])(url));
    };
    ApiService.prototype.raz = function (userid) {
        localStorage.removeItem('user');
        return this.http.get(Object(_tools__WEBPACK_IMPORTED_MODULE_3__["api"])('raz/' + userid));
    };
    ApiService.prototype.getusers = function () {
        return this.http.get(Object(_tools__WEBPACK_IMPORTED_MODULE_3__["api"])("getusers/" + _tools__WEBPACK_IMPORTED_MODULE_3__["ADMIN_PASSWORD"]));
    };
    ApiService.prototype.getevents = function () {
        return this._get("events");
    };
    ApiService.prototype.askforemail = function (email, userid) {
        return this.http.get(Object(_tools__WEBPACK_IMPORTED_MODULE_3__["api"])("askforemail/" + email + "/" + userid));
    };
    ApiService.prototype.searchImage = function (query, limit, token) {
        var url = "https://server.f80.fr:5800/api/" + query + "?limit=" + limit + "&quality=true";
        return this.http.get(url, { 'headers': { "access_token": token } });
    };
    ApiService.prototype.checkCode = function (userid, code, field) {
        return this.http.get(Object(_tools__WEBPACK_IMPORTED_MODULE_3__["api"])("checkcode/" + userid + "/" + code + "/" + field));
    };
    ApiService.prototype.convert = function (url) {
        return this.http.post(Object(_tools__WEBPACK_IMPORTED_MODULE_3__["api"])("convert"), url);
    };
    ApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _store_store_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/store.component */ "./src/app/store/store.component.ts");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about/about.component */ "./src/app/about/about.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");






var routes = [
    { path: 'store', component: _store_store_component__WEBPACK_IMPORTED_MODULE_3__["StoreComponent"] },
    { path: 'about', component: _about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"] },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"] },
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n  <img width=\"300\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n</div>\n<h2>Here are some links to help you start: </h2>\n<ul>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\">Tour of Heroes</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/cli\">CLI Documentation</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.angular.io/\">Angular blog</a></h2>\n  </li>\n</ul>\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'ticketShare';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/fesm5/service-worker.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _store_store_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store/store.component */ "./src/app/store/store.component.ts");
/* harmony import */ var _entrance_entrance_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./entrance/entrance.component */ "./src/app/entrance/entrance.component.ts");
/* harmony import */ var _order_by_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./order-by.pipe */ "./src/app/order-by.pipe.ts");
/* harmony import */ var _trans_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./trans.pipe */ "./src/app/trans.pipe.ts");
/* harmony import */ var _safe_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./safe.pipe */ "./src/app/safe.pipe.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-image-cropper */ "./node_modules/ngx-image-cropper/fesm5/ngx-image-cropper.js");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-socket-io */ "./node_modules/ngx-socket-io/fesm5/ngx-socket-io.js");
/* harmony import */ var ngx_flip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-flip */ "./node_modules/ngx-flip/fesm5/ngx-flip.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm5/ngx-clipboard.js");
/* harmony import */ var ngx_social_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-social-button */ "./node_modules/ngx-social-button/fesm5/ngx-social-button.js");
/* harmony import */ var ngx_webcam__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-webcam */ "./node_modules/ngx-webcam/fesm5/ngx-webcam.js");
/* harmony import */ var angular2_qrcode__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! angular2-qrcode */ "./node_modules/angular2-qrcode/lib/angular2-qrcode.js");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./about/about.component */ "./src/app/about/about.component.ts");
/* harmony import */ var _cgu_cgu_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./cgu/cgu.component */ "./src/app/cgu/cgu.component.ts");
/* harmony import */ var _tuto_tuto_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./tuto/tuto.component */ "./src/app/tuto/tuto.component.ts");
/* harmony import */ var _timer_timer_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./timer/timer.component */ "./src/app/timer/timer.component.ts");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./api.service */ "./src/app/api.service.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/fesm5/ngx-device-detector.js");






























var config = { url: _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].socket_server, options: {} };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _store_store_component__WEBPACK_IMPORTED_MODULE_8__["StoreComponent"],
                _entrance_entrance_component__WEBPACK_IMPORTED_MODULE_9__["EntranceComponent"],
                _order_by_pipe__WEBPACK_IMPORTED_MODULE_10__["OrderByPipe"],
                _trans_pipe__WEBPACK_IMPORTED_MODULE_11__["TransPipe"],
                _safe_pipe__WEBPACK_IMPORTED_MODULE_12__["SafePipe"],
                _about_about_component__WEBPACK_IMPORTED_MODULE_22__["AboutComponent"],
                _cgu_cgu_component__WEBPACK_IMPORTED_MODULE_23__["CguComponent"],
                _tuto_tuto_component__WEBPACK_IMPORTED_MODULE_24__["TutoComponent"],
                _timer_timer_component__WEBPACK_IMPORTED_MODULE_25__["TimerComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_27__["HomeComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_service_worker__WEBPACK_IMPORTED_MODULE_6__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].production }),
                ngx_image_cropper__WEBPACK_IMPORTED_MODULE_15__["ImageCropperModule"],
                ngx_socket_io__WEBPACK_IMPORTED_MODULE_16__["SocketIoModule"].forRoot(config),
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatDialogModule"],
                ngx_flip__WEBPACK_IMPORTED_MODULE_17__["FlipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatProgressSpinnerModule"],
                angular2_qrcode__WEBPACK_IMPORTED_MODULE_21__["QRCodeModule"],
                ngx_clipboard__WEBPACK_IMPORTED_MODULE_18__["ClipboardModule"],
                ngx_social_button__WEBPACK_IMPORTED_MODULE_19__["NgxSocialButtonModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatSelectModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_14__["HttpClientModule"],
                ngx_webcam__WEBPACK_IMPORTED_MODULE_20__["WebcamModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatStepperModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatListModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_28__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
                ngx_device_detector__WEBPACK_IMPORTED_MODULE_29__["DeviceDetectorModule"].forRoot()
            ],
            providers: [_api_service__WEBPACK_IMPORTED_MODULE_26__["ApiService"], _trans_pipe__WEBPACK_IMPORTED_MODULE_11__["TransPipe"], _safe_pipe__WEBPACK_IMPORTED_MODULE_12__["SafePipe"], ngx_clipboard__WEBPACK_IMPORTED_MODULE_18__["ClipboardService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/cgu/cgu.component.css":
/*!***************************************!*\
  !*** ./src/app/cgu/cgu.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n/*# sourceMappingURL=cgu.component.css.map */\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2d1L2NndS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNENBQTRDIiwiZmlsZSI6InNyYy9hcHAvY2d1L2NndS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/cgu/cgu.component.html":
/*!****************************************!*\
  !*** ./src/app/cgu/cgu.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>cgu works!</p>\n"

/***/ }),

/***/ "./src/app/cgu/cgu.component.ts":
/*!**************************************!*\
  !*** ./src/app/cgu/cgu.component.ts ***!
  \**************************************/
/*! exports provided: CguComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CguComponent", function() { return CguComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CguComponent = /** @class */ (function () {
    function CguComponent() {
    }
    CguComponent.prototype.ngOnInit = function () {
    };
    CguComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cgu',
            template: __webpack_require__(/*! ./cgu.component.html */ "./src/app/cgu/cgu.component.html"),
            styles: [__webpack_require__(/*! ./cgu.component.css */ "./src/app/cgu/cgu.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CguComponent);
    return CguComponent;
}());



/***/ }),

/***/ "./src/app/config.service.ts":
/*!***********************************!*\
  !*** ./src/app/config.service.ts ***!
  \***********************************/
/*! exports provided: ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/@angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tools */ "./src/app/tools.ts");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");







var ConfigService = /** @class */ (function () {
    function ConfigService(location, http, platform) {
        this.location = location;
        this.http = http;
        this.platform = platform;
        this.visibleTuto = false;
        this.values = {};
        this.activeBrand = 1;
        this.config = null;
        this.waiting = false;
        this.webcamsAvailable = 0;
        this.width_screen = 300;
        this.params = null;
        this.flips = [];
        if (localStorage.getItem("activeBrand") != null)
            this.activeBrand = Number(localStorage.getItem("activeBrand"));
    }
    ConfigService.prototype.logo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var conf;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        conf = _a.sent();
                        return [2 /*return*/, Promise.resolve(conf.logo)];
                }
            });
        });
    };
    /**
     * Retourne les tags
     * @param level
     */
    ConfigService.prototype.getTags = function (level) {
        var _this = this;
        if (level === void 0) { level = 0; }
        var tags = this.values.tags;
        if (this.values.brands[this.activeBrand] != null && this.values.brands[this.activeBrand].tags != null)
            tags = this.values.brands[this.activeBrand].tags;
        var rc = [];
        tags.split(",").forEach(function (tag) {
            if (_this.config.tags_details[tag].level <= level)
                rc.push(tag);
        });
        return rc;
    };
    /**
     * Initialisation des principaux paramètres
     * @param func
     */
    ConfigService.prototype.init = function (func) {
        var _this = this;
        if (func === void 0) { func = null; }
        this.width_screen = window.innerWidth;
        Object(_tools__WEBPACK_IMPORTED_MODULE_5__["initAvailableCameras"])(function (res) {
            _this.webcamsAvailable = res;
        });
        this.getConfig().then(function (r) {
            _this.values = r;
            if (func != null)
                func(_this.values);
        });
    };
    ConfigService.prototype.getConfig = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.config) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.http.get(this.location.prepareExternalUrl(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].config_file)).toPromise()];
                    case 1:
                        _a.config = (_b.sent());
                        _b.label = 2;
                    case 2: return [2 /*return*/, Promise.resolve(this.config)];
                }
            });
        });
    };
    ConfigService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"], _node_modules_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"]])
    ], ConfigService);
    return ConfigService;
}());



/***/ }),

/***/ "./src/app/entrance/entrance.component.html":
/*!**************************************************!*\
  !*** ./src/app/entrance/entrance.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  entrance works!\n</p>\n"

/***/ }),

/***/ "./src/app/entrance/entrance.component.sass":
/*!**************************************************!*\
  !*** ./src/app/entrance/entrance.component.sass ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2VudHJhbmNlL2VudHJhbmNlLmNvbXBvbmVudC5zYXNzIn0= */"

/***/ }),

/***/ "./src/app/entrance/entrance.component.ts":
/*!************************************************!*\
  !*** ./src/app/entrance/entrance.component.ts ***!
  \************************************************/
/*! exports provided: EntranceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntranceComponent", function() { return EntranceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var EntranceComponent = /** @class */ (function () {
    function EntranceComponent() {
    }
    EntranceComponent.prototype.ngOnInit = function () {
    };
    EntranceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-entrance',
            template: __webpack_require__(/*! ./entrance.component.html */ "./src/app/entrance/entrance.component.html"),
            styles: [__webpack_require__(/*! ./entrance.component.sass */ "./src/app/entrance/entrance.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], EntranceComponent);
    return EntranceComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  home works!\n</p>\n"

/***/ }),

/***/ "./src/app/home/home.component.sass":
/*!******************************************!*\
  !*** ./src/app/home/home.component.sass ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuc2FzcyJ9 */"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-socket-io */ "./node_modules/ngx-socket-io/fesm5/ngx-socket-io.js");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tools */ "./src/app/tools.ts");










var HomeComponent = /** @class */ (function () {
    function HomeComponent(socket, meta, api, toast, router, config, _location, route) {
        this.socket = socket;
        this.meta = meta;
        this.api = api;
        this.toast = toast;
        this.router = router;
        this.config = config;
        this._location = _location;
        this.route = route;
        this.user = {};
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.analyse_params(function (p) {
            if (p.cmd == "store")
                _this.router.navigate(["store"]);
        });
        this.socket.on("refresh", function (data) {
            if (data.user == _this.user._id) {
            }
        });
    };
    HomeComponent.prototype.analyse_params = function (func) {
        var params = this.route.snapshot.queryParamMap;
        localStorage.setItem("firsturl", this._location.path());
        Object(_tools__WEBPACK_IMPORTED_MODULE_9__["$$"])("Récupération des paramètres", params);
        if (this.config.params == null) {
            this.config.params = {
                cmd: params.get("cmd") || "",
                user: params.get("user") || "",
                event: params.get("event") || "",
            };
            Object(_tools__WEBPACK_IMPORTED_MODULE_9__["$$"])("Netoyage de l'url de lancement:" + this._location.path());
            this._location.replaceState(this._location.path().split('?')[0], "");
            this._location.replaceState(this._location.path().split('/home')[0], "");
        }
        func(this.config.params);
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.sass */ "./src/app/home/home.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_socket_io__WEBPACK_IMPORTED_MODULE_8__["Socket"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Meta"],
            _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/order-by.pipe.ts":
/*!**********************************!*\
  !*** ./src/app/order-by.pipe.ts ***!
  \**********************************/
/*! exports provided: OrderByPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderByPipe", function() { return OrderByPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (array, field, order) {
        if (order === void 0) { order = "asc"; }
        if (!Array.isArray(array)) {
            return;
        }
        array.sort(function (a, b) {
            if (a[field] < b[field]) {
                if (order == "asc")
                    return -1;
                else
                    return 1;
            }
            else if (a[field] > b[field]) {
                if (order == "asc")
                    return 1;
                else
                    return -1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    OrderByPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'orderBy'
        })
    ], OrderByPipe);
    return OrderByPipe;
}());



/***/ }),

/***/ "./src/app/safe.pipe.ts":
/*!******************************!*\
  !*** ./src/app/safe.pipe.ts ***!
  \******************************/
/*! exports provided: SafePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafePipe", function() { return SafePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (value, type) {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error("Invalid safe type specified: " + type);
        }
    };
    SafePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'safe'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], SafePipe);
    return SafePipe;
}());



/***/ }),

/***/ "./src/app/store/store.component.html":
/*!********************************************!*\
  !*** ./src/app/store/store.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let event of events\">\n  {{event.name}}\n</div>\n"

/***/ }),

/***/ "./src/app/store/store.component.sass":
/*!********************************************!*\
  !*** ./src/app/store/store.component.sass ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N0b3JlL3N0b3JlLmNvbXBvbmVudC5zYXNzIn0= */"

/***/ }),

/***/ "./src/app/store/store.component.ts":
/*!******************************************!*\
  !*** ./src/app/store/store.component.ts ***!
  \******************************************/
/*! exports provided: StoreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreComponent", function() { return StoreComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");



var StoreComponent = /** @class */ (function () {
    function StoreComponent(api) {
        this.api = api;
        this.events = [];
    }
    StoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getevents().subscribe(function (r) {
            _this.events = r;
        });
    };
    StoreComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-store',
            template: __webpack_require__(/*! ./store.component.html */ "./src/app/store/store.component.html"),
            styles: [__webpack_require__(/*! ./store.component.sass */ "./src/app/store/store.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], StoreComponent);
    return StoreComponent;
}());



/***/ }),

/***/ "./src/app/timer/timer.component.css":
/*!*******************************************!*\
  !*** ./src/app/timer/timer.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n/*# sourceMappingURL=timer.component.css.map */\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGltZXIvdGltZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDhDQUE4QyIsImZpbGUiOiJzcmMvYXBwL3RpbWVyL3RpbWVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/timer/timer.component.html":
/*!********************************************!*\
  !*** ./src/app/timer/timer.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span>{{dateToShow}}</span>\n"

/***/ }),

/***/ "./src/app/timer/timer.component.ts":
/*!******************************************!*\
  !*** ./src/app/timer/timer.component.ts ***!
  \******************************************/
/*! exports provided: TimerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerComponent", function() { return TimerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TimerComponent = /** @class */ (function () {
    function TimerComponent() {
        this.dtEnd = new Date().getTime() / 1000;
        this.short = false;
        this.showAfter = false;
        this.dateToShow = "";
        this.delayInHour = 0;
    }
    TimerComponent.prototype.refresh = function () {
        var delay = Math.abs(this.dtEnd * 1000 - new Date().getTime()) / 1000;
        this.delayInHour = Math.trunc(delay / 3600);
        var delayInDay = Math.trunc(delay / (24 * 3600));
        var delayInMinutes = Math.trunc(delay / 60);
        var sec = "" + Math.trunc((delay - delayInMinutes * 60) % 60);
        if (sec.length == 1)
            sec = "0" + sec;
        this.dateToShow = delayInMinutes + ":" + sec;
        if (this.delayInHour > 1)
            this.dateToShow = this.delayInHour + " heures";
        if (this.delayInHour >= 48)
            this.dateToShow = delayInDay + " jours";
        if (this.short) {
            this.dateToShow = this.dateToShow.replace("jours", "jrs").replace("heures", "hrs");
        }
        if (delay < 0 && !this.showAfter)
            this.dateToShow = "";
    };
    TimerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refresh();
        if (this.delayInHour < 10) //Si le delai est long on ne met pas en place un timer
            setInterval(function () { _this.refresh(); }, 1000);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("end"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], TimerComponent.prototype, "dtEnd", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("short"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TimerComponent.prototype, "short", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("showAfter"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TimerComponent.prototype, "showAfter", void 0);
    TimerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-timer',
            template: __webpack_require__(/*! ./timer.component.html */ "./src/app/timer/timer.component.html"),
            styles: [__webpack_require__(/*! ./timer.component.css */ "./src/app/timer/timer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TimerComponent);
    return TimerComponent;
}());



/***/ }),

/***/ "./src/app/tools.ts":
/*!**************************!*\
  !*** ./src/app/tools.ts ***!
  \**************************/
/*! exports provided: ADMIN_PASSWORD, showError, brand_text, api, direct_api, hashCode, tirage, selectFile, unique_id, sendToPrint, $$, createMap, getMarkerLayer, showMessage, isLocal, loginWithEmail, traitement_coupon, buildTeaser, createMarker, resizeBase64Img, getAuthServiceConfigs, getSize, cropBase64Img, evalTitle, getImageLightness, cropToSquare, compute, exportToHTML, checkLogin, openGraphForShop, fixTagPage, initAvailableCameras, getDelay, normeString, clear, extractEXIF, autoRotate, rotate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN_PASSWORD", function() { return ADMIN_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showError", function() { return showError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brand_text", function() { return brand_text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return api; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "direct_api", function() { return direct_api; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hashCode", function() { return hashCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tirage", function() { return tirage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectFile", function() { return selectFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unique_id", function() { return unique_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendToPrint", function() { return sendToPrint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$$", function() { return $$; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMap", function() { return createMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMarkerLayer", function() { return getMarkerLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showMessage", function() { return showMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLocal", function() { return isLocal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginWithEmail", function() { return loginWithEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "traitement_coupon", function() { return traitement_coupon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildTeaser", function() { return buildTeaser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return createMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resizeBase64Img", function() { return resizeBase64Img; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthServiceConfigs", function() { return getAuthServiceConfigs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSize", function() { return getSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cropBase64Img", function() { return cropBase64Img; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evalTitle", function() { return evalTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageLightness", function() { return getImageLightness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cropToSquare", function() { return cropToSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compute", function() { return compute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportToHTML", function() { return exportToHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkLogin", function() { return checkLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openGraphForShop", function() { return openGraphForShop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixTagPage", function() { return fixTagPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAvailableCameras", function() { return initAvailableCameras; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDelay", function() { return getDelay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normeString", function() { return normeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return clear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractEXIF", function() { return extractEXIF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoRotate", function() { return autoRotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var ngx_social_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-social-button */ "./node_modules/ngx-social-button/fesm5/ngx-social-button.js");
/* harmony import */ var ngx_webcam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-webcam */ "./node_modules/ngx-webcam/fesm5/ngx-webcam.js");



var ADMIN_PASSWORD = "hh4271";
function showError(vm, err) {
    $$("!Error ", err);
    showMessage(vm, "L'application est en cours de maintenance, Merci de réessayer l'opération dans quelques instants");
}
function brand_text(text, config) {
    if (text == null || text.length == 0)
        return "";
    if (config == null || config.values == null || config.values.brands == null)
        return text;
    for (var i = 0; i < 5; i++)
        text = text.replace("REDUCSHARE", config.values.brands[config.activeBrand].appname);
    return text;
}
function api(service, param, encode) {
    if (param === void 0) { param = ''; }
    if (encode === void 0) { encode = true; }
    service = service.replace("//", "/");
    if (encode) {
        param = encodeURI(param);
    }
    if (param.length == 0)
        return (_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].root_api + '/' + service);
    else
        return (_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].root_api + '/' + service + '?' + param);
}
function direct_api(service, param, encode) {
    if (encode === void 0) { encode = true; }
    if (encode) {
        param = encodeURI(param);
    }
    return (_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].root_api + '/' + service + '?' + param);
}
function hashCode(s) {
    // tslint:disable-next-line:no-bitwise
    return s.split('').reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
}
function tirage(max) {
    return Math.trunc(Math.random() * max);
}
function selectFile(event, maxsize, quality, square, func) {
    if (square === void 0) { square = true; }
    if (func === void 0) { func = null; }
    if (event.target.files && event.target.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            resizeBase64Img(dataURL, maxsize, quality, (function (result) {
                autoRotate(result, quality, function (res) {
                    if (square) {
                        cropToSquare(res, quality, function (result_square) {
                            func(result_square);
                        });
                    }
                    else
                        func(result);
                });
            }));
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}
//On cherche a produire une reference au terminal de l'utilisateur
function unique_id() {
    var rc = "";
    rc = rc + navigator.userAgent; // User Agent
    rc = rc + navigator.platform; // nom du système d'exploitation
    rc = rc + navigator.product;
    rc = rc + navigator.cookieEnabled; // si les cookies sont activés ou non
    rc = rc + navigator.appName; // nom complet du navigateur
    rc = rc + navigator.appCodeName; // nom de code du navigateur
    rc = rc + screen.height; // hauteur de l'écran (en pixels)
    rc = rc + screen.width; // largeur de l'écran (en pixels)
    rc = rc + screen.colorDepth; // profondeur de couleur.
    return rc;
}
function sendToPrint(section) {
    if (section === void 0) { section = "print-section"; }
    var printContent = document.getElementById(section);
    var WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
}
function $$(s, obj) {
    if (obj === void 0) { obj = null; }
    if (s != null && s.startsWith("!")) {
        debugger;
    }
    var lg = new Date().getHours() + ':' + new Date().getMinutes() + ' -> ' + s;
    if (obj != null) {
        obj = JSON.stringify(obj);
    }
    else {
        obj = '';
    }
    console.log(lg + ' ' + obj);
    if (lg.indexOf('!!') > -1) {
        alert(lg);
    }
}
function createMap(center, icon, zoom, scale, func_move, func_sel, func_click) {
    if (icon === void 0) { icon = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/223/man_1f468.png"; }
    if (zoom === void 0) { zoom = 18; }
    if (scale === void 0) { scale = 0.2; }
    if (func_move === void 0) { func_move = null; }
    if (func_sel === void 0) { func_sel = null; }
    if (func_click === void 0) { func_click = null; }
    var vectorSource = new ol.source.Vector({
        features: [
            createMarker(center.lng, center.lat, icon, null, scale)
        ]
    });
    var vectorLayer = new ol.layer.Vector({ source: vectorSource });
    //var olSource=new ol.layer.Tile({source: new ol.source.OSM()});
    //Info sur la source : https://www.bingmapsportal.com/Application
    var olSource = new ol.layer.Tile({ source: new ol.source.BingMaps({
            imagerySet: 'Road',
            key: 'Am04xtfIsPy43By5-20LAeD2uxvrX9Yfe3DVunnWQoCeT3Kzks9J7-9DU63EzEaf'
        }) });
    var rc = new ol.Map({
        target: 'map',
        layers: [
            olSource,
            vectorLayer,
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([center.lng, center.lat]),
            zoom: zoom
        })
    });
    if (func_sel) {
        rc.on("dblclick", function (e) {
            rc.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                func_sel(feature);
            });
        });
    }
    if (func_click)
        rc.on("singleclick", function (e) {
            rc.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                func_click(feature);
            });
        });
    // if(func_move)
    //   rc.on('pointermove',(e)=> {
    //     rc.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
    //       func_sel(feature);
    //     });
    //   });
    if (func_move != null) {
        rc.on("moveend", func_move);
    }
    return rc;
}
function getMarkerLayer(map) {
    var rc = null;
    map.getLayers().forEach(function (layer) {
        if (layer instanceof ol.layer.Vector) {
            rc = layer;
        }
    });
    return rc;
}
/**
 * Affichage du message
 * @param vm
 * @param s
 * @param duration
 */
function showMessage(vm, s, duration) {
    if (s === void 0) { s = ""; }
    if (duration === void 0) { duration = 20000; }
    if (s == null || s.length == 0)
        return false;
    s = s + "";
    $$("Affichage du message :", s);
    if (s.startsWith("#")) {
        //Affichage en mode plein écran
        s = s.substr(1);
        vm.message = s;
        if (s.length > 0)
            setTimeout(function () { vm.showMessage = true; }, 500);
    }
    else {
        //Affichage en mode toaster
        var toaster = vm.toast || vm.snackBar;
        toaster.open(s, "", { duration: duration });
    }
}
function isLocal() {
    return location.href.indexOf("localhost") > -1;
}
function loginWithEmail(vm, user, func, func_error) {
    if (func === void 0) { func = null; }
    if (func_error === void 0) { func_error = null; }
    if (!vm.dialog)
        $$("La fenetre ne dispose pas de 'dialog'");
    var _width = "250px";
    if (screen.width > 600) {
        _width = "400px";
    }
    // vm.dialog.open(LoginComponent,{width:_width,data: {facebook:true,google:true,email:true,user:user}}).afterClosed().subscribe((result:any) => {
    //   if(result) {
    //     $$("Récupération correct des coordonnées du compte ",result);
    //     if (func) func(result);
    //   }
    //    else {
    //      $$("Probleme de récupération du user");
    //     if(func_error)func_error();
    //   }
    // });
}
function traitement_coupon(coupons, showCoupon) {
    var rc = [];
    if (coupons == null)
        return rc;
    coupons.forEach(function (coupon) {
        if (coupon._id == showCoupon)
            coupon.visible = true;
        coupon["visible"] = false;
        coupon["message"] = "Je recommande cette promotion. " + buildTeaser(coupon, coupon.shopname);
        rc.push(coupon);
    });
    return rc;
}
/**
 * Mise en forme du teaser de la promotion
 * @param c
 * @param lieu
 * @param withCondition indique si l'on doit ou pas ajouter les conditions
 *
 */
function buildTeaser(coupon, lieu, withCondition) {
    if (withCondition === void 0) { withCondition = false; }
    var rc = coupon.label;
    var prefixe = "à";
    if (lieu == null)
        lieu = "";
    if (lieu.toLowerCase().startsWith("chez"))
        prefixe = "";
    if (lieu.toLowerCase().startsWith("au ") || lieu.toLowerCase().startsWith("à ") || lieu.toLowerCase().startsWith("a "))
        prefixe = "";
    rc = rc + " " + prefixe + " '" + lieu + "'";
    var pluriel = "s";
    var firstWord = coupon.unity.split(" ")[0];
    if (firstWord.endsWith("x") || firstWord.endsWith("%") || firstWord.endsWith("s"))
        pluriel = "";
    if (coupon.max <= 1)
        pluriel = "";
    if (coupon.max > 0) {
        if (!rc.toLowerCase().startsWith("gagne"))
            rc = rc + ". Gagnez";
        rc = rc + ", jusqu'a " + coupon.max + " " + coupon.unity.replace(firstWord, firstWord + pluriel) + " (" + coupon.symbol + ")";
    }
    if (withCondition) {
        var prefixe_conditions = "pour ";
        if (coupon.conditions.toLowerCase().startsWith("pour") || coupon.conditions.toLowerCase().startsWith("sur"))
            prefixe_conditions = "";
        rc = rc + ", " + prefixe_conditions + coupon.conditions;
    }
    for (var i = 0; i < 10; i++)
        rc = rc.replace("..", ".").replace("!.", "!").replace("  ", " ");
    return rc;
}
function createMarker(lon, lat, icon, coupon, scale) {
    if (coupon === void 0) { coupon = null; }
    if (scale === void 0) { scale = 0.2; }
    if (!icon)
        icon = "";
    var iconStyle = new ol.style.Style({ image: new ol.style.Circle({ radius: 15, fill: new ol.style.Fill({ color: 'white' }) }) });
    if (!icon.startsWith("data") && !icon.startsWith("http") && !icon.startsWith("./")) {
        //On a un emoji
        iconStyle = new ol.style.Style({
            text: new ol.style.Text(({
                anchor: [0.6, 1.0],
                text: icon,
                scale: 3,
                textAlign: "center"
            }))
        });
    }
    else {
        //On a une image
        iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.6, 1.0],
                scale: scale,
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: icon,
                opacity: 1.0,
            })),
        });
    }
    if (coupon != null) {
        iconStyle.setText(new ol.style.Text({
            text: coupon.symbol,
            textAlign: "center",
            font: "22px sans-serif"
        }));
    }
    var marker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    });
    marker.coupon = coupon;
    marker.setStyle(iconStyle);
    return marker;
}
/**
 *
 * @param base64
 * @param maxsize
 * @param quality
 * @param func
 */
function resizeBase64Img(base64, maxsize, quality, func) {
    if (base64 == null || base64 == "") {
        $$("Probleme d'image vide");
        func();
    }
    var canvas = document.createElement("canvas");
    var img = new Image();
    img.onload = function () {
        var ratio = 1;
        if (maxsize != null)
            ratio = maxsize / Math.max(img.width, img.height);
        if (ratio <= 1) {
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            var context = canvas.getContext("2d");
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            var rc = canvas.toDataURL("image/jpeg", quality);
        }
        else
            rc = base64;
        func(rc);
    };
    img.src = base64;
}
/**
 *
 */
function getAuthServiceConfigs() {
    var config = new ngx_social_button__WEBPACK_IMPORTED_MODULE_1__["SocialServiceConfig"]()
        .addFacebook("696168110875713")
        .addGoogle("794055474370-pgpk3pggejpv59ioss798a744sup3pll.apps.googleusercontent.com")
        .addLinkedIn("86cnm1fo8cffax");
    return config;
}
/**
 *
 * @param base64
 * @param func
 */
function getSize(base64, func) {
    var img = new Image();
    img.src = base64;
    img.onload = function () {
        func(img.width, img.height);
    };
}
/**
 *
 * @param base64
 * @param x
 * @param y
 * @param width
 * @param height
 * @param quality
 * @param func
 * @param func_error
 */
function cropBase64Img(base64, x, y, width, height, quality, func, func_error) {
    if (quality === void 0) { quality = 1; }
    try {
        var canvas = document.createElement("canvas");
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function () {
            canvas.width = width;
            canvas.height = height;
            var context = canvas.getContext("2d");
            context.drawImage(img, x, y, width, height, 0, 0, width, height);
            var rc = canvas.toDataURL("image/jpeg", quality);
            func(rc);
        };
        img.src = base64;
    }
    catch (e) {
        if (func_error != null)
            func_error(e);
    }
}
/**
 * Permet de calculer le titre du coupon par défaut
 * @param coupon
 */
function evalTitle(coupon) {
    var s = coupon.label;
    if (s.length > 30)
        s = s.substr(0, 30) + "...";
    if (coupon.max > 0)
        s = s + " - Jusqu'a " + coupon.max + coupon.symbol;
    return s;
}
/**
 * Retourne la blancheur de l'image permettant de choisir la couleur du texte
 * @param imageSrc
 * @param callback
 */
function getImageLightness(imageSrc, callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);
    var colorSum = 0;
    img.onload = function () {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        img.setAttribute("crossOrigin", "");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        try {
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            var r, g, b, avg;
            for (var x = 0, len = data.length; x < len; x += 4) {
                r = data[x];
                g = data[x + 1];
                b = data[x + 2];
                avg = Math.floor((r + g + b) / 3);
                colorSum += avg;
            }
            var brightness = Math.floor(colorSum / (img.width * img.height));
            callback(brightness);
        }
        catch (e) {
            callback(0);
        }
    };
}
function cropToSquare(base64, quality, func) {
    if (quality === void 0) { quality = 1; }
    var img = new Image();
    img.onload = function () {
        var i = this;
        var l = Math.min(i.width, i.height);
        var x = (i.width - l) / 2;
        var y = (i.height - l) / 2;
        cropBase64Img(base64, x, y, l, l, quality, func, null);
    };
    img.src = base64;
}
function compute(coupon) {
    coupon["conditions"] = coupon["conditions"] || "";
    if (coupon.visual == null)
        coupon.visual = coupon.picture;
    if (coupon.label == "")
        coupon.label = "Super promotion";
    if (coupon.conditions == "")
        coupon.conditions = "sur simple présentation du coupon REDUCSHARE";
    if (!coupon.conditions.startsWith("pour ") && !coupon.conditions.startsWith("sur "))
        coupon.conditions = "pour " + coupon.conditions;
    coupon.conditions = coupon.conditions.replace("offre valable pour", "").replace("valable pour", "");
    coupon.dtStart = new Date().getTime();
    if (coupon.duration_jours == null)
        coupon.duration_jours = 0;
    if (coupon.duration_hours == null)
        coupon.duration_hours = 0;
    coupon.durationInSec = coupon.duration_jours * 24 * 3600 + coupon.duration_hours * 3600;
    coupon.delay = 0;
    coupon.share_bonus = Number(coupon.share_bonus);
    coupon.pay_bonus = Number(coupon.pay_bonus);
    coupon.direct_bonus = Number(coupon.direct_bonus);
    coupon.final_bonus = Number(coupon.final_bonus);
    coupon.max = Number(coupon.max);
    coupon.stock = Number(coupon.stock);
    if (coupon.ink_color == null)
        coupon.ink_color = "white";
    if (coupon.nb_partage > 0)
        coupon.share_bonus = 1 / coupon.nb_partage;
    else
        coupon.share_bonus = 0;
    //if(coupon.pluriel && coupon.unity.endsWith("s"))coupon.unity=coupon.unity.substr(0,coupon.unity.length-1);
    coupon.unity = coupon.unity.toLowerCase();
    return coupon;
}
function exportToHTML(src, coupon, func, color) {
    if (color === void 0) { color = "darkred"; }
    var code = "";
    var fields = [];
    for (var _i = 0, _a = src.split(" "); _i < _a.length; _i++) {
        var word = _a[_i];
        var field = word.replace("#", "").replace("@", "");
        if (word.startsWith("#")) {
            fields.push(field);
            field = field.split("=")[0];
            code = code + "<span id='id_" + field + "' style='color:" + color + ";cursor: pointer;font-weight: bold;'>" + coupon[field] + "</span> ";
        }
        if (word.startsWith("@"))
            code = code + coupon[field] + " ";
        if (!word.startsWith("@") && !word.startsWith("#"))
            code = code + word + " ";
    }
    setTimeout(function () { func(fields); }, 10);
    return normeString(code);
}
function checkLogin(router, params) {
    if (params === void 0) { params = null; }
    if (!localStorage.getItem('user')) {
        router.navigate(['login'], { queryParams: params });
        return false;
    }
    else {
        return true;
    }
}
function openGraphForShop(idshop, _type) {
    if (_type === void 0) { _type = "coupon"; }
    var domain_server = "https://server.f80.fr";
    //domain_server="http://localhost";
    var graph_url = domain_server + ":5500/api/getgraph/" + idshop + "/hh4271/gpickle/" + _type;
    var url = domain_server + ":5000/graph/b64="
        + btoa(graph_url) + "/fr?algo_comm=self&dir=public&axis=False&notext=True&metrics=True&add_property=False&autorotate=False" +
        "&limit=5000&pca=1&processors=2&title=Distribution_des_coupons_de_votre_point_de_vente";
    $$("url=", url);
    return url;
}
function fixTagPage(meta, coupon) {
    meta.removeTag('name = "og:url"');
    meta.removeTag('name = "og:type"');
    meta.removeTag('name = "og:title"');
    meta.removeTag('name = "og:description"');
    meta.removeTag('name = "og:image"');
    meta.addTags([
        { name: "og:url", content: coupon.url },
        { name: "og:type", content: "website" },
        { name: "og:locale", content: "fr_FR" },
        { name: "og:title", content: coupon.label },
        { name: "og:description", content: "Ouvrir pour profiter vous aussi de la promotion" },
        { name: "og:image", content: coupon.picture }
    ], true);
}
function initAvailableCameras(func) {
    ngx_webcam__WEBPACK_IMPORTED_MODULE_2__["WebcamUtil"].getAvailableVideoInputs()
        .then(function (mediaDevices) {
        if (mediaDevices == null)
            func(0);
        else
            func(mediaDevices.length);
    });
}
//
// export function openGeneral(item, domain)  {
//   return new Promise((resolve, reject) => {
//       const url = environment.root_api + '/api/connectTo?service=' + item + '&domain=' + domain;
//       const hwnd: any = window.open(url, 'Login', 'menubar=0,status=0,height=600,titlebar=0,width=400');
//       window.addEventListener('message', (event: any) => {
//         clearInterval(hTimer);
//         resolve(event.data);
//       }, false);
//
//       const hTimer = setInterval(() => {
//         if (hwnd != null) {
//           if (hwnd.location.href != null && hwnd.location.href.indexOf('email') > -1) {
//             const pos = hwnd.location.href.indexOf('email=');
//             const email = hwnd.location.href.substr(pos + 6, hwnd.location.href.indexOf('&', pos) - pos - 6);
//             const password = hwnd.location.href.substr(hwnd.location.href.indexOf('&', pos) + 10);
//             hwnd.close();
//             clearInterval(hTimer);
//             resolve({email, password});
//           }
//         }
//       }, 1000);
//
//       // hwnd.addEventListener("unload",(event)=>{
//       //   var obj={email:localStorage.getItem("email"),password:localStorage.getItem("password")};
//       // })
//   });
// }
function getDelay(dtStart, lang, label_day, serverNow) {
    if (lang === void 0) { lang = 'en'; }
    if (label_day === void 0) { label_day = 'jours'; }
    if (serverNow === void 0) { serverNow = null; }
    if (dtStart == undefined) {
        return '';
    }
    if (serverNow == null) {
        serverNow = new Date().getTime();
    }
    var delay = Math.abs(dtStart - serverNow);
    if (delay > 24 * 3600 * 1000) {
        var nbJours = Math.trunc(delay / (24 * 3600 * 1000));
        return nbJours + ' ' + label_day;
    }
    if (lang == undefined) {
        lang = 'fr';
    }
    var affichage = new Date(delay).toUTCString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    if (affichage.indexOf('00:') == 0) {
        affichage = affichage.split(':')[1] + ':' + affichage.split(':')[2];
    }
    else {
        affichage = affichage.split(':')[0] + 'h' + affichage.split(':')[1];
    }
    return affichage;
}
function normeString(s) {
    if (s == null)
        return "";
    s = s.replace("à chez", "chez");
    s = s.replace("pour sur", "sur");
    s = s.replace("pour pour", "pour");
    return s;
}
function clear(elt, xpath) {
    var doc = elt.contentDocument;
    var to_keep = doc.querySelector(xpath);
    to_keep.parentElement.childNodes.forEach(function (n) {
        if (n != to_keep) {
            n.style.display = 'none';
        }
    });
}
function extractEXIF(src, func) {
    var image = new Image();
    image.onload = function () {
        EXIF.getData(this, function () {
            var model = EXIF.getTag(this, 'Model');
            var tags = EXIF.getAllTags(this);
            if (Object.keys(tags).length == 0) {
                tags["width"] = image.width;
                tags["height"] = image.height;
            }
            func(tags);
        });
    };
    image.src = src;
}
function autoRotate(src, quality, func) {
    //var blob=atob(src.split("base64,")[1]);
    extractEXIF(src, function (data) {
        if (data.exif != null) {
            var orientation = data.exif.get('Orientation');
            var angle = 0;
            switch (orientation) {
                case 8:
                    angle = -90;
                    break;
                case 3:
                    angle = 180;
                    break;
                case 6:
                    angle = 90;
                    break;
            }
            rotate(src, angle, quality, func);
        }
        else {
            var angle = 0;
            // if(data.width>data.height)angle=0;
            // if(data.width==data.height)angle=90;
            rotate(src, angle, quality, func);
        }
    });
    //   }else{
    //     debugger;
    //     rotate(src, -90, quality, func);
    //   }
    //
    // });
}
// export function autoRotate(src: string, quality: number, func) {
//   var image = new Image();
//   image.onload =  () => {
//     EXIF.getData(image,  function() {
//       var orientation= EXIF.getTag(this,"Orientation");
//       var angle = 0;
//       switch (orientation) {
//         case 8:
//           angle = -90;
//           break;
//         case 3:
//           angle = 180;
//           break;
//         case 6:
//           angle = 90;
//           break;
//       }
//       rotate(src, angle, quality, func);
//     });
//   };
//   image.src = src;
// }
/**
 *
 * @param src
 * @param angle
 * @param quality
 * @param func
 */
function rotate(src, angle, quality, func) {
    if (angle == 0)
        func(src);
    else {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = img.height;
            canvas.height = img.width;
            drawRotated(canvas, this, angle);
            var rc = canvas.toDataURL("image/jpeg", quality);
            func(rc);
        };
        img.src = src;
    }
}
function drawRotated(canvas, image, degrees) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
}


/***/ }),

/***/ "./src/app/trans.pipe.ts":
/*!*******************************!*\
  !*** ./src/app/trans.pipe.ts ***!
  \*******************************/
/*! exports provided: TransPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransPipe", function() { return TransPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TransPipe = /** @class */ (function () {
    function TransPipe() {
    }
    TransPipe.prototype.transform = function (value) {
        return value;
    };
    TransPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'trans'
        })
    ], TransPipe);
    return TransPipe;
}());



/***/ }),

/***/ "./src/app/tuto/tuto.component.css":
/*!*****************************************!*\
  !*** ./src/app/tuto/tuto.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n/*# sourceMappingURL=tuto.component.css.map */\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdHV0by90dXRvLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw2Q0FBNkMiLCJmaWxlIjoic3JjL2FwcC90dXRvL3R1dG8uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/tuto/tuto.component.html":
/*!******************************************!*\
  !*** ./src/app/tuto/tuto.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"_if && text?.length>0\" (click)=\"hideTuto(true)\">\n\n  <div *ngIf=\"_type=='tips'\" style=\"display:inline-block;margin-top:6px;margin-bottom:8px;\">\n    <table>\n      <tr>\n        <td>\n          <img *ngIf=\"image?.length>0\"\n               [src]=\"image\"\n               style=\"width:30px;height:30px;padding:3px;\">\n\n          <span *ngIf=\"icon?.length>0\">\n            <mat-icon style=\"margin:10px;\">{{icon}}</mat-icon>\n          </span>\n\n          <span *ngIf=\"_button?.length>0\">\n            <button mat-button mat-flat-button mat-icon-button>\n              <mat-icon style=\"margin:10px;\">{{_button}}</mat-icon>\n            </button>\n          </span>\n        </td>\n        <td>\n          <span [ngStyle]=\"{'color':color,'font-size':'small','font-weight':'normal'}\">\n            {{text}}\n          </span>\n        </td>\n      </tr>\n    </table>\n  </div>\n\n  <div style=\"background-color:black;cursor: none;pointer-events: none;position: fixed;top:0;left:0;height:100vh;width:100vw;z-index: 999;object-fit:cover;\"\n       *ngIf=\"background?.length>0 && _type=='title'\">\n    <img [src]=\"background\" *ngIf=\"background?.startsWith('http') || background?.startsWith('./')\"\n         style=\"min-width:100%;min-height:100%;\">\n  </div>\n\n  <div *ngIf=\"background?.length==0 && _type=='title'\"\n       style=\"background-color: white;cursor: none;pointer-events: none;position: fixed;left:0px;top:0px;width: 100%;height:100%;z-index: 999;\">\n  </div>\n\n  <div [ngStyle]=\"{'color':color}\">\n    <div *ngIf=\"_type=='title'\"\n         style=\"z-index:1000;display:inline-block;position:fixed;top:0px;left:0px;width:100vw;height:100vh;text-align:center;\">\n\n      <div style=\"width:80%;text-align:center;font-size: 6vmin;margin-top:5vh;margin-bottom:5vh;margin-left:10%;\"\n            [innerHTML]=\"text | safe:'html'\">\n      </div>\n      <img *ngIf=\"image?.length>0\"\n           [src]=\"image\"\n           style=\"max-width: 80%;max-height: 80%;margin-bottom:3vh;display: inline-block;\">\n\n      <div *ngIf=\"image?.length==0\"\n           style=\"height:40vh\"></div>\n\n      <div style=\"width:90%;margin-left:5%;margin-top:4vh;text-align:center;font-size: large;margin-bottom: 5vh;\"\n           [innerHTML]=\"subtitle | safe:'html'\"></div>\n\n      <button mat-button mat-raised-button id=\"btnStart\">{{labelButton}}</button>\n\n    </div>\n  </div>\n\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/tuto/tuto.component.ts":
/*!****************************************!*\
  !*** ./src/app/tuto/tuto.component.ts ***!
  \****************************************/
/*! exports provided: TutoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutoComponent", function() { return TutoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools */ "./src/app/tools.ts");
/* harmony import */ var _trans_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trans.pipe */ "./src/app/trans.pipe.ts");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");





var TutoComponent = /** @class */ (function () {
    function TutoComponent(config, transPipe) {
        this.config = config;
        this.transPipe = transPipe;
        this.text = "";
        this.title = "";
        this._type = "tips";
        this.label = "";
        this.subtitle = "";
        this.position = "center";
        this.delay = 0.2;
        this.duration = 0;
        this.background = "";
        this._if = true;
        this.image = "";
        this.labelButton = "Continuez";
        this.icon = "";
        this.color = "white";
        this.force = false;
        this._button = "";
        this.height = "auto";
        this.code = "";
    }
    TutoComponent.prototype.refresh = function () {
        var _this = this;
        this.text = Object(_tools__WEBPACK_IMPORTED_MODULE_2__["brand_text"])(this.text, this.config);
        this.title = Object(_tools__WEBPACK_IMPORTED_MODULE_2__["brand_text"])(this.title, this.config);
        if (this.config.params == null)
            return;
        if (!this.config.params.tuto)
            this.hideTuto(false);
        if (!this.config.visibleTuto || this._type == "title" || this.force) {
            if (this._if) {
                this.config.visibleTuto = true;
                this.handle = setTimeout(function () {
                    _this.hideTuto(true);
                }, 3000 + this.duration * 1000);
            }
            else {
                this.hideTuto();
            }
        }
        else
            this.hideTuto();
    };
    TutoComponent.prototype.ngOnChanges = function () {
    };
    TutoComponent.prototype.hideTuto = function (addHisto) {
        if (addHisto === void 0) { addHisto = false; }
        if (addHisto)
            localStorage.setItem(this.code, "read" + new Date().getTime()); //Marque l'affichage
        this.text = "";
        this._if = false;
        this.config.visibleTuto = false;
        this.title = "";
        this.subtitle = "";
        clearTimeout(this.handle);
    };
    TutoComponent.prototype.ngOnInit = function () {
        if (this._type == "tips" && this.image.length == 0)
            this.image = "./assets/img/tips.png";
        if (this.icon != null && this.icon.length > 0)
            this.image = "";
        if (this.text == null || this.text.length == 0)
            this.text = this.label;
        if (this.title != null && this.title.length > 0 || this.subtitle.length > 0) {
            this._type = "title";
            this.text = this.title;
        }
        if (this._type == "tips" && this._button != null && this._button.length > 0)
            this.image = "";
        this.text = this.transPipe.transform(this.text);
        this.code = "histo" + Object(_tools__WEBPACK_IMPORTED_MODULE_2__["hashCode"])(this.text + this.subtitle);
        if (localStorage.hasOwnProperty(this.code)) {
            this._if = false;
        }
        else {
        }
        if (this.duration == 0)
            this.duration = (this.text.split(" ").length + this.subtitle.split(" ").length) / 2;
        this.refresh();
    };
    TutoComponent.prototype.showText = function (b) {
        this._if = b;
        this.ngOnChanges();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("text"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "text", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("title"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "title", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("type"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "_type", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("label"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("subtitle"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "subtitle", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("position"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "position", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("delay"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TutoComponent.prototype, "delay", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("duration"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TutoComponent.prototype, "duration", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("background"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TutoComponent.prototype, "background", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('if'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TutoComponent.prototype, "_if", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('image'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "image", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('button'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "labelButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('icon'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "icon", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('color'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "color", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('force'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], TutoComponent.prototype, "force", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('button'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "_button", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('height'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], TutoComponent.prototype, "height", void 0);
    TutoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tuto',
            template: __webpack_require__(/*! ./tuto.component.html */ "./src/app/tuto/tuto.component.html"),
            styles: [__webpack_require__(/*! ./tuto.component.css */ "./src/app/tuto/tuto.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"], _trans_pipe__WEBPACK_IMPORTED_MODULE_3__["TransPipe"]])
    ], TutoComponent);
    return TutoComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    domain_appli: "http://localhost:4200",
    root_api: 'http://localhost:6800/api',
    socket_server: "http://localhost:6800",
    config_file: "./assets/config.json"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\hhoareau\IdeaProjects\ticketShare\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map