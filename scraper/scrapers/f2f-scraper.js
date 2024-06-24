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
exports.F2fScraper = void 0;
var base_scraper_1 = require("./base-scraper");
var tasks_1 = require("../enums/tasks");
var states_1 = require("../enums/states");
var date_formatter_1 = require("../helpers/date-formatter");
var F2fScraper = /** @class */ (function (_super) {
    __extends(F2fScraper, _super);
    function F2fScraper(proxy, browserAgent, modelCredential, privateKey, modelId, chatsiteName) {
        var _this = _super.call(this, proxy, browserAgent, modelCredential, privateKey, modelId, chatsiteName) || this;
        _this.consoleLog("INITIATING F2F");
        return _this;
    }
    // all url's are examples and may be altered to the real ones
    F2fScraper.prototype.signInModelOnChatSite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var websiteUrl, validSignIn, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        websiteUrl = "https://f2f.com";
                        return [4 /*yield*/, this.pageOne.goto(websiteUrl)];
                    case 1:
                        _b.sent();
                        this.consoleLog("INSERTING CREDENTIALS");
                        return [4 /*yield*/, this.pageOne.locator("._8HzuwW_primary").click()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.locator("[type=email]").fill(this.modelCredentials.user_account)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.locator("[type=password]").fill(this.modelCredentials.password)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.locator(".qpejaG_buttons>._8HzuwW_primary").click()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(2000)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.validateSignIn()];
                    case 7:
                        validSignIn = _b.sent();
                        if (!validSignIn) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.handlePopup()];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.retrieveContent()];
                    case 9:
                        _b.sent();
                        setInterval(function () {
                            _this.getAllNewEarnings();
                            _this.removeInactiveModelChats();
                        }, 15000);
                        setInterval(function () {
                            // create new context in the retrieveContent method for opening new tab
                            _this.retrieveContent();
                        }, 60000 * 60 * 2); // Interval time may be altered later on.
                        _b.label = 10;
                    case 10:
                        if (!(this.task !== tasks_1.Tasks.KILL_SCRAPER)) return [3 /*break*/, 19];
                        _a = this.task;
                        switch (_a) {
                            case tasks_1.Tasks.FORCE_CONTENT_REFRESH: return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.retrieveContent()];
                    case 12:
                        _b.sent();
                        this.task = tasks_1.Tasks.NO_TASK;
                        return [3 /*break*/, 18];
                    case 13:
                        this.consoleLog("LOADING MESSAGES");
                        return [4 /*yield*/, this.pageOne.goto("https://f2f.com/messenger")];
                    case 14:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(10000)];
                    case 15:
                        _b.sent();
                        return [4 /*yield*/, this.interactWithChat()];
                    case 16:
                        _b.sent();
                        this.consoleLog("RESET FOR LOCATING NEW CHATS", states_1.States.WARNING);
                        return [4 /*yield*/, this.pageOne.goto("https://f2f.com/messenger")];
                    case 17:
                        _b.sent();
                        _b.label = 18;
                    case 18: return [3 /*break*/, 10];
                    case 19:
                        this.consoleLog("SHUTTING DOWN SCRAPER", states_1.States.WARNING);
                        return [4 /*yield*/, this.stopTaskManagement()];
                    case 20:
                        _b.sent();
                        this.consoleLog("SCRAPER SHUTDOWN", states_1.States.WARNING);
                        process.exit();
                        _b.label = 21;
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    F2fScraper.prototype.validateSignIn = function () {
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
    F2fScraper.prototype.interactWithChat = function () {
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
    F2fScraper.prototype.resolveCaptchaCodes = function () {
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
                        return [4 /*yield*/, this.pageOne.locator(".qpejaG_buttons>._8HzuwW_primary").click()];
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
    F2fScraper.prototype.locateNewChats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newChats, isEmptyChatList, unreadCountBadge_1, activeChats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newChats = [];
                        return [4 /*yield*/, this.pageOne.locator("._3zHb4W_emptyChatList").count()];
                    case 1:
                        isEmptyChatList = (_a.sent()) > 0;
                        if (!!isEmptyChatList) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.pageOne.locator("._3aEYGW_unreadCount").count()];
                    case 2:
                        unreadCountBadge_1 = (_a.sent()) > 0;
                        return [4 /*yield*/, this.pageOne.locator("._3aEYGW_wrapper").allInnerTexts()];
                    case 3:
                        activeChats = _a.sent();
                        activeChats.forEach(function (chat) {
                            var slicedChat = chat.split("\n");
                            var username = slicedChat[0];
                            var hasNewChats = false;
                            if (unreadCountBadge_1) {
                                var newMessageCounter = slicedChat[3];
                                if (newMessageCounter !== undefined && !Number.isNaN(Number(newMessageCounter))) {
                                    hasNewChats = true;
                                }
                            }
                            if (hasNewChats) {
                                newChats.push(username);
                            }
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        this.consoleLog("NO CHATS FOUND");
                        _a.label = 5;
                    case 5: return [2 /*return*/, newChats];
                }
            });
        });
    };
    F2fScraper.prototype.readChatMessages = function (userIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, modelChat, _a, lastSendMessages, lastProcessedMessage, chat, messagesForApi, lastProcessedMessageIndex, newMessages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.consoleLog("ALLOCATING CHAT MESSAGES");
                        return [4 /*yield*/, this.pageOne.waitForSelector(".mSVIxq_text")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.pageOne.evaluate(function () {
                                var tds = Array.from(document.querySelectorAll(".mSVIxq_text"));
                                var filteredTds = tds.filter(function (td) { return !td.querySelector("span.mSVIxq_icon"); });
                                return filteredTds.map(function (td) {
                                    // @ts-expect-error This does exist on the element
                                    return td.innerText;
                                });
                            })];
                    case 2:
                        messages = _b.sent();
                        modelChat = this.modelChats.find(function (chat) { return chat.userIdentifier === userIdentifier; });
                        if (!(modelChat === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.modelChatsService.postFetchChatInformation("username", userIdentifier, this.modelId, "F2F")];
                    case 3:
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
                        _b.label = 4;
                    case 4:
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
                        return [4 /*yield*/, this.modelChatsService.postModelChats("username", userIdentifier, messagesForApi, this.modelId, "F2F")];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    F2fScraper.prototype.removeInactiveModelChats = function () {
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
    F2fScraper.prototype.sendChatMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unprocessedMessages, _loop_1, this_1, _i, unprocessedMessages_1, unprocessedMessageInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.consoleLog("RETRIEVING MESSAGES TO BE SEND TO THE CLIENTS");
                        return [4 /*yield*/, this.modelChatsService.postFetchChatsAsModel(this.modelId, "F2F")];
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
    F2fScraper.prototype.sendChatContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unprocessedSales, _i, unprocessedSales_1, unprocessedSaleInfo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.consoleLog("RETRIEVING CONTENT TO BE SENT TO CLIENTS");
                        return [4 /*yield*/, this.contentInfoService.postFetchContentAsModel(this.modelId, "F2F")];
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
    F2fScraper.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageOne.waitForSelector("#message")];
                    case 1: return [4 /*yield*/, (_a.sent()).click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.keyboard.type(message, { delay: 80 })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator("._1aJM9a_send").click()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    F2fScraper.prototype.createSale = function (tags, price) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, tags_1, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageOne.locator("._1aJM9a_add").click()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".JJdPra_title").filter({ hasText: "Send media" }).click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator("._8HzuwW_primary").filter({ hasText: "Next" }).click()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".xhYF1W_addIcon").click()];
                    case 4:
                        _a.sent();
                        _i = 0, tags_1 = tags;
                        _a.label = 5;
                    case 5:
                        if (!(_i < tags_1.length)) return [3 /*break*/, 12];
                        tag = tags_1[_i];
                        return [4 /*yield*/, this.pageOne.locator(".BkDpRW_pickerSearch>input").click()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.keyboard.type(tag, { delay: 80 })];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.waitForTimeout(2000)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".OYFodq_image").first().click()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".BkDpRW_pickerSearch>input").fill("")];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 5];
                    case 12: return [4 /*yield*/, this.pageOne.locator("._8HzuwW_primary").filter({ hasText: "Next" }).first().click()];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator("._8HzuwW_primary").filter({ hasText: "Next" }).click()];
                    case 14:
                        _a.sent();
                        if (!(price !== undefined && !Number.isNaN(Number(price)))) return [3 /*break*/, 20];
                        if (!(Number(price) === 0)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.pageOne.locator(".JJdPra_title").filter({ hasText: "Free" }).click()];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 16: return [4 /*yield*/, this.pageOne.locator(".JJdPra_title").filter({ hasText: "Paid" }).click()];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator("#message-price").click()];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.keyboard.type(price, { delay: 80 })];
                    case 19:
                        _a.sent();
                        _a.label = 20;
                    case 20: return [4 /*yield*/, this.pageOne.locator("._8HzuwW_primary").filter({ hasText: "Create" }).click()];
                    case 21:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    F2fScraper.prototype.retrieveContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.context.newPage()];
                    case 1:
                        _a.pageThree = _b.sent();
                        this.consoleLog("RETRIEVING CONTENT TAGS");
                        return [4 /*yield*/, this.pageThree.goto("https://f2f.com/library/")];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.pageThree.waitForTimeout(3000)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.retrieveContentByTag()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.pageThree.close()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    F2fScraper.prototype.retrieveTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tags, posts, _i, posts_1, post, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tags = [];
                        return [4 /*yield*/, this.pageThree.$$('img[alt^="tag-"]')];
                    case 1:
                        posts = _a.sent();
                        _i = 0, posts_1 = posts;
                        _a.label = 2;
                    case 2:
                        if (!(_i < posts_1.length)) return [3 /*break*/, 5];
                        post = posts_1[_i];
                        return [4 /*yield*/, post.getAttribute("alt")];
                    case 3:
                        tag = _a.sent();
                        tags.push(tag);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, tags];
                }
            });
        });
    };
    F2fScraper.prototype.createUniqueArray = function (knownArray, visibleAray) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, knownArray.concat(visibleAray).filter(function (item) {
                        return !(knownArray.includes(item) && visibleAray.includes(item));
                    })];
            });
        });
    };
    // Function to scroll down the page
    F2fScraper.prototype.scrollDown = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var previousHeight, reachedEnd, currentHeight, i, currentHeight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.evaluate("document.body.scrollHeight")];
                    case 1:
                        previousHeight = _a.sent();
                        reachedEnd = false;
                        _a.label = 2;
                    case 2:
                        if (!!reachedEnd) return [3 /*break*/, 6];
                        return [4 /*yield*/, page.evaluate("window.scrollTo(0, document.body.scrollHeight)")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.waitForTimeout(1000)];
                    case 4:
                        _a.sent(); // Wait for the page to load more content
                        return [4 /*yield*/, page.evaluate("document.body.scrollHeight")];
                    case 5:
                        currentHeight = _a.sent();
                        if (currentHeight === previousHeight) {
                            reachedEnd = true;
                        }
                        else {
                            previousHeight = currentHeight;
                        }
                        return [3 /*break*/, 2];
                    case 6:
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < 2)) return [3 /*break*/, 12];
                        return [4 /*yield*/, page.evaluate("window.scrollTo(0, document.body.scrollHeight)")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, page.waitForTimeout(1000)];
                    case 9:
                        _a.sent(); // Wait for the page to load more content
                        return [4 /*yield*/, page.evaluate("document.body.scrollHeight")];
                    case 10:
                        currentHeight = _a.sent();
                        if (currentHeight !== previousHeight) {
                            reachedEnd = false;
                            previousHeight = currentHeight;
                            return [3 /*break*/, 12];
                        }
                        _a.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 7];
                    case 12:
                        if (reachedEnd) {
                            console.log("Confirmed: Reached the end of the page");
                        }
                        else {
                            console.log("Page still scrolls after additional checks");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    F2fScraper.prototype.retrieveContentByTag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentObjects, tagPrefix, tag, isVisible, imgSrc, isVideo, contentType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.consoleLog("RETRIEVING CONTENT");
                        contentObjects = [];
                        tagPrefix = "chickflix-";
                        tag = "";
                        isVisible = false;
                        this.consoleLog("WAITING FOR ALL IMAGES TO LOAD");
                        return [4 /*yield*/, this.scrollDown(this.pageThree)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageThree.waitForTimeout(1000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.pageThree.locator(".OYFodq_wrapper").first().click()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.pageThree.locator(".MN_X0W_mediaName").innerText()];
                    case 5:
                        tag = _a.sent();
                        return [4 /*yield*/, this.pageThree.locator(".swiper-slide-active>div>div>img").getAttribute("src")];
                    case 6:
                        imgSrc = _a.sent();
                        return [4 /*yield*/, this.pageThree.locator(".swiper-slide-active>div>._0lhlyq_playIcon").count()];
                    case 7:
                        isVideo = (_a.sent()) > 0;
                        contentType = "";
                        if (isVideo) {
                            contentType = "video";
                        }
                        else {
                            contentType = "photo";
                        }
                        try {
                            // if (tag.includes(tagPrefix))
                            contentObjects.push({
                                tag: tag.toString(),
                                url: imgSrc.toString(),
                                content_type: contentType.toString(),
                            });
                        }
                        catch (error) {
                            return [2 /*return*/, error];
                        }
                        this.consoleLog("GOING TO NEXT CONTENT");
                        return [4 /*yield*/, this.pageThree.locator(".swiper-button-next").click()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.isElementVisible(this.pageThree, "swiper-button-disabled")];
                    case 9:
                        // await this.pageThree.waitForTimeout(1000);
                        isVisible = _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!isVisible) return [3 /*break*/, 4];
                        _a.label = 11;
                    case 11:
                        this.consoleLog("SENDING UNPROCESSED CONTENT INFO TO API");
                        return [4 /*yield*/, this.contentInfoService.postContentInfo(contentObjects, this.modelId, this.chatsiteId)];
                    case 12:
                        _a.sent();
                        return [2 /*return*/, contentObjects];
                }
            });
        });
    };
    F2fScraper.prototype.isElementVisible = function (page, className) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.evaluate(function (className) {
                            var element = document.querySelector(".".concat(className));
                            if (element) {
                                var rect = element.getBoundingClientRect();
                                return rect.width > 0 && rect.height > 0;
                            }
                            return false;
                        }, className)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    F2fScraper.prototype.fetchEarningsData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transactions, tableData, _i, transactions_1, transaction, date, priceText, descriptionElement, descriptionClass, _a, typeFromDescription, payedBy, _b, _c, _d, _e, _f, _g, e_1;
            var _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, this.pageTwo.locator(".filter").filter({ hasText: "Pay per message" }).click()];
                    case 1:
                        _j.sent();
                        return [4 /*yield*/, this.pageTwo.locator(".filter").filter({ hasText: "Tips" }).click()];
                    case 2:
                        _j.sent();
                        return [4 /*yield*/, this.pageTwo.waitForTimeout(3000)];
                    case 3:
                        _j.sent();
                        _j.label = 4;
                    case 4:
                        _j.trys.push([4, 22, , 23]);
                        return [4 /*yield*/, this.pageTwo.waitForSelector("#transaction-list", { timeout: 3000 })];
                    case 5: return [4 /*yield*/, (_j.sent())];
                    case 6:
                        _j.sent();
                        return [4 /*yield*/, this.pageTwo.$$(".transaction")];
                    case 7:
                        transactions = _j.sent();
                        tableData = [];
                        _i = 0, transactions_1 = transactions;
                        _j.label = 8;
                    case 8:
                        if (!(_i < transactions_1.length)) return [3 /*break*/, 21];
                        transaction = transactions_1[_i];
                        return [4 /*yield*/, transaction.getAttribute("data-date")];
                    case 9:
                        date = _j.sent();
                        return [4 /*yield*/, transaction.$eval(".price", function (el) { return el.textContent; })];
                    case 10:
                        priceText = _j.sent();
                        return [4 /*yield*/, transaction.$(".description")];
                    case 11:
                        descriptionElement = _j.sent();
                        if (!descriptionElement) return [3 /*break*/, 13];
                        return [4 /*yield*/, descriptionElement.getAttribute("class")];
                    case 12:
                        _a = _j.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        _a = null;
                        _j.label = 14;
                    case 14:
                        descriptionClass = _a;
                        typeFromDescription = descriptionClass ? descriptionClass.split(" ").slice(1).join(" ") : undefined;
                        return [4 /*yield*/, transaction.$eval(".description", function (el) { return el.textContent; })];
                    case 15:
                        payedBy = _j.sent();
                        _c = (_b = tableData).push;
                        _h = {};
                        _d = "date";
                        return [4 /*yield*/, date_formatter_1.DateFormatter.formatDate(date)];
                    case 16:
                        _h[_d] = _j.sent();
                        _e = "price";
                        return [4 /*yield*/, this.removeUneccessarySymbols(priceText)];
                    case 17:
                        _h[_e] = _j.sent();
                        _f = "type";
                        return [4 /*yield*/, this.removeUneccessarySymbols(typeFromDescription)];
                    case 18:
                        _h[_f] = _j.sent();
                        _g = "username";
                        return [4 /*yield*/, this.removeUneccessarySymbols(payedBy)];
                    case 19:
                        _c.apply(_b, [(_h[_g] = _j.sent(),
                                _h)]);
                        _j.label = 20;
                    case 20:
                        _i++;
                        return [3 /*break*/, 8];
                    case 21: return [2 /*return*/, tableData];
                    case 22:
                        e_1 = _j.sent();
                        return [2 /*return*/, []];
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    F2fScraper.prototype.getAllNewEarnings = function () {
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
                        this.pageTwo.goto("https://f2f.com/accounts/earnings/");
                        return [4 /*yield*/, this.fetchEarningsData()];
                    case 2:
                        tableData = _b.sent();
                        if (!(this.previousSalesCount < tableData.length && tableData.length !== 0)) return [3 /*break*/, 4];
                        this.previousSalesCount = tableData.length;
                        this.consoleLog("SEND NEW SALES TO API");
                        return [4 /*yield*/, this.salesService.postTableDataToValidate(tableData, this.chatsiteId, this.modelId)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.consoleLog("NO NEW SALES DETECTED", states_1.States.WARNING);
                        _b.label = 5;
                    case 5: return [4 /*yield*/, this.pageTwo.close()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    F2fScraper.prototype.handlePopup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isOverlaying, isDateSelector, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 14]);
                        this.consoleLog("CHECKING FOR POPUPS");
                        return [4 /*yield*/, this.pageOne.waitForSelector("._21WiPW_overlay", { timeout: 2000 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.evaluate(function () {
                                var popup = document.querySelector("._21WiPW_overlay");
                                var popupRect = popup.getBoundingClientRect();
                                return popupRect.width >= window.innerWidth && popupRect.height >= window.innerHeight;
                            })];
                    case 2:
                        isOverlaying = _a.sent();
                        if (!isOverlaying) return [3 /*break*/, 9];
                        this.consoleLog("FULLSCREEN POPUP FOUND, RESOLVING POPUP");
                        return [4 /*yield*/, this.pageOne.waitForSelector("._21WiPW_popup")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator("._21WiPW_popup>div>div>div>div>div>input").count()];
                    case 4:
                        isDateSelector = (_a.sent()) > 0;
                        if (!isDateSelector) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.pageOne.locator("._21WiPW_popup>div>div>div>div>div>input").click()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".rdp-dropdown").selectOption({ value: "1980" })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".rdp-day").filter({ hasText: "1" }).click()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 12];
                    case 9:
                        this.consoleLog("SMALL POPUP FOUND, RESOLVING POPUP");
                        return [4 /*yield*/, this.pageOne.waitForSelector("._21WiPW_popup")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator("._21WiPW_popup>div>div>div>div>div>input").click()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        e_2 = _a.sent();
                        this.consoleLog("NO POPUP DETECTED");
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    F2fScraper.prototype.removeUneccessarySymbols = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var processedString, currencySignRegex;
            return __generator(this, function (_a) {
                processedString = input.replace(/\n\s+/g, "\n");
                processedString = processedString.replace(/\n/g, "");
                currencySignRegex = /[$€£¥₹₽₩₪]/g;
                processedString = processedString.replace(currencySignRegex, "");
                return [2 /*return*/, processedString];
            });
        });
    };
    F2fScraper.prototype.handleToastBlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isToastPresent, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.consoleLog("CHECKING FOR NEWS BLOCKS");
                        return [4 /*yield*/, this.pageOne.waitForSelector(".Toastify__toast-body", { timeout: 2000 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pageOne.locator(".Toastify__toast-body").count()];
                    case 2:
                        isToastPresent = (_a.sent()) > 0;
                        if (!isToastPresent) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.pageOne.locator("_8HzuwW_primary").filter({ hasText: "Understood" }).click()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        this.consoleLog("NO TOAST BLOCK FOUND");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // OBSOLETE UNTIL USECASE 1+ WEEK SALES VALIDATION
    F2fScraper.prototype.selectDates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datepickers, parentOrAncestorDiv, selects, applyButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageTwo.$$("")];
                    case 1:
                        datepickers = _a.sent();
                        return [4 /*yield*/, datepickers[0].click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, datepickers[0].evaluateHandle(function (el) { return el.closest("#period-selector"); })];
                    case 3:
                        parentOrAncestorDiv = _a.sent();
                        return [4 /*yield*/, parentOrAncestorDiv.$$("")];
                    case 4:
                        selects = _a.sent();
                        return [4 /*yield*/, parentOrAncestorDiv.$$("")];
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
    return F2fScraper;
}(base_scraper_1.baseScraper));
exports.F2fScraper = F2fScraper;
