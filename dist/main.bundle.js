webpackJsonp([1,4],{

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (!this.auth.authenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return contentHeaders; });

var contentHeaders = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
//# sourceMappingURL=auth.headers.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__ = __webpack_require__(173);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendlistService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var baseUrl = 'https://speeroo.herokuapp.com/api/friendlists';
var FriendlistService = (function () {
    function FriendlistService(http) {
        this.http = http;
    }
    FriendlistService.prototype.createFriendlist = function (friendlist) {
        var response = this.http.post(baseUrl, friendlist, { headers: __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__["a" /* contentHeaders */] }).map(this.mapFriendlist.bind(this));
        ;
        return response;
    };
    FriendlistService.prototype.updateFriendlist = function (friendlist) {
        var response = this.http.put(baseUrl + "/" + encodeURI(friendlist._id), friendlist, { headers: __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__["a" /* contentHeaders */] }).map(this.logResponse.bind(this));
        return response;
    };
    FriendlistService.prototype.retrieveFriendlist = function (ownerId) {
        var response = this.http.get(baseUrl + "/owner/" + encodeURI(ownerId), { headers: __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__["a" /* contentHeaders */] });
        if (response)
            response.map(this.mapFriendlist.bind(this));
        return response;
    };
    FriendlistService.prototype.deleteFriendlist = function (friendlist) {
        var response = this.http.delete(baseUrl + "/" + encodeURI(friendlist._id), { headers: __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__["a" /* contentHeaders */] }).map(this.logResponse.bind(this));
        return response;
    };
    FriendlistService.prototype.logResponse = function (response) {
        return response.json();
    };
    FriendlistService.prototype.mapFriendlist = function (response) {
        return this.toFriendlist(response.json().friendlist);
    };
    FriendlistService.prototype.toFriendlist = function (r) {
        var friendlist = ({
            owner: r.owner,
            list: r.list,
            _id: r._id
        });
        return friendlist;
    };
    return FriendlistService;
}());
FriendlistService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], FriendlistService);

var _a;
//# sourceMappingURL=friendlist.service.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'home',
        template: __webpack_require__(462),
        styles: [__webpack_require__(423)]
    })
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    LoginComponent.prototype.login = function () {
        if (!this.auth.authenticated())
            this.auth.login();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'login',
        template: __webpack_require__(463),
        styles: [__webpack_require__(424)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 270:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 270;


/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(285);
///<reference path="typings.d.ts"/>




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(router, auth) {
        this.router = router;
        this.auth = auth;
        this.title = 'Welcome on Speeroo';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(458),
        styles: [__webpack_require__(419)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_guard__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_dnd__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_routes__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__home_home_component__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__user_user_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__friend_detail_friend_detail__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__friend_list_friend_list__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__friend_search_friend_search__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__friend_friendlist_service__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__login_login_component__ = __webpack_require__(176);
/* unused harmony export authHttpServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__["AuthConfig"]({}), http, options);
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_11__home_home_component__["a" /* HomeComponent */], __WEBPACK_IMPORTED_MODULE_13__friend_detail_friend_detail__["a" /* FriendDetail */], __WEBPACK_IMPORTED_MODULE_14__friend_list_friend_list__["a" /* FriendList */], __WEBPACK_IMPORTED_MODULE_15__friend_search_friend_search__["a" /* FriendSearch */],
            __WEBPACK_IMPORTED_MODULE_17__login_login_component__["a" /* LoginComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["HttpModule"], __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_routes__["a" /* routes */]),
            __WEBPACK_IMPORTED_MODULE_9_ng2_dnd__["a" /* DndModule */].forRoot()
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__auth_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_12__user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_16__friend_friendlist_service__["a" /* FriendlistService */], {
                provide: __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__["AuthHttp"],
                useFactory: authHttpServiceFactory,
                deps: [__WEBPACK_IMPORTED_MODULE_6__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_6__angular_http__["RequestOptions"]]
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login_component__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home_component__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__ = __webpack_require__(172);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });



// Define which component should be loaded based on the current URL
var routes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_1__home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_auth_guard__["a" /* AuthGuard */]] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_0__login_login_component__["a" /* LoginComponent */] }
];
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthConfig; });
var AuthConfig = {
    clientID: 'LtOnNFXioXiQEeFYL9XQVxArR75qkRNn',
    domain: 'lambdoid.auth0.com'
};
//# sourceMappingURL=auth.config.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_user_class__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_user_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__user_user_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_service__ = __webpack_require__(71);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendDetail; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FriendDetail = (function () {
    function FriendDetail(userService) {
        this.userService = userService;
    }
    FriendDetail.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserByUserId(this.friend.userId).subscribe(function (data) {
            _this.friend.peerId = data.peerId;
        });
        var conn = this.peer.connect(this.friend.peerId);
        /*this.peer.on('connection', function(dataConn) {
          console.log(dataConn);
        });
    
        conn.on('open', function() {
          // Receive messages
          conn.on('data', function(data) {
            console.log('Received', data);
          });
    
          // Send messages
          conn.send('Hello!');
        });*/
        console.log(this.peer);
        console.log(conn);
        conn.on('open', function () {
            console.log("connect to peer");
            conn.send("Hello");
            console.log('data sent');
        });
        this.peer.on('connection', function (conn) {
            conn.on('data', function (data) {
                console.log("received complete: ", Date());
            });
        });
    };
    FriendDetail.prototype.call = function (friend) {
        var call = this.peer.call(friend.peerId, this.mediaStream);
    };
    FriendDetail.prototype.answer = function (friend) {
        this.peer.on('call', function (call) {
            call.answer(this.mediaStream);
        });
    };
    FriendDetail.prototype.decline = function (friend) {
        this.peer.on('call', function (call) {
            call.close();
        });
    };
    FriendDetail.prototype.isCalling = function () {
        return true;
    };
    return FriendDetail;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user_user_class__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__user_user_class__["User"]) === "function" && _a || Object)
], FriendDetail.prototype, "friend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FriendDetail.prototype, "peer", void 0);
FriendDetail = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'friend-detail',
        template: __webpack_require__(459),
        styles: [__webpack_require__(420)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__user_user_service__["a" /* UserService */]) === "function" && _b || Object])
], FriendDetail);

