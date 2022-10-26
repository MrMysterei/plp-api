var http = require("http");

var server = http.createServer(function (req, res) {
    renderPage(req, res);
});

function renderPage(req, res) {
    
    res.writeHead(200, {"Content-type": "text/html"});

    renderHeaderInfo(res);

    renderGreeting(req, res);

    renderContent(res);

    renderFooterInfo(res);

    res.end();
}

function renderHeaderInfo(res) {
    res.write("<html>");
    res.write("<head>");
    res.write("<title>-=- My Linkz Page -=-</title>");
    res.write("<style>");
    res.write(".body { margin: 5px; background-color: navy; color: white; font-family: arial; }");
    res.write(".tbl { border: solid 1px white; }");
    res.write("a { color: black; font-size: 10pt; text-decoration: none; padding: 5px; margin: 2px; }");
    res.write("h4 { color: black; font-size: 10pt; font-weight: 700; text-align: center; margin: 0; padding: 5px; }");
    res.write(".fynal { text-transform: capitalize; }");
    res.write("table td { width: 25% }");
    res.write("</style>");
    res.write("</head>");
    res.write("<body class='body'>");
}

function renderFooterInfo(res) {
    res.write("</body>");
    res.write("</html>");
}

function renderGreeting(req, res) {
    if (req.url == "/phil") {
        renderGreetingDetail(res, req, "Sup, daddio?");
    } else if (req.url == "/marilynn") {
        renderGreetingDetail(res, req, "Hey beautiful!");
    } else if (req.url == "/chris") {
        renderGreetingDetail(res, req, "Wassup dude.");
    } else if (req.url == "/steph") {
        renderGreetingDetail(res, req, "How's it going, kiddo?");
    } else {
        renderGreetingDetail(res, req, "Who are you?");
    }
}

function renderGreetingDetail(res, req, greeting) {
    let fynal = req.url.replace(/\//g, "");

    res.write(`<h1>Greetings, <span class="fynal">${fynal}</span>! ${greeting}</h1>`);
}

function renderContent(res) {
    const { readFileSync } = require('fs');
    const rawCat = readFileSync('./categories.json');
    const dataCat = JSON.parse(rawCat);

    res.write("<table class='tbl' border='1'>");

    for(let i = 0; i < dataCat.length; i++) {
        // let objCat = dataCat[i];

        if(i % 4 == 0) {
            res.write("<tr>");
        }

        renderBlock(res, dataCat[i]);

        if(i % 4 == 3) {
            res.write("</tr>");
        }
    }

    res.write("</table>");
}

function renderBlock(res, objCat) {
    // let objCat = dataCat;

    res.write(`<td style="vertical-align: top; background-color: ${objCat.color};">`);
    res.write(`<h4>${objCat.name}</h4>`);
    res.write(`<hr size='1' />`);
    renderLinks(res, objCat.id);
    res.write(`</td>`);

}

function renderLinks(res, category) {

    const { readFileSync } = require('fs');
    const raw = readFileSync('./links.json');
    const data = JSON.parse(raw);

    for(let i = 0; i < data.length; i++) {
        let obj = data[i];

        if(category == obj.categoryId) {
            res.write(`<a href="${obj.url}" target="${obj.categoryId}_${obj.id}">${obj.title}</a><br />`);
        }
    }
}

server.listen(5000);

console.log("Node.js web server at port 5000 is running...");
