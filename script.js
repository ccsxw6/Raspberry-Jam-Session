$(document).ready(function() {

var appId = "a41bfcaf"
var appKey = "a4a5f3bd344761256404ebe6a31f8483";
var userInput = "chicken"
var queryUrl = " https://api.edamam.com/search?q=" + userInput + "&app_id=" + appId + "&app_key=" + appKey;

$.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
      console.log(response)
  })

  
  var userInput = "spaghetti"
  var sharedSecret = "9b993c6ff3682bd6aa125dbae448795f"
  var apiKey = "5768b380e9979f19a9f79e71ea2d714e";
  var queryUrl = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + userInput + "&api_key=" + apiKey + "&format=json"
  
  $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
        console.log(response)
    })
  
  })


//going to make another script to figure out how to get music api working, might not need to do this? 
