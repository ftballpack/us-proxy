console.log("Hello!");

var util = require("util");
var cheerio = require("cheerio");
var request = require("request");
var sqlite3 = require("sqlite3").verbose();

function initDatabase(callback) {
	var db = new sqlite3.Database("data.sqlite");
	db.serialize(function() {
		//db.run("DROP TABLE data");
		db.run("CREATE TABLE IF NOT EXISTS data (ip TEXT PRIMARY KEY, port INT, code TEXT, country TEXT, anonymity TEXT, google TEXT, https TEXT, lastchecked TEXT)");
		callback(db);
	});
}

function updateRow(db, ip, port, code, country, anonymity, google, https, lastchecked) {
	var statementIn = db.prepare("INSERT OR IGNORE INTO data VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
	statementIn.run(ip, port, code, country, anonymity, google, https, lastchecked);
	statementIn.finalize();

	var statementUp = db.prepare("UPDATE data SET port = ?, code = ?, country = ?, anonymity = ?, google = ?, https = ?, lastchecked = ? WHERE ip LIKE ?");
	statementUp.run(port, code, country, anonymity, google, https, lastchecked, ip);
	statementUp.finalize();
}

function pad(str, max, char) {
	str = str.toString();
	return str.length < max ? pad(char + str, max, char) : str;
}

function readRows(db) {
	db.each("SELECT rowid AS id, ip, port, lastchecked FROM data", function(err, row) {
		if (err) return console.log("Error", util.inspect(err));
		console.log("[" + pad(row.id.toString(), 4, "0") + "] " + pad(row.ip + ":" + row.port, 21, " ") + " - " + new Date(row.lastchecked).toGMTString());
	});
}

function fetchPage(url, callback) {
	request(url, function(error, response, body) {
		if (error) {
			console.log("Error requesting page: " + error);
			return;
		}

		callback(body);
	});
}

function run(db) {
	fetchPage("http://www.us-proxy.org/", function(body) {
		var $ = cheerio.load(body);

		var elements = $("#proxylisttable > tbody > tr");
		console.log(new Date().toGMTString(), "Found " + elements.length + " elements");
		elements.each(function() {
			var item = $(this).find("td");

			var ip = $(item[0]).text();
			var port = parseInt($(item[1]).text(), 10);
			var code = $(item[2]).text();
			var country = $(item[3]).text();
			var anonymity = $(item[4]).text();
			var google = $(item[5]).text();
			var https = $(item[6]).text();

			var d = new Date().getTime();
			var reg = /(1 day|\d+? days)? ?(1 hour|\d+? hours)? ?(1 minute|\d+? minutes)? ?(1 second|\d+? seconds)? ago/i;
			var last = $(item[7]).text();
			if (reg.test(last)) {
				var matches = last.match(reg);
				if (matches[1] != undefined) {
					d -= parseInt(matches[1], 10) * 24 * 60 * 60 * 1000;
				}
				if (matches[2] != undefined) {
					d -= parseInt(matches[2], 10) * 60 * 60 * 1000;
				}
				if (matches[3] != undefined) {
					d -= parseInt(matches[3], 10) * 60 * 1000;
				}
				if (matches[4] != undefined) {
					d -= parseInt(matches[4], 10) * 1000;
				}
			}

			var lastchecked = new Date(d).toJSON();

			updateRow(db, ip, port, code, country, anonymity, google, https, lastchecked);
		});
		readRows(db);

		db.close();
	});
}

initDatabase(run);
