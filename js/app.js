$(function () {

    //Skycons and global variables

    var skycons = new Skycons({"color": "#FFFFFF"}), longitude, latitude, timeHour, temp, sunrise, sunset, city, weather;
    skycons.add("animated-icon", Skycons.CLEAR_DAY);
    skycons.play();

    //Function to update weather information
    
    function updateWeather(data) {

        longitude = data.coord.lon;
        latitude = data.coord.lat;

        //Gettime function for day and night icons
        
        getTime(data);

        //Update Weather parameters and location

        $(".description").html(data.weather[0].description);
        temp = [(data.main.temp - 273.15).toFixed(0) + "°C", (1.8 * (data.main.temp - 273.15) + 32).toFixed(0) + "F"];
        $(".celsius").html(temp[0]);
        $(".fahrenheit").html(temp[1]);
        $("#location").html(data.name + ", " + data.sys.country);

        //Update Weather animation based on the base of returned weather description

        weather = data.weather[0].main;

        if (weather.indexOf("Rain") >= 0) {
            skycons.set("animated-icon", Skycons.RAIN);
            console.log(sunrise + " " + sunset + " " + timeHour);
        } else if (weather.indexOf("Sunny") >= 0) {
            skycons.set("animated-icon", Skycons.CLEAR_DAY);
            console.log(sunrise + " " + sunset + " " + timeHour);
        } else if (weather.indexOf("Clear") >= 0) {
            if (timeHour >= sunrise && timeHour <= sunset) {
                skycons.set("animated-icon", Skycons.CLEAR_DAY);
                console.log(sunrise + " " + sunset + " " + timeHour);
            } else {
                skycons.set("animated-icon", Skycons.CLEAR_NIGHT);
                console.log(sunrise + " " + sunset + " " + timeHour);
            }
        } else if (weather.indexOf("Cloud") >= 0) {
            if (timeHour >= sunrise && timeHour <= sunset) {
                skycons.set("animated-icon", Skycons.PARTLY_CLOUDY_DAY);
                console.log(sunrise + " " + sunset + " " + timeHour);
            } else {
                skycons.set("animated-icon", Skycons.PARTLY_CLOUDY_NIGHT);
            }
        } else if (weather.indexOf("Thunderstorm") >= 0) {
            skycons.set("animated-icon", Skycons.SLEET);
            console.log(sunrise + " " + sunset + " " + timeHour);
        } else if (weather.indexOf("Drizzle") >= 0) {
            skycons.set("animated-icon", Skycons.SLEET);
            console.log(sunrise + " " + sunset + " " + timeHour);
        } else if (weather.indexOf("Snow") >= 0) {
            skycons.set("animated-icon", Skycons.SNOW);
            console.log(sunrise + " " + sunset + " " + timeHour);
        }
    }

    function getCurrentLocation(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

    //AJAX request
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=63723a916368f15b0791dc8475fd0294" + "&lang=pl",
            async: true,
            dataType: 'json',
            success: function (data) {
                updateWeather(data);
            },
            cache: false
        });
    }

    //Check for Geoloaction support 
    function getLocation() {
        if (navigator.geolocation) {
                //Return the user's longitude and latitude on page load using HTML5 geolocation API
            navigator.geolocation.getCurrentPosition(getCurrentLocation);
        } else {
        //If Geolocation is not supported by the browser, alert the user
            alert("Masz wyłączoną geolokalizację. Wpisz nazwę miejscowości lub włącz geolokalizację!");
        }
    }

    function getTime(data) {
        //AJAX request for time

        $.ajax({
            url: 'http://api.geonames.org/timezoneJSON?lat=' + latitude + '&lng=' + longitude + '&username=sebger' + '&lng=pl',
            async: false,
            dataType: 'json',
            success: function (timezone) {
                $("#time").html(timezone.time); //Update local time
                sunrise = Number(timezone.sunrise.substr(11, 2));
                sunset = Number(timezone.sunset.substr(11, 2));
                timeHour = Number(timezone.time.substr(11, 2)); //Hour for checking if day or night
                console.log("should be " + sunrise + " " + sunset + " " + timeHour);
            },
            cache: false
        });
    }
 
    //Temperature switch

    $(".temperature").on("click", function () {
        $(".celsius").toggleClass("hidden");
        $(".fahrenheit").toggleClass("hidden");
    });

    //Find a Forcast

    $("form").on("submit", function (event) {
        event.preventDefault();
        city = $("input").val(); //Get value from form input
        $(this).trigger("reset"); //reset input field
        if (city) {  //AJAX Request
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=63723a916368f15b0791dc8475fd0294" + "&lang=pl",
                async: true,
                dataType: 'json',
                success: function (data) {
                    updateWeather(data);
                },
                cache: false
            });
        }
    });
    
    window.onload = getLocation();
});