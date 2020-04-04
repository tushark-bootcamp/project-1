
// Adding new ingredents to array
var ingredients = []

$("#ingredientsubmit").on("click", function () {
    event.preventDefault();
    var newingredient = $("#ingredientInput").val()
    if (newingredient.length === 0) {
        $("#ingredientInput").attr("placeholder", "Please type an Ingredient.")
        return
    } else {
        ingredients.push(newingredient)
        $("#ingredientInput").val("")
        $("#ingredientInput").attr("placeholder", "Ingredient added to list!")
        console.log(ingredients)
    }
})
getRecepies();

// Function to generate a recepie tile
function generateRecepieCard(recepie) {
    
    var divCard0i = $("<div>");
    divCard0i.addClass("media searchresults");
    var img0i = $("<img>");
    //img0i.add
    img0i.attr("src", recepie.image);
    img0i.addClass("align-self-start mr-3 recipeimage");
    img0i.attr("imgId", recepie.id);
    divCard0i.append(img0i);

    var divMedia0i = $("<div>");
    divMedia0i.addClass("media-body");
    var h5RecepieTitle0i = $("<h5>");
    h5RecepieTitle0i.addClass("mt-0");
    h5RecepieTitle0i.attr("id", "recipetitle3");
    h5RecepieTitle0i.text(recepie.title);
    divMedia0i.append(h5RecepieTitle0i);

    var para0i = $("<p>");
    var ingredients = recepie.usedIngredients[0].original;
    para0i.text(ingredients);
    divMedia0i.append(para0i);

    var aTag0i = $("<a>");
    aTag0i.attr("href", "./viewrecepiepage.html?recepie-id="+recepie.id);
    aTag0i.attr("recepie-id", recepie.id);

    var spanOfATag0i = $("<span>");
    spanOfATag0i.addClass("divlink");
    aTag0i.append(spanOfATag0i);
    divMedia0i.append(aTag0i);

    divCard0i.append(divMedia0i);
    return divCard0i;
}

// Function to render all the recepie tiles.
function renderSearchResults(searchResult) {
    var divResultCards = $("#resultCards");

    for (var i = 0; i < searchResult.length; i++) {
        
        var divRowi = $("<div>");
        divRowi.addClass("row");
        
        var divCol0i = $("<div>");
        divCol0i.addClass("col-md-6");
        
        var recepie0i = searchResult[i];
        var divCard0i = generateRecepieCard(recepie0i);
        divCol0i.append(divCard0i);
        divRowi.append(divCol0i);

        if(i < searchResult.length) {
            i++;
            var divCol1i = $("<div>");
            divCol1i.addClass("col-md-6");
    
            var recepie1i = searchResult[i];
            var divCard1i = generateRecepieCard(recepie1i);
            divCol1i.append(divCard1i);
            divRowi.append(divCol1i);
        }
        divResultCards.append(divRowi);
    }

}


function getRecepies() {
    var searchResults = JSON.parse(localStorage.getItem("searchResults")) ;
    renderSearchResults(searchResults);

}

/*function getrecipes() {
    var params = "apples"
    $.ajax({
        url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + params + "&number=4&apiKey=e3e93aa7206d483b81dc3f846d64e8c4",
        method: "GET"
    }).then(function (response) {
        console.log(response)
        for (i = 0; i < 4; i++) {
            var recipeno = i + 1;
            $("#recipetitle" + recipeno).text(response[i].title);
            $("#recipeimg" + recipeno).attr("src", (response[i].image));
            var recipeid = (response[i].id);
            var recipeUrl = ("https://api.spoonacular.com/recipes/" + recipeid + "/information?includeNutrition=false&apiKey=e3e93aa7206d483b81dc3f846d64e8c4")
            $.ajax({
                url: recipeUrl,
                method: "GET"
            }).then(function (response) {
                console.log(response.sourceUrl)
            })
        }
    }
    )
}*/