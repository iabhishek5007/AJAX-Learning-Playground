# AJAX Learning Project

This project is designed for beginners to learn different AJAX techniques in JavaScript. It includes simple, well-commented examples using:

- **XMLHttpRequest** (see `ajax.js`)
- **Fetch API** (see `fetch-tutorial.js`)
- **jQuery AJAX** (see `jquery-ajax-example.js`)

## How to Use

1. **Open `ajax.html` in your browser.**
   - This file includes buttons to trigger AJAX requests and displays the results.
2. **Try each AJAX method:**
   - The "Fetch Data" button uses the Fetch API.
   - The "Populate" button uses XMLHttpRequest.
   - If you add a button with id `fetchBtnJQuery`, you can try the jQuery AJAX example (make sure jQuery is included in your HTML).

## File Overview

- **ajax.html**: Main HTML file with UI and script includes.
- **ajax.js**: Demonstrates AJAX with XMLHttpRequest.
- **fetch-tutorial.js**: Demonstrates AJAX with the Fetch API.
- **jquery-ajax-example.js**: Demonstrates AJAX with jQuery's `$.ajax` method.

## Sample: AJAX with XMLHttpRequest (ajax.js)

**POST Request Example:**
```js
// Send a POST request using XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open("POST", "https://dummy.restapiexample.com/api/v1/create", true);
xhr.getResponseHeader("Content-type", "application/json");
xhr.onload = function () {
  if (this.status === 200) {
    console.log(this.responseText);
  } else {
    console.log("Some error occured");
  }
};
let params = `{"name":"test1","salary":"123","age":"23"}`;
xhr.send(params);
```

**GET Request Example:**
```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummy.restapiexample.com/api/v1/employees", true);
xhr.onload = function () {
  if (this.status === 200) {
    let obj = JSON.parse(this.responseText);
    // handle obj
  }
};
xhr.send();
```

---

## Sample: AJAX with Fetch API (fetch-tutorial.js)

## jQuery AJAX POST Example

This project now includes a jQuery AJAX POST example for sending data to a server. Make sure jQuery is included in your HTML as shown below.

**Sample HTML Button:**
```html
<button id="fetchBtnJQuery">Send POST (jQuery)</button>
```

**Sample JavaScript (jquery-ajax-example.js):**
```js
$(document).ready(function() {
  $('#fetchBtnJQuery').click(function() {
    $.ajax({
      url: 'https://dummy.restapiexample.com/api/v1/create',
      type: 'POST',
      data: JSON.stringify({ name: 'test1', salary: '123', age: '23' }),
      contentType: 'application/json',
      success: function(response) {
        console.log('Success:', response);
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });
});
```

## Frequently Used AJAX Patterns (Production Level)

Here are some best practices and code patterns commonly used in production projects:

### 1. Centralized AJAX Error Handling
```js
function handleAjaxError(xhr, status, error) {
  // Log error, show user-friendly message, etc.
  alert('An error occurred: ' + error);
}

$.ajax({
  url: '/api/data',
  method: 'GET',
  success: function(data) {
    // handle data
  },
  error: handleAjaxError
});
```

### 2. Showing Loading Indicators
```js
$(document).ajaxStart(function() {
  $('#loadingSpinner').show();
}).ajaxStop(function() {
  $('#loadingSpinner').hide();
});
```

### 3. Using Promises with Fetch API
```js
fetch('/api/data')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    // handle data
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

### 4. Best Practices
- Always handle errors (network, server, validation).
- Use loading indicators for better UX.
- Validate and sanitize data before sending.
- Avoid hardcoding URLs; use configuration where possible.
- Use HTTPS endpoints in production.

## Requirements

- For the jQuery example, include jQuery in your HTML:
  ```html
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="jquery-ajax-example.js"></script>
  ```

Happy Learning!

---

**GET Request Example:**
```js
fetch("https://dummy.restapiexample.com/api/v1/employees")
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then((obj) => {
    // handle obj.data
  })
  .catch((error) => {
    console.error(error);
  });
```

**POST Request Example:**
```js
const employeeData = {
  name: "Jane Smith",
  salary: "54321",
  age: "28",
};
fetch("https://dummy.restapiexample.com/api/v1/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(employeeData),
})
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then((obj) => {
    // handle obj
  })
  .catch((error) => {
    console.error(error);
  });
```

---