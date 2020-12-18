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
              console.log("recipe response")
              console.log(response)

              //name
              $("#recipeName").html("Food: " + response.hits[0].recipe.label)


              //recipe image
              var imgUrl = response.hits[0].recipe.image
              console.log("recipe image")
              console.log(imgUrl)

              var newRecipeImage = $("<img>")
              newRecipeImage.attr("src", imgUrl);
              $("#image").append(newRecipeImage) //image isn't appearing 

              for (var i = 0; i < response.hits[0].recipe.ingredientLines.length; i++) {
               $("#ingredients").append("Ingredients: " + response.hits[0].recipe.ingredientLines[i] + "</br>") 
              }
          })
        }

  //function for last.fm
    var musicApi = function() {
        var apiKey = "5768b380e9979f19a9f79e71ea2d714e";
        var queryUrl = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + userInput + "&api_key=" + apiKey + "&format=json"
        
            $.ajax({
              url: queryUrl,
              method: "GET"
            }).then(function(response) {
              console.log("first music response")
              console.log(response)

              for (var i=0; i < response.results.trackmatches.track.length; i++) {
                if (response.results.trackmatches.track[i].mbid != '') {
                var mbId = response.results.trackmatches.track[i].mbid
                $("#songName").html("Title: " + response.results.trackmatches.track[i].name)
                $("#artistName").html("Artist: " + response.results.trackmatches.track[i].artist)
                $("#url").html(response.results.trackmatches.track[i].url) 
                break //break out da for loop
              }
            }

              console.log(mbId)

              //instead of userinput use mbid

              var newQueryUrl = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=5768b380e9979f19a9f79e71ea2d714e&mbid=" + mbId + "&format=json"
                
              console.log(newQueryUrl)
              $.ajax({
                  url: newQueryUrl, //another url that we build with mbid
                  method: "GET"
                }).then(function(response) {
                  console.log("second music response")
                  console.log(response)
    
                  //take image from second music response and then append it 
                   var musicImage = response.track.album.image[3]
                   console.log("mbid image")
                   console.log(musicImage["#text"])
                   var newImgtag = $("<img>")
                   newImgtag.attr("src", musicImage["#text"])
                   $("#imageContainer").append(newImgtag)

                })
            })
          }
})
  // var sharedSecret = "9b993c6ff3682bd6aa125dbae448795f" don't know if I need this or not for last.fm
  //maybe do a loop that loops through and created a new div for each thing you want? 
  