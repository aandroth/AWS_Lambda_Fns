const handler = require('./handler');
const AWS = require('aws-sdk');
import { AWScognito } from 'AWSCognito.js';
global.fetch = require('node-fetch').default;
import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

async function awsAuth(event, context) {//email, password, errorTitle, navigation, reduxFunc) {
    console.log("Top 'o the function to you! 12");

    let userPool = new CognitoUserPool(AWScognito.UserPoolId, AWScognito.ClientId);
    let authData = {
        Username: event.email,
        Password: event.password
    };
    let authDetails = new AuthenticationDetails(authData);

    let userData = {
        Username: event.email,
        Pool: userPool
    };
    let user = new CognitoUser(userData);
     
    console.log("Now authenticating the user");
    user.authenticateUser(authDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
        },
        onFailure: function (err) {
            console.log(err);
        },
    });
    console.log("Now past authenticating the user");

    return "Got to the end of the function with topper";
}

exports.handler = awsAuth;