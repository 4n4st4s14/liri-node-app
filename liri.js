var keyList = require("./keys.js");


var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

//node liri.js my-tweets
//show last 20 tweets and when they were created in terminal
var myTweets = function() {
  var client = new twitter(keyList.twitterKeys);

  var params= {screen_name: "nodejs", count: 10};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        var data = []; //empty array to hold data
        for (var i = 0; i < tweets.length; i++) {
          data.push({
              'created at: ' : tweets[i].created_at,
              'Tweets: ' : tweets[i].text,
          });
        }
        console.log(data);
  }
});
}; //end twitter function


//spotify function

var getSpotify = function(songName) {
  //if can't find it, The Sign by Ace of base
  if (songName === undefined){
    songName = 'The Sign';
  };

  // npm spotify search
  spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

console.log(data);
});
}// end of spotify function

var getMovie = function(movieName) {
  if (movieName === undefined){
    movieName = 'Mr Nobody';
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
        'Title: ': jsonData.Title,
        'Year: ': jsonData.Year,
        'IMDB Rating: ': jsonData.imdbRating,
        'Rotten Tomatoes Rating: ': jsonData.Ratings[1].Value,
        'Country Produced In: ': jsonData.Country,
        'Language: ' : jsonData.Language,
        'Plot: ' : jsonData.Plot,
        'Actors: ' : jsonData.Actors,
      })
      console.log(data);
    }
  });
}//end movie function




  //get?



//node liri.js spotify-this-song '<song name>'
//show artist, song name, preview link of song, album

//if no song, default to "the Sign" by ace of base

//movie-this

//do-what-it-says

//switch statement for user input

var cmd = function(userCmd, userData){
  switch (userCmd){
    case 'my-tweets':
    myTweets();
    break;

    case 'spotify-this-song':
    getSpotify(userData);
    break;

    case 'movie-this':
    getMovie(userData);
    break;

    case 'do-what-it-says':
    doWhatItSays(userData);
    break;

    default:
    console.log("Liri doesn\'t know that :(")
  }
}

//variable assigned to function that that takes 2 arguments as paramemters and
//sends them to the cmd function

var argCatcher = function(argOne, argTwo){
  cmd(argOne, argTwo);
}

argCatcher(process.argv[2], process.argv[3]);
