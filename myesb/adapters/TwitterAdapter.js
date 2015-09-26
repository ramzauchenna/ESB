var core = require ("swarmcore");

thisAdapter = core.createAdapter("TwitterAdapter");

var express = require('express');
var app = express();
var Twitter = require('twitter');
var rp = require('request-promise');
var Promise = require("bluebird");
var uid = require("uid");

var store =  {}

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


returnTweets = function(tweet){
    response.push(tweet)
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
                this.startSwarm("posttweet.js", "start", tweets)
                resolve(tweets)
            }
        });
    });
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



postNewTweet = function (tweet) {
    var params = JSON.stringify(tweet);
    var options = {
        uri : "https://hooks.slack.com/services/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",
        method : 'POST'
    };
    rp(options)
        .then(function (response) {
            console.log("Tweet Sent to slack");
        })
        .catch(console.error)
}



/*app.get('/post-tweets', function (req, res) {
    var tweet_details;
    tweet_details = {
        status: req.query.status
    };
    var id = uid();
    var objectType = {
        id: id,
        res: res
    }
    store[objectType.id] = objectType

    process_swarm = function(tweet_details, id) {
        start_post_tweet_swam(tweet_details, id)
    };
    process_swarm(tweet_details, id);
    /!*res.send({status: "Swan Started"})*!/

});*/




