const input = document.querySelector('.input');
const searchBtn = document.querySelector('.searchBtn');
const search = document.querySelector('.search');
const today = document.querySelector('.today');
const todaynew = document.querySelector('.todaynew');
const header = document.querySelector('.header');
const intro = document.querySelector('.introcontainer');
const place = document.querySelector('.place');
const date = document.querySelector('.date');
const temperature = document.querySelector('.temperature');
const feels = document.querySelector('.feels');
const description = document.querySelector('.description');
const humid = document.getElementById('humid');
const speed = document.getElementById('speed');
const videoSource = document.getElementById('videoSource');
const backgroundVideo = document.getElementById('backgroundVideo');
const loc = today.querySelector('.location');
const image = today.querySelector('.image');
const errorimg = document.querySelector('.errorimg');
const errordesc = document.querySelector('.errordesc');
const errorimgnew = document.querySelector('.errorimgnew');
const errordescnew = document.querySelector('.errordescnew');
const errormsg = document.querySelector('.errormsg');
const errormsgnew = document.querySelector('.errormsgnew');
const nextdays = document.querySelector('.nextdays');
const nextdaysnew = document.querySelector('.nextdaysnew');
const select = document.getElementById('degree');
const thunder = new Audio("assets/thunder.mp3");
const snow = new Audio("assets/snow.mp3");
const rain = new Audio("assets/rain.mp3");
const clear = new Audio("assets/clear.mp3");
const cloud = new Audio("assets/cloud.mp3");
const mist = new Audio("assets/mist.mp3");
const errorsound = new Audio("assets/error.mp3");
const music = document.getElementById("backgroundMusic");
const allAudios = [thunder, snow, rain, clear, cloud, mist, music, errorsound];
let isFirstClick = true;
let isFirstClickerr = true;
let moveClick =true;
let inputloc = '';



window.addEventListener("load", () => {
    music.play().catch(error => {
        console.error('Autoplay is blocked by the browser');
        alert('Click anywhere on the screen to start the music!');
        document.addEventListener("click", startMusic);
            function startMusic() {
            music.play().catch(error => console.error('Error at playing the audio'));
            document.removeEventListener("click", startMusic);
            }
        });
    });




