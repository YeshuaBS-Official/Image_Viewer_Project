let gestureBox = document.getElementById('gestureBox');
let imgList = [];
let imageIndex = 0;

function getFoodPics(amount) {
  let requests = []; // Array to store multiple API requests

  for (let i = 0; i < amount; i++) {
    let request = fetch("https://foodish-api.com/api/") // Fetch a random food image
      .then(response => response.json())
      .then(data => data.image)
      .catch(error => console.error("Error fetching image:", error));

    requests.push(request);
  }

  Promise.all(requests).then((images) => { // Wait for all fetch requests to complete
    imgList = images; // Store the fetched images in a list
    imageIndex = 0; // Start at the first image in the list
    console.log(imgList);
    updateScreen(); // Display the first image
  });
}

getFoodPics(7);

function updateScreen() {
  gestureBox.style.backgroundImage = "url('" + imgList[imageIndex] + "')";
}

let startX = 0;

gestureBox.addEventListener('touchstart', function (event) {
  // Capture the initial touch position
  startX = event.touches[0].pageX;
});

gestureBox.addEventListener('touchend', function (event) {
  let endX = event.changedTouches[0].pageX; // Get the position where touch ended
  let diffX = startX - endX; // Calculate the distance moved

  if (Math.abs(diffX) > 50) { // If the swipe is more than 50px
    if (diffX > 0) {
      // Swiped left
      imageIndex = (imageIndex + 1) % imgList.length; // Go to the next image
    } else {
      // Swiped right
      imageIndex = (imageIndex - 1 + imgList.length) % imgList.length; // Go to the previous image
    }
    updateScreen(); // Update the screen with the new image
  }
});
