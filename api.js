var express = require('express');
var app = express();
var fs = require("fs");

const portNum = 5001;
const linkSource = "/links.json";
const catSource = "/categories.json";

var server = app.listen(portNum, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log(`API is listening at http://${host}:${port}`);
   console.log(`The API endpoint is available at http://localhost:${port}/`);
});

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    res.header("Access-Control-Allow-Headers", "*");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);

app.get('/link', function (req, res) {
    let id = req.query.id;
    let categoryId = req.query.categoryId;

    if (id !== undefined) {
        fyndById(res, linkSource, id);
    } else if(categoryId != undefined) {
        fyndByCategoryId(res, linkSource, categoryId);
    } else {
        yeetData(res, linkSource);
    }
});

app.get('/category', function (req, res) {
    let id = req.query.id;

    if (id !== undefined) {
        fyndById(res, catSource, id);
    } else {
        yeetData(res, catSource);
    }
});

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

/* Mongo DB Query tutorials:
https://www.w3schools.com/nodejs/nodejs_mongodb_query.asp
https://www.tutorialsteacher.com/nodejs/access-mongodb-in-nodejs
*/

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Nicodemus:20Drowssap22!@cluster0.gaak3.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//         // perform actions on the collection object
//     client.close();
// });
