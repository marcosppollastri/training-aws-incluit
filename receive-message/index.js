exports.handler = async (event) => {
    try {
        const output = event.Records.map(record => record.body);

        console.log('Received messages: ', output);

        return {
            statusCode: 200,
            body: JSON.stringify(output)
        };
    }
    catch (err) {
        console.log(err);

        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};