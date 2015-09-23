var twitterSwan =
{
    meta:{
        name:"posttweet.js",
        debug:false
    },
    vars:{

    },
    start:function(details, id, isTrue){
        this.details = details;
        this.id = id;
        this.swarm('processAction');
    },
    notify: function(tweet){
        this.tweet = tweet
        this.swarm('notifyNewTweet')
    },
    processAction:{
        node:"TwitterAdapter",
        code: function() {
           var promise = post_tweet.async(this.details, this.id);
           var self = this;
           self.request_id = self.id;
            (function (tweets){
                self.tweet = tweets;
                console.log("We are here again"); //whatever
                self.swarm('returnTweet')
            }).swait(promise, function(err){
                    console.log("New error is", err);
                    self.error = err[0]
                    self.swarm('reportError');
                });
        }
    },

    notifyNewTweet: {
        node: 'TwitterAdapter',
        code: function(){
            postNewTweet(this.tweet)
        }
    },

    reportError: {
        node: 'TwitterAdapter',
        code: function(){
            errorTweet(this.error, this.request_id)
        }
    },

    returnTweet: {
        node: 'TwitterAdapter',
        code: function() {
            returnTweets(this.tweet, this.id)
        }
    }

};

twitterSwan;
