var TwitterPackage = require('twitter');
var emoji = require('./emoji_parser.js');

var secret = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
};

var Twitter = new TwitterPackage(secret);



// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '@emojibottweet'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    tweeter = tweet.text.replace("@emojibottweet", "");

    var t = emoji.translate(tweeter);

    //build our reply string grabbing the string 
    var reply =  t + " @" + tweet.user.screen_name ;

    //call the post function to tweet something
    Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

  // ... when we get an error...
  stream.on('error', function(error) {
    //print out the error
    console.log(error);
  });
});
