var http = require('http'),
	auth = require('auth'),
	url = require('url'),
	books = require('books'),
	register = require('register'),
	sessions = require('sessions');

var serviceRExp = /\/([^/?]*).*/i;
var server = new http.Server(function(req, res) {
	var service = req.url.match(serviceRExp)[1].toLowerCase();

	switch(service) {
		case "auth":
			if(sessions.isOpen(req)) {
				redirectTo(res, "/books");
			} else { 
				auth.process(req, res);
			}
			break;
		case "books":
			if(!sessions.isOpen(req)) {
				redirectTo(res, "/auth");
			} else { 
				books.process(req, res);
			}
			break;
		case "register":
			if(sessions.isOpen(req)) {
				redirectTo(res, "/books");
			} else { 
				register.process(req, res);
			}
			break;
		default:
			res.statusCode = 404;
			res.end("wrong path");
			break;
	}
});

server.listen(3000);

/* functions */
function redirectTo(res, where) {
		res.writeHeader(301, {
			"Location": where,
		});
		res.end();
}
