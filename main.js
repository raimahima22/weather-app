const searchButton = document.getElementById("search");

let storedData;
async function fetchData(){
    
    const locationValue = document.getElementById("inputPlace").value
    console.log(locationValue);
    apiUrl="https://api.openweathermap.org/data/2.5/weather?q=Dhangadhi&units=metric&appid=2679c63e0aadb5820dafa203f8b8f0cd"
    
    if(navigator.onLine){
    try {
      const response = await fetch(apiUrl);
      
      if (response.ok) {
          const datas = await response.json();         
          localStorage.setItem('Dhangadhi',JSON.stringify(datas));
          console.log("data stored in local storage.");
          var dData = localStorage.getItem('Dhangadhi');
          var storedData = JSON.parse(dData);
      } else {
          console.error("Failed to fetch data. Status:", response.status);
      }
  } catch (error) {

      var dData = localStorage.getItem('Dhangadhi');
      var storedData = JSON.parse(dData);
      console.log("data retrieved from local storage");
  }}

    var Temp=document.getElementById("first_temp")
    Temp.textContent = storedData.main.temp.toString() + "°C";
    
    var info = document.getElementById("weather_info");
    info.textContent=storedData.weather[0].description;

    var iconCode = storedData.weather[0].main;
    if (iconCode =="Clouds"){
    var weatherIcon = document.getElementById("code");
    weatherIcon.src = "cloud.png";
    }
    else if (iconCode=="Rain"){
    var weatherIcon = document.getElementById("code");
    weatherIcon.src = "rain.gif";
    }
    else if (iconCode=="Thunderstorm"){
    var weatherIcon = document.getElementById("code");
    weatherIcon.src = "storm.gif";
    }
    else if (iconCode=="Drizzle"){
    var weatherIcon = document.getElementById("code");
    weatherIcon.src = "rain.gif";
    }
    else if (iconCode=="Clear"){
    var weatherIcon = document.getElementById("code");
    weatherIcon.src = "clear.gif";   
    }
    else if (iconCode=="Mist" || iconCode=="Fog" || iconCode=="Haze" ){
    var weatherIcon = document.getElementById("code");
    weatherIcon.src = "visibility.png"; 
    }
    else if (iconCode =="Snow"){
    var weatherIcon = document.getElementById("code");
    weatherIcon.src = "snow.gif";
    }
    else if (iconCode =="Dust"){
    var weatherIcon = document.getElementById("code");
    weatherIcon.src = "dust.png";
    }
  
    var Location = document.getElementById("location");
    Location.textContent= storedData.name.toString();

    var Max_temp=document.getElementById("max_temp")
    Max_temp.textContent=  storedData.main.temp_max.toString() + "°C /";

    var Min_temp=document.getElementById("min_temp")
    Min_temp.textContent= storedData.main.temp_min.toString() + "°C";
    
    var date=document.getElementById("date");
    var currentDate = new Date(storedData.dt * 1000);
    var formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    date.textContent = formattedDate;
 
    var Pressure=document.getElementById("second_pressure")
    Pressure.textContent= storedData.main.pressure.toString() + " Pa";

    var Humidity=document.getElementById("third_humid")
    Humidity.textContent= storedData.main.humidity.toString() + "%";

    var Wind=document.getElementById("fourth_speed")
    Wind.textContent=storedData.wind.speed.toString() + " m/s";

    var Visibility=document.getElementById("fifth_visible")
    Visibility.textContent=storedData.visibility.toString() + " m";

    // const myJson= JSON.stringify(datas);   
}  

