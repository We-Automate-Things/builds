"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogHelper = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
var chalk_1 = __importDefault(require("chalk"));
var states_1 = require("./enums/states");
var LogHelper = /** @class */ (function () {
    function LogHelper() {
    }
    LogHelper.prototype.consoleLog = function (message, state) {
        if (state === void 0) { state = "INFO"; }
        chalk_1.default.level = 1;
        var date = new Date();
        var formattedDate = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
        switch (state) {
            case states_1.States.SUCCESS:
                console.log(chalk_1.default.green("".concat(formattedDate, " -  ").concat(message)));
                break;
            case states_1.States.WARNING:
                console.log(chalk_1.default.yellow("".concat(formattedDate, " -  ").concat(message)));
                break;
            case states_1.States.ERROR:
                console.log(chalk_1.default.red("".concat(formattedDate, " -  ").concat(message)));
                break;
            case states_1.States.PACKAGE:
                console.log(chalk_1.default.magenta("".concat(formattedDate, " -  ").concat(message)));
                break;
            default:
                console.log(chalk_1.default.cyan("".concat(formattedDate, " -  ").concat(message)));
        }
    };
    return LogHelper;
}());
exports.LogHelper = LogHelper;
