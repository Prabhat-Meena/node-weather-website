const express = require("express");
const path = require('path')
const weatherForcast = require("./utils/forcast.js")
const geoCod = require("./utils/geoCode.js")

const app = express();

const port = process.env.PORT || 3000;

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
        name: "Prabhat Meena"
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Prabhat Meena"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        helpText: "contact us for more details",
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
        weatherForcast(coord, (error, {Forecast, Location, Address}) => {
            if (error) {
                return res.send({ error });
            }
            res.send({ 
                Address,
                Location, 
                Forecast
            });
        })
    })
    

})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'you must provide search term'
//         })
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     })
// })
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

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

module.exports = port;