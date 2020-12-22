$(document).ready(function() {
  
  //trying to get x button to clear what's in input field
  //tried using .val, .html, setting variable to ""
  // not working :(
  $("#close-icon").on("click", function() {
    var inputVal = $("#search").val()
    inputVal.empty()
  })


  //trying to get enter button to do search
  //not working :(
  $("#search").keyup(function(e){
    if(e.keyCode == 13){
    $("#search-icon").click();
    // recipeApi()
    // musicApi()
    }
});


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
            

            // string interpolation thing
              var newRecipe = `<div class="row">
              <div class="col s12 m7">
                <div class="card">
                  <div class="card-image">
                    <img src="${response.hits[0].recipe.image}" id="recipeImage">
                    </div>
                  <div class="card-content">
                    <!-- Recipe Name -->
                    <h4>Food: </h4>
                    <span class="card-title">${response.hits[0].recipe.label}</span>

                    <h5>Ingredients: </h5>
                    <ul id="ingredients"></ul>
                </div>
                  <div class="card-action">
                    <a href="${response.hits[0].recipe.url}">Recipe Wesbite</a>
                  </div>
                </div>
              </div>
            </div>`

            $("#recipeContainer").prepend(newRecipe)
            

              for (var i = 0; i < response.hits[0].recipe.ingredientLines.length; i++) {
                $("#ingredients").append(response.hits[0].recipe.ingredientLines[i] + "</br>") 
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


              var newMusic = `<div class="row">
              <div class="col s12 m7">
                <div class="card">
                  <div class="card-image">
                    <img id="musicImage"> 
                    </div>
                  <div class="card-content">
                    <h4>Title: </h4>
                    <span class="card-title" id="title"></span>
                    <h5>Artist: </h5>
                    <span class="card-title" id="artist"></span>
                </div>
                  <div class="card-action">
                    <a id="music-url">Music Wesbite</a>
                  </div>
                </div>
              </div>
            </div>`

            $("#artistContainer").prepend(newMusic)



              //for loop to see if result has bid
              for (var i=0; i < response.results.trackmatches.track.length; i++) {
                if (response.results.trackmatches.track[i].mbid != '') {

                var mbId = response.results.trackmatches.track[i].mbid

                //music title
                $("#title").append(response.results.trackmatches.track[i].name)
                

                //music artist
                $("#artist").append(response.results.trackmatches.track[i].artist)
                
                //music url
                var responseUrl = response.results.trackmatches.track[i].url
                var urlAtt = $("#music-url").attr("href", responseUrl)
                $("#music-url").append(urlAtt)

                break //break out da for loop
              }
            }

              console.log(mbId)

              //using mbid to get image
              var newQueryUrl = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=5768b380e9979f19a9f79e71ea2d714e&mbid=" + mbId + "&format=json"
                
              console.log(newQueryUrl)
              $.ajax({
                  url: newQueryUrl,
                  method: "GET"
                }).then(function(response) {
                  console.log("second music response")
                  console.log(response)
    
                  //take image from second music response and then append it 
                   var musicImage = response.track.album.image[3]
                   console.log("mbid image")
                   console.log(musicImage["#text"])

                   $("#musicImage").attr("src", musicImage["#text"])
                   $("#musicImage").append(musicImage)

                })
            })
          }

})



//TO DO: 
  // modal for if userinput doesn't work - couldn't get modal to work - tried a bunch of stuff
  // fix search button and make it work when hitting enters
  // x button needs to clear what's in input
  // get cards to line up?? The first to do, but the rest don't line up
  // if they enter the same food again, get a different food and recipe with same name?? Might be too ambitious...
  // NOT VERY MOBILE FRIENDLY!!!!!! Need the cards to move underneath each other? Everything else looks okay