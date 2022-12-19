const request = require("request")


const geoCod = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=f776143521a2734014c5e7ce3480ad10&units=metric`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location server", undefined)
        }
        else if(response.body.cod === '404'){
            // callback(response.body.message + " Please try another search", undefined);
            callback(" Unable to find location. Please try another search", undefined);

        }
        else {
            callback(undefined, response.body)
        }
    })

}

// geoCod("Indore",(error, data)=>{
//     console.log("Error: " , error);
//     console.log("Data: ", data);
// })


module.exports = geoCod;