$(document).ready(function () {

// Changes creators to hamburger 
$('.sidenav').sidenav();

//Recipe Card
var recipeCard =
`<div class="card">
            <div class="card-action">
              <a id="recipe-url">Recipe Website</a>
            </div>
          </div>`

$(".wrapper").prepend(recipeCard)

//getting url from local storage and appending it to card
var storedRecipeUrl = JSON.parse(localStorage.getItem("recipeUrl"));
var recipeUrlAtt = $("#recipe-url").attr("href", storedRecipeUrl)
$("#recipe-url").append(recipeUrlAtt)



//Music Card
var musicCard =
`<div class="card">
            <div class="card-action">
              <a id="music-url">Music Website</a>
            </div>
          </div>`

$(".wrapper").prepend(musicCard)

// getting url from local storage and appending it to card
var storedMusicUrl = JSON.parse(localStorage.getItem("musicUrl"));
var storedUrlAtt = $("#music-url").attr("href", storedMusicUrl)
$("#music-url").append(storedUrlAtt)


})


