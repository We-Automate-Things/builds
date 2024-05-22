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
        var _this = this;
        this.logHelper.consoleLog("SHUTTING DOWN 'SCRAPER ".concat(model, " - ").concat(site, "'"), states_1.States.WARNING);
        var scraperIndex = this.scrapers.findIndex(function (value) { return (value.model === model) && (value.chatsite === site); });
        if (scraperIndex !== -1) {
            this.logHelper.consoleLog("TRYING TO KILL ".concat(model, " - ").concat(site), states_1.States.WARNING);
            var processName_1 = "SCRAPER-".concat(model, "-").concat(site);
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
            this.channel.deleteQueue("SCRAPER-".concat(model, "-").concat(site));
            this.logHelper.consoleLog("QUEUE SCRAPER-".concat(model, "-").concat(site, " DELETED."), states_1.States.WARNING);
            this.scrapers.splice(scraperIndex, 1);
        }
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
                // max_memory_restart: "100M", // Optional: Restart if it exceeds 100MB
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
