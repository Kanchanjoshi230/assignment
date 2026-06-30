const apiKey = "YOUR_API_KEY";

async function getWeather(){

    const city = document.getElementById("city").value;

    const weatherCard = document.getElementById("weatherCard");

    if(city===""){
        weatherCard.innerHTML="<p class='error'>Please enter a city.</p>";
        return;
    }

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    }

    catch(error){

        weatherCard.innerHTML=`<p class="error">${error.message}</p>`;

    }

}

function displayWeather(data){

    const weatherCard=document.getElementById("weatherCard");

    const city=data.name;
    const country=data.sys.country;
    const temp=data.main.temp;
    const humidity=data.main.humidity;
    const wind=data.wind.speed;
    const description=data.weather[0].description;
    const icon=data.weather[0].icon;

    weatherCard.innerHTML=`

        <h2>${city}, ${country}</h2>

        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

        <h3>${temp} °C</h3>

        <p><b>Weather:</b> ${description}</p>

        <p><b>Humidity:</b> ${humidity}%</p>

        <p><b>Wind Speed:</b> ${wind} m/s</p>

    `;

}