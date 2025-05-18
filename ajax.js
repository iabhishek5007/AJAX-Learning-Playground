// ajax.js - Demonstrates basic AJAX (XMLHttpRequest) usage in JavaScript
// This file shows how to make GET and POST requests, handle responses, and update the DOM.
// Make sure this script is included in your HTML file after the DOM elements are defined.

console.log("hello"); // Simple log to show the script is loaded

// Get the button element with id 'fetchBtn' (should exist in your HTML)
let fetchBtn = document.getElementById("fetchBtn");

// Attach a click event listener to the fetchBtn
fetchBtn.addEventListener("click", buttonClickHandler);

// This function demonstrates how to send a POST request using XMLHttpRequest
function buttonClickHandler() {
  console.log("You clicked me");
  // Instantiate an XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Open the request
  // Example for GET request (uncomment to use):
  // xhr.open("GET", "abhishek.txt", true);
  // xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);

  // Example for POST request (used below):
  xhr.open("POST", "https://dummy.restapiexample.com/api/v1/create", true);
  // Set the request header to indicate JSON data is being sent
  xhr.getResponseHeader("Content-type", "application/json");

  // Optional: Track progress of the request (can be used for showing a progress bar)
  xhr.onprogress = function () {
    console.log("On progress");
  };

  // Handle the response when it's ready
  xhr.onload = function () {
    if (this.status === 200) {
      // Success: log the response from the server
      console.log(this.responseText);
    } else {
      // Error: log an error message
      console.log("Some error occured");
    }
  };

  // Example data to send in the POST request (as a JSON string)
  let params = `{"name":"test1","salary":"123","age":"23"}`;
  xhr.send(params); // Send the request with data

  console.log("We are done");

  // Optional: Old way to track ready state changes
  // xhr.onreadystatechange = function () {
  //   console.log("ready state is", xhr.readyState);
  // };
}

// Example usage:
// 1. Click the button with id 'fetchBtn' in your HTML to trigger buttonClickHandler.
// 2. The function sends a POST request and logs the server response.

// --- Populate table data using GET request ---
// Get the button element with id 'popBtn'
let popBtn = document.getElementById("popBtn");
popBtn.addEventListener("click", popHandler);

// This function fetches employee data and populates the employee list
function popHandler() {
  console.log("You clicked pop button");
  const xhr = new XMLHttpRequest();
  // Open a GET request to fetch employee data
  xhr.open("GET", "https://dummy.restapiexample.com/api/v1/employees", true);

  xhr.onprogress = function () {
    console.log("On progress");
  };

  xhr.onload = function () {
    if (this.status === 200) {
      // Parse the JSON response
      let obj = JSON.parse(this.responseText);
      console.log(obj);
      // Get the <ul> element where employee names will be shown
      let list = document.getElementById("employeeList");
      if (!list) {
        console.log("Element with id 'employeeList' not found.");
        return;
      }
      let str = "";
      // Check if the API returned success and data is an array
      if (obj.status === "success" && Array.isArray(obj.data)) {
        for (let i = 0; i < obj.data.length; i++) {
          str += `<li>${obj.data[i].employee_name}</li>`;
        }
        // Display the list of employee names
        list.innerHTML = str;
      } else {
        // If no data, show a message
        list.innerHTML = "<li>No employee data found.</li>";
      }
    } else if (this.status === 429) {
      // Handle API rate limit exceeded
      let list = document.getElementById("employeeList");
      if (list) {
        list.innerHTML = "<li>Too Many Requests. Please try again later.</li>";
      }
      console.log("API rate limit exceeded (429)");
    } else {
      // Other errors
      console.log("Some error occured");
    }
  };

  xhr.send(); // Send the GET request
  console.log("We are done");
}

// Example usage:
// 1. Click the button with id 'popBtn' in your HTML to fetch and display employee data.
// 2. The employee names will be shown inside the <ul id="employeeList"></ul> element.
