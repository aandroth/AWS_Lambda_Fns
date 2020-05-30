const AWS = require('aws-sdk');
const AWScognito = require('./AWSCognito.js');
global.fetch = require('node-fetch').default;
import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

async function awsSignUp(event, context) {//nickname, email, password, navigation) => {
    var date = new Date();
    var timestamp = date.getTime();
    console.log("Top 'o the function to you!");
    console.log("pool and client ID: " + AWScognito.UserPoolId + ", " + AWScognito.ClientId);
    let userPool = new CognitoUserPool(AWScognito);
    let attributeList=[];
    let dataNickname = {
        Name: 'nickname',
        Value: event.nickname
    };
    let attributeNickname = new CognitoUserAttribute(dataNickname);
    attributeList.push(attributeNickname);

    console.log("Above dataEmail declaration, uses event.email");
    let dataEmail = {
        Name: 'email',
        Value: event.email
    };
    let attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    console.log("Above userPool.signUp declaration, uses event.email and event.password");
    userPool.signUp(event.email, event.password, attributeList, null, (err, result) => {
    if (err) {
        //Alert.alert(
        //'Sign Up Error',
        //`${err.message}`,
        //[
        //    {text: 'Try Again'}
        //],
        //{cancelable: false}
        //);
        console.log("awsSignUp encountered errors" + err);
        return "Sign up error";
    }
    else {
        let user = result.user;
        //nav.navigate('Verification', {
        //user: user,
        //email: event.email,
        //password: event.password
        //});
        console.log("awsSignUp had no errors");
        return "awsSignUp had no errors";
    }
    });
    console.log("End of awsSignUp reached");
    return "End of awsSignUp reached";
};

exports.handler = awsSignUp;