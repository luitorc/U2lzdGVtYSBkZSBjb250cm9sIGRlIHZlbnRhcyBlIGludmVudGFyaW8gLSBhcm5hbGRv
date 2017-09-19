var lt = require('../helper/luitor_helper.js');

exports.check = function(req, res, next){
	var obj = lt.getAjax(req,res);

	var sql = `SELECT * FROM usuario WHERE login='${obj.login}' AND password='${obj.password}'`;
	lt.db('pg', titular,function(err, client, done){
		client.query(sql, function(err, dt){
			console.log(dt.rows);
			if(err) throw err; done();

			if(next == "return")
	        	res(dt.rows);
	        else
	        	res.send(dt.rows.length);
		});
	})

}