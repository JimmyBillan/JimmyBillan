var sqlite3 	= require('sqlite3').verbose();

//var config = require('../../../config/config.js');
var xssEscape 	= require('xss-escape');

class Card{
	//title
	//subtitle
	
	//imageUrl
	
	//description
	
	//url1
	//Description url1

	//url2
	//Description url2
	constructor(body){
		this.id = body.id;
		this.title = xssEscape(body.title);
		this.subtitle = xssEscape(body.subtitle);
		this.imageUrl = xssEscape(body.imageUrl);
		this.description = xssEscape(body.description);
		this.url1 = xssEscape(body.url1);
		this.descUrl1 = xssEscape(body.descUrl1);
		this.url2 = xssEscape(body.url2);
		this.descUrl2 = xssEscape(body.descUrl2);
	}
}

exports.getCards = function(cb) {
	var db 		= new sqlite3.Database('jimmybillan.db');
	db.all("SELECT * FROM cards", function(err, rows) {
				console.log(rows);
		cb(rows)
	})
	db.close();
}


exports.addCard = function(body, cb) {
	var card = new Card(body);
	var db 		= new sqlite3.Database('jimmybillan.db');
	var stmt = db.prepare("INSERT INTO cards VALUES (NULL,?,?,?,?,?,?,?,?)");
	stmt.run(card.title, card.subtitle, card.imageUrl, card.description, card.url1, card.descUrl1, card.url2, card.descUrl2);
	stmt.finalize();
	db.close();
};

exports.getCard = function(id, cb) {
	var db 		= new sqlite3.Database('jimmybillan.db');
	db.get('SELECT * FROM cards WHERE id = ? ',[id], function(err, row) {			
		cb(row);
	});
}

exports.deleteCard = function(id, cb) {
	var db 		= new sqlite3.Database('jimmybillan.db');
	var stmt = db.prepare("DELETE FROM cards where id = ?");
	stmt.run(id, function(err) {
		if(err)console.log(err)
		else cb(null);

	db.close();
	});
	stmt.finalize();

};

exports.updateCard = function(id,body, cb) {
	var db 		= new sqlite3.Database('jimmybillan.db');
	var stmt = db.prepare("UPDATE cards SET title=?, subtitle=?,imageUrl=?, description=?, url1=?, descUrl1=?, url2=?, descUrl2=? WHERE id = ?");
	stmt.run(body.title,body.subtitle,body.imageUrl,body.description,body.url1,body.descUrl1,body.url2, body.descUrl2, id, function(err) {
		if(err)console.log(err)
		else cb(null);

	db.close();
	});
	stmt.finalize();

};



