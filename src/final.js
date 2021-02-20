function displayTemperature(response){
    let cityElement=document.querySelector("#city");
    let descriptionElement =document.querySelector("#description");
    let temperatureElement=document.querySelector("#temperature");
    let humidityElement=document.querySelector("#humidity");

    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    humidityElement.innerHTML=Math.round(response.data.main.humidity);
 

}

let apiKey="40c070457645a25e3aed4a4bf9319268";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Erlangen&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);