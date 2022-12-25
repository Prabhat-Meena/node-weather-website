const request = require("request");


const weatherForcast = ({ lat, lon } = {}, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f776143521a2734014c5e7ce3480ad10&units=metric`

    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=f776143521a2734014c5e7ce3480ad10&units=metric`

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather server", undefined);
        }
        // console.log(response.body);
        else if (body.cod === '400') {
            // return response.body.message
            callback(" Unable to find location. Try another search", undefined);

        }
        else {
            callback(undefined,{Forecast:  `${body.weather[0].description},  its currently ${body.main.temp} degrees. It feels like ${body.main.feels_like} degrees out. The high today is ${body.main.temp_max} degree, with a low of ${body.main.temp_min} degree and the humidity is  ${body.main.humidity}%`, Location: `${body.name}, ${body.sys.country}.`, Address: body.name});
        }
    }
    )
}


module.exports = weatherForcast;