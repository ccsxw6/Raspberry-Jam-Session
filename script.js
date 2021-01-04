$(document).ready(function () {


  $('.modal').modal()

  //trying to get x button to clear what's in input field
  //NOT WORKING
  $("#close-icon").on("click", function () {
    var inputVal = $("#search").val()
    inputVal.empty()
  })


  //enter button
  $("#search").keypress(function (e) {
    if (e.keyCode == 13) {
      e.preventDefault() //enter was just refreshing page, used preventDefault to get it to listen
      $("#search-icon").click();
    }
  });

  //trying to set up different places for cards to go
  var timesClicked = 0

  $("#search-icon").on("click", function () {
    userInput = $("#search").val()
    timesClicked++

    recipeApi()
  })


  //function for edamam API
  var recipeApi = function () {
    var appId = "a41bfcaf"
    var appKey = "a4a5f3bd344761256404ebe6a31f8483";
    var queryUrl = " https://api.edamam.com/search?q=" + userInput + "&app_id=" + appId + "&app_key=" + appKey;

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function (response) {
      console.log("recipe response")
      console.log(response)

      // modal 
      if (response.count === 0) {
        $('.modal').modal("open");
        return;
      }

      musicApi()


      // string interpolation
      var newRecipe =
        `<div class="card">
                  <div class="row">
                   <div class="col s6" id="imageRecipe">
                    <div class="card-image">
                        <img src="${response.hits[0].recipe.image}" id="recipeImage">
                      </div>
                     </div> 
                    
                  <div class="col s6" id="recipeInfo">
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
                </div>`

       // if times clicked is more than 1, prepend newMusic to previous-searches, clear currentSearches, and add newMusic
        //else append newMusic to currentSearch

        if (timesClicked = 1) {
          //use $(this) somehow? 
          // need to move what's currently in current-search to previous search, and then in else, append new user input into currentSearch
          $("#current-search").append(newRecipe)
        } 
        else {
          //need to append what is in current-search to previous searches....
          $("#previous-searches").prepend(newRecipe)
          $("#current-search").clear()
          $("#current-search").prepend(newRecipe)
        }



      for (var i = 0; i < response.hits[0].recipe.ingredientLines.length; i++) {
        $("#ingredients").append(response.hits[0].recipe.ingredientLines[i] + "</br>")
      }

      // Recipe URL Local Storage
      //Just do multiple of these for each thing? And then add it to card in history.js?
      localStorage.setItem("recipeUrl", JSON.stringify(response.hits[0].recipe.url));

    })
  }

  //function for last.fm
  var musicApi = function () {
    var apiKey = "5768b380e9979f19a9f79e71ea2d714e";
    var queryUrl = "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + userInput + "&api_key=" + apiKey + "&format=json"

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function (response) {
      console.log("first music response")
      console.log(response)

      var newMusic =
        `<div class="card">
                <div class="row">
                  <div class="card-image">
                   <div class="col s6" id="albumImage">
                     <img id="musicImage"> 
                    </div>
                   </div> 
                  <div class="col s6" id="musicInfo">
                   <div class="card-content">
                    <h4>Title: </h4>

                    <span class="card-title" id="title"></span>

                    <h5>Artist: </h5>

                    <span class="card-title" id="artist"></span>
                
                    <div class="card-action">
                      <a id="music-url">Music Wesbite</a>
                    </div>
                    </div>
                  </div>
                  </div>
                </div>`


        // if times clicked is more than 1, prepend newMusic to previous-searches, clear currentSearches, and add newMusic
        //else append newMusic to currentSearch
        if (timesClicked = 1) {
          $("#current-search").append(newMusic)
        } 
        else {
          $("#current-search").clear()
          $("#current-search").prepend(newMusic)
          $("#previous-searches").prepend(newMusic)
        }


      //for loop to see if result has mbid
      for (var i = 0; i < response.results.trackmatches.track.length; i++) {
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

          //Music URL Local Storage
          localStorage.setItem("musicUrl", JSON.stringify(response.results.trackmatches.track[i].url));

          //breaking out of loop
          break
        }
      }

      console.log(mbId)

      //using mbid to get image
      var newQueryUrl = "https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=5768b380e9979f19a9f79e71ea2d714e&mbid=" + mbId + "&format=json"

      console.log(newQueryUrl)
      $.ajax({
        url: newQueryUrl,
        method: "GET"
      }).then(function (response) {
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
  // storing just the url of last search in history.html. Would like to store whole card, but with loops and separate api calls, wasn't able to figure it out. 
  // gotta push to an array, but idk how to get that to work on a separate html
  // User enters same food, gets a different food and recipe with same name
  // x button needs to clear what's in input
 

 // use Math.floor(Math.random) on each api
 // move search history button
 // add a section between current and previous searches


 // added a current-search and previous search row. Have cards appending to current-search
 // can maybe leave most recent search here, rather than adding separate page? 

 // Try appending current and past searches - then see if math.floor(math.random) will work with API calls - if time, do local storage latta