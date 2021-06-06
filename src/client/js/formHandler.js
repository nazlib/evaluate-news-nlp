const handleSubmit = async event => {
    event.preventDefault();
    const cityName = document.getElementById('city').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    let geoLocation = {};

    console.log('Fetching geographical data from geonames:', {
        city: cityName,
    });

    const resGeo = await fetch('http://localhost:8081/geo', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: cityName }),
    });
    try {
        const receivedGeoInJson = await resGeo.json();
        geoLocation = {
            city: receivedGeoInJson.geonames[0].name,
            country: receivedGeoInJson.geonames[0].countryName,
            lat: receivedGeoInJson.geonames[0].lat,
            lng: receivedGeoInJson.geonames[0].lng,
        };
        console.log('GeoData:', geoLocation);
    } catch (err) {
        console.log(err);
    }

    let weatherData = {};

    const resWeather = await fetch('http://localhost:8081/weather', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(geoLocation),
    });
    try {
        weatherData = await resWeather.json();
        console.log('WeatherData:', weatherData);
    } catch (err) {
        console.log(err);
    }
    let picData = {};
    const resPic = await fetch('http://localhost:8081/picture', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(geoLocation),
    }).then(res => res.json())
        .then(async res => {
            
        console.log('PicData:', { geoLocation });
            picData = res;
            let pictureHtml = `<div class="city-image">
                                       <img id="city-img" class="main-image" src="${picData.hits[0].webformatURL}">
                                    </div>`;
            let subpic = `<div class= "text-center">
                                         <img id="img-one" class="sub-image" src="${picData.hits[1].webformatURL}"/>
                                         <img id="img-two" class="sub-image" src="${picData.hits[2].webformatURL}"/>
                                        <img id="img-three" class="sub-image" src="${picData.hits[3].webformatURL}"/>
                                    </div>`;
            document.getElementById("picture").innerHTML = pictureHtml;
            document.getElementById("sub-pic").innerHTML = subpic;
            console.log('Data received from pixabay:', picData);
        })
        .catch(err => {
            console.log(err)
        });

    let weatherHtml = '';
    let colors = ['red', 'green', 'yellow', 'blue']
    weatherData.data.forEach((element, index) => {
        weatherHtml += `<div class="col-large-6">
        <div class="weather-${colors[index]}">
            <div class="weather-card-body">
                <div class="card-title">
                    <h2>${element.weather.description}</h2>
                </div>
                <div class="card-content">
                    <h1 id="temperature">${element.temp}</h1>
                    <h6>High => ${element.high_temp} Low => ${element.high_temp} </h6>
                </div>
                <div class="weather-card-icon">
                    <img src="../src/client/assets/${element.weather.icon}.png">
                    <h6>${element.valid_date}</h6>
                </div>
            </div>
        </div>
    </div>`;
    });
    document.getElementById("weather").innerHTML = weatherHtml;
};
export { handleSubmit }
