const request = require("request");
// const weatherForcast = ({lat, lon} = {}, callback) => {
//     // const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=f776143521a2734014c5e7ce3480ad10&units=metric`
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f776143521a2734014c5e7ce3480ad10&units=metric`
// //yaha pr hame object destructuring sort hand propert ka use kiya hai request me url pass krne ke liye kyoki key or value same name ki thi is liye or response object ko bhi destructure kr rahe hai {response.body}
// request({ url, json: true }, (error, {body} = new Error) => {
//     // const data = JSON.parse(response.body)
//     // console.log(response.body.main.temp)
//     // console.log(response.body.main.pressure);
//     // error handling
//     if(error){
//         // return "Unable to connect to weather server");
//         callback("Unable to connect to weather server");

//     }
//     else if(body.cod === '400'){
//         // return response.body.message
//         callback(new Error) //(body.message + " city not found plz try another search"));

//     }
//     else{
//         // return `${response.body.weather[0].description}  its currently ${response.body.main.temp} degrees out. it feels like ${response.body.main.feels_like} degrees out`
//         callback(`${body.weather[0].description}  its currently ${body.main.temp} degrees out. it feels like ${body.main.feels_like} degrees out`);

//     }
// })
// }

// // weatherForcast(22.9667, 76.0667,(error, data)=>{
// //     if(error){
// //         console.log(error);
// //     }else{
// //         console.log(data);
// //     }
// // })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
            callback(undefined,{Forecast:  `${body.weather[0].description}  its currently ${body.main.temp} degrees out. it feels like ${body.main.feels_like} degrees out`, Location: `${body.name}, ${body.sys.country}`, Address: body.name});
        }
    }
    )
}


module.exports = weatherForcast;