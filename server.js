var http = require("http");
var url = require("url");

function start(route,handle) {
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname;

        console.log('req received. path='+pathname);

        route(handle,pathname,res,req);
    }).listen(8888);

    console.log("server running in 8888 port");

}

exports.start = start;