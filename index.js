var http = require('http');
var HttpCors = require('http-cors');
var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });
var port = process.env.PORT || 8000;

var cors = new HttpCors();

http.createServer(function (req, res) {
    if (req.url.indexOf('/ad') === 0) {
        return require('./lib/http-handle-ads')(req, res);
    }

    if (req.url.indexOf('/api') === 0) {
        return require('./lib/http-handle-api')(req, res);
    }

    // default: handle the request as a static file
    serveStaticFiles(req, res);
}).listen(port);

console.log('Listening on http://localhost:%d', port);
