document.addEventListener('DOMContentLoaded', () => {

    // Define arrays of images for each avatar component

    const headImages = [
        'head1.svg',
        'head2.svg',
        'head3.svg',
        'head4.svg'
    ];

    const hairImages = [
        'hair0.svg',
        'hair1.svg',
        'hair2.svg',
        'hair3.svg',
        'hair4.svg',
        'hair5.svg',
        'hair6.svg',
    ];

    const eyesImages = [
        'eyes1.svg',
        'eyes2.svg',
        'eyes3.svg',
        'eyes4.svg',
        'eyes5.svg',
        'eyes6.svg',
    ];

    const noseImages = [
        'nose1.svg',
        'nose2.svg',
        'nose3.svg',
    ];

    const mouthImages = [
        'mouth1.svg',
        'mouth2.svg',
        'mouth3.svg',
        'mouth4.svg',
        'mouth5.svg'
    ];

    const glassesImages = [
        'glasses0.svg',
        'glasses1.svg',
        'glasses2.svg',
        'glasses3.svg',
    ];

    const eyebrowsImages = [
        'eyebrows1.svg',
        'eyebrows2.svg',
        'eyebrows3.svg',
        'eyebrows4.svg',
        'eyebrows5.svg',
    ];

    // Initialize current indices for all avatar components
    let currentHeadIndex = getRandomIndex(headImages.length);
    let currentHairIndex = getRandomIndex(hairImages.length);
    let currentEyesIndex = getRandomIndex(eyesImages.length);
    let currentNoseIndex = getRandomIndex(noseImages.length);
    let currentMouthIndex = getRandomIndex(mouthImages.length);
    let currentGlassesIndex = getRandomIndex(glassesImages.length);
    let currentEyebrowsIndex = getRandomIndex(eyebrowsImages.length);

    let divToSave = document.querySelector('#headDiv');

    // Function to get a random index within a given range
    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    // Function to change the background image of the specified component
    function changeBackgroundImage(component, imagesArray, currentIndex) {
        const componentDiv = document.getElementById(component);
        componentDiv.style.backgroundImage = `url(/images/${imagesArray[currentIndex]})`;

        // Increment the index or loop back to the beginning if the end is reached
        currentIndex = (currentIndex + 1) % imagesArray.length;
        return currentIndex;
    }

    // Add click event listeners to each button for all components
    document.getElementById('headButton').addEventListener('click', function () {
        currentHeadIndex = changeBackgroundImage('headDiv', headImages, currentHeadIndex);
    });

    document.getElementById('hairButton').addEventListener('click', function () {
        currentHairIndex = changeBackgroundImage('hairDiv', hairImages, currentHairIndex);
    });

    document.getElementById('eyebrowsButton').addEventListener('click', function () {
        currentEyebrowsIndex = changeBackgroundImage('eyebrowsDiv', eyebrowsImages, currentEyebrowsIndex);
    });

    document.getElementById('eyesButton').addEventListener('click', function () {
        currentEyesIndex = changeBackgroundImage('eyesDiv', eyesImages, currentEyesIndex);
    });

    document.getElementById('noseButton').addEventListener('click', function () {
        currentNoseIndex = changeBackgroundImage('noseDiv', noseImages, currentNoseIndex);
    });

    document.getElementById('mouthButton').addEventListener('click', function () {
        currentMouthIndex = changeBackgroundImage('mouthDiv', mouthImages, currentMouthIndex);
    });

    document.getElementById('glassesButton').addEventListener('click', function () {
        currentGlassesIndex = changeBackgroundImage('glassesDiv', glassesImages, currentGlassesIndex);
    });

    // Initial background image setup (optional)
    changeBackgroundImage('hairDiv', hairImages, currentHairIndex);
    changeBackgroundImage('eyebrowsDiv', eyebrowsImages, currentEyebrowsIndex);
    changeBackgroundImage('eyesDiv', eyesImages, currentEyesIndex);
    changeBackgroundImage('noseDiv', noseImages, currentNoseIndex);
    changeBackgroundImage('mouthDiv', mouthImages, currentMouthIndex);
    changeBackgroundImage('glassesDiv', glassesImages, currentGlassesIndex);
    changeBackgroundImage('headDiv', headImages, currentHeadIndex);

    // Change Background Color
    let backgroundColorInput = document.getElementById('backgroundColorInput');
    let avatarHead = document.querySelector('#headDiv'); // Select the div with class "head"

    // Whenever the user changes the color, the input event will be called.
    backgroundColorInput.addEventListener('input', () => {
        avatarHead.style.backgroundColor = backgroundColorInput.value; // Change the background color of the div
    });


// Submit Button
document.getElementById('submit_button').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the form from submitting and reloading the page

    // Get the user's input name
    const userName = document.getElementById('your_name').value.trim(); // Trim any leading/trailing spaces

    if (userName === '') {
        // Display a popup error if the name is not provided
        alert('Please enter your name.');
    } else {
        // Create a new canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set the canvas dimensions (you can adjust the size as needed)
        canvas.width = 400; // Set the width of the canvas
        canvas.height = 400; // Set the height of the canvas

        // Draw the avatar onto the canvas
        html2canvas(divToSave).then(function (avatarCanvas) {
            // Draw the captured avatar canvas onto the new canvas
            ctx.drawImage(avatarCanvas, 0, 0, canvas.width, canvas.height);

            // Convert the canvas to a data URL with JPG format
            const avatarImageData = canvas.toDataURL('image/jpeg', 1.0);

            // Create an object to store the avatar data
            const avatarData = {
                name: userName,
                image: avatarImageData,
            };

            // Log the data being sent to the server
            console.log('Data being sent to the server:', avatarData);

            // Send the avatar data to the server
            fetch('/submitImage', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(avatarData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    // Trigger image download when the data is successfully sent
                    downloadImage(avatarImageData, 'YearbookPhoto.jpg');

                    // Redirect to gallery.html
                    window.location.href = 'gallery.html';
                })
                .catch(error => {
                    console.error('Error sending avatar data:', error);
                    // Handle error appropriately
                });
        });
    }
});


    // Function to download an image
    function downloadImage(dataURL, filename) {
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = filename;
        a.click();
    }


});