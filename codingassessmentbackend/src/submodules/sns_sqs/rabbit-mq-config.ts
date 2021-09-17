module.exports = {
  Topics: [
    {
      TopicName: "PROBLEM_ADD",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "POST",
      Subscribers: [
        {
          Service: "PROBLEM_SERVICE",
          Function: "InsertChannel",
          OnSuccessTopicsToPush: ["PROBLEM_ADDED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "PROBLEM_ADD-PROBLEM_SERVICE",
          QueueUrl:
            "https://sqs.us-west-2.amazonaws.com/938510084600/CHANNEL_ADD-CHANNEL_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-west-2:938510084600:CHANNEL_ADD-CHANNEL_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD:93840f93-3401-4798-9a3b-5a2f63c0eb17",
        },
      ],
      TopicArn: "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD",
    },
    {
      TopicName: "PROBLEM_UPDATE",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "POST",
      Subscribers: [
        {
          Service: "PROBLEM_SERVICE",
          Function: "InsertChannel",
          OnSuccessTopicsToPush: ["PROBLEM_UPDATED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "PROBLEM_UPDATE-PROBLEM_SERVICE",
          QueueUrl:
            "https://sqs.us-west-2.amazonaws.com/938510084600/CHANNEL_ADD-CHANNEL_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-west-2:938510084600:CHANNEL_ADD-CHANNEL_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD:93840f93-3401-4798-9a3b-5a2f63c0eb17",
        },
      ],
      TopicArn: "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD",
    },
    {
      TopicName: "PROBLEM_DELETE",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "POST",
      Subscribers: [
        {
          Service: "PROBLEM_SERVICE",
          Function: "InsertChannel",
          OnSuccessTopicsToPush: ["PROBLEM_DELETED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "PROBLEM_DELETE-PROBLEM_SERVICE",
          QueueUrl:
            "https://sqs.us-west-2.amazonaws.com/938510084600/CHANNEL_ADD-CHANNEL_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-west-2:938510084600:CHANNEL_ADD-CHANNEL_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD:93840f93-3401-4798-9a3b-5a2f63c0eb17",
        },
      ],
      TopicArn: "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD",
    },
    {
      TopicName: "TESTCASE_ADD",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "POST",
      Subscribers: [
        {
          Service: "TESTCASE_SERVICE",
          Function: "InsertChannel",
          OnSuccessTopicsToPush: ["TESTCASE_ADDED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "TESTCASE_ADD-TESTCASE_SERVICE",
          QueueUrl:
            "https://sqs.us-west-2.amazonaws.com/938510084600/CHANNEL_ADD-CHANNEL_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-west-2:938510084600:CHANNEL_ADD-CHANNEL_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD:93840f93-3401-4798-9a3b-5a2f63c0eb17",
        },
      ],
      TopicArn: "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD",
    },
    {
      TopicName: "TESTCASE_UPDATE",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "POST",
      Subscribers: [
        {
          Service: "TESTCASE_SERVICE",
          Function: "InsertChannel",
          OnSuccessTopicsToPush: ["TESTCASE_UPDATED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "TESTCASE_UPDATE-TESTCASE_SERVICE",
          QueueUrl:
            "https://sqs.us-west-2.amazonaws.com/938510084600/CHANNEL_ADD-CHANNEL_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-west-2:938510084600:CHANNEL_ADD-CHANNEL_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD:93840f93-3401-4798-9a3b-5a2f63c0eb17",
        },
      ],
      TopicArn: "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD",
    },
    {
      TopicName: "TESTCASE_DELETE",
      Publishers: ["API_GATEWAY_SERVICE"],
      Method: "POST",
      Subscribers: [
        {
          Service: "TESTCASE_SERVICE",
          Function: "InsertChannel",
          OnSuccessTopicsToPush: ["TESTCASE_DELETED"],
          OnFailureTopicsToPush: ["ERROR_RECEIVER"],
          QueueName: "TESTCASE_DELETE-TESTCASE_SERVICE",
          QueueUrl:
            "https://sqs.us-west-2.amazonaws.com/938510084600/CHANNEL_ADD-CHANNEL_SERVICE",
          QueueArn:
            "arn:aws:sqs:us-west-2:938510084600:CHANNEL_ADD-CHANNEL_SERVICE",
          SubscriptionArn:
            "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD:93840f93-3401-4798-9a3b-5a2f63c0eb17",
        },
      ],
      TopicArn: "arn:aws:sns:us-west-2:938510084600:CHANNEL_ADD",
    },

  ],
};
