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

start_get_tweet_swam = function(details) {
    this.startSwarm("webclient.js", "start", details,true);
};


/*postNewTweet = function (tweet, id, callback) {
    return new Promise(function(resolve,reject) {
        var uri = "http://52.89.182.110//post-tweets?status=" + tweet;
        console.log("Promise Start", tweet);
        rp.get(uri, function (err, response, body) {
            if (err) {
                console.log(err);
                callback(err, null);
                return reject(err)
            }else{
                console.log(body);
                console.log("body is", body);
                callback(null, body);
                resolve(body)
            }
        });
    });
};*/

postNewTweet = function (tweet, id, callback) {

};

receiveNewTweet = function (tweet, callback){
    return new Promise(function(resolve, reject){
      if (tweet[0].message){
          callback(tweet, null );
          return reject(tweet)
      } else {
         callback(null, tweet);
         resolve(tweet);
      }
    });
};

notifyOnSuccess = function(tweet, id){
    var data = webStore[id];
    if(data){
        data.res.send(tweet);
        delete webStore[data.id]
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

app.post('/post-tweet', function (req, res) {
    console.log(req)
    var id = uid();
    var objectType = {
        id: id,
        res: res
    };
    webStore[objectType.id] = objectType;

    process_swarm = function(tweet, id) {
        start_post_tweet_swam(tweet, id)
    };
    process_swarm(req.query.status, id)
});

app.get('/receive-tweets', function (req, res) {
    var tweet_details;
    tweet_details = {
        scree_name: req.query.screen_name
    };
    start_get_tweet_swam(tweet_details);
});



