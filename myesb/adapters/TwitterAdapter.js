var core = require ("swarmcore");

thisAdapter = core.createAdapter("TwitterAdapter");

var express = require('express');
var app = express();
var Twitter = require('twitter');
var rp = require('request-promise');
var Promise = require("bluebird");
var https = require( 'https' );

var client = new Twitter({
    consumer_key: 'gUc2YBeLC1tTFkZWuleyOjaql',
    consumer_secret: 'FYDKglU2k3URqsriyGgm7AFOnIRehal0Vz3YFx9TWV44XvDgPx',
    access_token_key: '79856280-yW10op8wdIQGJmDI7f8Q8CTVh3jQYJBcY7LaidXca',
    access_token_secret: 'ZspFaP2XLUWJqdGfQa5CITvbjHSJkYuam1f4eGFOSi8Hf'
});

/*var port = 3010;
app.listen(port, function(){
    console.log("NAV Adapter connected and Listening at port %s", port);
});*/

Promise.onPossiblyUnhandledRejection(function(){});

start_post_tweet_swam = function(details, id) {
    this.startSwarm("posttweet.js", "start", details, id, true);
};

start_get_tweet_swam = function(details) {
    this.startSwarm("posttweet.js", "start", details,true);
};

postNewTweetToClient = function(tweet){
    this.startSwarm("webclient.js", "receive", tweet,true)
};


post_tweet = function (params, id, callback) {
    return new Promise(function(resolve,reject){
        client.post('statuses/update', params, function(error, tweets, response){
            if (error) {
                console.log("error is", error)
                callback(error, null);
                console.log("We are here")
                return reject(error[0])
            } else {
                console.log("success twitter", tweets);
                callback(null, tweets);
                resolve(tweets)
            }
        });
    });
};

errorTweet = function(tweet){
    console.log("Error processing tweet")
};


postNewTweet = function (tweet, username, channel, callback) {
/*    var payload = {
        text: tweet,
        channel: channel,
        username: username
    };
    console.log("User Name is", username);
    var uri = "https://hooks.slack.com/services/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?payload=" + JSON.stringify(payload);
    console.log("Promise Start", tweet + uri);
    return new Promise(function(resolve,reject) {
        rp.post(uri, function (err, response, body) {
            if (err) {
                console.log(err);
                callback(err, null);
                return reject(err)
            } else {
                console.log(body);
                callback(null, body);
                resolve(body)
            }
        });
    })*/

    var options = {
        hostname : 'hooks.slack.com' ,
        path     : '/services/T03HJGNDA/B0BBYJ38B/N6IvJT9VKKc3adqyJVFs4iXO' ,
        method   : 'POST'
    };

    var payload = {
        text: tweet,
        channel: channel,
        username: username
    };
    console.log("Chanel is", payload.channel)
    var req = https.request( options , function (res , b , c) {
        res.setEncoding( 'utf8' );
        res.on( 'data' , function (chunk) {
            console.log(chunk)
        } );
    } );

    req.on( 'error' , function (e) {
        console.log( 'problem with request: ' + e.message );
    } );

    req.write( JSON.stringify( payload ) );
    req.end()
};

returnTweets = function(tweet){
    console.log("tweet Sent to slack")
};

startTweet = function (tweet, id, callback){
    var tweet_details;
    tweet_details = {
        status: tweet
    };

    process_swarm = function(tweet_details) {
        post_tweet(tweet_details, id, callback)
    };
    process_swarm(tweet_details, id);
};







