const api_key=config.MY_API_KEY;
const api_control=document.querySelector(".api-control");
const api_request=document.querySelector(".api-request");
const weather_display=document.querySelector(".weather-display");
const message_display=document.querySelector(".message-display");




async function getWeather(city){
    city=String(city).toLowerCase();
    try{
        const fetched=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
        const jsonData=await fetched.json();
        return jsonData;
    }
    catch(error){
        console.error(error);
    }
    return null;
}
function displayWeather(data){
    weather_components=weather_display.children;
    weather_components[0].textContent=data.name;
    weather_components[1].textContent=`${data.main.temp}°C`;
    weather_components[2].textContent=`Humidity: ${data.main.humidity}%`;
    weather_components[3].textContent=String(data.weather[0].description);
    weather_components[4].children[0].src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weather_display.classList.remove("hide");
    message_display.classList.add("hide");
}
api_control.addEventListener("submit",async e=>{
    e.preventDefault();
    const city=api_request.value;
    if(city){
        try{
            const weatherData=await getWeather(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.error(error);
            message_display.classList.remove("hide");
            weather_display.classList.add("hide");
        }
    }
    else{
        message_display.textContent="Enter a City"
    }
});