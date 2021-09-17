import { DtoBase } from "./submodules/atpl-api-Dtos/submodules/atpl-api-common/DtoBase";
import { ResponseModel } from "./submodules/atpl-api-Dtos/submodules/atpl-api-common/ResponseModel";
import { RequestModel, RequestModelQuery } from "./submodules/atpl-api-Dtos/submodules/atpl-api-common/RequestModel";

const express = require("express");
const https = require('https');
const fs2 = require('fs');

const options = {
  key: fs2.readFileSync('private.key'),
  cert: fs2.readFileSync('certificate.crt'),
  ca: fs2.readFileSync('ca_bundle.crt')
};

const http = require("http");

const cors = require("cors");
const socketIo = require("socket.io");
import  {Dictionary}  from "dictionaryjs";
let environment = process.env.NODE_ENV;
const port = 4000;
const index = require("./routes/index");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(index);
app.options("*", cors());
app.use(cors());
const server = https.createServer(options ,app);

var sockets = [];

let activeConnectionDict = new Dictionary();
let socketAndDeviceDict = new Dictionary();


let configFileName = `config-${environment}`;


console.log(configFileName);
if (!environment) {
  console.log("no environment specified using default i.e local environment");
  configFileName = "config-local";
}




var messageToUi = "";


import { SNS_SQS } from "./submodules/atpl-api-AWS/SNS_SQS";
var sns_sqs = SNS_SQS.getInstance();


import { RabbitMQ_Utility } from "./RabbitMQ_Utility";

const serviceHostResolver = {
  IOT_SERVICE: process.env.IOT_SERVICE,
  IOTSERVICE: process.env.IOTSERVICE

};

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "HEAD", "OPTIONS"],
    allowedHeaders: ["my-custom-header"],
    credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("client connected with id: ", socket.id);

 
  sockets.push(socket);

  var i = 0;

  activeConnectionDict.set(socket.id, socket);
  console.log("number of client connected : "+ String(activeConnectionDict.length));

  activeConnectionDict.set(socket.id, socket);
  console.log("number of client connected : "+ String(activeConnectionDict.length));
  

  
  socket.emit("socketIdFromServer", { socket_id: socket.id });
  socket.on("disconnect", () => {

    console.log("Client disconnected");

    activeConnectionDict.remove(socket.id);
    console.log("number of client connected : "+ String(activeConnectionDict.length));

    if (socketAndDeviceDict.has(socket.id) === true) {
      activeConnectionDict.remove(socket.id);
      console.log("number of client connected : "+ String(activeConnectionDict.length));



      }
  
      
      socketAndDeviceDict.remove(socket.id);

    socket.disconnect(true);
  

  });
 });

//  app.get("/course", async (req: any, res: any) => {

//   request('http://localhost:4002/course',  (error, response, body) => {
//         if(error) {
//             // If there is an error, tell the user 
//             res.send('An erorr occured')
//         }
//         // Otherwise do something with the API data and send a response
//         else {
//             res.send(JSON.parse(body))
//         }
//     });

// })


 





app.post("/:servicename/:service", async (req:any, res:any) => {


  let requestBody: RequestModel<any> = req.body;
 

  

  let method_name = "POST";
  let service_name = req.params.servicename;
  let exchangeName = req.params.service + "_ADD";
  let id = 5;
  let message = JSON.stringify(requestBody);
  //console.log(message);
  var  myres = sns_sqs.publishMessageToTopics(
    service_name,
    exchangeName,
    method_name,
    message, id
  );
  
  res.status(200).send({ message: "request has been taken" });
  
});


app.delete("/:servicename/:service/:id", async (req, res) => {

  let requestBody: RequestModel<any> = req.body;
  let referer = req.headers["referer"];
  let authorization = req.headers["authorization"];
  requestBody.CommunityUrl = referer;
  requestBody.token = authorization;
  let message = JSON.stringify(requestBody);
  console.log("message: ", message)
  let method_name = "DELETE";
  let id = req.params.id;
  let service_name = req.params.servicename;
  let exchangeName = req.params.service + "_DELETE";
  sns_sqs.publishMessageToTopics(
    service_name,
    exchangeName,
    method_name,
    message,
    id
  );
  res.status(200).send({ message: "request has been taken" });
});

app.put("/:servicename/:service/:id", async (req, res) => {


  let requestBody: RequestModel<any> = req.body;
  let referer = req.headers["referer"];
  let authorization = req.headers["authorization"];
  requestBody.CommunityUrl = referer;
  requestBody.token = authorization;

  let method_name = "PUT";
  let service_name = req.params.servicename;
  let exchangeName = req.params.service + "_UPDATE";
  let id = req.params.id;
  let message = JSON.stringify(requestBody);

  sns_sqs.publishMessageToTopics(
    service_name,
    exchangeName,
    method_name,
    message, id
  );
  res.status(200).send({ message: "request has been taken" });
});

server.listen(port, () => {
  console.log(process.env.IOT_SERVICE);
  var noOfSocket = 1;
  sns_sqs.listenToServices(noOfSocket,"IOT_SERVICE", (result: { message: any; }) => {
    let { message } = result;
    console.log(message);
    //getting the browser socket to hom the response needs to be send
    let vSocket: any = activeConnectionDict.get(message.SocketId);
    if (vSocket) {
      console.log("response to client to call call back function", message);
      vSocket.emit("successResponseFromServer", message);
    }
  });
  sns_sqs.listenToServices(noOfSocket,"ERROR_RECEIVER", (result: { message: any; }) => {
    let { message } = result;
    console.log(message);
    let vSocket: any = activeConnectionDict.get(message.SocketId);
    if (vSocket) {
      vSocket.emit("errorResponseFromServer", message);
    }
  });
  console.log(`Listening on port ${port}`);
});


