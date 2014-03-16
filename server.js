var http = require('http'),
	auth = require('auth'),
	url = require('url'),
	books = require('books');


var serviceRExp = /\/([^/?]*).*/i;
var server = new http.Server(function(req, res) {
	var service = req.url.match(serviceRExp)[1].toLowerCase();

	switch(service) {
		case "auth":
			auth.process(req, res);
			break;
		case "books":
			books.process(req, res);
			break;
		case "register":
			res.end("register");
			break;
		case "":
			res.end("index.html");
			break;
		default:
			//res.writeHeader(301, {"Location": "/books"});
			res.end("unknown data");
			break;
	}
});

server.listen(3000);
