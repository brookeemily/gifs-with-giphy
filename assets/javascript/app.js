var gifSubjects = ["Leganja Estranja", "Alaska Thunderfuck", "Shangela", "Alyssa Edwards", "Jiggly Caliente", "Katya Zamolodchikova"];

//   Dynamically create buttons for subjects

// Create a function that creates buttons
function createButtons() {
  $("#buttons").empty();

  // Loop through the array of gif subjects
  for (var i = 0; i < gifSubjects.length; i++) {
    // Then dynamicaly generate buttons for each subject in the array.
    
    // Set the variable for the button
    var subjectButton = $("<button>");
    // Add class to the subject button
    subjectButton.addClass("subjectButtons");
    // Add a data-attribute with a value of the gifSubjects array at index i
    subjectButton.attr("data-name", gifSubjects[i]);
    // Providing the button's text with a value of the gif subject at index i
    subjectButton.text(gifSubjects[i]);
    // Adding the button to the HTML
    $("#buttons").append(subjectButton);
  }
}
// Call function to create initial buttons
createButtons();


// When the submit button is pressed....
$("#submit").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();

  // Grab the text from the input box
  var subject = $("#userInput").val().trim();

  // The text from the input box is then added to the gifSubjects array
  gifSubjects.push(subject);

  // call the function to create buttons, this will reload buttons and add your new button
  createButtons();

  // clear the input box after submit is clicked
  $(".form-control").val("");

});


// Create function for when the buttons are clicked

  // When one of the subject buttons is clicked...
  $(document).on('click', '.subjectButtons', function(){ 

  // Empty out the current gif display
  $("#gifDisplay").empty();

  // Set the variable for chosenSubject to the subject of the button that was clicked
  var chosenSubject = $(this).attr("data-name");


  // Display the GIFS

  // Call Giphy API
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    chosenSubject + 
    "&api_key=YDNLW68rHf5BtaBseXKFI8RgMhB9kl2f&limit=10";

    // AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;

    // Loop over every result item
    for (var i = 0; i < results.length; i++) {
      // Create a div to display the gifs
      var gifDiv = $("<div>");

      // Storing the result item's rating
      var rating = results[i].rating;

      
      // Creating an image tag that will be the gif that is displayed on the page
      var gifToDisplay = $("<img>");
      gifToDisplay.addClass("theGif");
      
      
      // Giving the image tag an src attribute of a property pulled off the result item
      gifToDisplay.attr("src", results[i].images.fixed_height_still.url);
      gifToDisplay.attr("data-still", results[i].images.fixed_height_still.url);
      gifToDisplay.attr("data-animate", results[i].images.fixed_height.url);
      gifToDisplay.attr("data-state", "still");
      
      
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("giphy rating: " + rating);

      // Appending the paragraph and gifToDisplay we created to the "gifDiv" div we created
      gifDiv.append(gifToDisplay);
      gifDiv.append(p);

      // Prepending the gifDiv to the gifDisplay div in the HTML
      $("#gifDisplay").prepend(gifDiv);
      
    }

    // Pause / Play gif on click

    // When a gif is clicked...
    $(document).on('click', '.theGif', function(){ 
  
      // Set the state variable to the current state of the gif
      var state = $(this).attr("data-state");
      
      // If the clicked image's state is still... 
      if (state === "still") {
        // Update its src attribute to what its data-animate value is.
        $(this).attr("src", $(this).attr("data-animate"));
        // Then, set the image's data-state to animate
        $(this).attr("data-state", "animate");
    
      } else { // Else set src to the data-still value
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


  });
});

