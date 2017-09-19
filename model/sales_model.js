var lt = require('../helper/luitor_helper.js');

// var db = lt.conex('sqlite');
exports.getSalesXtime = function(req, res, next){
	// var obj = lt.getAjax(req,res);

	lt.db('pg',titular,function(err, client, done){
		client.query(req.query,function(err, obj){
			if(err){
	            console.log(err);
	            res(obj.rows);
	        }else{
	        	res(obj.rows);
	        }
		});
	});
	// .all(
	// 	req.query
	// ,function(err, obj){
	// 	if(err){
 //            console.log(err);
 //            res(obj);
 //        }else{
 //        	res(obj);
 //        }
	// }).close();
	
}


