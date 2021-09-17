import { RabbitMQ_Utility } from "./RabbitMQ_Utility";

var rabbitmq = RabbitMQ_Utility.getInstance();

rabbitmq.listenToService('STUDENTS_ADD','IOT_SERVICE',()=>{})