async function checkWeatherc(city){
    const apiKey = "3287b77db818421da22151618251707";
    const baseUrl = "http://api.weatherapi.com/v1";
    const currentWeatherUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;
    const forecastUrl = `${baseUrl}/forecast.json?key=${apiKey}&q=${city}&days=7`;
    const currentWeather_data = await fetch(`${currentWeatherUrl}`).then(response => response.json());
    const forecast_data = await fetch(`${forecastUrl}`).then(response => response.json());
        allAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0; 
        });
    if (currentWeather_data.error) {
        videoSource.src="assets/error.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        errorsound.play();
        if (isFirstClickerr && isFirstClick){
        today.classList.remove('show');
        search.style.transform = 'translateY(-7.5rem)';
        header.style.transform = 'scale(0)';
        switch (currentWeather_data.error.code) {
            case 1006:
                errorimg.src = 'assets/message/not-found.png';
                errorimgnew.src = 'assets/message/not-found.png';
                errordesc.innerHTML = 'OOPS!!! The location is not found';
                errordescnew.innerHTML = 'OOPS!!! The location is not found';
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                errormsgnew.style.visibility = 'hidden';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
            },0);
                break;
            case 1003:
                errorimg.src = 'assets/message/no-entry.png';
                errorimgnew.src = 'assets/message/no-entry.png';
                errordesc.innerHTML = 'Please enter the Location!!!';
                errordescnew.innerHTML = 'Please enter the Location!!!';
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                errormsgnew.style.visibility = 'hidden';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
            },0);
                break;
            default:
                errorimg.src = 'assets/message/api-error.png';
                errorimgnew.src = 'assets/message/api-error.png';
                errordesc.innerHTML = `${currentWeather_data.error.message}!!!`;
                errordescnew.innerHTML = `${currentWeather_data.error.message}!!!`;
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                errormsgnew.style.visibility = 'hidden';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
            },0);
        }
        isFirstClickerr =false;
        }
        else{
        today.classList.remove('show');
        if(todaynew.classList.contains('moveagain')){
            todaynew.classList.add('disappear');
            todaynew.classList.remove('moveagain');
            todaynew.classList.remove('moveshow');
        }
        else if(todaynew.classList.contains('move') || todaynew.classList.contains('moveshow')){
            todaynew.classList.add('movedisappear');
            todaynew.classList.remove('move');
            todaynew.classList.remove('disappear');
            nextdaysnew.classList.add('disappear');
        }
        else if(todaynew.classList.contains('show')){
            todaynew.classList.add('disappear');
            todaynew.classList.remove('moveagain');
            todaynew.classList.remove('moveshow');
        }
        search.style.transform = 'translateY(-7.5rem)';
        header.style.transform = 'scale(0)';
        const errorstyle = window.getComputedStyle(errorimgnew);
        switch (currentWeather_data.error.code) {
            case 1006:
                errorimg.src = 'assets/message/not-found.png';
                errordesc.innerHTML = 'OOPS!!! The location is not found';
                errormsgnew.style.visibility = 'visible';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                if(isFirstClickerr){
                    errormsgnew.style.visibility = 'hidden';
                    isFirstClickerr =false;
                }
                if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){errormsgnew.classList.add('dissapear');}
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
                errordescnew.innerHTML = 'OOPS!!! The location is not found';
                errorimgnew.src = 'assets/message/not-found.png';
                errormsgnew.classList.remove('dissapear');
            },2000);
                break;
            case 1003:
                errorimg.src = 'assets/message/no-entry.png';   
                errordesc.innerHTML = 'Please enter the Location!!!';  
                errormsgnew.style.visibility = 'visible';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                if(isFirstClickerr){
                    errormsgnew.style.visibility = 'hidden';
                    isFirstClickerr =false;
                }
                if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){errormsgnew.classList.add('dissapear');}
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
                errordescnew.innerHTML = 'Please enter the Location!!!';
                errorimgnew.src = 'assets/message/no-entry.png';
                errormsgnew.classList.remove('dissapear');
            },2000);
                break;
            default:
                errorimg.src = 'assets/message/api-error.png';
                errordesc.innerHTML = `${currentWeather_data.error.message}!!!`;
                errormsgnew.style.visibility = 'visible';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                if(isFirstClickerr){
                    errormsgnew.style.visibility = 'hidden';
                    isFirstClickerr =false;
                }
                if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){errormsgnew.classList.add('dissapear');}
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
                errordescnew.innerHTML = `${currentWeather_data.error.message}!!!`;
                errorimgnew.src = 'assets/message/api-error.png';
                errormsgnew.classList.remove('dissapear');
            },2000);
        }
        }
    }
    else{
const daysnext = nextdays.querySelectorAll('.days');
forecast_data.forecast.forecastday.forEach((day, index) => {
  if (index === 0) {
    const lastUpdated = currentWeather_data.current.last_updated;
    const dateObj = new Date(lastUpdated);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
    place.innerHTML = `${currentWeather_data.location.name}, ${currentWeather_data.location.country}`;
    date.innerHTML = formattedDate;
    temperature.innerHTML = `${currentWeather_data.current.temp_c}°C`;
    feels.innerHTML = `Feels like ${currentWeather_data.current.feelslike_c}°C`;
    description.innerHTML = `${currentWeather_data.current.condition.text}`;
    humid.innerHTML = `${currentWeather_data.current.humidity}%`;
    speed.innerHTML = `${currentWeather_data.current.wind_kph} Km/hr`;
  } else {
    const dayElement = daysnext[index - 1];
    const dateObj = new Date(day.date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDatenext = `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
    const datenext = dayElement.querySelector('.datenext');
    const min_temp = dayElement.querySelector('.min_temp');
    const max_temp = dayElement.querySelector('.max_temp');
    const descriptionnext = dayElement.querySelector('.descriptionnext');
    datenext.innerHTML = formattedDatenext;
    min_temp.innerHTML = `Min: ${Math.round(day.day.mintemp_c)}°C`;
    max_temp.innerHTML = `Max: ${Math.round(day.day.maxtemp_c)}°C`;
    descriptionnext.innerHTML = `${day.day.condition.text}`;
  }
});
    if (isFirstClick) {
        search.style.transform = 'translateY(-7.5rem)';
        header.style.transform = 'scale(0)';
        const errorstyle = window.getComputedStyle(errorimgnew);
        if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){
            errormsgnew.classList.add('dissapear');
            setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
            },1400);
        }
        today.classList.add('show');
        applyEffects(today);
        todaynew.innerHTML = today.innerHTML;
        nextdaysnew.innerHTML = nextdays.innerHTML;
        applyEffects(todaynew);
        setTimeout(()=>{
            todaynew.classList.add('show');
            today.classList.remove('show');
        },5000);
        
        isFirstClick = false; 
    } else {
        if(!moveClick){
        todaynew.classList.remove('move');
        today.classList.remove('move');
        today.classList.remove('reset');
        todaynew.classList.add('moveshow');
        todaynew.classList.add('movedisappear');
        today.classList.add('moveshow');
        nextdaysnew.classList.add('show');
        nextdaysnew.classList.add('disappear');
        nextdays.classList.add('show');
        const errorstyle = window.getComputedStyle(errorimgnew);
        if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){
            errormsgnew.classList.add('dissapear');
            setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
            },1400);
        }
        setTimeout(()=>{
            today.classList.remove('moveshow');
            today.classList.add('reset');
            todaynew.classList.remove('movedisappear');
            nextdaysnew.classList.remove('disappear');
            nextdays.classList.remove('show');
            todaynew.innerHTML = today.innerHTML;
            nextdaysnew.innerHTML = nextdays.innerHTML;
        },2010);
        }
        else{
            today.classList.remove('reset');
            todaynew.classList.remove('moveshow');
            todaynew.classList.remove('moveagain');
            today.classList.remove('moveagain');
            todaynew.classList.add('show');
            todaynew.classList.add('disappear');
            today.classList.add('show');
            const errorstyle = window.getComputedStyle(errorimgnew);
        if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){
            errormsgnew.classList.add('dissapear');
            setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
            },1400);
        }
            setTimeout(()=>{
                today.classList.remove('show');
                todaynew.classList.remove('disappear');
                todaynew.innerHTML = today.innerHTML;
                nextdaysnew.innerHTML = nextdays.innerHTML;
            },2010);
        }
    }
    const locnew = todaynew.querySelector('.location');
    const imagenew = todaynew.querySelector('.image');
    const datenext = nextdays.querySelectorAll('.datenext');
    const datenextnew = nextdaysnew.querySelectorAll('.datenext');
    const daysnextnew = nextdaysnew.querySelectorAll('.days');
    today.style.color="white";
    today.style.border="2px solid white";
    search.style.border="2px solid white";
    loc.style.border="2px solid white";
    setTimeout(()=>{    
        todaynew.style.color="white";
        todaynew.style.border="2px solid white";
        locnew.style.border="2px solid white";
    },2000);
    daysnext.forEach(el => {el.style.color="white";});
    daysnext.forEach(el => {el.style.border="2px solid white";});
    datenext.forEach(el => {el.style.border="2px solid white";});
    setTimeout(()=>{    
        daysnextnew.forEach(el => {el.style.color="white";});
        daysnextnew.forEach(el => {el.style.border="2px solid white";});
        datenextnew.forEach(el => {el.style.border="2px solid white";});
    },2000);
forecast_data.forecast.forecastday.forEach((day, index) => {
  if (index === 0) {
    const conditionText = currentWeather_data.current.condition.text;
        if (conditionText.toLowerCase().includes("thunder"))
    {
        image.src= "assets/weather/thunderstorm.svg";
        setTimeout(()=>{imagenew.src= "assets/weather/thunderstorm.svg";},2000);
        videoSource.src="assets/Thunderstrom.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        thunder.play();
    }
    else if (conditionText.toLowerCase().includes("snow") || conditionText.toLowerCase().includes("hail") || conditionText.toLowerCase().includes("blizzard") || conditionText.toLowerCase().includes("ice") || conditionText.toLowerCase().includes("sleet"))
    {
        image.src= "assets/weather/snow.svg";
        setTimeout(()=>{
            imagenew.src= "assets/weather/snow.svg";
            todaynew.style.color="rgb(70, 70, 177)";
            todaynew.style.border="2px solid rgb(70, 70, 177)";
            locnew.style.border="2px solid rgb(70, 70, 177)";
            daysnextnew.forEach(el => {el.style.color="rgb(70, 70, 177)";});
            daysnextnew.forEach(el => {el.style.border="2px solid rgb(70, 70, 177)";});
            datenextnew.forEach(el => {el.style.border="2px solid rgb(70, 70, 177)";});
        },2000);
        videoSource.src="assets/Snow.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        snow.play();
        today.style.color="rgb(70, 70, 177)";
        today.style.border="2px solid rgb(70, 70, 177)";
        search.style.border="2px solid rgb(70, 70, 177)";
        loc.style.border="2px solid rgb(70, 70, 177)";
        daysnext.forEach(el => {el.style.color="rgb(70, 70, 177)";});
        daysnext.forEach(el => {el.style.border="2px solid rgb(70, 70, 177)";});
        datenext.forEach(el => {el.style.border="2px solid rgb(70, 70, 177)";});
    }
    else if (conditionText.toLowerCase().includes("rain") || conditionText.toLowerCase().includes("drizzle"))
    {
        image.src= "assets/weather/rain.svg";
        setTimeout(()=>{imagenew.src= "assets/weather/rain.svg";},2000);
        videoSource.src="assets/Rain.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        rain.play();
    }
    else if (conditionText.toLowerCase().includes("fog") || conditionText.toLowerCase().includes("mist"))
    {
        image.src= "assets/weather/mist.svg";
        setTimeout(()=>{
            imagenew.src= "assets/weather/mist.svg";
            todaynew.style.color="rgb(27, 27, 113)";
            todaynew.style.border="2px solid rgb(27, 27, 113)";
            locnew.style.border="2px solid rgb(27, 27, 113)";
            daysnextnew.forEach(el => {el.style.color="rgb(27, 27, 113)";});
            daysnextnew.forEach(el => {el.style.border="2px solid rgb(27, 27, 113)";});
            datenextnew.forEach(el => {el.style.border="2px solid rgb(27, 27, 113)";});
        },2000);
        videoSource.src="assets/Mist.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        mist.play();
        today.style.color="rgb(27, 27, 113)";
        today.style.border="2px solid rgb(27, 27, 113)";
        search.style.border="2px solid rgb(27, 27, 113)";
        loc.style.border="2px solid rgb(27, 27, 113)";
        daysnext.forEach(el => {el.style.color="rgb(27, 27, 113)";});
        daysnext.forEach(el => {el.style.border="2px solid rgb(27, 27, 113)";});
        datenext.forEach(el => {el.style.border="2px solid rgb(27, 27, 113)";});
    }
    else if (conditionText.toLowerCase().includes("cloudy") || conditionText.toLowerCase().includes("overcast"))
    {
        image.src= "assets/weather/clouds.svg";
        setTimeout(()=>{imagenew.src= "assets/weather/clouds.svg";},2000);
        videoSource.src="assets/Clouds.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        cloud.play();
    }
    else if (conditionText.toLowerCase().includes("clear") || conditionText.toLowerCase().includes("sunny"))
    {
        image.src= "assets/weather/clear.svg";
        setTimeout(()=>{imagenew.src= "assets/weather/clear.svg";},2000);
        videoSource.src="assets/Clear.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        clear.play();
    }
  } else {
    const dayElement = daysnext[index - 1];
    const imagenext = dayElement.querySelector('.imagenext');
    const imagenextnew = dayElement.querySelector('.imagenext');
    const conditionTextnext = day.day.condition.text;
        if (conditionTextnext.toLowerCase().includes("thunder"))
    {
        imagenext.src= "assets/weather/thunderstorm.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/thunderstorm.svg";},2000);
    }
    else if (conditionTextnext.toLowerCase().includes("snow") || conditionTextnext.toLowerCase().includes("hail") || conditionTextnext.toLowerCase().includes("blizzard") || conditionTextnext.toLowerCase().includes("ice") || conditionTextnext.toLowerCase().includes("sleet"))
    {
        imagenext.src= "assets/weather/snow.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/snow.svg";},2000);
    }
    else if (conditionTextnext.toLowerCase().includes("rain") || conditionTextnext.toLowerCase().includes("drizzle"))
    {
        imagenext.src= "assets/weather/rain.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/rain.svg";},2000);
    }
    else if (conditionTextnext.toLowerCase().includes("fog") || conditionTextnext.toLowerCase().includes("mist"))
    {
        imagenext.src= "assets/weather/mist.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/mist.svg";},2000);    
    }
    else if (conditionTextnext.toLowerCase().includes("cloudy") || conditionTextnext.toLowerCase().includes("overcast"))
    {
        imagenext.src= "assets/weather/clouds.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/clouds.svg";},2000);
    }
    else if (conditionTextnext.toLowerCase().includes("clear") || conditionTextnext.toLowerCase().includes("sunny"))
    {
        imagenext.src= "assets/weather/clear.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/clear.svg";},2000);
    }
  }
});
}
}




async function checkWeatherf(city){
    const apiKey = "3287b77db818421da22151618251707";
    const baseUrl = "http://api.weatherapi.com/v1";
    const currentWeatherUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;
    const forecastUrl = `${baseUrl}/forecast.json?key=${apiKey}&q=${city}&days=7`;
    const currentWeather_data = await fetch(`${currentWeatherUrl}`).then(response => response.json());
    const forecast_data = await fetch(`${forecastUrl}`).then(response => response.json());
        allAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0; 
        });
    if (currentWeather_data.error) {
        videoSource.src="assets/error.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        errorsound.play();
        if (isFirstClickerr && isFirstClick){
        today.classList.remove('show');
        search.style.transform = 'translateY(-7.5rem)';
        header.style.transform = 'scale(0)';
        switch (currentWeather_data.error.code) {
            case 1006:
                errorimg.src = 'assets/message/not-found.png';
                errorimgnew.src = 'assets/message/not-found.png';
                errordesc.innerHTML = 'OOPS!!! The location is not found';
                errordescnew.innerHTML = 'OOPS!!! The location is not found';
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                errormsgnew.style.visibility = 'hidden';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
            },0);
                break;
            case 1003:
                errorimg.src = 'assets/message/no-entry.png';
                errorimgnew.src = 'assets/message/no-entry.png';
                errordesc.innerHTML = 'Please enter the Location!!!';
                errordescnew.innerHTML = 'Please enter the Location!!!';
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                errormsgnew.style.visibility = 'hidden';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
            },0);
                break;
            default:
                errorimg.src = 'assets/message/api-error.png';
                errorimgnew.src = 'assets/message/api-error.png';
                errordesc.innerHTML = `${currentWeather_data.error.message}!!!`;
                errordescnew.innerHTML = `${currentWeather_data.error.message}!!!`;
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                errormsgnew.style.visibility = 'hidden';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
            },0);
        }
        isFirstClickerr =false;
        }
        else{
        today.classList.remove('show');
        if(todaynew.classList.contains('moveagain')){
            todaynew.classList.add('disappear');
            todaynew.classList.remove('moveagain');
            todaynew.classList.remove('moveshow');
        }
        else if(todaynew.classList.contains('move') || todaynew.classList.contains('moveshow')){
            todaynew.classList.add('movedisappear');
            todaynew.classList.remove('move');
            todaynew.classList.remove('disappear');
            nextdaysnew.classList.add('disappear');
        }
        else if(todaynew.classList.contains('show')){
            todaynew.classList.add('disappear');
            todaynew.classList.remove('moveagain');
            todaynew.classList.remove('moveshow');
        }       
        search.style.transform = 'translateY(-7.5rem)';
        header.style.transform = 'scale(0)';
        const errorstyle = window.getComputedStyle(errorimgnew);
        switch (currentWeather_data.error.code) {
            case 1006:
                errorimg.src = 'assets/message/not-found.png';               
                errordesc.innerHTML = 'OOPS!!! The location is not found';                
                errormsgnew.style.visibility = 'visible';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                if(isFirstClickerr){
                    errormsgnew.style.visibility = 'hidden';
                    isFirstClickerr =false;
                }
                if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){errormsgnew.classList.add('dissapear');}
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
                errordescnew.innerHTML = 'OOPS!!! The location is not found';
                errorimgnew.src = 'assets/message/not-found.png';
                errormsgnew.classList.remove('dissapear');
            },2000);
                break;
            case 1003:
                errorimg.src = 'assets/message/no-entry.png';                
                errordesc.innerHTML = 'Please enter the Location!!!';               
                errormsgnew.style.visibility = 'visible';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';

                if(isFirstClickerr){
                    errormsgnew.style.visibility = 'hidden';
                    isFirstClickerr =false;
                }
                if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){errormsgnew.classList.add('dissapear');}
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
                errordescnew.innerHTML = 'Please enter the Location!!!';
                errorimgnew.src = 'assets/message/no-entry.png';
                errormsgnew.classList.remove('dissapear');
            },2000);
                break;
            default:
                errorimg.src = 'assets/message/api-error.png';
                errordesc.innerHTML = `${currentWeather_data.error.message}!!!`;
                errormsgnew.style.visibility = 'visible';
                errorimgnew.style.transform = 'translateY(0)';
                errordescnew.style.transform = 'scale(1)';
                if(isFirstClickerr){
                    errormsgnew.style.visibility = 'hidden';
                    isFirstClickerr =false;
                }
                if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){errormsgnew.classList.add('dissapear');}
                errormsg.style.visibility = 'visible';
                errorimg.style.transform = 'translateY(0)';
                errordesc.style.transform = 'scale(1)';
                setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
                errormsgnew.style.visibility = 'visible';
                errordescnew.innerHTML = `${currentWeather_data.error.message}!!!`;
                errorimgnew.src = 'assets/message/api-error.png';
                errormsgnew.classList.remove('dissapear');
            },2000);
        }
        }
    }
    else{
const daysnext = nextdays.querySelectorAll('.days');
forecast_data.forecast.forecastday.forEach((day, index) => {
  if (index === 0) {
    const lastUpdated = currentWeather_data.current.last_updated;
    const dateObj = new Date(lastUpdated);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
    place.innerHTML = `${currentWeather_data.location.name}, ${currentWeather_data.location.country}`;
    date.innerHTML = formattedDate;
    temperature.innerHTML = `${currentWeather_data.current.temp_f}°F`;
    feels.innerHTML = `Feels like ${currentWeather_data.current.feelslike_f}°F`;
    description.innerHTML = `${currentWeather_data.current.condition.text}`;
    humid.innerHTML = `${currentWeather_data.current.humidity}%`;
    speed.innerHTML = `${currentWeather_data.current.wind_kph} Km/hr`;
  } else {
    const dayElement = daysnext[index - 1];
    const dateObj = new Date(day.date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDatenext = `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
    const datenext = dayElement.querySelector('.datenext');
    const min_temp = dayElement.querySelector('.min_temp');
    const max_temp = dayElement.querySelector('.max_temp');
    const descriptionnext = dayElement.querySelector('.descriptionnext');
    datenext.innerHTML = formattedDatenext;
    min_temp.innerHTML = `Min: ${Math.round(day.day.mintemp_f)}°F`;
    max_temp.innerHTML = `Max: ${Math.round(day.day.maxtemp_f)}°F`;
    descriptionnext.innerHTML = `${day.day.condition.text}`;
  }
});
    if (isFirstClick) {
        search.style.transform = 'translateY(-7.5rem)';
        header.style.transform = 'scale(0)';
        const errorstyle = window.getComputedStyle(errorimgnew);
        if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){
            errormsgnew.classList.add('dissapear');
            setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
            },1400);
        }
        today.classList.add('show');
        applyEffects(today);
        todaynew.innerHTML = today.innerHTML;
        nextdaysnew.innerHTML = nextdays.innerHTML;
        applyEffects(todaynew);
        setTimeout(()=>{
            todaynew.classList.add('show');
            today.classList.remove('show');
        },5000);
        
        isFirstClick = false; 
    } else {
        if(!moveClick){
        todaynew.classList.remove('move');
        today.classList.remove('move');
        today.classList.remove('reset');
        todaynew.classList.add('moveshow');
        todaynew.classList.add('movedisappear');
        today.classList.add('moveshow');
        nextdaysnew.classList.add('show');
        nextdaysnew.classList.add('disappear');
        nextdays.classList.add('show');
        const errorstyle = window.getComputedStyle(errorimgnew);
        if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){
            errormsgnew.classList.add('dissapear');
            setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
            },1400);
        }
        setTimeout(()=>{
            today.classList.remove('moveshow');
            today.classList.add('reset');
            todaynew.classList.remove('movedisappear');
            nextdaysnew.classList.remove('disappear');
            nextdays.classList.remove('show');
            todaynew.innerHTML = today.innerHTML;
            nextdaysnew.innerHTML = nextdays.innerHTML;
        },2010);
        }
        else{
            today.classList.remove('reset');
            todaynew.classList.remove('moveshow');
            todaynew.classList.remove('moveagain');
            today.classList.remove('moveagain');
            todaynew.classList.add('show');
            todaynew.classList.add('disappear');
            today.classList.add('show');
            const errorstyle = window.getComputedStyle(errorimgnew);
        if (errorstyle.transform == 'matrix(1, 0, 0, 1, 0, 0)'){
            errormsgnew.classList.add('dissapear');
            setTimeout(()=>{
                errormsg.style.visibility = 'hidden';
                errormsg.style.transform = 'translateY(0rem)';
                errorimg.style.transform = 'translateY(-50rem)';
                errordesc.style.transform = 'scale(0)';
            },1400);
        }
            setTimeout(()=>{
                today.classList.remove('show');
                todaynew.classList.remove('disappear');
                todaynew.innerHTML = today.innerHTML;
                nextdaysnew.innerHTML = nextdays.innerHTML;
            },2010);
        }
    }
    const locnew = todaynew.querySelector('.location');
    const imagenew = todaynew.querySelector('.image');
    const datenext = nextdays.querySelectorAll('.datenext');
    const datenextnew = nextdaysnew.querySelectorAll('.datenext');
    const daysnextnew = nextdaysnew.querySelectorAll('.days');
    today.style.color="white";
    today.style.border="2px solid white";
    search.style.border="2px solid white";
    loc.style.border="2px solid white";
    setTimeout(()=>{    
        todaynew.style.color="white";
        todaynew.style.border="2px solid white";
        locnew.style.border="2px solid white";
    },2000);

    daysnext.forEach(el => {el.style.color="white";});
    daysnext.forEach(el => {el.style.border="2px solid white";});
    datenext.forEach(el => {el.style.border="2px solid white";});
    setTimeout(()=>{    
        daysnextnew.forEach(el => {el.style.color="white";});
        daysnextnew.forEach(el => {el.style.border="2px solid white";});
        datenextnew.forEach(el => {el.style.border="2px solid white";});
    },2000);
