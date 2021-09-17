//using config file as per environment
let environment = process.env.NODE_ENV;
let configFileName = `config-${environment}`;

let dict_rabbit_mq_connections:Array<Object>;

dict_rabbit_mq_connections = new Array<Object>();




const amqp = require('amqplib/callback_api');
require('custom-env').env(environment);
console.log(configFileName);
if (!environment) {
  console.log("no environment specified using default i.e local environment");
  configFileName = "config-local";
}
const configData = require(`./${configFileName}`);
const fs = require("fs");




const path = require("path");
var jwt = require("jsonwebtoken");
var os = require("os");




interface QueueURLMapValue {
  OnSuccessExchangesToPush: string[];
  OnFailureExchangesToPush: string[];
  }


export class rabbitMqclass {
  [x: string]: any;
  private static instance: rabbitMqclass;
  private exchangeARNMap: { [id: string]: string } = {};
  private queueURLMap: { [id: string]: QueueURLMapValue } = {};
  private serviceMethodExchangesMap: { [id: string]: string[] } = {};

  private constructor() {
    this.init_AWS_RABBITMQ();
  } 

  public static getInstance(): rabbitMqclass {
    if (!rabbitMqclass.instance) {
      rabbitMqclass.instance = new rabbitMqclass();
    }
    return rabbitMqclass.instance;
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
        var resp = this.publishMessageToExchange(exchangeName, message,id);
        return resp ;
    //   }
    // }
  }

 
  public async publishMessageToExchange(exchangeName ,message , id) {
    // Create connection
 // Create connection
 amqp.connect('amqp://localhost', (err, conn) => {
   // Create channel
   conn.createChannel((err, ch) => {
     // Name of the exchange
     const ex = exchangeName;
     // Write a message
     const msg = message;
     // Declare the exchange
     ch.assertExchange(ex, 'fanout', { durable: false }) // 'fanout' will broadcast all messages to all the queues it knows
 
     // Send message to the exchange
     ch.publish(ex, '', Buffer.from(msg))  // '' empty string means that message will not be sent to a specific queue
     console.log(` {x} Sent '${msg}'`)
 
     // Close the connection and exit
     setTimeout(() => {
       conn.close()
       process.exit(0)
     }, 500)
   })
 })
 }
  public async listenToService(exchangeName, serviceName, callBack) {
    var queueURLMapValue = this.queueURLMap[exchangeName + "-" + serviceName];
   // var queueUrl = queueURLMapValue.QueueUrl;

    var receiveMessageParams = {
      //QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      
    };
   

    function getMessages() {
      //sqs.receiveMessage(receiveMessageParams, receiveMessageCallback);
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

    function deleteMessageCallback(err, data) { }

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
  
    public  sendRabbitMQ(queueName, data,id) {
    const rabbitUrl = 'amqp://localhost';
    amqp.connect(rabbitUrl, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = queueName;
            let jsondata = JSON.parse(data);
            jsondata.Id = id;
            let newdata = JSON.stringify(jsondata);
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(newdata));

            console.log(" [x] Sent %s", newdata);
        });
        setTimeout(function () {
            connection.close();
            //process.exit(0);
        }, 500);
    });
}

public  recieveRabbitMQ(queueName) {

  amqp.connect(`amqp://localhost`, (error0, connection) => {
      if (error0) {
  
          throw error0;
      }
      connection.createChannel((error1, channel) => {
          if (error1) {
  
              throw error1;
          }
          let queue = queueName;
  
          channel.assertQueue(queue, {
              durable: false
          });
          channel.consume(queue, (msg) => {
              console.log(`recieved : ${msg.content.toString()}`);
               let message= msg.content.toString();
              channel.ack(msg);
            
              
          }, {
              noAck: false
  
          })
      })
     
  });
}

}