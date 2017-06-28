/**
 * Created by shijo on 12/06/2017.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 8080;

var server = http.createServer(function (req, res) {
    console.log(req.url + req.method);
    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = req.url;
        }

        var filePath = path.resolve('./public' + fileUrl);
        var fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, function (exists) {
                if (!exists) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end('<h1>Requested url not found</h1>');
                    return;
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    fs.createReadStream(filePath).pipe(res);
                    return;
                }
            })
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Requested url not found</h1>');
            return;
        }
    } else {
        res.writeHead(405, {'Content-Type': 'text/html'});
        res.end('<h1>Method not allowed</h1>');
        return;

    }
});

server.listen(port, hostname, function () {
    console.log('Server running at http://' + hostname + ':' + port);
});