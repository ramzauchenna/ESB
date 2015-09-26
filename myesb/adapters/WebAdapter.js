var core = require ("swarmcore");

thisAdapter = core.createAdapter("WebAdapter");

var express = require('express');
var app = express();
var Twitter = require('twitter');
var rp = require('request-promise');
var Promise = require("bluebird");
var uid = require("uid");
var webStore =  {};

var port = 8080;
app.listen(port, function(){
    console.log("NAV Adapter connected and Listening at port %s", port);
});

Promise.onPossiblyUnhandledRejection(function(){});

start_post_tweet_swam = function(details, id) {
    this.startSwarm("webclient.js", "start", details, id, true);
};

start_post_slack_swarm = function(details) {
    this.startSwarm("posttweet.js", "start", details, true);
};


start_get_tweet_swam = function(details) {
    this.startSwarm("webclient.js", "start", details,true);
};




notifyOnSuccess = function(tweet, id){
    var data = webStore[id];
    console.log("Data is", data.user_name, data.channel_name);
    this.startSwarm("posttweet.js", "start", tweet.text, data.user_name, data.channel_name);
    if(data){
        data.res.send(tweet.text);
    }
};

returnTweets = function(tweet){
    console.log(tweet)
};

errorTweet = function(error){
   console.log(error)
};

notifyOnError = function(error, id){
    console.log(error)
    var data = webStore[id];
    if(data){
        data.res.send(error);
        delete webStore[data.id]
    }
};

app.get('/post-tweet', function (req, res) {
    var id = uid();
    var objectType = {
        id: id,
        res: res,
        user_name: req.query.user_name,
        user_id: req.query.user_id,
        channel_name: "#"+ req.query.channel_name,
        channel_id: req.query.channel_id,
        token: req.query.token
    };
    webStore[objectType.id] = objectType;

    process_swarm = function(tweet, id) {
        start_post_tweet_swam(tweet, id)
    };
    process_swarm(req.query.text, id)
});

app.get('/post-to-slack', function (req, res) {
    process_slack_swarm = function(tweet) {
        start_post_slack_swarm(tweet)
    };
    process_slack_swarm(req.query.text)
});



