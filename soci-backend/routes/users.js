var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../mysql/mysql.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.query('select * from homePage', (err, rows, fields) => {
		console.log(rows);
	})
	const data = {
		"status": 1,
		"name": 30,
		"age": 1
	};
	res.send(data);
});

module.exports = router;
