module.exports = fn => function (event, context, callback) {
    // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
    context.callbackWaitsForEmptyEventLoop = false;

    fn().
        then(res => {
            callback(null, {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify(res)
            });
            console.log('done');
        }).
        catch(error => callback(error));
};