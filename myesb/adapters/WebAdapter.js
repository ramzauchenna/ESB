var core = require ("swarmcore");

thisAdapter = core.createAdapter("WebAdapter");

var express = require('express');
var app = express();
var Twitter = require('twitter');
var rp = require('request-promise');
var Promise = require("bluebird");
var uid = require("uid");
var webStore =  {}

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
  var q = { token: 'QR4qtUOaxw5Muw5GKIJaac1k',
        team_id: 'T03HJGNDA',
        team_domain: 'c2g',
        channel_id: 'C0BC5819P',
        channel_name: 'td-test',
        user_id: 'U0AKFRSJG',
        user_name: 'ramzauchenna',
        command: '/esbserver',
        text: 'This should work' };
    var id = uid();
    var objectType = {
        id: id,
        res: res,
        user_name: q.user_name,
        user_id: q.user_id,
        channel_name: q.channel_name,
        channel_id: q.channel_id,
        token: q.token
    };
    webStore[objectType.id] = objectType;

    process_swarm = function(tweet, id) {
        start_post_tweet_swam(tweet, id)
    };
    process_swarm(q.text, id)
});

app.get('/post-to-slack', function (req, res) {
    process_slack_swarm = function(tweet) {
        start_post_slack_swarm(tweet)
    };
    process_slack_swarm(req.query.text)
});



