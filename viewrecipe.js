var APIKey = "ebeadb6afabf46a58d16c7e3e6175a10";
renderRecepie();

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function renderRecepie() {
    var recepieID = getUrlParameter("recepie-id");
    var queryURL = "https://api.spoonacular.com/recipes/" + recepieID + "/information?includeNutrition=false&apiKey=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#recipetitle").text(response.title);
        $("#RecipeImage").attr("src", (response.image));
        checkproperty(response.vegetarian, "#vegetarian");
        checkproperty(response.vegan, "#vegan");
        checkproperty(response.glutenFree, "#gluten3");
        checkproperty(response.dairyFree, "#dairy3");
        $("#recipeSummary").html(response.summary);
        var instructions = response.analyzedInstructions[0].steps
        for (i = 0; i < instructions.length; i ++) {
            var ins = $("<li>");
            ins.text(response.analyzedInstructions[0].steps[i].step);
            $("#instructions").append(ins);
        }
        var ingredients = response.extendedIngredients;
        console.log(ingredients)
        for (i = 0; i < ingredients.length; i ++) {
            var ingre = $("<li>");
            ingre.text(ingredients[i].name)
            $("#ingredients").append(ingre);
        }
    });
   

}

function checkproperty(property, container) {
    if (property) {
        $(container).prop("checked", true);
    } else {
        $(container).prop("checked", false);
    }
}
