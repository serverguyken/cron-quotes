const express = require('express');
const app = express();
const port = 3000 || process.env.PORT
const fetch = require('node-fetch');
const cron = require('node-cron')
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const client = require('twilio')(accountSid,authToken);


    async function getQuotes(url) {
        let quotes = [];
        let response = fetch(url);
        let data = (await response).json();
        quotes = data;
        let quoteNumber;
        quotes.then(quotes => {
            quoteNumber = (Math.random() * 1000).toFixed();
                const quoteMessage = `Hey Kenny, here's a quote to start your day 😀. \n**--${quotes[quoteNumber].text}--** @${quotes[quoteNumber].author ? quotes[quoteNumber].author : "No author" ? quotes[quoteNumber].author === "undefined" : 'No author'}`;
                console.log(quoteMessage);
                client.messages.create({
                    to: process.env.TO_NUMBER,
                    from: process.env.TWILIO_ACCOUNT_NUMBER,
                    body: quoteMessage
                }).then(message => console.log(`Message sid => ${message.sid}`)).catch(error => console.log(error))
        })
    }
    getQuotes('https://type.fit/api/quotes');

