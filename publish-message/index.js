const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const sqs = new AWS.SQS();

exports.handler = async (event) => {
    try {
        let regex = /^\w+$/;
        let name = JSON.parse(event.body).name || null;
        if(name === undefined) {name = "";}
        if(name && regex.test(name)){
            await sqs.sendMessage({
                MessageBody: JSON.stringify({
                    name: event.name || 'Prueba'
                }),
                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/437051718508/Pepe-queue'
            }).promise();
        } else {
            console.log('El nombre solo puede ser alfanumerico');
            return {
                statusCode: 500,
                body: JSON.stringify({"message": "Nombre invalido"})
            }
        }
        // All messages on SQS *MUST* be a String

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
