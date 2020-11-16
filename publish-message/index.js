const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const sqs = new AWS.SQS();

exports.handler = async (event) => {
    try {
        await sqs.sendMessage({
            // All messages in SQS MUST be a String
            MessageBody: JSON.stringify({
                name: 'pepe'
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
