
module.exports = {
  Topics:  [
    {
      TopicName: "PROBLEM_ADD",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "POST",
      Subscribers: [
        {
          Service: "IOT_SERVICE",
          Function: "InsertPROBLEM",
          OnSuccessTopicsToPush: ["PROBLEM_ADDED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "PROBLEM_ADD-IOT_SERVICE",
          QueueUrl:
            "https://sqs.us-east-2.amazonaws.com/915966410640/STUDENTS_ADD-IOT_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-east-2:915966410640:STUDENTS_ADD-IOT_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-east-2:915966410640:STUDENTS_ADD:5d630319-15d8-475d-a2ae-89e200ac0bc6",
        },
      ],
      TopicArn: "arn:aws:sns:us-east-2:915966410640:STUDENTS_ADD",
    },
    {
      TopicName: "PROBLEM_UPDATE",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "PUT",
      Subscribers: [
        {
          Service: "IOT_SERVICE",
          Function: "InsertPROBLEM",
          OnSuccessTopicsToPush: ["PROBLEM_UPDATED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "PROBLEM_UPDATE-IOT_SERVICE",
          QueueUrl:
            "https://sqs.us-east-2.amazonaws.com/915966410640/STUDENTS_ADD-IOT_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-east-2:915966410640:STUDENTS_ADD-IOT_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-east-2:915966410640:STUDENTS_ADD:5d630319-15d8-475d-a2ae-89e200ac0bc6",
        },
      ],
      TopicArn: "arn:aws:sns:us-east-2:915966410640:STUDENTS_ADD",
    },
    {
      TopicName: "PROBLEM_DELETE",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "DELETE",
      Subscribers: [
        {
          Service: "IOT_SERVICE",
          Function: "InsertPROBLEM",
          OnSuccessTopicsToPush: ["PROBLEM_DELETED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "PROBLEM_DELETE-IOT_SERVICE",
          QueueUrl:
            "https://sqs.us-east-2.amazonaws.com/915966410640/STUDENTS_ADD-IOT_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-east-2:915966410640:STUDENTS_ADD-IOT_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-east-2:915966410640:STUDENTS_ADD:5d630319-15d8-475d-a2ae-89e200ac0bc6",
        },
      ],
      TopicArn: "arn:aws:sns:us-east-2:915966410640:STUDENTS_ADD",
    }
  ]
};