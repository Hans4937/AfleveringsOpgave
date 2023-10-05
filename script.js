const myElement = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    myElement.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  myElement.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

//Aplha tauri JS
let w;

function startWorker() {
  if (typeof w == "undefined") {
    w = new Worker("demo_workers.js");
  }
  w.onmessage = function (event) {
    document.getElementById("result").innerHTML = event.data;
  };
}

function stopWorker() {
  w.terminate();
  w = undefined;
}

//Willams JS
// Function to fetch data from the API and display it
function fetchPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const postList = document.getElementById("post-list");
      data.forEach((post) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Title: ${post.title}, Body: ${post.body}`;
        postList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call the fetchPosts function when the page loads
fetchPosts();
