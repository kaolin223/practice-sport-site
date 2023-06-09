const apiKey = '52d910f0e9c449b3bb090028231606';

// http://api.weatherapi.com/v1/current.json?key=52d910f0e9c449b3bb090028231606&q=London




const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

const removeCard = () => {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

const showError = (errorMessage) => {
    const html = `<div class="card">${errorMessage}</div>`
    header.insertAdjacentHTML('afterend', html)
}

const showCard = ({ name, country, temp, condition }) => {
    const html = `<div class="card">

    <h2 class="card-city">${name}<span>${country}</span></h2>

    <div class="card-weather">
        <div class="card-value">${temp}</div>
    </div>

    <div class="card-description">${condition}</div>

</div>`;

    header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data;

}


form.onsubmit = async function (e) {
    e.preventDefault();

    let city = input.value.trim();

    const data = await getWeather(city);


    if (data.error) {
        removeCard();
        showError(data.error.message)
    } else {
        removeCard();

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text,
        };

        showCard(weatherData);
    }
}
