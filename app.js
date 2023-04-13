const API_KEY = "70a22b0353bf176cf7ea545d7714987c";
const CONV_API_KEY = "5bce86bb07b16e866f16f68491c1ebae";
const weekdays = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const LANG = "en";

window.addEventListener('load', () => {
    //Declare variables to store user location data
    let long;
    let lat;

    //Accesses user geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const root = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric&lang=${LANG}`;

            //fetches data from OpenWeatherMap API Based on user location
            fetch(root).then((response) => {
                return response.json();
            }).then((data) => {
                const { temp, humidity } = data.main;
                const place = data.name;
                const { description, icon } = data.weather[0];
                const { sunrise, sunset } = data.sys;
                const cloudiness = data.clouds.all;
                const {speed} = data.wind;

                //converting speeg to mph
                var speedFormatted = Math.round(speed * 2.2);
                var tempFormatted = Math.round(temp);

                //Converting Unix time to local time
                var sunriseDate = new Date(sunrise * 1000);
                var sunriseHours = sunriseDate.getHours();
                var sunriseMinutes = "0" + sunriseDate.getMinutes();
                var formattedSunrise = sunriseHours + ":" + sunriseMinutes.substr(-2);

                var sunsetDate = new Date(sunset * 1000);
                var sunsetHours = sunsetDate.getHours();
                var sunsetMinutes = "0" + sunsetDate.getMinutes();
                var formattedSunset = sunsetHours + ":" + sunsetMinutes.substr(-2);

                let date = new Date();
                let currTime = date.toLocaleTimeString().slice(0, -6) + " " + date.toLocaleTimeString().slice(8);
                document.querySelector('.date').innerText = weekdays[date.getDay()] + " - " + currTime;
                document.querySelector('.temp-num').innerText = tempFormatted + "°";
                document.querySelector('.city-name').innerText = place;
                document.querySelector('.condition-text').innerText = description;
                document.querySelector(".condition-img").src = "https://openweathermap.org/img/wn/" + icon + ".png";

                //Change background color based on if it's day or night
                if(icon[2] == "d"){
                    document.querySelector('body').style.backgroundImage = "linear-gradient(#328da8, #6fbfd6)";
                }else{
                    document.querySelector('body').style.backgroundImage = "linear-gradient(#0b0e21, #181c33)";
                }

                document.querySelector("#sunrise-time").innerText = formattedSunrise + " AM";
                document.querySelector("#sunset-time").innerText = formattedSunset + " PM";
                document.querySelector("#cloud-text").innerText = cloudiness + "%";
                document.querySelector("#wind-text").innerText = speedFormatted + " MPH";
                document.querySelector("#humidity-text").innerText = humidity + "%";
            });
        });
    }
});