forecast_data.forecast.forecastday.forEach((day, index) => {
  if (index === 0) {
    const conditionText = currentWeather_data.current.condition.text;
        if (conditionText.toLowerCase().includes("thunder"))
    {
        image.src= "assets/weather/thunderstorm.svg";
        setTimeout(()=>{imagenew.src= "assets/weather/thunderstorm.svg";},2000);
        videoSource.src="assets/Thunderstrom.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        thunder.play();
    }
    else if (conditionText.toLowerCase().includes("snow") || conditionText.toLowerCase().includes("hail") || conditionText.toLowerCase().includes("blizzard") || conditionText.toLowerCase().includes("ice") || conditionText.toLowerCase().includes("sleet"))
    {
        image.src= "assets/weather/snow.svg";
        setTimeout(()=>{
            imagenew.src= "assets/weather/snow.svg";
            todaynew.style.color="rgb(70, 70, 177)";
            todaynew.style.border="2px solid rgb(70, 70, 177)";
            locnew.style.border="2px solid rgb(70, 70, 177)";
            daysnextnew.forEach(el => {el.style.color="rgb(70, 70, 177)";});
            daysnextnew.forEach(el => {el.style.border="2px solid rgb(70, 70, 177)";});
            datenextnew.forEach(el => {el.style.border="2px solid rgb(70, 70, 177)";});
        },2000);
        videoSource.src="assets/Snow.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        snow.play();
        today.style.color="rgb(70, 70, 177)";
        today.style.border="2px solid rgb(70, 70, 177)";
        search.style.border="2px solid rgb(70, 70, 177)";
        loc.style.border="2px solid rgb(70, 70, 177)";
        daysnext.forEach(el => {el.style.color="rgb(70, 70, 177)";});
        daysnext.forEach(el => {el.style.border="2px solid rgb(70, 70, 177)";});
        datenext.forEach(el => {el.style.border="2px solid rgb(70, 70, 177)";});
    }
    else if (conditionText.toLowerCase().includes("rain") || conditionText.toLowerCase().includes("drizzle"))
    {
        image.src= "assets/weather/rain.svg";
        setTimeout(()=>{imagenew.src= "assets/weather/rain.svg";},2000);
        videoSource.src="assets/Rain.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        rain.play();
    }
    else if (conditionText.toLowerCase().includes("fog") || conditionText.toLowerCase().includes("mist"))
    {
        image.src= "assets/weather/mist.svg";
        setTimeout(()=>{
            imagenew.src= "assets/weather/mist.svg";
            todaynew.style.color="rgb(27, 27, 113)";
            todaynew.style.border="2px solid rgb(27, 27, 113)";
            locnew.style.border="2px solid rgb(27, 27, 113)";
            daysnextnew.forEach(el => {el.style.color="rgb(27, 27, 113)";});
            daysnextnew.forEach(el => {el.style.border="2px solid rgb(27, 27, 113)";});
            datenextnew.forEach(el => {el.style.border="2px solid rgb(27, 27, 113)";});
        },2000);
        videoSource.src="assets/Mist.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        mist.play();
        today.style.color="rgb(27, 27, 113)";
        today.style.border="2px solid rgb(27, 27, 113)";
        search.style.border="2px solid rgb(27, 27, 113)";
        loc.style.border="2px solid rgb(27, 27, 113)";
        daysnext.forEach(el => {el.style.color="rgb(27, 27, 113)";});
        daysnext.forEach(el => {el.style.border="2px solid rgb(27, 27, 113)";});
        datenext.forEach(el => {el.style.border="2px solid rgb(27, 27, 113)";});
    }
    else if (conditionText.toLowerCase().includes("cloudy") || conditionText.toLowerCase().includes("overcast"))
    {
        image.src= "assets/weather/clouds.svg";
        setTimeout(()=>{imagenew.src= "assets/weather/clouds.svg";},2000);
        videoSource.src="assets/Clouds.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        cloud.play();
    }
    else if (conditionText.toLowerCase().includes("clear") || conditionText.toLowerCase().includes("sunny"))
    {
        image.src= "assets/weather/clear.svg";
        setTimeout(()=>{imagenew.src= "assets/weather/clear.svg";},2000);
        videoSource.src="assets/Clear.mp4";
        backgroundVideo.load();
        backgroundVideo.play();
        clear.play();
    }
  } else {
    const dayElement = daysnext[index - 1];
    const imagenext = dayElement.querySelector('.imagenext');
    const imagenextnew = dayElement.querySelector('.imagenext');
    const conditionTextnext = day.day.condition.text;
        if (conditionTextnext.toLowerCase().includes("thunder"))
    {
        imagenext.src= "assets/weather/thunderstorm.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/thunderstorm.svg";},2000);
    }
    else if (conditionTextnext.toLowerCase().includes("snow") || conditionTextnext.toLowerCase().includes("hail") || conditionTextnext.toLowerCase().includes("blizzard") || conditionTextnext.toLowerCase().includes("ice") || conditionTextnext.toLowerCase().includes("sleet"))
    {
        imagenext.src= "assets/weather/snow.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/snow.svg";},2000);
    }
    else if (conditionTextnext.toLowerCase().includes("rain") || conditionTextnext.toLowerCase().includes("drizzle"))
    {
        imagenext.src= "assets/weather/rain.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/rain.svg";},2000);
    }
    else if (conditionTextnext.toLowerCase().includes("fog") || conditionTextnext.toLowerCase().includes("mist"))
    {
        imagenext.src= "assets/weather/mist.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/mist.svg";},2000);    
    }
    else if (conditionTextnext.toLowerCase().includes("cloudy") || conditionTextnext.toLowerCase().includes("overcast"))
    {
        imagenext.src= "assets/weather/clouds.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/clouds.svg";},2000);
    }
    else if (conditionTextnext.toLowerCase().includes("clear") || conditionTextnext.toLowerCase().includes("sunny"))
    {
        imagenext.src= "assets/weather/clear.svg";
        setTimeout(()=>{imagenextnew.src= "assets/weather/clear.svg";},2000);
    }
  }
});
} 
}




