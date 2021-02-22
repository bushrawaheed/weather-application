function displayTemperature(response){
    let cityElement=document.querySelector("#city");
    let descriptionElement =document.querySelector("#description");
    let temperatureElement=document.querySelector("#temperature");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let temp_minElement=document.querySelector("#temp_min");
    let temp_maxElement=document.querySelector("#temp_max");
    let iconElement=document.querySelector("#icon");
    celsiusTemperature=response.data.main.temp;

    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    humidityElement.innerHTML=Math.round(response.data.main.humidity);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    temp_minElement.innerHTML=Math.round(response.data.main.temp_min);
    temp_maxElement.innerHTML=Math.round(response.data.main.temp_max);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);

}
function search(city){
let apiKey="40c070457645a25e3aed4a4bf9319268";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
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
