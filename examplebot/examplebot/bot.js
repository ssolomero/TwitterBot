 // Our Twitter library
var Twit = require('twit');
 
// We need to include our configuration file
var T = new Twit(require('./config.js'));
 
var wornikKey = '6d9a10b171188af948c0c00971503c9a4dfe126281638c547';
 
// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
//var ripSearch = {q: "#rip", count: 10, result_type: "recent"}; 
 
var tweet;
 
// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function reply() {
	boo = ["boo", "babe", "bae", "girl", "gorgerous", "beautiful", "handsome", "sexy", "juicy", "cutie"];
 
	hashtags = ['#foreveralone', '#thirdwheel', '#askmetoprom', 'singleaf', 'harambe'];
 
	pickup = ['Romantic_Lines', 'FUNPICKUPLINES', 'romanticquo', '1DLyrics', 'forjustinfor'];
 
	var booIndex = Math.floor(Math.random() * boo.length);
	var hashIndex = Math.floor(Math.random() * hashtags.length);
	var pickupInd = Math.floor(Math.random() * pickup.length);
	var userName = pickup[pickupInd];
	
	//var words;
 
	T.get('statuses/user_timeline', {screen_name: userName, count: 50 }, function(error, data){ 
		var tweetIndex = Math.floor(Math.random() * 49);
		tweet = data[tweetIndex].text;
	})
 
	T.post('friendsihps/create', {screen_name: userName}, function(error, data) {
		console.log(error, data);
	})
 
	var ripSearch = {q: hashtags[hashIndex], count: 20, result_type: "recent"}; 
 
	T.get('search/tweets', ripSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
	  	var userIndex = Math.floor(Math.random() * 19);
		var userTweet = data.statuses[userIndex].id_str;
		var replyObj = '@' + data.statuses[userIndex].user.screen_name + ' Hi ' + boo[booIndex] + ',';
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/update', {in_reply_to_status_id: userTweet, status: replyObj + " " + tweet + ' #lovedontshoot'}, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.');
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}
 
 
// Try to retweet something as soon as we run the program...
reply();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(reply, 1000 * 60 * 10);