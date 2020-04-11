const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loadingMsg = document.querySelector('#message-1');
const locationMsg = document.querySelector('#message-2');
const statusMsg = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userLocation = search.value;

    loadingMsg.textContent = 'Loading...';
    locationMsg.textContent = '';
    statusMsg.textContent = '';

    fetch(`http://localhost:3333/weather?address=${userLocation}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                loadingMsg.textContent = data.error;
            } else {
                loadingMsg.textContent = '';
                locationMsg.textContent = data.placeName;
                statusMsg.textContent = `${data.description}, ${data.temperature}°C out there, feeling like ${data.feelsLike}°C, humidity of ${data.humidity}% and ${data.precipitation}% chance of raining.`;
            }
        })
    });   
});