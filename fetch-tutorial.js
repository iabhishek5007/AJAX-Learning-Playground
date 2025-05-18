// Fetch API AJAX Tutorial Example

// This function fetches employee data from a remote API and displays it in the employeeList element
function fetchEmployees() {
  // Get the <ul> element where employee names will be shown
  const list = document.getElementById("employeeList");
  // If the element is not found, log an error and stop
  if (!list) {
    console.log("Element with id 'employeeList' not found.");
    return;
  }
  // Show a loading message while fetching data
  list.innerHTML = "<li>Loading...</li>";
  // Use the Fetch API to get employee data from the API endpoint
  fetch("https://dummy.restapiexample.com/api/v1/employees")
    .then((response) => {
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        // If too many requests, show a specific error
        if (response.status === 429) {
          throw new Error("Too Many Requests. Please try again later.");
        }
        // For other errors, show a generic error
        throw new Error("Network response was not ok");
      }
      // Parse the response body as JSON
      return response.json();
    })
    .then((obj) => {
      let str = "";
      // Check if the API returned success and data is an array
      if (obj.status === "success" && Array.isArray(obj.data)) {
        // Loop through each employee and add their name to the list
        for (let i = 0; i < obj.data.length; i++) {
          str += `<li>${obj.data[i].employee_name}</li>`;
        }
        // Display the list of employee names
        list.innerHTML = str;
      } else {
        // If no data, show a message
        list.innerHTML = "<li>No employee data found.</li>";
      }
    })
    .catch((error) => {
      // If any error occurs (network or parsing), show the error message
      list.innerHTML = `<li>${error.message}</li>`;
      console.error(error);
    });
}

// Example: Attach the fetchEmployees function to a button with id 'fetchBtnFetch'
let fetchBtnFetch = document.getElementById("fetchBtn");
// If the button exists, add a click event listener to call fetchEmployees
if (fetchBtnFetch) {
  fetchBtnFetch.addEventListener("click", fetchEmployees);
}

// This function demonstrates how to send data to the API using a POST request
// and display the response. For demo purposes, it sends a new employee's name, salary, and age.
function createEmployeeFetch() {
  // Example data to send (in a real app, get these from form inputs)
  const employeeData = {
    name: "Jane Smith",
    salary: "54321",
    age: "28",
  };
  // Get or create a div to show the POST response
  let responseDiv = document.getElementById("postResponse");
  if (!responseDiv) {
    responseDiv = document.createElement("div");
    responseDiv.id = "postResponse";
    // Insert after the employeeList element
    const list = document.getElementById("employeeList");
    if (list && list.parentNode) {
      list.parentNode.insertBefore(responseDiv, list.nextSibling);
    } else {
      document.body.appendChild(responseDiv);
    }
  }
  responseDiv.innerHTML = "Sending data...";
  // Use the Fetch API to send a POST request
  fetch("https://dummy.restapiexample.com/api/v1/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too Many Requests. Please try again later.");
        }
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((obj) => {
      // Show the server response (success or error)
      responseDiv.innerHTML = `<pre>${JSON.stringify(obj, null, 2)}</pre>`;
    })
    .catch((error) => {
      responseDiv.innerHTML = `<span style='color:red;'>${error.message}</span>`;
      console.error(error);
    });
}

// Example: Attach the createEmployeeFetch function to a button with id 'createBtnFetch'
let createBtnFetch = document.getElementById("createBtn");
if (createBtnFetch) {
  createBtnFetch.addEventListener("click", createEmployeeFetch);
}
