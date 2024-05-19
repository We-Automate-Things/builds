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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FancentroScraper = void 0;
var base_scraper_1 = require("./base-scraper");
var tasks_1 = require("../enums/tasks");
var states_1 = require("../enums/states");
var FancentroScraper = /** @class */ (function (_super) {
    __extends(FancentroScraper, _super);
    function FancentroScraper(browserAgent, modelCredential, privateKey, modelId, chatsiteName) {
        var _this = _super.call(this, browserAgent, modelCredential, privateKey, modelId, chatsiteName) || this;
        _this.consoleLog("INITIATING FANCETRO");
        return _this;
    }
    FancentroScraper.prototype.signInModelOnChatSite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var websiteUrl, validSignIn, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        websiteUrl = "https://fancentro.com/login";
                        return [4 /*yield*/, this.pageOne.goto(websiteUrl)];
                    case 1:
                        _b.sent();
                        this.consoleLog("INSERTING CREDENTIALS");
                        return [4 /*yield*/, this.pageOne.getByPlaceholder("Your email").fill(this.modelCredentials.user_account)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.getByPlaceholder("Password").fill(this.modelCredentials.password)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.getByRole("button", { name: "Sign in" }).click()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.resolveCaptchaCodes()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.validateSignIn()];
                    case 6:
                        validSignIn = _b.sent();
                        if (!validSignIn) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.handlePopup()];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.retrieveContent()];
                    case 8:
                        _b.sent();
                        setInterval(function () {
                            _this.getAllNewEarnings();
                            _this.removeInactiveModelChats();
                        }, 15000);
                        _b.label = 9;
                    case 9:
                        if (!(this.task != tasks_1.Tasks.KILL_SCRAPER)) return [3 /*break*/, 18];
                        _a = this.task;
                        switch (_a) {
                            case tasks_1.Tasks.FORCE_CONTENT_REFRESH: return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.retrieveContent()];
                    case 11:
                        _b.sent();
                        this.task = tasks_1.Tasks.NO_TASK;
                        return [3 /*break*/, 17];
                    case 12:
                        this.consoleLog("LOADING MESSAGES");
                        return [4 /*yield*/, this.pageOne.goto("https://fancentro.com/admin/messages")];
                    case 13:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(10000)];
                    case 14:
                        _b.sent();
                        return [4 /*yield*/, this.interactWithChat()];
                    case 15:
                        _b.sent();
                        this.consoleLog("RESET FOR LOCATING NEW CHATS", states_1.States.WARNING);
                        return [4 /*yield*/, this.pageOne.goto("https://fancentro.com/admin/messages")];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17: return [3 /*break*/, 9];
                    case 18:
                        this.consoleLog("SHUTTING DOWN SCRAPER", states_1.States.WARNING);
                        return [4 /*yield*/, this.stopTaskManagement()];
                    case 19:
                        _b.sent();
                        this.consoleLog("SCRAPER SHUTDOWN", states_1.States.WARNING);
                        process.exit();
                        _b.label = 20;
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.validateSignIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isCaptchaPresent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageOne.getByTitle("reCAPTCHA").count()];
                    case 1:
                        isCaptchaPresent = _a.sent();
                        if (!(isCaptchaPresent > 0)) return [3 /*break*/, 4];
                        this.consoleLog("SECOND CAPTCHA SPOTTED", states_1.States.WARNING);
                        return [4 /*yield*/, this.resolveCaptchaCodes()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.validateSignIn()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        this.consoleLog("NO CAPTCHAS LEFT", states_1.States.SUCCESS);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FancentroScraper.prototype.interactWithChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newMessages, _i, newMessages_1, username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.locateNewChats()];
                    case 1:
                        newMessages = _a.sent();
                        _i = 0, newMessages_1 = newMessages;
                        _a.label = 2;
                    case 2:
                        if (!(_i < newMessages_1.length)) return [3 /*break*/, 6];
                        username = newMessages_1[_i];
                        return [4 /*yield*/, this.pageOne.getByText(username).first().click()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.readChatMessages(username)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [4 /*yield*/, this.sendChatMessages()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.sendChatContent()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.resolveCaptchaCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.consoleLog("SEARCHING IFRAME");
                        return [4 /*yield*/, this.pageOne.waitForSelector("iframe[title='reCAPTCHA']")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(5000)];
                    case 2:
                        _a.sent();
                        this.consoleLog("SPOTTED CAPTCHA", states_1.States.SUCCESS);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        return [4 /*yield*/, this.pageOne.waitForTimeout(5000)];
                    case 4:
                        _a.sent();
                        this.consoleLog("START SOLVING", states_1.States.PACKAGE);
                        // @ts-except-error SolveRecaptchas exists due to injection in the main.ts, Typescript pageOne define does not see this.
                        return [4 /*yield*/, this.pageOne.solveRecaptchas()];
                    case 5:
                        // @ts-except-error SolveRecaptchas exists due to injection in the main.ts, Typescript pageOne define does not see this.
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(5000)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        this.consoleLog(error_1, states_1.States.ERROR);
                        return [3 /*break*/, 8];
                    case 8:
                        this.consoleLog("CLICKED SIGN IN");
                        return [4 /*yield*/, this.pageOne.getByRole("button", { name: "Sign in" }).click()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(10000)];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.locateNewChats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var activeChats, newChats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageOne.locator(".MuiButtonBase-root.MuiCardActionArea-root").allInnerTexts()];
                    case 1:
                        activeChats = _a.sent();
                        newChats = [];
                        activeChats.forEach(function (chat) {
                            var slicedChat = chat.split("\n");
                            var username = slicedChat[1] === "" ? slicedChat[0] : slicedChat[1];
                            var hasNewChats = false;
                            var newMessageCounter = slicedChat[slicedChat.length - 1];
                            if (newMessageCounter !== undefined && !isNaN(Number(newMessageCounter))) {
                                hasNewChats = true;
                            }
                            if (hasNewChats) {
                                newChats.push(username);
                            }
                        });
                        return [2 /*return*/, newChats];
                }
            });
        });
    };
    FancentroScraper.prototype.readChatMessages = function (userIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, modelChat, _a, lastSendMessages, lastProcessedMessage, chat, messagesForApi, lastProcessedMessageIndex, newMessages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.consoleLog("ALLOCATING CHAT MESSAGES");
                        return [4 /*yield*/, this.pageOne.waitForSelector(".formBlock")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(1500)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.evaluate(function () {
                                var tds = Array.from(document.querySelectorAll("span.text"));
                                return tds.map(function (td) {
                                    // @ts-expect-error This does exist on the element
                                    return td.innerText;
                                });
                            })];
                    case 3:
                        messages = _b.sent();
                        modelChat = this.modelChats.find(function (chat) { return chat.userIdentifier === userIdentifier; });
                        if (!(modelChat === undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.modelChatsService.postFetchChatInformation("username", userIdentifier, this.modelId, "FANCENTRO")];
                    case 4:
                        _a = _b.sent(), lastSendMessages = _a[0], lastProcessedMessage = _a[1];
                        chat = {
                            userIdentifier: userIdentifier,
                            latestMessagesSendByUs: lastSendMessages,
                            lastProcessedMessage: lastProcessedMessage,
                            startedAt: Date.now(),
                            updatedAt: Date.now()
                        };
                        this.modelChats.push(chat);
                        modelChat = chat;
                        console.log(modelChat);
                        _b.label = 5;
                    case 5:
                        messagesForApi = [];
                        lastProcessedMessageIndex = messages.indexOf(modelChat.lastProcessedMessage);
                        if (lastProcessedMessageIndex === -1) {
                            // If the last processed message is not found in the incoming messages,
                            // it means all messages are new, so process all of them.
                            messages.forEach(function (message) {
                                if (!modelChat.latestMessagesSendByUs.includes(message)) {
                                    var apiMessage = {
                                        message: message,
                                        warning: (modelChat.latestMessagesSendByUs.length <= 0)
                                    };
                                    messagesForApi.push(apiMessage);
                                }
                            });
                        }
                        else {
                            newMessages = messages.slice(lastProcessedMessageIndex + 1);
                            newMessages.forEach(function (message) {
                                // Ensuring that we do not include messages send by us gets send back.
                                if (!modelChat.latestMessagesSendByUs.includes(message)) {
                                    var apiMessage = {
                                        message: message,
                                        warning: (modelChat.latestMessagesSendByUs.length <= 0)
                                    };
                                    messagesForApi.push(apiMessage);
                                }
                            });
                        }
                        // Update the last processed message
                        if (messagesForApi.length > 0) {
                            modelChat.lastProcessedMessage = messagesForApi[messagesForApi.length - 1].message;
                            modelChat.updatedAt = Date.now();
                        }
                        this.updateModelChatViaIdentifier(userIdentifier, modelChat);
                        this.consoleLog("SENDING UNPROCESSED MESSAGES TO API");
                        return [4 /*yield*/, this.modelChatsService.postModelChats("username", userIdentifier, messagesForApi, this.modelId, "FANCENTRO")];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.removeInactiveModelChats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentTime, tenMinutesInMillis;
            var _this = this;
            return __generator(this, function (_a) {
                currentTime = Date.now();
                tenMinutesInMillis = 10 * 60 * 1000;
                this.modelChats.forEach(function (chat, index) {
                    if (currentTime - chat.updatedAt > tenMinutesInMillis) {
                        _this.modelChats.splice(index, 1);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ;
    FancentroScraper.prototype.sendChatMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unprocessedMessages, _loop_1, this_1, _i, unprocessedMessages_1, unprocessedMessageInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.consoleLog("RETRIEVING MESSAGES TO BE SEND TO THE CLIENTS");
                        return [4 /*yield*/, this.modelChatsService.postFetchChatsAsModel(this.modelId, "FANCENTRO")];
                    case 1:
                        unprocessedMessages = _a.sent();
                        _loop_1 = function (unprocessedMessageInfo) {
                            var _b, _c, message, modelChat, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        _e.trys.push([0, 6, , 7]);
                                        return [4 /*yield*/, this_1.pageOne.getByText(unprocessedMessageInfo.client_identifier_value).click()];
                                    case 1:
                                        _e.sent();
                                        _b = 0, _c = unprocessedMessageInfo.messages;
                                        _e.label = 2;
                                    case 2:
                                        if (!(_b < _c.length)) return [3 /*break*/, 5];
                                        message = _c[_b];
                                        return [4 /*yield*/, this_1.sendMessage(message)];
                                    case 3:
                                        _e.sent();
                                        _e.label = 4;
                                    case 4:
                                        _b++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        modelChat = this_1.modelChats.find(function (chat) { return chat.userIdentifier === unprocessedMessageInfo.client_identifier_value; });
                                        if (unprocessedMessageInfo.messages.length > 0) {
                                            modelChat.lastProcessedMessage = unprocessedMessageInfo.messages[unprocessedMessageInfo.messages.length - 1];
                                        }
                                        this_1.updateModelChatViaIdentifier(unprocessedMessageInfo.client_identifier_value, modelChat);
                                        return [3 /*break*/, 7];
                                    case 6:
                                        _d = _e.sent();
                                        return [3 /*break*/, 7];
                                    case 7: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, unprocessedMessages_1 = unprocessedMessages;
                        _a.label = 2;
                    case 2:
                        if (!(_i < unprocessedMessages_1.length)) return [3 /*break*/, 5];
                        unprocessedMessageInfo = unprocessedMessages_1[_i];
                        return [5 /*yield**/, _loop_1(unprocessedMessageInfo)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.sendChatContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unprocessedSales, _i, unprocessedSales_1, unprocessedSaleInfo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.consoleLog("RETRIEVING CONTENT TO BE SENT TO CLIENTS");
                        return [4 /*yield*/, this.contentInfoService.postFetchContentAsModel(this.modelId, "FANCENTRO")];
                    case 1:
                        unprocessedSales = _b.sent();
                        if (!(unprocessedSales.length > 0)) return [3 /*break*/, 8];
                        _i = 0, unprocessedSales_1 = unprocessedSales;
                        _b.label = 2;
                    case 2:
                        if (!(_i < unprocessedSales_1.length)) return [3 /*break*/, 8];
                        unprocessedSaleInfo = unprocessedSales_1[_i];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this.pageOne.getByText(unprocessedSaleInfo.client_identifier_value).click()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.createSale(unprocessedSaleInfo.tags, unprocessedSaleInfo.price)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _a = _b.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageOne.waitForSelector(".DraftEditor-root")];
                    case 1: return [4 /*yield*/, (_a.sent()).click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.keyboard.type(message, { delay: 80 })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator("[type=submit]").click()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.createSale = function (tags, price) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, tags_1, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageOne.getByTestId("chat-action-button").click()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.getByText("Add from Vault").click()];
                    case 2:
                        _a.sent();
                        _i = 0, tags_1 = tags;
                        _a.label = 3;
                    case 3:
                        if (!(_i < tags_1.length)) return [3 /*break*/, 10];
                        tag = tags_1[_i];
                        return [4 /*yield*/, this.pageOne.getByPlaceholder("Search by ‘#’, keywords, or captions").click()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.keyboard.type(tag, { delay: 80 })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".MuiPaper-elevation1>button").click()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".MuiGrid-grid-xs-4>div>div>span>span:not(.fc-member-a24_011)").click()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".MuiChip-deleteIcon").click()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 3];
                    case 10: return [4 /*yield*/, this.locateButtonBasedOnSpanText("Add")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator("button", { has: this.pageOne.getByText("FREE") }).click()];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.getByPlaceholder("Enter unlock price").click()];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.keyboard.type(price, { delay: 80 })];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, this.locateButtonBasedOnSpanText("Lock")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(1000)];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".MuiDialog-container").count()];
                    case 17:
                        if (!((_a.sent()) > 0)) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.pageOne.locator(".MuiDialog-container>div>div>label>span>span>input").check()];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.getByTestId("price-reminder-submit").click()];
                    case 19:
                        _a.sent();
                        _a.label = 20;
                    case 20: return [4 /*yield*/, this.pageOne.locator("[type=submit]").click()];
                    case 21:
                        _a.sent();
                        this.consoleLog("SENDING SALE TO CUSTOMER");
                        return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.locateButtonBasedOnSpanText = function (spanText) {
        return __awaiter(this, void 0, void 0, function () {
            var buttonLocator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buttonLocator = this.pageOne.locator("button:has(span:has(span:text-is(\"".concat(spanText, "\")))"));
                        if (!buttonLocator) return [3 /*break*/, 2];
                        return [4 /*yield*/, buttonLocator.click()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.retrieveContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.consoleLog("RETRIEVING CONTENT TAGS");
                        return [4 /*yield*/, this.pageOne.goto("https://fancentro.com/admin/uploads/tags")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(3000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.retrieveContentByTag()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.retrieveTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageOne.locator("span").filter({ hasText: "chickflix-", hasNotText: "#" }).allInnerTexts()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FancentroScraper.prototype.createUniqueArray = function (knownArray, visibleAray) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, knownArray.concat(visibleAray).filter(function (item) {
                        return !(knownArray.includes(item) && visibleAray.includes(item));
                    })];
            });
        });
    };
    FancentroScraper.prototype.retrieveContentByTag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var knownContent, tagsList, unknownTags, contentObjects, _i, unknownTags_1, tag, imgs, playButtonIcon, contentType, imgSrc, _a, imgs_1, img, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.consoleLog("RETRIEVING CONTENT BY TAG PER TAG");
                        return [4 /*yield*/, this.pageOne.waitForTimeout(2000)];
                    case 1:
                        _b.sent();
                        this.consoleLog("RETRIEVING KNOWN CONTENT TAGS FROM API");
                        return [4 /*yield*/, this.contentInfoService.getKnownTags(this.modelId, this.chatsiteId)];
                    case 2:
                        knownContent = _b.sent();
                        return [4 /*yield*/, this.retrieveTags()];
                    case 3:
                        tagsList = _b.sent();
                        return [4 /*yield*/, this.createUniqueArray(knownContent, tagsList)];
                    case 4:
                        unknownTags = _b.sent();
                        contentObjects = [];
                        if (!(unknownTags.length !== 0)) return [3 /*break*/, 22];
                        this.consoleLog("NEW TAGS FOUND");
                        _i = 0, unknownTags_1 = unknownTags;
                        _b.label = 5;
                    case 5:
                        if (!(_i < unknownTags_1.length)) return [3 /*break*/, 20];
                        tag = unknownTags_1[_i];
                        this.consoleLog("WAITING 3 SECONDS TO CLICK");
                        return [4 /*yield*/, this.pageOne.waitForTimeout(3000)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.locator("span").filter({ hasText: tag, hasNotText: "#" }).click()];
                    case 7:
                        _b.sent();
                        this.consoleLog("WAITING 3 SECONDS FOR ALL IMAGES TO LOAD");
                        return [4 /*yield*/, this.pageOne.waitForTimeout(3000)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.locator("img").filter({ hasNot: this.pageOne.getByAltText("model") }).all()];
                    case 9:
                        imgs = _b.sent();
                        return [4 /*yield*/, this.pageOne.$(".fc-member-a24_011")];
                    case 10:
                        playButtonIcon = _b.sent();
                        contentType = "";
                        if (playButtonIcon) {
                            contentType = "video";
                        }
                        else {
                            contentType = "photo";
                        }
                        imgSrc = null;
                        _a = 0, imgs_1 = imgs;
                        _b.label = 11;
                    case 11:
                        if (!(_a < imgs_1.length)) return [3 /*break*/, 14];
                        img = imgs_1[_a];
                        return [4 /*yield*/, img.getAttribute("src")];
                    case 12:
                        imgSrc = _b.sent();
                        _b.label = 13;
                    case 13:
                        _a++;
                        return [3 /*break*/, 11];
                    case 14:
                        if (!imgSrc) return [3 /*break*/, 19];
                        _b.label = 15;
                    case 15:
                        _b.trys.push([15, 18, , 19]);
                        contentObjects.push({
                            tag: tag.toString(),
                            url: imgSrc.toString(),
                            content_type: contentType.toString(),
                        });
                        this.consoleLog("WAITING 2 SECONDS TO GO BACK");
                        return [4 /*yield*/, this.pageOne.waitForTimeout(2000)];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.goBack()];
                    case 17:
                        _b.sent();
                        return [3 /*break*/, 19];
                    case 18:
                        error_2 = _b.sent();
                        return [2 /*return*/, error_2];
                    case 19:
                        _i++;
                        return [3 /*break*/, 5];
                    case 20:
                        this.consoleLog("SENDING UNPROCESSED CONTENT INFO TO API");
                        return [4 /*yield*/, this.contentInfoService.postContentInfo(contentObjects, this.modelId, this.chatsiteId)];
                    case 21:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 22:
                        this.consoleLog("NO NEW TAGS FOUND");
                        _b.label = 23;
                    case 23: return [2 /*return*/, contentObjects];
                }
            });
        });
    };
    FancentroScraper.prototype.fetchEarningsData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, tableData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.pageTwo.waitForSelector("#transaction-list", { timeout: 5000 })];
                    case 1:
                        (_a.sent());
                        return [4 /*yield*/, this.pageTwo.$$eval("#main-container table thead tr td", function (tds) {
                                return tds.map(function (td) { return td.textContent.trim(); });
                            })];
                    case 2:
                        headers = _a.sent();
                        return [4 /*yield*/, this.pageTwo.$$eval("#transaction-list tr", function (rows, headers) {
                                return rows.map(function (tr) {
                                    var cells = Array.from(tr.querySelectorAll("td"));
                                    var rowData = {};
                                    cells.forEach(function (cell, index) {
                                        var header = headers[index];
                                        var value = cell.textContent.trim();
                                        var fieldsForApi = ["Date", "Username", "Type", "Gross"];
                                        // Adjust the header as needed to match the desired output structure
                                        switch (header) {
                                            case "Gross Gross Profit - is the total amount of transactions made by fans.":
                                                header = "Gross";
                                                break;
                                            default:
                                        }
                                        if (fieldsForApi.includes(header)) {
                                            header = header.toLowerCase().replace(/.*\s/, "");
                                            var pattern = new RegExp("^".concat(header, "(:?\\s\\$)?\\s*"), "i");
                                            value = value.replace(pattern, "");
                                            rowData[header] = value;
                                        }
                                    });
                                    return rowData;
                                });
                            }, headers)];
                    case 3:
                        tableData = _a.sent();
                        return [2 /*return*/, tableData];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.getAllNewEarnings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tableData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.context.newPage()];
                    case 1:
                        _a.pageTwo = _b.sent();
                        this.consoleLog("RETRIEVING ALL NEW EARNINGS");
                        return [4 /*yield*/, this.pageTwo.goto("https://fancentro.com/admin/transactions")];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.fetchEarningsData()];
                    case 3:
                        tableData = _b.sent();
                        if (!(this.previousSalesCount < tableData.length && tableData.length !== 0)) return [3 /*break*/, 5];
                        this.previousSalesCount = tableData.length;
                        this.consoleLog("SEND NEW SALES TO API");
                        return [4 /*yield*/, this.salesService.postTableDataToValidate(tableData, this.chatsiteId, this.modelId)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.consoleLog("NO NEW SALES DETECTED", states_1.States.WARNING);
                        _b.label = 6;
                    case 6: return [4 /*yield*/, this.pageTwo.close()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FancentroScraper.prototype.handlePopup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isOverlaying, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        this.consoleLog("CHECKING FOR POPUPS");
                        return [4 /*yield*/, this.pageOne.waitForSelector("#splash-overlay", { timeout: 2000 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.evaluate(function () {
                                var popup = document.querySelector("#splash-overlay");
                                var popupRect = popup.getBoundingClientRect();
                                return popupRect.width >= window.innerWidth && popupRect.height >= window.innerHeight;
                            })];
                    case 2:
                        isOverlaying = _a.sent();
                        if (!isOverlaying) return [3 /*break*/, 5];
                        this.consoleLog("FULLSCREEN POPUP FOUND, RESOLVING POPUP");
                        return [4 /*yield*/, this.pageOne.waitForSelector(".splash-popup")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".splash-popup>div>div>a").first().click()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        this.consoleLog("SMALL POPUP FOUND, RESOLVING POPUP");
                        return [4 /*yield*/, this.pageOne.waitForSelector(".splash-popup")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".splash-popup>div>div>a").first().click()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_2 = _a.sent();
                        this.consoleLog("NO POPUP DETECTED");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // OBSOLETE UNTIL USECASE 1+ WEEK SALES VALIDATION
    FancentroScraper.prototype.selectDates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datepickers, parentOrAncestorDiv, selects, applyButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageTwo.$$(".date-picker-wrapper")];
                    case 1:
                        datepickers = _a.sent();
                        return [4 /*yield*/, datepickers[0].click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, datepickers[0].evaluateHandle(function (el) { return el.closest("#period-selector"); })];
                    case 3:
                        parentOrAncestorDiv = _a.sent();
                        return [4 /*yield*/, parentOrAncestorDiv.$$("div > div > div > select")];
                    case 4:
                        selects = _a.sent();
                        return [4 /*yield*/, parentOrAncestorDiv.$$("div > div > button")];
                    case 5:
                        applyButton = _a.sent();
                        if (!(selects.length >= 2)) return [3 /*break*/, 7];
                        return [4 /*yield*/, selects[0].selectOption({ value: "1" })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, applyButton[1].click()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.pageTwo.waitForTimeout(2000)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FancentroScraper;
}(base_scraper_1.baseScraper));
exports.FancentroScraper = FancentroScraper;
