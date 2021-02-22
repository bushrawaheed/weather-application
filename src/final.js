function displayTemperature(response){
    let cityElement=document.querySelector("#city");
    let descriptionElement =document.querySelector("#description");
    let temperatureElement=document.querySelector("#temperature");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let temp_minElement=document.querySelector("#temp_min");
    let temp_maxElement=document.querySelector("#temp_max");



    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    humidityElement.innerHTML=Math.round(response.data.main.humidity);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    temp_minElement.innerHTML=Math.round(response.data.main.temp_min);
    temp_maxElement.innerHTML=Math.round(response.data.main.temp_max);


}
let apiKey="40c070457645a25e3aed4a4bf9319268";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Erlangen&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
