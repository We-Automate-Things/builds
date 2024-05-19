"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionStringEnums = void 0;
var ExceptionStringEnums;
(function (ExceptionStringEnums) {
    ExceptionStringEnums["initiateInvalidParameterModelId"] = "Missing correct initialization parameter model ID, killing the process.";
    ExceptionStringEnums["initiateInvalidParameterChatsiteId"] = "Missing correct initialization parameter chatsite ID, killing the process.";
    ExceptionStringEnums["initiateFailToLaunchScraper"] = "Could not launch the correct scraper: ";
    ExceptionStringEnums["decryptionFail"] = "Could not decrypt value, the value supplied is incorrect.";
})(ExceptionStringEnums || (exports.ExceptionStringEnums = ExceptionStringEnums = {}));