var _a, _b;
//# sourceMappingURL=friend.detail.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__friendlist_service__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user_service__ = __webpack_require__(71);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendList; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FriendList = (function () {
    function FriendList(friendlistService, router, auth, userService) {
        this.friendlistService = friendlistService;
        this.router = router;
        this.auth = auth;
        this.userService = userService;
        this.peer = new Peer({ host: 'speeroo.herokuapp.com', secure: true, port: 443 });
        this.peer.on('open', function (id) {
            var _this = this;
            var profile = JSON.parse(localStorage.getItem('profile'));
            userService.updateUser({ "name": profile.nickname,
                "userId": profile.user_id, "peerId": id })
                .subscribe(function (response) { _this.response = response; });
        });
    }
    FriendList.prototype.ngOnInit = function () {
        var _this = this;
        var profile = JSON.parse(localStorage.getItem("profile"));
        this.friendlistService.retrieveFriendlist(profile.user_id).subscribe(function (data) {
            if (data._body == "null") {
                console.log("New friendlist needs to be created");
                _this.friendlistService.createFriendlist({ "owner": { "name": profile.nickname,
                        "userId": profile.user_id } }).subscribe(function (data) {
                    _this.friendlist = data;
                });
            }
            else {
                console.log("Friendlist has been found");
                _this.friendlist = data.json();
            }
        });
    };
    FriendList.prototype.addFriend = function (friend) {
        this.friendlist.list.push(friend);
        this.friendlistService.updateFriendlist(this.friendlist).subscribe(function (data) {
            console.log(data);
        });
    };
    return FriendList;
}());
FriendList = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'friend-list',
        template: __webpack_require__(460),
        styles: [__webpack_require__(421)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__friendlist_service__["a" /* FriendlistService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__friendlist_service__["a" /* FriendlistService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__user_user_service__["a" /* UserService */]) === "function" && _d || Object])
], FriendList);

var _a, _b, _c, _d;
//# sourceMappingURL=friend.list.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_user_service__ = __webpack_require__(71);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendSearch; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FriendSearch = (function () {
    function FriendSearch(userService) {
        this.userService = userService;
        this.searchResults = [];
    }
    FriendSearch.prototype.searchFriend = function () {
        var _this = this;
        this.userService.getUsersByName(this.searchName).subscribe(function (data) { return _this.searchResults = data; });
    };
    return FriendSearch;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FriendSearch.prototype, "searchName", void 0);
FriendSearch = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'friend-search',
        template: __webpack_require__(461),
        styles: [__webpack_require__(422)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__user_user_service__["a" /* UserService */]) === "function" && _a || Object])
], FriendSearch);

var _a;
//# sourceMappingURL=friend.search.js.map

/***/ }),

