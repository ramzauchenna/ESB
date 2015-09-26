var twitterSwan =
{
    meta:{
        name:"posttweet.js",
        debug:false
    },
    vars:{

    },
    start:function(details, username, channel){
        this.details = details;
        this.username = username;
        this.channel = channel;
        this.swarm('processAction');
    },
    processAction:{
        node:"TwitterAdapter",
        code: function() {
           var promise = postNewTweet.async(this.details, this.username, this.channel);
           var self = this;
            (function (tweets){
                self.tweet = tweets;
                console.log("We are here again"); //whatever
                self.swarm('returnTweet')
            }).swait(promise, function(err){
                    console.log("New error is", err);
                    self.error = err;
                    self.swarm('reportError');
                });
        }
    },
    reportError: {
        node: 'TwitterAdapter',
        code: function(){
            errorTweet(this.error)
        }
    },

    returnTweet: {
        node: 'TwitterAdapter',
        code: function() {
            returnTweets(this.tweet)
        }
    }

};

twitterSwan;
