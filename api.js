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

/*
function yeetData(res, src) {
    console.log(`Getting "${src}" items.`);

    fs.readFile( __dirname + src, 'utf8', function (_err, data) {
        res.end(data);
    });
}

function fyndById(res, src, id) {
    console.log(`Getting "${src}" item id "${id}".`);

    fs.readFile( __dirname + src, 'utf8', function (__err, data) {
        let fyle = JSON.parse(data);
        let datum = fyle.find(obj => obj.id == id);

        if (datum != null) {
            res.end( JSON.stringify(datum));
        } else {
            res.end(`{'error': 'No ${src} match found for id "${id}".'}`);
        }
    });
}

function fyndByCategoryId(res, src, categoryId) {
    console.log(`Getting links with category id "${categoryId}".`);

    fs.readFile( __dirname + src, 'utf8', function (__err, data) {
        let fyle = JSON.parse(data);
        let datum = fyle.filter(obj => obj.categoryId == categoryId);

        if (datum != null) {
            res.end( JSON.stringify(datum));
        } else {
            res.end(`{'error': 'No link matches found for category id "${categoryId}".'}`);
        }
    });
}
*/

/* Mongo DB Query tutorials:
// https://www.w3schools.com/nodejs/nodejs_mongodb_query.asp
// https://www.tutorialsteacher.com/nodejs/access-mongodb-in-nodejs
*/
