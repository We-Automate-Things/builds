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
var amqp = __importStar(require("amqplib"));
var child_process_1 = require("child_process");
var dotenv_1 = __importDefault(require("dotenv"));
var os_1 = __importDefault(require("os"));
var pm2_1 = __importDefault(require("pm2"));
var tasks_1 = require("./enums/tasks");
var states_1 = require("./enums/states");
var log_helper_1 = require("./log-helper");
dotenv_1.default.config({ path: "".concat(__dirname, "/.env") });
var logHelper = new log_helper_1.LogHelper();
var queue = "MANAGE_SCRAPERS";
var scrapers = [];
var connection;
var channel;
function executeInNewTerminalWindows(command, model, site) {
    logHelper.consoleLog("STARTING 'SCRAPER FOR ".concat(model, " - ").concat(site, "'"), states_1.States.SUCCESS);
    var cmd = "cmd.exe";
    var args = ["/c", command];
    var cwd = "".concat(process.cwd(), "/../chat-scraper"); // Adjust the cwd as needed
    var cmdProcess = (0, child_process_1.spawn)(cmd, args, {
        detached: true,
        cwd: cwd,
        stdio: "ignore" // Redirects all stdio to /dev/null or NUL
    });
    scrapers.push({
        model: model,
        chatsite: site,
        pid: cmdProcess.pid,
        platform: os_1.default.platform(),
    });
}
function executeInPM2(model, site) {
    // Connect to the PM2 daemon
    pm2_1.default.connect(function (err) {
        if (err) {
            logHelper.consoleLog("Error connecting to PM2: ".concat(err), states_1.States.ERROR);
            process.exit(2);
        }
        var pm2ID;
        // Start the secondary application
        pm2_1.default.start({
            script: "/var/apps/scraper/main.js", // Path to the secondary app script
            name: "".concat(model, "-").concat(site, "-SCRAPER"), // Name of the secondary app
            exec_mode: "fork", // Or 'cluster' if needed
            // max_memory_restart: "100M", // Optional: Restart if it exceeds 100MB
            args: [model, site] // Arguments passed to the script
            // eslint-disable-next-line @typescript-eslint/no-shadow
        }, function (err) {
            scrapers.push({
                model: model,
                chatsite: site,
                pid: null,
                platform: os_1.default.platform(),
            });
            if (err) {
                logHelper.consoleLog("Error starting application: ".concat(err), states_1.States.ERROR);
                pm2_1.default.disconnect(); // Disconnects from PM2
                process.exit(2);
            }
            logHelper.consoleLog("SCRAPER SUCCESSFULLY STARTED ".concat(model, " - ").concat(site, " "), states_1.States.SUCCESS);
            pm2_1.default.disconnect(); // Disconnects from PM2
        });
    });
}
function killScraper(modelId, chatsite) {
    return __awaiter(this, void 0, void 0, function () {
        var scraperIndex, scraper, processName_1;
        return __generator(this, function (_a) {
            logHelper.consoleLog("SHUTTING DOWN 'SCRAPER ".concat(modelId, " - ").concat(chatsite, "'"), states_1.States.WARNING);
            scraperIndex = scrapers.findIndex(function (value) { return (value.model === modelId) && (value.chatsite === chatsite); });
            if (scraperIndex !== -1) {
                scraper = scrapers[scraperIndex];
                if (scraper.platform === "win32") {
                    // For Windows, use taskkill command
                    (0, child_process_1.spawn)("taskkill", ["/pid", scraper.pid.toString(), "/f", "/t"]);
                    logHelper.consoleLog("SCRAPER ".concat(modelId, " - ").concat(chatsite, " SHUTDOWN"), states_1.States.SUCCESS);
                }
                else {
                    logHelper.consoleLog("TRYING TO KILL ".concat(modelId, " - ").concat(chatsite), states_1.States.WARNING);
                    processName_1 = "".concat(modelId, "-").concat(chatsite, "-SCRAPER");
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
                            pm2_1.default.delete(pmId, function (err, proc) {
                                if (err) {
                                    console.error("Error killing process '".concat(processName_1, "':"), err);
                                    pm2_1.default.disconnect();
                                    process.exit(2);
                                }
                                console.log("Process '".concat(processName_1, "' killed successfully."));
                                pm2_1.default.disconnect();
                            });
                        });
                    });
                }
                scrapers.splice(scraperIndex, 1);
            }
            else {
                logHelper.consoleLog("SCRAPER ".concat(modelId, " - ").concat(chatsite, " not found"), states_1.States.ERROR);
            }
            return [2 /*return*/];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logHelper.consoleLog("INITIATING SCRAPER LAUNCHER");
                    return [4 /*yield*/, amqp.connect("amqp://".concat(process.env.HOST))];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.createChannel()];
                case 2:
                    channel = _a.sent();
                    return [4 /*yield*/, channel.assertQueue(queue)];
                case 3:
                    _a.sent();
                    setInterval(function () {
                        logHelper.consoleLog("WAITING FOR MESSAGES", states_1.States.PACKAGE);
                    }, 1000 * 60);
                    channel.consume(queue, function (msg) {
                        if (msg !== null) {
                            var json = JSON.parse(msg.content.toString());
                            var job = json.job;
                            logHelper.consoleLog("CONSUMED MESSAGE: ".concat(job), states_1.States.PACKAGE);
                            channel.ack(msg);
                            switch (job) {
                                case tasks_1.Tasks.ACTIVATE_SCRAPER: {
                                    var token = "".concat(json.data.modelId, " ").concat(json.data.chatSiteId);
                                    var model = json.data.modelId;
                                    var site = json.data.chatSiteId;
                                    var command = "";
                                    if (process.env.IS_PRODUCTION === "TRUE") {
                                        executeInPM2(model, site);
                                    }
                                    else {
                                        command = "".concat(process.env.START_COMMAND, " -p ").concat(token);
                                        executeInNewTerminalWindows(command, model, site);
                                    }
                                    break;
                                }
                                case tasks_1.Tasks.KILL_SCRAPER: {
                                    var model = json.data.modelId;
                                    var site = json.data.chatSiteId;
                                    killScraper(model, site);
                                    break;
                                }
                                default: {
                                    logHelper.consoleLog("INVALID TASK TYPE RECEIVED: ".concat(job), states_1.States.ERROR);
                                }
                            }
                        }
                    });
                    logHelper.consoleLog("AWAITING MESSAGES IN QUEUE", states_1.States.PACKAGE);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    logHelper.consoleLog("Error in main function: ".concat(error), states_1.States.ERROR);
});
