"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.baseScraper = void 0;
var amqp = __importStar(require("amqplib"));
var chalk_1 = __importDefault(require("chalk"));
var model_chats_service_1 = require("../services/model-chats-service");
var content_info_service_1 = require("../services/content-info-service");
var tasks_1 = require("../enums/tasks");
var sales_service_1 = require("../services/sales-service");
var states_1 = require("../enums/states");
var baseScraper = /** @class */ (function () {
    function baseScraper(browserAgent, modelCredential, privateKey, modelId, chatsiteId) {
        this.previousSalesCount = 0;
        this.chromium = browserAgent;
        this.modelCredentials = modelCredential;
        this.privateKey = privateKey;
        this.modelChats = [];
        this.modelChatsService = new model_chats_service_1.ModelChatsService(this.privateKey);
        this.modelId = modelId;
        this.chatsiteId = chatsiteId;
        this.contentInfoService = new content_info_service_1.ContentInfoService(this.privateKey);
        this.salesService = new sales_service_1.SalesService(this.privateKey);
        this.task = "NO-TASK";
    }
    baseScraper.prototype.initiateScraperFlow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productionMode;
            var _this = this;
            return __generator(this, function (_a) {
                setInterval(function () {
                    // EVERY 5M LOGS THE RAM USAGE OF THIS SPECIFIC PROCESS
                    _this.logRamUsage();
                }, 60000 * 5);
                productionMode = (String(process.env.PRODUCTION_MODE).toLowerCase() === 'true');
                this.chromium.launch({ headless: productionMode }).then(function (browser) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                this.browser = browser;
                                _a = this;
                                return [4 /*yield*/, this.browser.newContext()];
                            case 1:
                                _a.context = _c.sent();
                                _b = this;
                                return [4 /*yield*/, this.context.newPage()];
                            case 2:
                                _b.pageOne = _c.sent();
                                this.setupTaskManagement();
                                return [4 /*yield*/, this.signInModelOnChatSite()];
                            case 3:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    baseScraper.prototype.setupTaskManagement = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, exchange;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, amqp.connect('amqp://localhost')];
                    case 1:
                        _a.connection = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.connection.createChannel()];
                    case 2:
                        _b.channel = _c.sent();
                        exchange = 'default';
                        this.queue = 'SCRAPER_' + this.modelId + '_' + this.chatsiteId;
                        this.routingKey = 'SCRAPER_' + this.modelId + '_' + this.chatsiteId;
                        return [4 /*yield*/, this.channel.assertExchange(exchange, 'direct', { durable: true })];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, this.channel.assertQueue(this.queue, { durable: true })];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, this.channel.bindQueue(this.queue, exchange, this.routingKey)];
                    case 5:
                        _c.sent();
                        this.channel.consume(this.queue, function (msg) {
                            if (msg !== null) {
                                var json = JSON.parse(msg.content.toString());
                                var job = json.job;
                                switch (job) {
                                    case tasks_1.Tasks.KILL_SCRAPER: {
                                        _this.task = tasks_1.Tasks.KILL_SCRAPER;
                                        break;
                                    }
                                    case tasks_1.Tasks.FORCE_CONTENT_REFRESH: {
                                        _this.task = tasks_1.Tasks.FORCE_CONTENT_REFRESH;
                                        break;
                                    }
                                    default: {
                                        _this.task = tasks_1.Tasks.NO_TASK;
                                    }
                                }
                                _this.channel.ack(msg);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    baseScraper.prototype.stopTaskManagement = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, message, queue, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 6]);
                        payload = {
                            displayName: "KILL_SCRAPER",
                            job: "KILL_SCRAPER",
                            maxTries: null,
                            maxExceptions: null,
                            failOnTimeout: false,
                            backoff: null,
                            timeout: null,
                            data: {
                                modelId: this.modelId,
                                chatSiteId: this.chatsiteId
                            },
                        };
                        message = JSON.stringify(payload);
                        queue = "MANAGE_SCRAPERS";
                        // Send the message to the task queue
                        return [4 /*yield*/, this.channel.deleteQueue(this.queue)];
                    case 1:
                        // Send the message to the task queue
                        _a.sent();
                        this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
                        this.consoleLog("QUEUE ".concat(this.queue, " DELETED."), states_1.States.WARNING);
                        return [3 /*break*/, 6];
                    case 2:
                        error_1 = _a.sent();
                        this.consoleLog("ERROR QUEUE DELETION OF ".concat(this.queue, ": ").concat(error_1.message), states_1.States.WARNING);
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.channel.close()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.connection.close()];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    baseScraper.prototype.logRamUsage = function () {
        var formatMemoryUsage = function (data) { return "".concat(Math.round(data / 1024 / 1024 * 100) / 100, " MB"); };
        var memoryData = process.memoryUsage();
        this.consoleLog("System RAM allocation ".concat(formatMemoryUsage(memoryData.rss)), states_1.States.SYSTEM);
        this.consoleLog("Current MBs Allocated: ".concat(formatMemoryUsage(memoryData.heapUsed), " - V8 External MBs Allocated: ").concat(formatMemoryUsage(memoryData.external)), states_1.States.SYSTEM);
    };
    baseScraper.prototype.updateModelChatViaIdentifier = function (id, updatedData) {
        this.modelChats = this.modelChats.map(function (item) { return (item.userIdentifier === id ? __assign(__assign({}, item), updatedData) : item); });
    };
    baseScraper.prototype.consoleLog = function (message, state) {
        if (state === void 0) { state = "INFO"; }
        chalk_1.default.level = 1;
        var date = new Date();
        var formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
        switch (state) {
            case states_1.States.SUCCESS:
                console.log(chalk_1.default.green("".concat(formattedDate, " - ").concat(message)));
                break;
            case states_1.States.WARNING:
                console.log(chalk_1.default.yellow("".concat(formattedDate, " - ").concat(message)));
                break;
            case states_1.States.ERROR:
                console.log(chalk_1.default.red("".concat(formattedDate, " - ").concat(message)));
                break;
            case states_1.States.PACKAGE:
            case states_1.States.SYSTEM:
                console.log(chalk_1.default.magenta("".concat(formattedDate, " - ").concat(message)));
                break;
            default:
                console.log(chalk_1.default.cyan("".concat(formattedDate, " - ").concat(message)));
        }
    };
    return baseScraper;
}());
exports.baseScraper = baseScraper;