function applyEffects(container) {
    const loc = container.querySelector('.location');
    const image = container.querySelector('.image');
    const temp = container.querySelector('.temp');
    const humidity = container.querySelector('.humidity');
    const wind = container.querySelector('.wind');
    const button = container.querySelector('.showcast');


    setTimeout(()=>{loc.style.opacity = '1';},0);
    setTimeout(()=>{image.style.transform = 'translateY(0)';},0);
    setTimeout(()=>{temp.style.opacity = '1';},0);
    setTimeout(()=>{humidity.style.transform = 'translateY(0)';},0);
    setTimeout(()=>{wind.style.transform = 'translateY(0)';},0);
    setTimeout(()=>{button.style.opacity = '1';},0);
}
function applyEffectsnext(container) {
    const days = container.querySelectorAll('.days');
    days.forEach((day) => {

    const datenext = day.querySelector('.datenext');
    const tempnext = day.querySelector('.tempnext');
    const imagenext = day.querySelector('.imagenext');
    const descriptionnext = day.querySelector('.descriptionnext');

    setTimeout(()=>{datenext.style.opacity = '1';},0);
    setTimeout(()=>{tempnext.style.opacity = '1';},0);
    setTimeout(()=>{imagenext.style.transform = 'translateX(0)'},0);
    setTimeout(()=>{descriptionnext.style.opacity = '1';},0);

    });
}
const showcastold = today.querySelector('.showcast');
todaynew.addEventListener('click', (e) => {
        if (e.target.matches('button.showcast')){
        if(moveClick){
            todaynew.classList.add('move');
            todaynew.classList.remove('moveagain');
            today.classList.add('move');
            today.classList.remove('moveagain');
            nextdays.classList.add('show');
            applyEffectsnext(nextdays);
            nextdaysnew.innerHTML = nextdays.innerHTML;
            applyEffectsnext(nextdaysnew);
            setTimeout(()=>{
                nextdaysnew.classList.add('show');
                nextdays.classList.remove('show');
            },2000);
            moveClick =false;
        }
        else{
            today.classList.remove('reset');
            todaynew.classList.add('moveagain');
            todaynew.classList.remove('move');
            today.classList.add('moveagain');
            today.classList.remove('move');
            nextdaysnew.classList.add('hide');
            nextdaysnew.innerHTML = nextdays.innerHTML;
            setTimeout(()=>{
                nextdaysnew.classList.remove('hide');
                nextdaysnew.classList.remove('show');
            },2000);
            moveClick =true;
        }
    }
    });




searchBtn.addEventListener('click', () => {
    
    if(select.value == '°C'){
    checkWeatherc(input.value);
    setTimeout(()=>{input.value ='';},2000);
}
    else{
        checkWeatherf(input.value);
    setTimeout(()=>{input.value ='';},2000);
    }
    inputloc = input.value;
    
});
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const searchValue = input.value.trim();
    
    if(select.value == '°C'){
    checkWeatherc(searchValue);
    setTimeout(()=>{input.value ='';},2000);
}
    else{
        checkWeatherf(searchValue);
    setTimeout(()=>{input.value ='';},2000);
    }

    inputloc = searchValue;
    }
  });
select.addEventListener('change', () => {
if(input.value == ''){
    
  if(select.value == '°C'){
    checkWeatherc(inputloc);
}
    else{
        checkWeatherf(inputloc);
    }
}
});