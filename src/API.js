// Express Server Requirements
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

const fetch = require("node-fetch");

// Brute Force Protection
const slowDown = require("express-slow-down");
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 250, // allow 300 requests per 15 minutes, then...
  delayMs: 400 // begin adding 400ms of delay per request above 100:
});

const rateLimit = require("express-rate-limit");
// app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 250 // limit each IP to 100 requests per windowMs
});

// Imports
const chalk = require('chalk');
const EventEmitter = require('events');
global.BLWEvent = new EventEmitter();

class Client {
    constructor(client, token, port) {
        if (!client) {
            return console.log(chalk.red('[BLWEBHOOKS] The client is not defined'))
        } else if (typeof port != "number") {
            return console.log(chalk.red('[BLWEBHOOKS] The Port Number is not defined'));
        }
        if(client) {
         console.log(chalk.green("[BLWEBHOOKS] The Client has connected to BLWebhooks"))
        client.on('error', async (error) => {
         BLWEvent.emit('error', error)
          })
        }
        if(port) {
            app.listen(port)
            app.use(bodyParser.json())
            app.use(limiter)
            app.use(speedLimiter)
            console.log(chalk.green(`[BLWEBHOOKS] The Vote Webserver Has Started On Port ${port}.`))
        }
         async function check() {
            var response = await fetch("api-server", {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: key,
                },
            });
            var responseData = await response.json();
            if (!responseData.success) throw new TypeError('argument "key" is not a valid API key');
        }
    }
}

module.exports.API = API;
