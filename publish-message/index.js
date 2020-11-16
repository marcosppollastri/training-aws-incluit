const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const sqs = new AWS.SQS();

exports.handler = async (event) => {
    try {
        // All messages on SQS *MUST* be a String
        await sqs.sendMessage({
            MessageBody: JSON.stringify({
                name: event.name || 'Prueba'
            }),
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/437051718508/Pepe-queue'
        }).promise();
    }
    catch (err) {
        console.log(err);

        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }

    return { statusCode: 200 };
};
