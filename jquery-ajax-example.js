// jQuery AJAX Tutorial Example
// This file demonstrates how to use jQuery's $.ajax method to fetch data from a remote API and display it in the employeeList element.
// Make sure to include jQuery in your HTML before using this script.

function fetchEmployeesJQuery() {
  // Get the <ul> element where employee names will be shown
  var $list = $("#employeeList");
  // If the element is not found, log an error and stop
  if ($list.length === 0) {
    console.log("Element with id 'employeeList' not found.");
    return;
  }
  // Show a loading message while fetching data
  $list.html("<li>Loading...</li>");
  // Use jQuery's AJAX method to get employee data from the API endpoint
  $.ajax({
    url: "https://dummy.restapiexample.com/api/v1/employees",
    method: "GET",
    dataType: "json",
    success: function (obj) {
      var str = "";
      // Check if the API returned success and data is an array
      if (obj.status === "success" && Array.isArray(obj.data)) {
        // Loop through each employee and add their name to the list
        for (var i = 0; i < obj.data.length; i++) {
          str += "<li>" + obj.data[i].employee_name + "</li>";
        }
        // Display the list of employee names
        $list.html(str);
      } else {
        // If no data, show a message
        $list.html("<li>No employee data found.</li>");
      }
    },
    error: function (xhr, status, error) {
      // If any error occurs (network or parsing), show the error message
      $list.html("<li>" + error + "</li>");
      console.error(error);
    },
  });
}

// Example: Attach the fetchEmployeesJQuery function to a button with id 'fetchBtnJQuery'
var $fetchBtnJQuery = $("#fetchBtnJQuery");
if ($fetchBtnJQuery.length > 0) {
  $fetchBtnJQuery.on("click", fetchEmployeesJQuery);
}

// ----------------------
// jQuery AJAX POST Example
// This function demonstrates how to send data to the API using a POST request
// and display the response. For demo purposes, it sends a new employee's name, salary, and age.
function createEmployeeJQuery() {
  // Example data to send (in a real app, get these from form inputs)
  var employeeData = {
    name: "John Doe",
    salary: "12345",
    age: "30",
  };
  // Get or create a div to show the POST response
  var $responseDiv = $("#postResponse");
  if ($responseDiv.length === 0) {
    $responseDiv = $('<div id="postResponse"></div>').insertAfter(
      "#employeeList"
    );
  }
  $responseDiv.html("Sending data...");
  // Use jQuery's AJAX method to send a POST request
  $.ajax({
    url: "https://dummy.restapiexample.com/api/v1/create",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(employeeData),
    contentType: "application/json",
    success: function (obj) {
      // Show the server response (success or error)
      $responseDiv.html("<pre>" + JSON.stringify(obj, null, 2) + "</pre>");
    },
    error: function (xhr, status, error) {
      $responseDiv.html("<span style='color:red;'>" + error + "</span>");
      console.error(error);
    },
  });
}
// To test the POST example, you can call createEmployeeJQuery() from the browser console
// or attach it to a button, e.g.:
// $("#createBtnJQuery").on("click", createEmployeeJQuery);
// Make sure to add a button with id 'createBtnJQuery' in your HTML if you want to test via button.
// The POST response will be shown below the employee list.
// ----------------------
