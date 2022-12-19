
const path = require('path')
const weatherForcast = require("./utils/forcast.js")
const geoCod = require("./utils/geoCode.js")

// console.log(__dirname);
// // console.log(path.join(__dirname, '../public')); // hame ../ se ham src ke bahar web-server me ja sakte hai and ../.. se hame web-server se bhahr ja sakte hai 
// // console.log(__filename);
// const hbs = require("hbs")
// const app = express();

// const publicDirPath = path.join(__dirname, '../public')

// app.set('view engine', 'hbs')

// app.use(express.static(publicDirPath))

// app.get('', (req, res)=>{
//     res.render(('index.hbs'))
// })

// //html data bhi bhej sakte hai
// // app.get('', (req, res)=>{
// //     res.send("<h1>Weather</h1>")
// // })

// //hm jason data bhi bhej sakte hai ojec bhi bhej sakte hai express use stringify krke json me send krta hai
// // app.get("/help", (req, res)=>{
// //     res.send({
// //         name: 'Prabhat',
// //         age: 22
// //     })
// // })

// // app.get("/about", (req, res)=>{
// //     res.send("<h1>About</h1>")
// // })

// app.get("/weather", (req, res)=>{

//     res.send({
//         forcast : '26 degree',
//         location : "Indore"
//     })
// });

// app.listen(3000, ()=>{
//     console.log("Server is up on port 3000");
// })


const app = express();

const hbs = require('hbs')

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const patialsPath = path.join(__dirname, "../templates/partials")



// yaha pr ham view engine set karte hai hbs ke liye 
app.set('view engine', 'hbs')

// agar views directory ko change karna ho to hame uske liye ye karna padega pehele ek path banana padega jo hm new dena chahte hai bo
app.set('views', viewsPath)

hbs.registerPartials(patialsPath)

app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    // res.render('index')
    res.render('index', {
        title: 'Weather App',
        name: "Prabhat"
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Prabhat"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        helpText: "contact us for help",
        title: 'Help',
        name: 'Prabhat Meena'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geoCod(req.query.address, (error, { coord } = {}) => {
        if (error) {
            return res.send({ error });
        }
        weatherForcast(coord, (error, forcastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forcast: forcastData,
                address: req.query.address
            });
        })
    })
    // geoCod(req.query.address, ({ coord }, error) => {
    //     if (error) {
    //         return res.send(error);
    //     }
    //     weatherForcast(coord, (data, error) => {
    //         if (error) {
    //             return res.send(error);
    //         }else if(data.cod){
    //             return res.send(data.cod)
    //         }
    //         else{
    //             res.send({
    //                 forecast: data,
    //                 coord,
    //                 address: req.query.address
    //             })
    //         }
    //     })
    // });

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404',
        errorMessage: "Help Article not found",
        name: "Prabhat"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        errorMessage: "Page not found",
        name: 'Prabhat'
    })
})

app.listen(5000, () => {
    console.log('listing on port no 5000');
})


// const address = process.argv[2]

// if(!address){
//     console.log("please enter a vailide address: ");
// }else{
//     geoCod(address, ({coord, name}, error)=>{
//         if(error){
//             return console.log(error);
//         }
//         weatherForcast(coord.lat, coord.lon, (weatherData, error)=>{
//             if(error){
//               return  console.log('new fun err ' + error);
//             }
//             console.log(coord);
//             console.log(name);
//             console.log(weatherData);
//         })
//     });

// }