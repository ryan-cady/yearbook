document.addEventListener("DOMContentLoaded", function () {

    // Listen for the window 'load' event to ensure the DOM is fully loaded
    window.addEventListener('DOMContentLoaded', () => {
        // Event listener for the submit button
        document.getElementById("button-submit").addEventListener('click', (event) => {
            // Assign author from the input field
            const author = document.getElementById('input1').value;

            // Define the number of input elements to collect
            const numInput = 33;
            const inputArray = [];

            // Loop to fill in the array with values from the input fields
            for (let i = 1; i <= numInput; i++) {
                inputArray.push(document.getElementById('input' + i).value);
            }

            // Check if any of the inputs are empty
            const anyEmpty = inputArray.some(input => input.trim() === '');

            // If any input is empty, display an alert and prevent form submission
            if (anyEmpty) {
                alert('Please fill in all inputs before submitting.');

                // Prevent form submission
                event.preventDefault();
            } else {
                // Create an object to store the author and responses
                const obj = {
                    "author": author,
                    "response": inputArray
                };

                // Stringify the object to send to the server
                const jsonData = JSON.stringify(obj);

                // POST request to send the data to the server
                fetch('/noResponse', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: jsonData
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                        // Redirect to results.html to display the submitted data
                        window.location.href = 'gallery.html';
                    });
            }
        });

    });