async function dataFetch(){
    const locationValue = document.getElementById("inputPlace").value.trim()
    console.log(locationValue);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&units=metric&appid=2679c63e0aadb5820dafa203f8b8f0cd`);
      if (response.ok) {
          const datas = await response.json();
          localStorage.setItem(locationValue,JSON.stringify(datas));
          console.log("data accessed from the internet.");
          console.log("datas stored in local storage.");
          var dData = localStorage.getItem(locationValue);
          var storedData = JSON.parse(dData);
          // console.log("data retrieval successful");       
      } else {
          console.error("Failed to fetch data. Status:", response.status);
          if (response.status === 404 || (storedData.cod === "404")){
            console.log("Location not found");
            const errorMessage = document.createElement("div_error");
            errorMessage.textContent = "Location not found.";
            errorMessage.classList.add("error");
            document.body.appendChild(errorMessage);
        }
      }
  } catch (error) {
      // console.error("An error occurred here:", error);     
      var dData = localStorage.getItem(locationValue);
      if (!dData){
        console.log("Data not found in local storage.")
        const fail = document.createElement("div_fail")
        fail.textContent = "Location not found in local storage.";
        fail.classList.add("fail")
        document.body.appendChild(fail);
      }
      else{
      var storedData = JSON.parse(dData);
      console.log("data retrieval successful");
      }
  }
    
    var new_container=document.getElementById("container");
    new_container.innerHTML="";

    var search =document.createElement("search");
    search.classList.add("weather");

    var weatherTemp=document.createElement("div_temp")
    weatherTemp.textContent = storedData.main.temp.toString() + "°C";
    
    var iconCode= document.createElement("div_code");
    iconCode.textContent= storedData.weather[0].main;
    if (iconCode.textContent =="Clouds"){
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "cloud.png";
    }
    else if (iconCode.textContent=="Rain"){
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "rain.gif";
    }
    else if (iconCode.textContent=="Thunderstorm"){
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "storm.gif";
    }
    else if (iconCode.textContent=="Drizzle"){
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "rain.gif";
    }
    else if (iconCode.textContent=="Clear"){
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "clear.gif";   
    }
    else if (iconCode.textContent=="Mist" || iconCode=="Fog" || iconCode=="Haze"){
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "mist.png"; 
    }
    else if (iconCode.textContent =="Snow"){
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "snow.gif";
    }
    else if (iconCode.textContent =="Dust"){
    var weatherIcon = document.createElement("img");
    weatherIcon.src ="dust.png";
    }

    var Info = document.createElement("div_details");
    Info.textContent = storedData.weather[0].description;

    var Location = document.createElement("div_location")
    var icon= document.createElement("img");
    icon.src="place.png";
    var locationText = document.createElement("place");
    locationText.textContent= storedData.name.toString();
    Location.appendChild(locationText);
    Location.appendChild(icon);

    var weatherMax_temp=document.createElement("div_max")
    weatherMax_temp.textContent= storedData.main.temp_max.toString() + "°C ";

    var weatherMin_temp=document.createElement("div_min")
    weatherMin_temp.textContent= "/ "+ storedData.main.temp_min.toString() + "°C";

    var date=document.createElement("date");
    var currentDate = new Date(storedData.dt * 1000);
    var formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    date.textContent = formattedDate;
    
    var day = document.createElement("day"); 
    var formattedDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    day.textContent = formattedDay;

    var weatherPressure= document.createElement("div_pressure");
    var pressureImage = document.createElement("img");
    pressureImage.src = "pressure.png"
    weatherPressure.appendChild(pressureImage);
    var pressureHeading = document.createElement("h");
    pressureHeading.textContent = "Pressure";
    weatherPressure.appendChild(pressureHeading);
    var pressureValue = document.createElement("p");
    pressureValue.textContent = storedData.main.pressure.toString() + " Pa";
    weatherPressure.appendChild(pressureValue);

    var weatherHumidity=document.createElement("div_humid")
    var humidImage = document.createElement("img");
    humidImage.src = "humid.png"
    weatherHumidity.appendChild(humidImage);
    var humidityHeading = document.createElement("h");
    humidityHeading.textContent = "Humidity";
    weatherHumidity.appendChild(humidityHeading);
    var humidityValue = document.createElement("p");
    humidityValue.textContent = storedData.main.humidity.toString() + "%";
    weatherHumidity.appendChild(humidityValue);

    var weatherWind=document.createElement("div_wind")
    var windImage = document.createElement("img");
    windImage.src = "wind.png"
    weatherWind.appendChild(windImage);
    var windHeading = document.createElement("h");
    windHeading.textContent = "Wind Speed";
    weatherWind.appendChild(windHeading);
    var windValue = document.createElement("p");
    windValue.textContent = storedData.wind.speed.toString() + " m/s";
    weatherWind.appendChild(windValue);
    
    var visible=document.createElement("div_visible");
    var visibleImage = document.createElement("img");
    visibleImage.src = "visibility.png"
    visible.appendChild(visibleImage);
    var visibleHeading = document.createElement("h");
    visibleHeading.textContent = "Visibility";
    visible.appendChild(visibleHeading);
    var visibilityValue = document.createElement("p");
    visibilityValue.textContent = storedData.visibility.toString() + " m";
    visible.appendChild(visibilityValue);

    const Json= JSON.stringify(storedData);
    
    search.appendChild(weatherTemp);
    search.appendChild(weatherIcon);
    search.appendChild(Info);
    search.appendChild(Location);
    search.appendChild(weatherMax_temp);
    search.appendChild(weatherMin_temp);
    search.appendChild(date);
    search.appendChild(weatherPressure);
    search.appendChild(weatherHumidity);
    search.appendChild(weatherWind); 
    search.appendChild(visible);     
    new_container.appendChild(search);   
}

if (inputPlace.value=="" ){
    fetchData();
}

searchButton.addEventListener('click',()=>{
    if (inputPlace.value != "" ) {
      dataFetch();
    }
  });
inputPlace.addEventListener("keydown", function (event) {
    if (event.keyCode === 13  && inputPlace.value.trim() != "" ) {
        console.log('func called');
      dataFetch();
    }
});