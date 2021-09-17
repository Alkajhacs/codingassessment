//const fs = require("fs");
import { createExchange,createQueue } from "./configureRabbitMq";

import * as fs from "fs";


//const {createExchange , createQueue } = require('C:/Workspace/rabbit mq/atpl-api-api_gateway/configureRabbitMq');

//import 'createExchange,createQueue' from "./configureRabbitMq";
//var createQueue = require('./c');

const configData = require('C:/Users/Public/Documents/Backend/api-gateway/config/config-local.ts');
var initProject = async () => {
  
  let exchanges = configData.Exchanges;

  for (let i = 0; i < exchanges.length; i++) {
    let exchange = exchanges[i];
    let exchangeName = exchange.ExchangeName;
    let subscribers = exchange.Subscribers;
    console.log('creating exchange : ' + exchangeName);
    let exchangeArn = await createExchange(exchangeName);
    //exchange.ExchangeArn = exchangeArn;

    for (let j = 0; j < subscribers.length; j++) {
      let subscriber = subscribers[j];
      let serviceName = subscriber.Service;
      let queueName = exchangeName + "-" + serviceName;
      console.log('creating queue : ' + queueName);
      let queueUrl = await createQueue(queueName,exchangeName);
     
      
      subscriber.QueueName = queueName;

    }
  }
  let data = JSON.stringify((configData), null, 2);
 
  fs.writeFileSync("C:/Users/Public/Documents/Backend/api-gateway/config/config-localq.json", data);
};

initProject();
