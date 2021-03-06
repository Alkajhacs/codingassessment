
module.exports = {
    Exchanges:  [
      {
        ExchangeName: "PROBLEM_ADD",
        Publishers: ["API_GATEWAY_SERVICE"],
        Method: "POST",
        Subscribers: [
          {
            Service: "PROBLEM_SERVICE",
            Function: "InsertPROBLEM",
            OnSuccessExchangesToPush: ["PROBLEM_ADDED"],
            OnFailureExchangesToPush: ["ERROR_RECEIVER"],
            QueueName: "PROBLEM_ADD-PROBLEM_SERVICE",
          },
        ],
       },
       {
         ExchangeName: "PROBLEM_ADDED",
         Publishers: ["PROBLEM_SERVICE"],
         Method: "UNKNOWN",
         Subscribers: [
           {
             Service: "PROBLEM_SERVICE",
             Function: "SendSTUDENTAddedNotificationToAdmin",
             OnSuccessExchangesToPush: ["NOTIFICATION_ADDED"],
             OnFailureExchangesToPush: ["ERROR_RECEIVER"],
             QueueName: "PROBLEM_ADDED-PROBLEM_SERVICE",
           },
           {
             Service: "API_GATEWAY_SERVICE",
             Function: "FunctionNameToAcknowledgeUIHandle",
             OnSuccessExchangesToPush: [],
             OnFailureExchangesToPush: ["ERROR_RECEIVER"],
             QueueName: "PROBLEM_ADDED-API_GATEWAY_SERVICE",
           }],
       },
       {
        ExchangeName: "PROBLEM_UPDATE",
        Publishers: ["API_GATEWAY_SERVICE"],
        Method: "POST",
        Subscribers: [
          {
            Service: "PROBLEM_SERVICE",
            Function: "InsertPROBLEM",
            OnSuccessExchangesToPush: ["PROBLEM_UPDATE"],
            OnFailureExchangesToPush: ["ERROR_RECEIVER"],
            QueueName: "PROBLEM_UPDATE-PROBLEM_SERVICE",
          },
        ],
       },
       {
         ExchangeName: "PROBLEM_UPDATED",
         Publishers: ["PROBLEM_SERVICE"],
         Method: "UNKNOWN",
         Subscribers: [
           {
             Service: "PROBLEM_SERVICE",
             Function: "SendSTUDENTAddedNotificationToAdmin",
             OnSuccessExchangesToPush: ["NOTIFICATION_UPDATED"],
             OnFailureExchangesToPush: ["ERROR_RECEIVER"],
             QueueName: "PROBLEM_UPDATED-PROBLEM_SERVICE",
           },
           {
             Service: "API_GATEWAY_SERVICE",
             Function: "FunctionNameToAcknowledgeUIHandle",
             OnSuccessExchangesToPush: [],
             OnFailureExchangesToPush: ["ERROR_RECEIVER"],
             QueueName: "PROBLEM_UPDATED-API_GATEWAY_SERVICE",
           }],
       },
       {
        ExchangeName: "PROBLEM_DELETE",
        Publishers: ["API_GATEWAY_SERVICE"],
        Method: "POST",
        Subscribers: [
          {
            Service: "PROBLEM_SERVICE",
            Function: "InsertPROBLEM",
            OnSuccessExchangesToPush: ["PROBLEM_DELETED"],
            OnFailureExchangesToPush: ["ERROR_RECEIVER"],
            QueueName: "PROBLEM_DELETE-PROBLEM_SERVICE",
          },
        ],
       },
       {
         ExchangeName: "PROBLEM_DELETED",
         Publishers: ["PROBLEM_SERVICE"],
         Method: "UNKNOWN",
         Subscribers: [
           {
             Service: "PROBLEM_SERVICE",
             Function: "SendSTUDENTAddedNotificationToAdmin",
             OnSuccessExchangesToPush: ["NOTIFICATION_DELETEED"],
             OnFailureExchangesToPush: ["ERROR_RECEIVER"],
             QueueName: "PROBLEM_DELETED-PROBLEM_SERVICE",
           },
           {
             Service: "API_GATEWAY_SERVICE",
             Function: "FunctionNameToAcknowledgeUIHandle",
             OnSuccessExchangesToPush: [],
             OnFailureExchangesToPush: ["ERROR_RECEIVER"],
             QueueName: "PROBLEM_DELETED-API_GATEWAY_SERVICE",
           }],
       }
    ]
  };