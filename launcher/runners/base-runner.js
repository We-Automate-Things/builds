"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.BaseRunner = void 0;
var amqp = __importStar(require("amqplib"));
var os_1 = __importDefault(require("os"));
var log_helper_1 = require("../log-helper");
var states_1 = require("../enums/states");
var tasks_1 = require("../enums/tasks");
var BaseRunner = /** @class */ (function () {
    function BaseRunner(managerQueue) {
        this.logHelper = new log_helper_1.LogHelper();
        this.queue = managerQueue;
        this.scrapers = [];
    }
    BaseRunner.prototype.initiateLauncher = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, amqp.connect("amqp://".concat(process.env.HOST))];
                    case 1:
                        _a.connection = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.connection.createChannel()];
                    case 2:
                        _b.channel = _c.sent();
                        return [4 /*yield*/, this.channel.assertQueue(this.queue)];
                    case 3:
                        _c.sent();
                        setInterval(function () {
                            _this.logHelper.consoleLog("WAITING FOR MESSAGES", states_1.States.PACKAGE);
                            _this.getRamUsage();
                        }, 1000 * 60);
                        this.channel.consume(this.queue, function (msg) {
                            if (msg !== null) {
                                var json = JSON.parse(msg.content.toString());
                                var job = json.job;
                                _this.logHelper.consoleLog("CONSUMED MESSAGE: ".concat(job), states_1.States.PACKAGE);
                                _this.channel.ack(msg);
                                switch (job) {
                                    case tasks_1.Tasks.ACTIVATE_SCRAPER: {
                                        var token = "".concat(json.data.modelId, " ").concat(json.data.chatSiteId);
                                        var model = json.data.modelId;
                                        var site = json.data.chatSiteId;
                                        var command = "";
                                        if (process.env.IS_PRODUCTION === "TRUE") {
                                            _this.launchScraper(command, model, site);
                                        }
                                        else {
                                            command = "".concat(process.env.START_COMMAND, " -p ").concat(token);
                                            _this.launchScraper(command, model, site);
                                        }
                                        break;
                                    }
                                    case tasks_1.Tasks.KILL_SCRAPER: {
                                        var model = json.data.modelId;
                                        var site = json.data.chatSiteId;
                                        _this.killScraper(model, site);
                                        break;
                                    }
                                    default: {
                                        _this.logHelper.consoleLog("INVALID TASK TYPE RECEIVED: ".concat(job), states_1.States.ERROR);
                                    }
                                }
                            }
                        });
                        this.logHelper.consoleLog("AWAITING MESSAGES IN QUEUE", states_1.States.PACKAGE);
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseRunner.prototype.getRamUsage = function () {
        var totalMemory = os_1.default.totalmem();
        var freeMemory = os_1.default.freemem();
        var usedMemory = totalMemory - freeMemory;
        var usedMemoryPercentage = (usedMemory / totalMemory) * 100;
        this.logHelper.consoleLog("CURRENT RAM USAGE: ".concat(usedMemoryPercentage.toFixed(2), "%"));
        return usedMemoryPercentage;
    };
    return BaseRunner;
}());
exports.BaseRunner = BaseRunner;
