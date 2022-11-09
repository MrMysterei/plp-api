module.exports = {
    portNum: 5001,
    linkSource: "/data/links.json",
    catSource: "/data/categories.json",
    
    allowCrossDomain: (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "*");
    
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        }
        else {
            next();
        }
    }
};