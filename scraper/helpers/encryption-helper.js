"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionHelper = void 0;
var crypto_1 = __importDefault(require("crypto"));
var decryptError_1 = require("../exceptions/decryptError");
var exceptionStringEnums_1 = require("../exceptions/exceptionStringEnums");
var EncryptionHelper = /** @class */ (function () {
    function EncryptionHelper() {
        this.key = process.env.ENCRYPT_KEY;
    }
    EncryptionHelper.prototype.generateIVString = function () {
        var ivBuffer = crypto_1.default.randomBytes(16);
        var ivString = ivBuffer.toString("hex").slice(0, 16);
        this.iv = ivString;
        this.ivBase64 = Buffer.from(ivString).toString("base64");
    };
    EncryptionHelper.prototype.encryptValue = function (value) {
        var encryptor = crypto_1.default.createCipheriv("aes-256-cbc", this.key, this.iv);
        var encrypted = encryptor.update(value, "utf8", "base64") + encryptor.final("base64");
        var json = {
            "iv": this.ivBase64,
            "data": encrypted
        };
        return btoa(JSON.stringify(json));
    };
    EncryptionHelper.prototype.decryptValue = function (value) {
        if (value === null || typeof value === "undefined" || value === "") {
            throw new decryptError_1.DecryptError(exceptionStringEnums_1.ExceptionStringEnums.decryptionFail);
        }
        var decryptedBody = JSON.parse(value);
        var ivBuffer = Buffer.from(decryptedBody.iv, "base64");
        var iv = ivBuffer.subarray(0, 16);
        var decipher = crypto_1.default.createDecipheriv("aes-256-cbc", this.key, iv);
        return Buffer.concat([
            decipher.update(decryptedBody.data, "base64"), // Expect `text` to be a base64 string
            decipher.final()
        ]).toString();
    };
    return EncryptionHelper;
}());
exports.EncryptionHelper = EncryptionHelper;
