const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const sns = new AWS.SNS();

exports.handler = async (event) => {
    try {
        // BTW: Bad practice: Using one try/catch for everything 🙈
        // Get the records we are handling from this event
        const output = event.Records.map(record => record.body);

        console.log('Received messages: ', output);

        // Send a notification to SNS for each message
        await Promise.all(
            output.map(
                body => sns.publish({
                    Message: body,
                    TopicArn: 'arn:aws:sns:us-east-1:437051718508:pepe',
                }).promise()
            )
        );

        console.log('Delivered message to SNS');

        // Status code 200 means we were successful
        // Successful handling removes the message from the queue
        return {
            statusCode: 200,
            body: JSON.stringify(output)
        };
    }
    catch (err) {
        console.log(err);

        // If status code is > 200 we tell SQS the handling was incorrect
        // This way the message goes back to the queue to be processed again
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};