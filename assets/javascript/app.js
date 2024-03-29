// Initial array of animals
var animals = ["cheetahs", "bengal tigers", "eagle", "falcon", "hawk", "bluejay", "lions", "cougars", "leopards", "elephant", "giraffe", "chimpanzee", "baboon", "parrot", "german shepard", "mastiff",];

// displayanimalInfo function re-renders the HTML to display the appropriate content
function displayanimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey=q5z135buPZLz6ptuBOwirE0Uqk2XUznc&limit=10&";

    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        //  $("#JSONdata").text(JSON.stringify(data)); initially coded to look at data on webpage vs console.log

        console.log(data);

        // Retrieving the URL for the image
        for (i = 0; i < 11; i++) {

            // Creating a div to hold the animal
            var animalDiv = $("<div class='animal'>");
            console.log(data.data[i].rating)
            console.log(data.data[i].images.fixed_height_small_still.url);
            console.log(data.data[i].images.fixed_height_small.url);

            var stillImgURL = data.data[i].images.fixed_height_small_still.url;
            var animateImgURL = data.data[i].images.fixed_height_small.url;
            var rating = data.data[i].rating;

            // Creating an element to hold the image
            var image = $("<img>");
            image.attr("src", stillImgURL).addClass("gif");
            image.attr("data-state", "still");
            image.attr("data-animate", animateImgURL);
            image.attr("data-still", stillImgURL);
            console.log(image);

            // give attribute to the img element: 

            var ratingP = $("<h4>").text("Rating: " + rating).addClass("rating");

            // Appending the image
            animalDiv.append(image);
            animalDiv.append(ratingP);

            // Putting the entire animal above the previous animals
            $("#animals-view").prepend(animalDiv);
        }
    });

    
    // // function to alternate btwn animate and still GIFs
    // $(document).on("click", ".gif", function () {

    //     // the different states for the GIFs
    //     var state = $(this).attr("data-state");
    //     var animateSrc = $(this).attr("data-animate");
    //     var stillSrc = $(this).attr("data-still");

    //     if (state === "still") {
    //         $(this).attr("src", animateSrc);
    //         $(this).attr("data-state", "animate");
    //     } else if (state === "animate") {
    //         $(this).attr("src", stillSrc);
    //         $(this).attr("data-state", "still");
    //     }
    // });
}

// function to alternate btwn animate and still GIFs - outside of the display animals function so that the still animate button works for all clicks and api retrievals
$(document).on("click", ".gif", function () {

    // the different states for the GIFs
    var state = $(this).attr("data-state");
    var animateSrc = $(this).attr("data-animate");
    var stillSrc = $(this).attr("data-still");

    if (state === "still") {
        $(this).attr("src", animateSrc);
        $(this).attr("data-state", "animate");
    } else if (state === "animate") {
        $(this).attr("src", stillSrc);
        $(this).attr("data-state", "still");
    }
});
// Function for displaying animal data
function renderButtons() {

    // Deleting the animals prior to adding new animals
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // coding to create a button from each index in the animals array
        var b = $("<button>");
        // Adding a class of animal-btn to our button
        b.addClass("animal-btn");
        // Adding a data-attribute
        b.attr("data-name", animals[i]);
        // Providing the initial button text
        b.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(b);
    }
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line retrieves the input from the textbox
    var animal = $("#animal-input").val().trim();

    // This method adds the new animal from the textbox to the animals array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
});
// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayanimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();