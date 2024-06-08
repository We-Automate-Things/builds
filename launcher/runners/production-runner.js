"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ProductionRunner = void 0;
var pm2_1 = __importDefault(require("pm2"));
var os_1 = __importDefault(require("os"));
var base_runner_1 = require("./base-runner");
var states_1 = require("../enums/states");
var ProductionRunner = /** @class */ (function (_super) {
    __extends(ProductionRunner, _super);
    function ProductionRunner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductionRunner.prototype.killScraper = function (model, site) {
        return __awaiter(this, void 0, void 0, function () {
            var scraperIndex, processName_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logHelper.consoleLog("SHUTTING DOWN 'SCRAPER ".concat(model, " - ").concat(site, "'"), states_1.States.WARNING);
                        scraperIndex = this.scrapers.findIndex(function (value) { return (value.model === model) && (value.chatsite === site); });
                        if (!(scraperIndex !== -1)) return [3 /*break*/, 2];
                        this.logHelper.consoleLog("TRYING TO KILL ".concat(model, " - ").concat(site), states_1.States.WARNING);
                        processName_1 = "SCRAPER-".concat(model, "-").concat(site);
                        // Connect to the PM2 daemon
                        pm2_1.default.connect(function (err) {
                            if (err) {
                                console.error("Error connecting to PM2:", err);
                                process.exit(2);
                            }
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            pm2_1.default.list(function (err, list) {
                                if (err) {
                                    console.error("Error listing PM2 processes:", err);
                                    pm2_1.default.disconnect();
                                    process.exit(2);
                                }
                                var processInfo = list.find(function (process) { return process.name === processName_1; });
                                if (!processInfo) {
                                    console.error("Process '".concat(processName_1, "' not found."));
                                    pm2_1.default.disconnect();
                                    process.exit(1);
                                }
                                var pmId = processInfo.pm_id;
                                // eslint-disable-next-line @typescript-eslint/no-shadow
                                pm2_1.default.delete(pmId, function (err) {
                                    if (err) {
                                        console.error("Error killing process '".concat(processName_1, "':"), err);
                                        pm2_1.default.disconnect();
                                        process.exit(2);
                                    }
                                    _this.logHelper.consoleLog("PROCESS '".concat(processName_1, "' STOPPED SUCCESSFULLY."), states_1.States.SUCCESS);
                                    pm2_1.default.disconnect();
                                });
                            });
                        });
                        return [4 /*yield*/, this.channel.deleteQueue("SCRAPER-".concat(model, "-").concat(site))];
                    case 1:
                        _a.sent();
                        this.logHelper.consoleLog("QUEUE SCRAPER-".concat(model, "-").concat(site, " DELETED."), states_1.States.WARNING);
                        this.scrapers.splice(scraperIndex, 1);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ProductionRunner.prototype.launchScraper = function (command, model, site) {
        var _this = this;
        // Connect to the PM2 daemon
        pm2_1.default.connect(function (err) {
            if (err) {
                _this.logHelper.consoleLog("Error connecting to PM2: ".concat(err), states_1.States.ERROR);
                process.exit(2);
            }
            // Start the secondary application
            pm2_1.default.start({
                script: "/var/apps/scraper/main.js", // Path to the secondary app script
                name: "SCRAPER-".concat(model, "-").concat(site), // Name of the secondary app
                exec_mode: "fork", // Or 'cluster' if needed
                max_memory_restart: "300M", // Optional: Restart if it exceeds 100MB
                args: [model, site] // Arguments passed to the script
                // eslint-disable-next-line @typescript-eslint/no-shadow
            }, function (err) {
                _this.scrapers.push({
                    model: model,
                    chatsite: site,
                    pid: null,
                    platform: os_1.default.platform(),
                });
                if (err) {
                    _this.logHelper.consoleLog("Error starting application: ".concat(err), states_1.States.ERROR);
                    pm2_1.default.disconnect(); // Disconnects from PM2
                    process.exit(2);
                }
                _this.logHelper.consoleLog("SCRAPER SUCCESSFULLY STARTED ".concat(model, " - ").concat(site, " "), states_1.States.SUCCESS);
                pm2_1.default.disconnect(); // Disconnects from PM2
            });
        });
    };
    return ProductionRunner;
}(base_runner_1.BaseRunner));
exports.ProductionRunner = ProductionRunner;
