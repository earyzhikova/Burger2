// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function () {
  console.log("reached burger.js");
  $("#newBurgerButton").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = $("#addBurger").val();
    console.log(newBurger);

    var newBurgerState = {
      burger: newBurger
    };

    //  Send the PUT request.
    $.ajax("/api/burgers/"  , {
      type: "POST",
      data: newBurgerState
    }).then(
      function () {
        console.log("changed the name", newBurger);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  
  });

  //clicked on a devour button
  $(".newBurgerDevoured").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    //Get input text
    // var burger_id = $(this).parent().children(".burger_id").val();
    var burger_id = $(this).attr("data-burgerId");
    console.log(burger_id);

    //package input text to send
    var newBurgerDevoured = {
     devoured: burger_id
    };

    //  Send the PUT request.
    $.ajax("/api/burgers/" + burger_id +"/"  , {
      type: "PUT",
      data: newBurgerDevoured
    }).then(
      function () {
        console.log("Burger" + burger_id + 'was devoured');
        // Reload the page to get the updated list
        location.reload();
      }
    );
  
  });

  var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

{{inc @index}}
  //   // $(".create-form").on("submit", function(event) {
  //   //   // Make sure to preventDefault on a submit event.
  //   //   event.preventDefault();

  //   //   var newCat = {
  //   //     name: $("#ca").val().trim(),
  //   //     sleepy: $("[name=sleepy]:checked").val().trim()
  //   //   };

      // Send the POST request.
    //   $.ajax("/api/burgers", {
    //     type: "POST",
    //     data: newBurgerState
    //   }).then(
    //     function() {
    //       console.log("created new burger");
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    });