var gifSubjects = ["Leganja Estranja", "Alaska Thunderfuck", "Shangela", "Alyssa Edwards", "Jiggly Caliente", "Katya Zamolodchikova"];

//   Dynamically create buttons for subjects

// Create a function that creates buttons
function createButtons() {
  $("#buttons").empty();

  // Loop through the array of gif subjects
  for (var i = 0; i < gifSubjects.length; i++) {
    // Then dynamicaly generating buttons for each subject in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("subjectButtons");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", gifSubjects[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(gifSubjects[i]);
    // Adding the button to the HTML
    $("#buttons").append(a);
  }
}
// Call function to create initial buttons
createButtons();

// This function handles events where one button is clicked
$("#submit").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();

  // This line will grab the text from the input box
  var subject = $("#userInput")
    .val()
    .trim();
  // The movie from the textbox is then added to our array
  gifSubjects.push(subject);

  createButtons();
  // console.log(subject);
  // console.log(gifSubjects);
  $(".form-control").val("");

});

createButtons();


// Create function for when the buttons are clicked
// Event listener for buttons
  $(document).on('click', '.subjectButtons', function(){ 
  // console.log("clicked");
  // In this case, the "this" keyword refers to the button that was clicked
  var chosenSubject = $(this).attr("data-name");
  // console.log(chosenSubject);

  // Display the GIFS

  // Call Giphy API
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    chosenSubject +
    "&api_key=YDNLW68rHf5BtaBseXKFI8RgMhB9kl2f&limit=10";
  // console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      // Creating a div for the gif
      var gifDiv = $("<div>");

      // Storing the result item's rating
      var rating = results[i].rating;

      
      // Creating an image tag that will be the gif that is displayed on the page
      var gifToDisplay = $("<img>");
      gifToDisplay.addClass("theGif");
      
      
      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      gifToDisplay.attr("src", results[i].images.fixed_height_still.url);
      gifToDisplay.attr("data-still", results[i].images.fixed_height_still.url);
      gifToDisplay.attr("data-animate", results[i].images.fixed_height.url);
      gifToDisplay.attr("data-state", "still");
      
      
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("giphy rating: " + rating);

 
      
      // gifToDisplay.attr("src", results[i].images.fixed_height.url);


      // Appending the paragraph and gifToDisplay we created to the "gifDiv" div we created
      gifDiv.append(gifToDisplay);
      
      gifDiv.append(p);
      // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
      $("#gifDisplay").prepend(gifDiv);
      

      // $(".theGif").on("click", function() {

    }

    $(document).on('click', '.theGif', function(){ 
      // console.log("clicky");
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


  });
});

//When a button is clicked, display 10 static, non-animated gif images from the GIPHY API
// Display the rating of each gif underneath

// When a user clicks on a gif, it plays
// When a user clicks on a gif again, it stops
