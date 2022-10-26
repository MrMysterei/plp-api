var express = require('express');
var app = express();
var fs = require("fs");

app.get('/random', function(_req, res){
    yeetRandomData(res);
});

function yeetRandomData(res) {
    const axios = require('axios');

    const options = {
        method: 'GET',
        url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': '18c6018e23msh63b8842cd7c11b8p11c808jsn57ebdf4a88f8',
            'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        }
    };

    axios
        .request(options)
        .then(function (response) {
            res.end(JSON.stringify(response.data));
        }).catch(function (error) {
            res.end(error);
            console.error(error);
        });
}
