document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from the server
  fetch("/getResponse")
      .then((resp) => resp.json())
      .then((data) => {
          console.log(data.data);

          // Loop through the data and create HTML elements for each item.
          for (let i = 0; i < data.data.length; i++) {
              const avatarData = data.data[i];
              const galleryContainer = document.getElementById("gallery-container");

              // Create a new div element for the gallery item
              const galleryItemDiv = document.createElement("div");
              galleryItemDiv.classList.add("displayAvatar");

              // Create an <img> element for the avatar image
              const avatarImage = document.createElement("img");
              avatarImage.src = avatarData.image;
              avatarImage.alt = avatarData.name;

              // Create a div for the name
              const nameDiv = document.createElement("div");
              nameDiv.classList.add("name");
              nameDiv.innerHTML = `<p>${avatarData.name}</p>`;

              // Append the avatar image and name divs to the gallery item
              galleryItemDiv.appendChild(avatarImage);
              galleryItemDiv.appendChild(nameDiv);

              // Append the gallery item to the gallery container
              galleryContainer.appendChild(galleryItemDiv);
          }
      })
      .catch((error) => {
          console.error("Error fetching data:", error);
      });
});



  
  