var http = require("http");
var fs = require("fs");
var express = require("express");
var sqlite = require('sqlite');
var Mustache = require('mustache');
var app = express();
var bodyParser = require('body-parser');

sqlite.open('./database.sqlite').then(function(db) {

    app.use(function (req, res, next) {
        console.log("The resource " + req.url + " was requested.");
        next();
    });

    app.use(express.static(__dirname));
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    var server = http.createServer(app);
    console.log("Listening on http://127.0.0.1:8080");
    server.listen('8080', '127.0.0.1');

    app.get('/orders', function (req, res) {
        db.all("SELECT * FROM Orders").then(function(rows) {
            var file = fs.readFileSync('templates/orders.mst', "utf8");
            var html = Mustache.to_html(file, {orders: rows});
            return res.send(html);
        });
    });

    app.get('/orders/:orderid', function (req, res) {
        db.get(
            "SELECT * FROM Orders WHERE id=$id",
            {$id: req.params.orderid}
        ).then(function(row) {
            var file = fs.readFileSync('templates/order.mst', "utf8");
            var html = Mustache.to_html(file, row);
            return res.send(html);
        });
    });

    app.get('/orders/search/:term', function (req, res) {
        db.all(
            "SELECT * FROM Orders WHERE name LIKE '%'||$term||'%'",
            {$term: req.params.term}
        ).then(function(rows) {
            var file = fs.readFileSync('templates/orders.mst', "utf8");
            var html = Mustache.to_html(file, {orders: rows});
		$Title: req.body.Title
        });
    });
	
	app.post('/orders', function(req, res) {
		//Extract data from request.
		console.log(req.body);
		//Validate Data
		//Write data to DB
		return db.run("INSERT INTO Orders(Title, Forename, Surname, PersonalAdd1, PersonalAdd2, PersonalPostcode, Phonenumber, Email, Weight, Comments, CollectionAdd1, CollectionAdd2, CollectionPostcode, DeliveryAdd1, DeliveryAdd2, DeliveryPostcode) VALUES ($Title, $Forename, $Surname, $PersonalAdd1, $PersonalAdd2, $PersonalPostcode, $Phonenumber, $Email, $Weight, $Comments, $CollectionAdd1, $CollectionAdd2, $CollectionPostcode, $DeliveryAdd1, $DeliveryAdd2, $DeliveryPostcode)", {
		$Title: req.body.Title,
		$Forename: req.body.Forename,
		$Surname: req.body.Surname,
		$PersonalAdd1: req.body.PersonalAdd1,
		$PersonalAdd2: req.body.PersonalAdd2,
		$PersonalPostcode: req.body.PersonalPostcode,
		$Phonenumber: req.body.Phonenumber,
		$Email: req.body.Email,
		$Weight: req.body.Weight,
		$Comments: req.body.Comments,
		$CollectionAdd1: req.body.CollectionAdd1,
		$CollectionAdd2: req.body.CollectionAdd2,
		$CollectionPostcode: req.body.CollectionPostcode,
		$DeliveryAdd1: req.body.DeliveryAdd1,
		$DeliveryAdd2: req.body.DeliveryAdd2,
		$DeliveryPostcode: req.body.DeliveryPostcode
		}).then(function() {
			return res.redirect("/Splash.html");
			//Return sensible response	
		}).catch(function(e) {
			console.log(e)
			return res.send("Error");
		  });
	});

}).catch(function(err) {
    console.log("couldn't open DB");
    console.log(err);
});