"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// NPM IMPORTS
var playwright_extra_1 = require("playwright-extra");
var puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
var puppeteer_extra_plugin_recaptcha_1 = __importDefault(require("puppeteer-extra-plugin-recaptcha"));
var dotenv_1 = __importDefault(require("dotenv"));
// CUSTOM IMPORTS
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var InitiateError_1 = require("./exceptions/InitiateError");
var exceptionStringEnums_1 = require("./exceptions/exceptionStringEnums");
var fancentro_scraper_1 = require("./scrapers/fancentro-scraper");
var f2f_scraper_1 = require("./scrapers/f2f-scraper");
var auth_helper_1 = require("./helpers/auth-helper");
var model_credential_service_1 = require("./services/model-credential-service");
var proxy_service_1 = require("./services/proxy-service");
var proxies_1 = require("./enums/proxies");
console.log("INITIATE SCRAPER");
dotenv_1.default.config({ path: "".concat(__dirname, "/.env") });
var modelId = null;
var chatsiteName = null;
if (process.env.PM2 === "false") {
    modelId = parseInt(process.argv[3], 10);
    chatsiteName = process.argv[4];
}
else {
    modelId = parseInt(process.argv[2], 10);
    chatsiteName = process.argv[3];
}
if (!modelId) {
    throw new InitiateError_1.InitiateError(exceptionStringEnums_1.ExceptionStringEnums.initiateInvalidParameterModelId);
}
if (!chatsiteName) {
    throw new InitiateError_1.InitiateError(exceptionStringEnums_1.ExceptionStringEnums.initiateInvalidParameterChatsiteId);
}
process.on("uncaughtException", function (err) {
    var logFileName = "error_".concat(new Date().toISOString().replace(/:/g, "-").split("T")[0], ".log");
    var logFilePath = path_1.default.join("".concat(__dirname, "/logs"), logFileName);
    // Check if the log file already exists
    var logMessage = "==========================================================\nTIME: ".concat(new Date().toISOString(), "\nMODEL: ").concat(modelId, "\nCHATSITE: ").concat(chatsiteName, "\nERROR: ").concat(err.message, "\nSTACK: ").concat(err.stack, "\n==========================================================\n");
    if (fs_1.default.existsSync(logFilePath)) {
        // If it exists, prepend the new error message with a new line
        logMessage = "\n".concat(logMessage);
    }
    // Write the error message to the log file
    fs_1.default.appendFileSync(logFilePath, logMessage);
});
console.log("RECEIVED ALL NEEDED PARAMETERS");
playwright_extra_1.chromium.use((0, puppeteer_extra_plugin_recaptcha_1.default)({ provider: { id: "2captcha", token: process.env.CAPTCHA_KEY }, visualFeedback: true, throwOnError: true }));
playwright_extra_1.chromium.use((0, puppeteer_extra_plugin_stealth_1.default)());
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var initialAuthHelper, _a, _b, privateKey, proxyType, proxy, modelCredentialService, modelCredentials, fancentroScraper, _c, privateKey, proxyType, proxy, modelCredentialService, modelCredentials, f2fScraper;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                initialAuthHelper = new auth_helper_1.AuthHelper();
                _a = chatsiteName;
                switch (_a) {
                    case "FANCENTRO": return [3 /*break*/, 1];
                    case "F2F": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 11];
            case 1: return [4 /*yield*/, initialAuthHelper.getAuthKey(modelId, "FANCENTRO")];
            case 2:
                _b = _d.sent(), privateKey = _b[0], proxyType = _b[1];
                return [4 /*yield*/, proxyValidation(privateKey, proxyType)];
            case 3:
                proxy = _d.sent();
                modelCredentialService = new model_credential_service_1.ModelCredentialService(privateKey);
                return [4 /*yield*/, modelCredentialService.postFetchModelCredentials(modelId, "FANCENTRO")];
            case 4:
                modelCredentials = _d.sent();
                fancentroScraper = new fancentro_scraper_1.FancentroScraper(proxy, playwright_extra_1.chromium, modelCredentials, privateKey, modelId, chatsiteName);
                return [4 /*yield*/, fancentroScraper.initiateScraperFlow()];
            case 5:
                _d.sent();
                return [3 /*break*/, 12];
            case 6: return [4 /*yield*/, initialAuthHelper.getAuthKey(modelId, "F2F")];
            case 7:
                _c = _d.sent(), privateKey = _c[0], proxyType = _c[1];
                return [4 /*yield*/, proxyValidation(privateKey, proxyType)];
            case 8:
                proxy = _d.sent();
                modelCredentialService = new model_credential_service_1.ModelCredentialService(privateKey);
                return [4 /*yield*/, modelCredentialService.postFetchModelCredentials(modelId, "F2F")];
            case 9:
                modelCredentials = _d.sent();
                f2fScraper = new f2f_scraper_1.F2fScraper(proxy, playwright_extra_1.chromium, modelCredentials, privateKey, modelId, chatsiteName);
                return [4 /*yield*/, f2fScraper.initiateScraperFlow()];
            case 10:
                _d.sent();
                return [3 /*break*/, 12];
            case 11:
                {
                    throw new InitiateError_1.InitiateError(exceptionStringEnums_1.ExceptionStringEnums.initiateFailToLaunchScraper.concat(chatsiteName));
                }
                _d.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); })();
function proxyValidation(privateKey, proxyType) {
    return __awaiter(this, void 0, void 0, function () {
        var proxyService, proxy, isEmptyProxy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    proxyService = new proxy_service_1.ProxyService(privateKey);
                    return [4 /*yield*/, proxyService.fetchProxy()];
                case 1:
                    proxy = _a.sent();
                    isEmptyProxy = Object.keys(proxy).length === 0;
                    if (isEmptyProxy) {
                        if (proxyType !== proxies_1.Proxies.NO_PROXY) {
                            console.log("KILLING APPLICATION DUE TO INVALID PROXY");
                            process.exit(10);
                        }
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, proxy];
            }
        });
    });
}
