var webSwarm =
{
    meta:{
        name:"webclient.js",
        debug:false
    },
    vars:{

    },
    start:function(details, id, isTrue){
        this.details = details;
        this.id = id;
        this.swarm('processAction');
    },
    receive: function(tweet){
       this.tweet = tweet
       this.swarm('receiveNewTweet')
    },
    processAction:{
        node:"TwitterAdapter",
        code: function() {
            var self = this;
            self.request_id = self.id;
            var promise = startTweet.async(this.details, this.id);
            (function (tweets){
                self.tweet = tweets;
                self.swarm('notifyOnSuccess')
            }).swait(promise, function(err){
                    console.log("New error is", err);
                    self.error = err[0];
                    self.swarm('notifyOnError')
                });
        }
    },


    notifyOnSuccess: {
      node: 'WebAdapter',
      code: function(){
          notifyOnSuccess(this.tweet, this.request_id)
      }
    },

    notifyOnError: {
        node: 'WebAdapter',
        code: function(){
            notifyOnError(this.error, this.request_id)
        }
    },

    receiveNewTweet: {
        node: 'WebAdapter',
        code: function(){
        var promise  =  receiveNewTweet.async(this.tweet)
            (function (tweet){
                self.tweet = tweet;
                self.swarm('returnTweet')
            }).swait(promise, function(err){
                console.log("New error is", err);
                self.error = err[0];
                self.swarm('reportError')
            });
        }
    },

    reportError: {
        node: 'WebAdapter',
        code: function(){
            errorTweet(this.error)
        }
    },

    returnTweet: {
        node: 'WebAdapter',
        code: function() {
            returnTweets(this.tweet)
        }
    }

};

webSwarm;
