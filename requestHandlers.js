var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(res, req) {
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    console.log("requset hanlder for start called");


    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(body);
    res.end();

}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "./tmp/scene.pbrt");

        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("transfering pbrt file...\n");
        response.write("rendering... access /show to check result.");
        console.log('start rendering');

      

        var scripts = exec('sh ./shell.sh', (error, stdout, stderr) => {

            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        console.log('rendering done');
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("scene.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + " not completed yet\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end();
        }
    });
}


exports.show = show;
exports.start = start;
exports.upload = upload;