/***/ 284:
/***/ (function(module, exports) {

//# sourceMappingURL=user.class.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 458:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <router-outlet>\r\n  </router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"friend\">\r\n  {{friend.name}}\r\n  <button type=\"submit\" (click)=\"call(friend)\">Call</button>\r\n  <div *ngIf=\"isCalling()\">\r\n    <button type=\"submit\" (click)=\"answer(friend)\">Answer</button>\r\n    <button type=\"submit\" (click)=\"decline(friend)\">Decline</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 460:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"friendlist\">\r\n  <div *ngFor = \"let f of friendlist.list\">\r\n    <friend-detail [friend]=\"f\" [peer]=\"peer\"></friend-detail>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 461:
/***/ (function(module, exports) {

module.exports = "<form name=\"searchForm\" (ngSubmit)=\"searchFriend()\">\r\n  Search for a friend\r\n  <input type=\"text\" [(ngModel)]=\"searchName\" name=\"searchInput\"/>\r\n  <button type=\"submit\">Search</button>\r\n</form>\r\n\r\n<div *ngFor=\"let s of searchResults\">\r\n  {{s.name}}\r\n  <button (click)=\"friendlist.addFriend(s)\">Add</button>\r\n</div>\r\n\r\n<friend-list #friendlist></friend-list>\r\n"

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

module.exports = "Welcome on the homepage\r\n<friend-search></friend-search>\r\n"

/***/ }),

/***/ 463:
/***/ (function(module, exports) {

module.exports = "<button *ngIf=\"!auth.authenticated()\" type = \"submit\" (click)=\"login()\">Log In</button>\r\n"

/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(271);


/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_config__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth0_lock__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth0_lock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_auth0_lock__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_user_service__ = __webpack_require__(71);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = (function () {
    function AuthService(router, userService) {
        var _this = this;
        this.router = router;
        this.userService = userService;
        this.lock = new __WEBPACK_IMPORTED_MODULE_4_auth0_lock___default.a(__WEBPACK_IMPORTED_MODULE_2__auth_config__["a" /* AuthConfig */].clientID, __WEBPACK_IMPORTED_MODULE_2__auth_config__["a" /* AuthConfig */].domain, {
            theme: {
                primaryColor: "#005375"
            },
            auth: {
                responseType: 'token',
                redirectUrl: 'https://speeroo.herokuapp.com/'
            },
            languageDictionary: {
                title: "Have fun on Speeroo >:3"
            }
        });
        if (this.authenticated()) {
            this.router.navigate(['home']);
        }
        this.lock.on('authenticated', function (authResult) {
            _this.registerTokens(authResult);
        });
    }
    AuthService.prototype.registerTokens = function (authResult) {
        var _this = this;
        // Use the token in authResult to getUserInfo() and save it to localStorage
        this.lock.getUserInfo(authResult.accessToken, function (error, profile) {
            localStorage.setItem('token', authResult.idToken);
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('accessToken', authResult.accessToken);
            if (profile.signed_up) {
                console.log("Enjoy your journey on Speeroo, " + profile.nickname);
                _this.userService.createUser({ "name": profile.nickname, "userId": profile.user_id, "peerId": "" }).subscribe(function (data) {
                    _this.response = data.message;
                });
            }
            else {
                console.log("Welcome back, " + profile.nickname);
            }
            _this.router.navigate(['home']);
        });
    };
    AuthService.prototype.login = function () {
        // Call the show method to display the widget.
        this.lock.show();
    };
    ;
    AuthService.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["tokenNotExpired"])();
    };
    ;
    AuthService.prototype.logout = function () {
        // Remove token from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        this.router.navigate(['login']);
    };
    ;
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__user_user_service__["a" /* UserService */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__ = __webpack_require__(173);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var baseUrl = 'https://speeroo.herokuapp.com/api/users';
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.createUser = function (user) {
        var response = this.http.post(baseUrl, user, { headers: __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__["a" /* contentHeaders */] }).map(this.logResponse.bind(this));
        ;
        return response;
    };
    UserService.prototype.updateUser = function (user) {
        var response = this.http.put(baseUrl, user, { headers: __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__["a" /* contentHeaders */] }).map(this.logResponse.bind(this));
        return response;
    };
    UserService.prototype.logResponse = function (response) {
        return response.json();
    };
    UserService.prototype.getUsersByName = function (name) {
        var users = this.http.get(baseUrl + '/search/' + encodeURI(name), { headers: __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__["a" /* contentHeaders */] }).map(this.mapUsers.bind(this));
        return users;
    };
    UserService.prototype.getUserByUserId = function (id) {
        var user = this.http.get(baseUrl + '/' + encodeURI(id), { headers: __WEBPACK_IMPORTED_MODULE_3__auth_auth_headers__["a" /* contentHeaders */] }).map(this.logResponse.bind(this));
        return user;
    };
    UserService.prototype.mapUsers = function (response) {
        return response.json().map(this.toUser.bind(this));
    };
    UserService.prototype.toUser = function (r) {
        console.log(r);
        var user = ({
            name: r.name,
            userId: r.userId,
            peerId: r.peerId
        });
        return user;
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ })

},[589]);
//# sourceMappingURL=main.bundle.js.map