$(document).ready(function() {
  
  //put this in a function? 
  $("#search-icon").on("click", function() {
      userInput = $("#search").val() //global variable
      recipeApi()
      musicApi()
  })


  //function for edamam API
  var recipeApi = function() { 
      var appId = "a41bfcaf"
      var appKey = "a4a5f3bd344761256404ebe6a31f8483";
      var queryUrl = " https://api.edamam.com/search?q=" + userInput + "&app_id=" + appId + "&app_key=" + appKey;
      
        $.ajax({
            url: queryUrl,
            method: "GET"
          }).then(function(response) {
              console.log(response)
          })
          }
      //recipeApi()

  //function for last.fm
    var musicApi = function() {
        var apiKey = "5768b380e9979f19a9f79e71ea2d714e";
        var queryUrl = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + userInput + "&api_key=" + apiKey + "&format=json"
        
            $.ajax({
              url: queryUrl,
              method: "GET"
            }).then(function(response) {
              console.log(response)
            })
          }
})
  // var sharedSecret = "9b993c6ff3682bd6aa125dbae448795f" don't know if I need this or not for last.fm