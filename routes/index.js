var express = require('express');
var router = express.Router();
var expressWs = require('express-ws')(router);
var config = require('../config');

var Twit = require('twit');
var T = new Twit({
  consumer_key:         config.twitter.consumer_key,
  consumer_secret:      config.twitter.consumer_secret,
  access_token:         config.twitter.access_token,
  access_token_secret:  config.twitter.access_token_secret,
  timeout_ms:           config.twitter.timeout
});

var stream;

// GET home page
router.get('/', function(req, res) {
    try {
        var params = {
            id: config.woeid // Where On Earth ID
        };
        // API info at https://dev.twitter.com/rest/reference/get/trends/place
        T.get('trends/place', params, function(err, data, response) {
              if (err) {
                console.error(err);
              } else {
                  try {
                      if (data.length > 0 && data[0].trends) {
                          var trends = data[0].trends;
                          var trendLimit = config.trend_limit
                          if (trends.length > trendLimit) {
                              trends.splice(trendLimit, trends.length)
                          }
                          var trendsResponse = {
                              trendLimit: trendLimit,
                              trendPlace: config.place,
                              trends: trends
                          }
                          res.render('index', trendsResponse);
                      } else {
                          throw ({ message: 'Sorry, something is wrong in the response' });
                      }
                  } catch(err) {
                      console.error(err.message);
                      res.render('error', { error: err.message });
                  }
              }
        });
    } catch(err) {
        console.error(err.message);
        res.render('error', { error: err });
    }
});

// WebSocket listener
router.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
        try {
            if (stream) {
                stream.stop();
            }

            // twitter streaming API
            stream = T.stream('statuses/filter', { track: msg });

            stream.on('connect', function (request) {
                var msgObject = { message: 'Connecting...' };
                ws.send(JSON.stringify(msgObject));
            });

            stream.on('connected', function (response) {
                var msgObject = { message: 'Connected! Streaming...' };
                ws.send(JSON.stringify(msgObject));
            });

            stream.on('tweet', function (tweet) {
                ws.send(tweet.text);
            });

            stream.on('error', function(error) {
                console.error(error.message);
                var msgObject = { message: error.message };
                ws.send(JSON.stringify(msgObject));
            });
        } catch(err) {
            console.error(err.message);
            ws.send("Problem connecting to Twitter. Try again");
        }
    });
});

module.exports = router;
