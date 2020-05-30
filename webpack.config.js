var ZipPlugin = require('zip-webpack-plugin');
// Import path for resolving file paths
var path = require('path');
module.exports = {
    // Specify the entry point for our app
    entry: [
        './awsAuth.js',
        //'./awsSignUp.js',
    ],
    // Specify the output file containing our bundled code
    output: {
        filename: 'awsAuth.js',
        //filename: 'awsSignUp.js',
    },
    // Let webpack know to generate a Node.js bundle
    target: "node",
    module: {
        /**
          * Tell webpack how to load JSON files.
          * When webpack encounters a 'require()' statement
          * where a JSON file is being imported, it will use
          * the json-loader
          */
    },
    plugins: [
        new ZipPlugin({
            filename: './dist/awsAuth.zip',
            //filename: './dist/awsSignUp.zip',
        })
    ]
}