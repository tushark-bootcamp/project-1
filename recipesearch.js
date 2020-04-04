
var ingredientArray = [];
var txtSearchIngredient = $("#searchIngredient").val()
var APIKey = "ebeadb6afabf46a58d16c7e3e6175a10"; //"96aa363d6b8b4e798af15863b16aaf0e"
var queryParams = getQueryParams();

function getQueryParams() {
    var queryParams = "";
    for (var i = 0; i < ingredientArray.length; i++) {
        if (i == 0) {
            queryParams += ingredientArray[i];
        } else {
            queryParams += ",+" + ingredientArray[i];
        }

    }
    return queryParams;
}

$("#form").submit(function (event) {
    event.preventDefault();
})


function addNewIngredient() {
    $('#addBtn').on('click', function (event) {
        event.preventDefault();
        txtSearchIngredient = $("#searchIngredient").val()
        if (txtSearchIngredient.length === 0) {
            $("#searchIngredient").attr("placeholder", "Please type an ingredient.")
            return
        } else {
            $("#searchIngredient").val("")
            $("#searchIngredient").attr("placeholder", "Ingredient added to list!")
            ingredientArray = txtSearchIngredient.split(",")
            for (i = 0; i < ingredientArray.length; i++) {
                var newFood = $('<p>')
                newFood.text(ingredientArray[i].trim())
                $("#selectFood").append(newFood)
            }
        }
    })
}
addNewIngredient()

function searchIngredients() {

    $('#searchBtn').on('click', function () {
        event.preventDefault();
        if (validateSearch()) {
            var queryParams = getQueryParams();

            var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + queryParams + "&number=4" + "&apiKey=" + APIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log("response: " + JSON.stringify(response));
                localStorage.setItem("searchResults", JSON.stringify(response));
                window.location.href = "./SearchResultPage.html";
            });

        }
    }
    )
}
searchIngredients()

function validateSearch() {
    var validateInput = true;
    if (ingredientArray.length == 0) {
        validateInput = false;
        //alert("Please enter the ingredients to search");
        $("#eventWindow").jqxWindow("open");
    }
    return validateInput;
}

function addEventListeners() {
    // Open the dialog box
    $("#showWindowButton").mousedown(function() {
      $("#eventWindow").jqxWindow("open");
    });
  }
  function createElements() {
    //alert("In create elements");
    var jqxWidget = $("#jqxWidget");
    var offset = jqxWidget.offset();
    $("#eventWindow").jqxWindow({
      position: { x: offset.left + 230, y: offset.top + -300 },
      maxHeight: 130,
      maxWidth: 280,
      minHeight: 30,
      minWidth: 250,
      height: 165,
      width: 270,
      resizable: false,
      isModal: true,
      modalOpacity: 0.3,
      okButton: $("#ok"),
      //cancelButton: $("#cancel"),
      //display: none,
      initContent: function() {
        $("#ok").jqxButton({ width: "65px" });
        //$("#cancel").jqxButton({ width: "65px" });
        $("#ok").focus();
      }
    });
    //$("#showWindowButton").jqxButton({ width: "100px" });
  }
  $(document).ready(function() {
    addEventListeners();
    createElements();
    $("#jqxWidget").css("visibility", "visible");
    $("#eventWindow").jqxWindow("close");
  });




