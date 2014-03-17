var http = require('http'),
	auth = require('auth'),
	url = require('url'),
	books = require('books'),
	register = require('register'),
	sessions = require('sessions'),
	logout = require('logout'),
	util1 = require('util1'),
	redirectTo = util1.redirectTo;

var serviceRExp = /\/([^/?]*).*/i;
var server = new http.Server(function(req, res) {
	var service = req.url.match(serviceRExp)[1].toLowerCase();
	sessions.process(req);

	switch(service) {
		case "auth":
			if(req.sessionId) {
				redirectTo(res, "/books");
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
				redirectTo(res, "/books");
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
		default:
			res.statusCode = 404;
			res.end("wrong path");
			break;
	}
});

server.listen(3000);

