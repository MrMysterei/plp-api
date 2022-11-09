var fs = require("fs");

function yeetData(res, path) {
    fs.readFile( path, 'utf8', function (_err, data) {
        res.end(data);
    });
}

function fyndById(res, path, id) {
    fs.readFile( path, 'utf8', function (__err, data) {
        let fyle = JSON.parse(data);
        let datum = fyle.find(obj => obj.id == id);

        res.end(
            datum != null
                ? JSON.stringify(datum)
                : `{'error': 'No ${path} match found for id "${id}".'}`
        );
    });
}

function fyndByCategoryId(res, path, categoryId) {
    fs.readFile( path, 'utf8', function (__err, data) {
        let fyle = JSON.parse(data);
        let datum = fyle.filter(obj => obj.categoryId == categoryId);

        res.end(
            datum != null
                ? JSON.stringify(datum)
                : `{'error': 'No link matches found for category id "${categoryId}".'}`
        );
    });
}

module.exports = { fyndByCategoryId, fyndById, yeetData };