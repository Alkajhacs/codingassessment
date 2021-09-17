"use strict";
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
        while (_) try {
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
exports.__esModule = true;
//const fs = require("fs");
var configureRabbitMq_1 = require("./configureRabbitMq");
var fs = require("fs");
//const {createExchange , createQueue } = require('C:/Workspace/rabbit mq/atpl-api-api_gateway/configureRabbitMq');
//import 'createExchange,createQueue' from "./configureRabbitMq";
//var createQueue = require('./c');
var configData = require('C:/Users/Public/Documents/Backend/api-gateway/config/config-local.ts');
var initProject = function () { return __awaiter(void 0, void 0, void 0, function () {
    var exchanges, i, exchange, exchangeName, subscribers, exchangeArn, j, subscriber, serviceName, queueName, queueUrl, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exchanges = configData.Exchanges;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < exchanges.length)) return [3 /*break*/, 7];
                exchange = exchanges[i];
                exchangeName = exchange.ExchangeName;
                subscribers = exchange.Subscribers;
                console.log('creating exchange : ' + exchangeName);
                return [4 /*yield*/, configureRabbitMq_1.createExchange(exchangeName)];
            case 2:
                exchangeArn = _a.sent();
                j = 0;
                _a.label = 3;
            case 3:
                if (!(j < subscribers.length)) return [3 /*break*/, 6];
                subscriber = subscribers[j];
                serviceName = subscriber.Service;
                queueName = exchangeName + "-" + serviceName;
                console.log('creating queue : ' + queueName);
                return [4 /*yield*/, configureRabbitMq_1.createQueue(queueName, exchangeName)];
            case 4:
                queueUrl = _a.sent();
                subscriber.QueueName = queueName;
                _a.label = 5;
            case 5:
                j++;
                return [3 /*break*/, 3];
            case 6:
                i++;
                return [3 /*break*/, 1];
            case 7:
                data = JSON.stringify((configData), null, 2);
                fs.writeFileSync("C:/Users/Public/Documents/Backend/api-gateway/config/config-localq.json", data);
                return [2 /*return*/];
        }
    });
}); };
initProject();
