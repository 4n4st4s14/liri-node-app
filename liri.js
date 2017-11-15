var keyList = require("./keys.js");


var fs = require("fs");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");

//node liri.js my-tweets
//show last 20 tweets and when they were created in terminal
var myTweets = function() {
//var client = new twitter(keyList.twitterKeys);

  var client = new twitter ({
    consumer_key: 'hW4BwzbPbwMzy7edl2vGyqADk',
    consumer_secret: 'nJjSiBexKjVfXk0NJQcxS3XwEzaMyXlJmOnWLyq7v8rzZP4jp2',
    access_token_key: '930249865338195968-vHB7Q0TriKuB5SHRH9F4oMd3zBbIHBG',
    access_token_secret: 'rG6UNaiKOK0lMMNAj20BSFgvcpo42oIcuJgd7NOsByzUX',
  });


  var params= {screen_name: "Mildred_Bonk_", count: 20};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

       var data = [];
       //var jsonData = JSON.parse(tweets);
      for(var i=0; i< tweets.length; i++){
        data.push({
          'Tweet: ' : tweets[i].text,
          'Created At: ' : tweets[i].created_at

        });
      }
        //console.log(tweets)
        logData(data);
        console.log(data);
  }
});
}; //end twitter function

//second call for artist names in spotify- required!

var artistNames = function(artist){
  return artist.name;
};
//spotify function

var getSpotify = function(songName) {
  //if can't find it, The Sign by Ace of base
  if (songName === undefined){
    songName = 'The Sign';
  };

  // npm spotify search

  var Spotify = new spotify({
  id: 'b5968027b0264234814374d082709302',
  secret: 'd7320557a6174fc6acef3eda40f5db2a'
});
  Spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  var songs= data.tracks.items;
  var dataArr = [];

//loop through results and push to array

for (var i=0; i <songs.length; i++){
  dataArr.push({
    'Artist(s): ' : songs[i].artists.map(artistNames),
    'Song Name: ' : songs[i].name,
    'Link: ': songs[i].preview_url,
    'Album: ' : songs[i].album.name,

  })
}
console.log(dataArr);
logData(dataArr);
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
      logData(data);
    }
  });
}//end movie function

//do-what-it-says

var doWhatItSays = function(){
  fs.readFile("random.txt", 'UTF-8', function(error, data){

    console.log(data);
    logData(data);
    var dataSplit = data.split(',');

    cmd(dataSplit[0], dataSplit[1]);
  });
}// end do what it says
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
}// end switch

//function to append data to text file log.txt
var logData = function(data){
  fs.appendFile('log.txt', JSON.stringify(data), function(err){
    if (err) throw err;
    console.log('Logged!')
  })
}
//variable assigned to function that that takes 2 arguments as paramemters and
//sends them to the cmd function

var argCatcher = function(argOne, argTwo){
  cmd(argOne, argTwo);
}

argCatcher(process.argv[2], process.argv[3]);
