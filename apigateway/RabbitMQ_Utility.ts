//using config file as per environment

import { stringify } from "querystring";

const amqp = require('amqplib/callback_api');
const amqplib = require('amqplib');

const fs = require("fs");
//const amqp = require('amqplib/callback_api');
const path = require("path");
var jwt = require("jsonwebtoken");
var os = require("os");
let RABBIT_URL = 'amqp://localhost';
//let channels: Array<any> = new Array<any>();
let channel_temp: any;
interface QueueURLMapValue {
    OnSuccessExchangesToPush: string[];
    OnFailureExchangesToPush: string[];
}
//using config file as per environment
let environment = process.env.NODE_ENV;
let configFileName = `config-${environment}`;
require('custom-env').env(environment);
console.log(configFileName);
if (!environment) {
  console.log("no environment specified using default i.e local environment");
  configFileName = "config-local";
}
// const configData = require(`./${configFileName}`);
const configData = require("C:/Users/Public/Documents/Backend/api-gateway/config/config-local.ts");

var amqp_url = 'amqp://localhost:5672';
var rkey = 'test_route';
export class RabbitMQ_Utility {
    [x: string]: any;
    private static instance: RabbitMQ_Utility;
    private exchangeARNMap: { [id: string]: string } = {};
    private queueURLMap: { [id: string]: QueueURLMapValue } = {};
    private serviceMethodExchangesMap: { [id: string]: string[] } = {};

    private constructor() {
        this.init_AWS_RABBITMQ();
    }

    public static getInstance(): RabbitMQ_Utility {
        if (!RabbitMQ_Utility.instance) {
            RabbitMQ_Utility.instance = new RabbitMQ_Utility();
        }
        return RabbitMQ_Utility.instance;
    }

    private async init_AWS_RABBITMQ() {
        let exchanges = configData.Exchanges;
        for (let i = 0; i < exchanges.length; i++) {
            let exchange = exchanges[i];
            let exchangeName = exchange.TopicName;
            let subscribers = exchange.Subscribers;
            let method = exchange.Method;
            //this.exchangeARNMap[exchangeName] = exchangeArn;
            for (let j = 0; j < subscribers.length; j++) {
                let subscriber = subscribers[j];
                let queueName = subscriber.QueueName;
                //let queueUrl = subscriber.QueueUrl;
                let serviceName = subscriber.Service;
                let serviceMethodKey = serviceName + "-" + method;
                if (method !== "UNKNOWN") {
                    if (serviceMethodKey in this.serviceMethodExchangesMap) {
                        this.serviceMethodExchangesMap[serviceMethodKey].push(exchangeName);
                    } else {
                        this.serviceMethodExchangesMap[serviceMethodKey] = [exchangeName];
                    }
                }
                let queueURLMapValue = {
                    //QueueUrl: queueUrl,
                    OnSuccessExchangesToPush: subscriber.OnSuccessExchangesToPush,
                    OnFailureExchangesToPush: subscriber.OnFailureExchangesToPush,
                };
                this.queueURLMap[queueName] = queueURLMapValue;
            }
        }
    }

    public publishMessageToExchanges(
        serviceName: string,
        exchangeName: string,
        methodName: string,
        message: any,
        id: string
    ) {
        // let exchangeNames = this.serviceMethodExchangesMap[
        //   serviceName + "-" + methodName
        // ];
        // for (let i = 0; i < exchangeNames.length; i++) {
        //   let vExchangeName = exchangeNames[i];
        //   if (vExchangeName === exchangeName) {
        var resp = this.publishMessageToExchange(exchangeName, message, id);
        return resp;
        //   }
        // }
    }


    public async publishMessageToExchange(exchangeName, message, id) {
        console.log("Publishing");
        var conn = await amqplib.connect(RABBIT_URL, "heartbeat=60");
        var ch = await conn.createChannel();
        await ch.assertExchange(exchangeName, 'fanout', { durable: true }).catch(console.error);
        // await ch.assertQueue(queueName, {durable: true});
        // await ch.bindQueue(queueName, exchangeName, rkey);
        let jsondata = JSON.parse(message);
        jsondata.Id = id;
        let newdata = JSON.stringify(jsondata);
        console.log('message is : '+message);
        await ch.publish(exchangeName,'',  Buffer.from(newdata));
        setTimeout(function () {
            ch.close();
            conn.close();
        }, 500);
    }



    public async listenToService(exchangeName, serviceName, callBack) {
        var queueURLMapValue = this.queueURLMap[exchangeName + "-" + serviceName];
        // var queueUrl = queueURLMapValue.QueueUrl;
        var queueName = exchangeName+ '-' +serviceName;
        var receiveMessageParams = {
            //QueueUrl: queueUrl,
            MaxNumberOfMessages: 10,

        };


        function getMessages() {
            console.log(queueURLMapValue);
            RabbitMQ_Utility.recieveRabbitMQ(queueName, receiveMessageCallback);
        }

        function receiveMessageCallback(err, data) {
            if (data && data.Messages && data.Messages.length > 0) {
                for (var i = 0; i < data.Messages.length; i++) {
                    //do something with the message here
                    callBack({
                        message: JSON.parse(JSON.parse(data.Messages[i].Body).Message),


                        OnSuccessExchangesToPush: queueURLMapValue.OnSuccessExchangesToPush,
                        OnFailureExchangesToPush: queueURLMapValue.OnSuccessExchangesToPush,
                    });
                    // Delete the message when we've successfully processed it
                    var deleteMessageParams = {
                        //QueueUrl: queueUrl,
                        ReceiptHandle: data.Messages[i].ReceiptHandle,
                    };
                    //sqs.deleteMessage(deleteMessageParams, deleteMessageCallback);
                }
                getMessages();
            } else {
                setTimeout(getMessages, 10);
            }
        }


        setTimeout(getMessages, 10);
    }

    /**
      listen to services
    */
    public listenToServices(serviceName, callback) {
        let exchanges = configData.Exchanges;
        for (let i = 0; i < exchanges.length; i++) {
            let exchange = exchanges[i];
            let exchangeName = exchange.ExchangeName;
            let subscribers = exchange.Subscribers;
            for (let j = 0; j < subscribers.length; j++) {
                let subscriber = subscribers[j];
                let vServiceName = subscriber.Service;
                if (vServiceName === serviceName) {
                    this.listenToService(exchangeName, serviceName, callback);
                }
            }
        }
    }


    public static async recieveRabbitMQ(queueName, receiveMessageCallback: (err: any, data: any) => void) {
        var conn = await amqplib.connect(amqp_url, "heartbeat=60");
        var ch = await conn.createChannel()
        await conn.createChannel();
        await ch.assertQueue(queueName, { durable: true });
        await ch.consume(queueName, function (msg) {
            console.log(msg.content.toString());
            ch.ack(msg);
            ch.cancel('myconsumer');
        }, { consumerTag: 'myconsumer' });
        setTimeout(function () {
            ch.close();
            conn.close();
        }, 500);
    }
}
