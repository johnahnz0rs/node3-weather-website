console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


// goal: render content to paragraphs
// 1. select the second mssage p from JavaScript
// 2. just before fetch, render loading message and empty p
// 3. if error, render error
// 4. if no error, render location and forecast
// 5. test your work! search for errors and for valid locations.

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.err) {
                // console.log(data.err);
                messageOne.textContent = data.err;
            } else {
                // console.log(data.location);
                // console.log(data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });

});


