"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiBase = void 0;
var ApiBase = /** @class */ (function () {
    function ApiBase(baseUrl, authKeyIn) {
        this.baseUrl = baseUrl;
        this.authKey = authKeyIn;
        this.httpOptions = {
            headers: {
                "scraper-key": "".concat(this.authKey),
                "Content-Type": "application/json"
            }
        };
    }
    return ApiBase;
}());
exports.ApiBase = ApiBase;
