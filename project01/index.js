const express = require('express');
const request = require('request');
const ejs = require('ejs');
const path = require('path');

let app = express();

const port = process.env.PORT || 5000;


app.set("view engine", 'ejs');

app.use("/views", function (req, res) {
    res.render('weather');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {
        isPage: 'index'
    });
    // res.send("Hello, Express!");
});

app.get('/weather', (req, res) => {

    try {
        let apiKey = '2d932a80b42268499b178842185d2240';
        let city = 'Zhytomyr';
        // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=Zhytomyr&appid=${apiKey}`;
        request(url, function (error, response, body) {
            if(error)
            {
                console.log('egeg');
                throw new   Error('Weather Error: ' + error);
            }

            let weather = JSON.parse(body);

            res.render('weather', {
                weather,
                isPage: 'weather',
                city: city
            });
        });
    }catch (err) {
        res.send(err.message);
    }


});

app.get('/weather/:city', async (req, res) => {

    try {
        let apiKey = '2d932a80b42268499b178842185d2240';
        let city = req.params.city;
        // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        request(url, function (error, response, body) {
            if(error)
            {
                console.log('egeg');
                throw new Error('Weather Error: ' + error);
            }

            let weather = JSON.parse(body);
            console.log(weather);
            res.render('weather', {
                weather,
                isPage: 'weather',
                city: city
            });
        });
    }catch (err) {
        res.send(err.message);
    }


});



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});