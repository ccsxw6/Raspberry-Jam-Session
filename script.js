$(document).ready(function() {
  
  var timesClicked = 0;

  //put this in a function? 
  $("#search-icon").on("click", function() {
      userInput = $("#search").val() //global variable
      timesClicked++;
      conditionalFunction()
    })
    
    var conditionalFunction = function() {
      //put if statement in function, and call it when the button is clicked
      if (timesClicked <= 1) { //why dis works
        recipeApi()
        musicApi()
        //calls music and recipe functions when user has clicked fewer than once
      } else {
        prependFunction()
        recipeApi()
        musicApi()
        //call a function that we create that prepends the newly clicked data
        //this function happens when user has clicked more than once
    }
  }

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
              

            //string interpolation thing
            //   var newRecipe = `<div class="row">
            //   <div class="col s12 m7">
            //     <div class="card">
            //       <div class="card-image">
            //         <img src="#">${response.hits[0].recipe.image}>
            //         <span class="card-title">${response.hits[0].recipe.label}</span>
            //       </div>
            //       <div class="card-content">
            //       <p>I am a very simple card. I am good at containing small bits of information.
            //       I am convenient because I require little markup to use effectively.</p>
            //     </div>
            //       <div class="card-action">
            //         <a href="#">${response.hits[0].recipe.url}</a>
            //       </div>
            //     </div>
            //   </div>
            // </div>`

            // $("#newRecipeContainer").prepend(newRecipe)

              //url for recipe
              var recipeUrl = response.hits[0].recipe.url
              var recipeAtag = $("<a>").attr("href", recipeUrl)
              $("#recipeUrl").append(recipeAtag)
              $(recipeAtag).html(recipeUrl)

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
                
                //makes URL a clickable link
                var responseUrl = response.results.trackmatches.track[i].url
                var aTag = $("<a>").attr("href", responseUrl)
                $("#musicUrl").append(aTag)
                $(aTag).html(responseUrl)

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

          var prependFunction = function() {
            $(".wrapper").prepend(".prependWrapper")
            //code in here to prepend info
          }
})

//TO DO: 
  //var sharedSecret = "9b993c6ff3682bd6aa125dbae448795f" don't know if I need this or not for last.fm
  //modal for if userinput doesn't work - couldn't get modal to work - won't get anything without script tag, when I add the script tag, nothing else works
  //how to clear current info if user types in something else, or append it underneath current info? 
  //fix search button and make it work when hitting enters
  //x button needs to clear what's in input
  //make card elements (tab one from materialize) for music api and food api
  //have the link on the card t