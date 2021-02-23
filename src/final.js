function formatDate(timestamp){
let date=new Date(timestamp);
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day=days[date.getDay()];
return `${day} ${formatHours(timestamp)}`;
}
function formatHours(timestamp){
    let date=new Date(timestamp);
    let hours=date.getHours();
    if (hours<10){
    hours=`0${hours}`;
    }
let minutes=date.getMinutes();
if(minutes<10){
    minutes=`0${minutes}`;
}
return `${hours}:${minutes}`;}
function displayTemperature(response){
    let cityElement=document.querySelector("#city");
    let dateElement=document.querySelector("#current-date");
    let descriptionElement =document.querySelector("#description");
    let temperatureElement=document.querySelector("#temperature");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let temp_minElement=document.querySelector("#temp_min");
    let temp_maxElement=document.querySelector("#temp_max");
    let iconElement=document.querySelector("#icon");
    celsiusTemperature=response.data.main.temp;

    cityElement.innerHTML=response.data.name;
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    descriptionElement.innerHTML=response.data.weather[0].description;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    humidityElement.innerHTML=Math.round(response.data.main.humidity);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    temp_minElement.innerHTML=Math.round(response.data.main.temp_min);
    temp_maxElement.innerHTML=Math.round(response.data.main.temp_max);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
}

function displayForecast(response){
    let forecastElement=document.querySelector("#forecast");
    forecastElement.innerHTML=null;
    let forecast=null;
    
    for (let index = 0;index<12;index++){
        forecast=response.data.list[index];
        forecastElement.innerHTML +=`
        <div class="col-2">
        <h3>${formatHours(forecast.dt * 1000)}</h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        <div class="weather-forecast-temperature">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>
        ${Math.round(forecast.main.temp_min)}°
        </div>
       </div>`;
     }
   }
function search(city){
let apiKey="40c070457645a25e3aed4a4bf9319268";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}
function handlesearch(event){
    event.preventDefault();
    let cityElement=document.querySelector("#Searchbar");
   search(cityElement.value);
}

function showFahrenheitTemperature(event){
    event.preventDefault();
    celsiuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
let tempElement=document.querySelector("#temperature");
let fahrenheitTemp=(celsiusTemperature* 9)/5 + 32;
tempElement.innerHTML=Math.round(fahrenheitTemp);
}

function showcelsiusTemperature(event){
    event.preventDefault();
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
let celsiusTemperature=null;
let form=document.querySelector("#navbar");
form.addEventListener("submit",handlesearch);


let fahrenheitlink=document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showFahrenheitTemperature);

let celsiuslink=document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showcelsiusTemperature);


search("Erlangen");
