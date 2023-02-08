//defined variables
var lat;
var lon;
var search = $("#search-form");
var city = document.querySelector("#city");
var cardContainer =document.querySelector("#cardcontainer");
var clear = document.querySelector("#clear");
//listens to the submit button
search.on("submit",function(event){
    event.preventDefault();
    
    var cityInput = city.value;
    if(cityInput){
        getCityName(cityInput);
      
        // getApi(latInput,lonInput);
    }else{
        console.log("You need to search a value");
        return;
    }
 
})
//clear stuff
clear.addEventListener("click",function(){
    cardContainer.innerHTML = "";
})
//get api function which listens to the longitude and latitude
function getApi(latValue,lonValue){
    var lang = 'en';
    var units = 'metric';
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latValue}&lon=${lonValue}&lang=${lang}&units=${units}&appid=b3bc862dbbd015f43fc00d688d65a36c`;
    
    console.log(requestUrl);
    fetch(requestUrl)

        .then(function(response){
            if(response.ok){
                console.log(response);
                response.json().then(function(data){
                    var template;
                    console.log(data);
                    for(var i = 0;i<5;i++){
                        var icon = data.list[i].weather[0].icon;
                        var iconLink = "https://openweathermap.org/img/w/" + icon + ".png";
                         template = `<div class="card" style="width: 18rem;">
                        <h1 class="card-text">${data.city.name}</h1>
                        <h1 class="card-text">${data.list[i].dt_txt}</h1>             
        <img src="${iconLink}" class="card-img-top" alt="Image">
        <div class="card-body">
          <h5 class="card-title">Weather: ${data.list[i].weather[0].description}</h5>
          <p class="card-text">Temperature: ${data.list[i].main.temp}c</p>
          <p class="card-text">Pressure:${data.list[i].main.pressure}hPA</p>
          <p class="card-text">Humidity:${data.list[i].main.humidity}%</p>
          
          <p class="card-text">Precipitation:${data.list[i].pop}</p>
          <p class="card-text">Wind speed: ${data.list[i].wind.speed}m/s</p>
          
        </div>
      </div>`;
                        
                        cardContainer.innerHTML += template;
                    }
                   
                })
            }else{
                alert("Error: "+response.statusText);
            }
        });
}
//get api funciton that listens to city name and convert it to lon and lat
function getCityName(searchInput){
    
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=b3bc862dbbd015f43fc00d688d65a36c`;
    fetch(requestUrl)
    .then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                lat = data[0].lat;
                lon = data[0].lon;
                getApi(lat,lon);
                
            
            })
        }else{
            alert("Error: "+ response.statusText);
        }
    })
};
