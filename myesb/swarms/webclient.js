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

    reportError: {
        node: 'WebAdapter',
        code: function(){
            errorTweet(this.error)
        }
    }

};

webSwarm;
