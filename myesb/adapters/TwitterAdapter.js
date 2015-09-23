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
    consumer_key: 'jjiyWNr1B5rKXqS8wyXAg',
    consumer_secret: 'hhGbHn6cNAjtT2WcOtLAjwQbDEORpwtP6rZauyCv8aQ',
    access_token_key: '79856280-Kxv5kRor4BqxaXSmGRdj6uigobTX8jalVNdtuSiEE',
    access_token_secret: '2sxTrzk0oGkDqVVwMpUZGB05W22b9RELxJNpYxVJU'
});

var port = 3010;
app.listen(port, function(){
    console.log("NAV Adapter connected and Listening at port %s", port);
});

Promise.onPossiblyUnhandledRejection(function(){})

start_post_tweet_swam = function(details, id) {
    this.startSwarm("posttweet.js", "start", details, id, true);
};

start_get_tweet_swam = function(details) {
    this.startSwarm("posttweet.js", "start", details,true);
};


returnTweets = function(tweet){
    response.push(tweet)
}




post_tweet = function (params, id, callback) {
    return new Promise(function(resolve,reject){
        client.post('statuses/update', params, function(error, tweets, response){
            if (error) {
                callback(error, null);
                return reject((error[0].message))
            } else {
                callback(null, tweets);
                console.log("success twitter", tweets);
            }
        });
    });
};

returnTweets = function(tweet, id){
    var data = store[id];
    if(data){
        data.res.send(tweet)
        delete store[data.id]
    }
}

errorTweet = function(error, id){
    var data = store[id];
    if(data){
        data.res.send(error)
        delete store[data.id]
    }
};

/*
postNewTweet = function (tweet) {
    var params = JSON.stringify(tweet);
    console.log(params)
    var options = {
        uri : 'http://localhost:3020/new-tweet?tweet='+params,
        method : 'POST'
    };
    rp(options)
        .then(function (response) {
            console.log("DELETE sent Tweet");
        })
        .catch(console.error)
}
*/


get_tweet = function (params) {
    client.get('statuses/update', params, function(error, tweets, response){
        if (error) {
            console.log("error processing");
        } else {
            console.log(tweets);
        }
    });
};


app.get('/post-tweets', function (req, res) {
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
    /*res.send({status: "Swan Started"})*/

});




