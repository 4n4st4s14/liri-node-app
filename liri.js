var keyList = require("./keys.js");


var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

//node liri.js my-tweets
//show last 20 tweets and when they were created in terminal
var myTweets = function() {
  var client = new twitter(keyList.twitterKeys);

  var params= {screen_name: "mildred", count: 10};

  //array for tweets to get pushed to
  var tweetsArr= [];

  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {

      for (var i = 0; i < tweets.length; i++){
        tweetsArr.push ({
          //tweets time and text?
        })
      }
      console.log(tweetsArr)
    }
  });

  //get?
}

myTweets();
//node liri.js spotify-this-song '<song name>'
//show artist, song name, preview link of song, album

//if no song, default to "the Sign" by ace of base

//movie-this

//do-what-it-says
