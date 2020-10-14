//Cuando cargue la pagina
window.addEventListener("load" , ()=>{
    let long;
    let lat;

    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")

    let API_key;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            API_key = "1b1b58882f50274f65afed0d831f0d23";

            const proxy= "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}`;
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data)
                const { temp} = data.main;
                const { description } = data.weather[0];
                const { name } = data;
                const { icon } = data.weather[0]
                //Sett elements from api
                temperatureDegree.textContent = Math.trunc(temp - 273,15 ) + "°"
                temperatureDescription.textContent =   MaysPrimera(description)
                locationTimezone.textContent = name
                //seticon
                setIcons(icon, document.querySelector(".icon"))
            });
        });
    }
        function MaysPrimera(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function setIcons(icon , iconID){
            const skycons = new Skycons({color : "white"})
            const currentIcon = icon
            skycons.play();
            if(icon == "01n"){return skycons.set(iconID, Skycons.CLEAR_NIGHT)}
            if(icon == "01d"){return skycons.set(iconID, Skycons.CLEAR_DAY)}

            if(icon == "02n"){return skycons.set(iconID, Skycons.PARTLY_CLOUDY_DAY)}
            if(icon == "02d"){return skycons.set(iconID, Skycons.PARTLY_CLOUDY_NIGHT)}

            if(icon == "03n"){return skycons.set(iconID, Skycons.CLOUDY)}
            if(icon == "03d"){return skycons.set(iconID, Skycons.CLOUDY)}

            if(icon == "13n"){return skycons.set(iconID, Skycons.SNOW)}
            if(icon == "13d"){return skycons.set(iconID, Skycons.SNOW)}

            if(icon == "10n"){return skycons.set(iconID, Skycons.RAIN)}
            if(icon == "10d"){return skycons.set(iconID, Skycons.RAIN)}

            if(icon == "50n"){return skycons.set(iconID, Skycons.SLEET)}
            if(icon == "50n"){return skycons.set(iconID, Skycons.SLEET)}
            if(icon == "50n"){return skycons.set(iconID, Skycons.FLOG)}
            if(icon == "50n"){return skycons.set(iconID, Skycons.FLOG)}

            
        }
})
