var http = require('http'),
	auth = require('auth'),
	url = require('url'),
	books = require('books'),
	register = require('register'),
	sessions = require('sessions'),
	logout = require('logout'),
	util1 = require('util1'),
	path = require('path'),
	index = require('index'),
	redirectTo = util1.redirectTo;

var serviceRExp = /\/([^/?]*).*/i;
var server = new http.Server(function(req, res) {
	var service = req.url.match(serviceRExp)[1].toLowerCase();
	sessions.process(req);

	switch(service) {
		case "auth":
			if(req.sessionId) {
				redirectTo(res, "/");
			} else { 
				auth.process(req, res);
			}
			break;
		case "books":
			if(!req.sessionId) {
				redirectTo(res, "/auth");
			} else { 
				books.process(req, res);
			}
			break;
		case "register":
			if(req.sessionId) {
				redirectTo(res, "/");
			} else { 
				register.process(req, res);
			}
			break;
		case 'logout':
			if(!req.sessionId) {
				redirectTo(res, "/auth");
			} else {
				logout.process(req, res);
			}
			break;
		case 'css':
			var cssPath = path.join(__dirname, "css", path.basename(req.url));
			util1.throwFile(req, res, {filePath: cssPath, 'Content-Type': "text/css"});
			break;
		case 'js':
			var jsPath = path.join(__dirname, "js", path.basename(req.url));
			util1.throwFile(req, res, {filePath: jsPath, 'Content-Type': "application/javascript"});
			break;
		case "":
		case "index.html":
			if(!req.sessionId) {
				redirectTo(res, "/auth");
			} else { 
				index.process(req, res);
			}
			break;
		default:
			res.statusCode = 404;
			res.end("wrong path");
			break;
	}
});

server.listen(3000);

