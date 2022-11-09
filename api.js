// TO-DO: Break up into modules: https://www.stanleyulili.com/node/node-modules-import-and-use-functions-from-another-file/

const config = require("./my_modules/config");
const util = require("./my_modules/util");

var express = require('express');
var app = express();
var fs = require("fs");

var server = app.listen(config.portNum, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log(`API is listening at http://${host}:${port}`);
   console.log(`The API endpoint is available at http://localhost:${port}/`);
});

app.use(config.allowCrossDomain);

app.get('/link', function (req, res) {
    let id = req.query.id;
    let categoryId = req.query.categoryId;
    let path = __dirname + config.linkSource;

    if (id !== undefined) {
        util.fyndById(res, path, id);
    } else if(categoryId != undefined) {
        util.fyndByCategoryId(res, path, categoryId);
    } else {
        util.yeetData(res, path);
    }
});

app.get('/category', function (req, res) {
    let id = req.query.id;
    let path = __dirname + config.catSource;

    if (id !== undefined) {
        util.fyndById(res, path, id);
    } else {
        util.yeetData(res, path);
    }
});

/* Mongo DB Query tutorials:
// https://www.w3schools.com/nodejs/nodejs_mongodb_query.asp
// https://www.tutorialsteacher.com/nodejs/access-mongodb-in-nodejs
*/
