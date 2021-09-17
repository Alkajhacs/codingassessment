const amqp = require('amqplib/callback_api');
const sendRabbitMQ = require('./rabbitMQ');

const rabbitMq = require('./rabbitMQ');

        let queueName = "guruQueue";
        let message = "this iss frm gatwayss gururaj";
        
        sendRabbitMQ(queueName,message);