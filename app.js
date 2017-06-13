var TwitterPackage = require('twitter');
var emoji = require('./emoji_parser.js');

var secret = {
  consumer_key: 'oQ13JbOVmpHUYZbL3D6e5ktSK',
  consumer_secret: 'HrAwClk2czUu7xrYA4RDKCwK4C9AXEFbJezqw15cmDSxtoua6a',
  access_token_key: '874416100057985026-u7MZHa9G5QsqC8Kqp5TwPARbav0CTy9',
  access_token_secret: 'nwXOsMOuN1pmQnyNAnIrRAk7hhaUoqnPyIog5PlJUT9xs'
};

var Twitter = new TwitterPackage(secret);



// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '@emojibottweet'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    tweeter = tweet.text.replace("@emojibottweet", "");

    // calculate the random index (Math.random returns a double between 0 and 1)
    var t = emoji.translate(tweeter);

    //build our reply string grabbing the string in that randomIndex we've calculated
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