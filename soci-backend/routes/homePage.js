
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../mysql/mysql.js');
var path = require('path');
var fs = require('fs');

// express 4.0文件上传功能单独剥离出来;
var multipart  = require('connect-multiparty');
var multipartMiddleware = multipart();

// 1. 用户列表
router.get('/pageList', function(req, res, next) {
	const sql = 'select homePage.userId,homePage.userImg,homePage.zanNum,homePage.zanStatus,user.name from homePage,user where homePage.userId=user.id';
	db.query(sql, (err, rows, fields) => {
		let data = {
			status: 1,
			message: '成功',
			list: []
		}
		if (err) {
			data.status = 0;
			data.message = '数据拉取失败';
			return;
		}
		rows.forEach(item => {
			data.list.push({
				"image": item.userImg,
				"id": item.userId,
				"num": item.zanNum,
				"name": item.name,
				"status": item.zanStatus
			});
		});
		res.send(data);
	});
});

// 2.用户信息
router.post('/zanNum', function(req, res, next) {
	const userId = JSON.parse(req.body.data).id;
	const mysql = `update homePage set zanNum=case when zanStatus=0 then zanNum+1 else zanNum-1 end,zanStatus=case when zanStatus=0 then 1 else 0 end where userId=${userId}`;
	db.query(mysql, (err, rows, fields) => {
		let data = {
			status: 1,
			message: '成功',
		}
		if (err) {
			data.status = 0;
			data.message = '数据拉取失败';
			return;
		}
		res.send(data);
	});
});

/**
 * [3.上传背景图片]
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @return {[object]}
 */
router.post('/background', multipartMiddleware, function(req, res, next) {
	let mysql = null;
	const filename = req.files.file.name;
	const type = req.body.type;
	const oldPath = req.files.file.path;
	const destPath = path.join('public/dest' ,filename);
	// 支持跨磁盘复制文件；
	const readStream = fs.createReadStream(oldPath);
	const writeStream = fs.createWriteStream(destPath);
	readStream.pipe(writeStream);
    
    // 保存文件的路径
    const imgPath = `http://localhost:3000/dest/${filename}`;
	if (type === '1') {
		mysql = `update personcenter set imgPre='${imgPath}' where userId=1`;
	} else {
		mysql = `update personcenter set headImg='${imgPath}' where userId=1`;
	}
	//const mysql = `update personcenter set imgPre='${imgPath}' where userId=1`;
	db.query(mysql, (err, rows, fields) => {
		if (err) {
			console.log(err);
		}
	});
	fs.stat(destPath, (err, stats) => {
		let data = {
			"status": 1,
			"message": '文件上传成功',
			"image": destPath
		};
		if (err) {
			data.status = 0;
			data.message = '文件上传失败';
			data.image = '';
			throw err;
		}
		res.send(data);
	})

	//  不支持跨磁盘移动文件
	// fs.rename(oldPath, destPath, function (err) {
	//     if (err) throw err;
	//     fs.stat(destPath, function (err, stats) {
	//         if (err) throw err;
	//         console.log('stats: ' + JSON.stringify(stats));
	//     });
	// })
});

// 4.获取背景图片
router.get('/bg', function(req, res, next) {
	const userId = req.query.userId;
	const mysql = `select * from personcenter where userId=${userId}`;
	db.query(mysql, (err, rows, fields) => {
		let data = {
			status: 1,
			message: '成功',
			imgPre: rows[0].imgPre
		}
		if (err) {
			data.status = 0;
			data.message = '数据拉取失败';
			return;
		}
		res.send(data);
	});
});

router.get('/headImg', function(req, res, next) {
	const userId = req.query.userId;
	const mysql = `select * from personcenter where userId=${userId}`;
	db.query(mysql, (err, rows, fields) => {
		let data = {
			status: 1,
			message: '成功',
			headImg: rows[0].headImg
		}
		if (err) {
			data.status = 0;
			data.message = '数据拉取失败';
			return;
		}
		res.send(data);
	});
});
module.exports = router;
