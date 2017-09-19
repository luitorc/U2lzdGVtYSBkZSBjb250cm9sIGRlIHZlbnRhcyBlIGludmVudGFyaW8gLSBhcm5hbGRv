var lt = require('../helper/luitor_helper.js');

exports.setDataReceipt = function(req, res, next){
	var body = req.body;
	var sql = `UPDATE config 
				SET 
				razon_social='${body.razon_social}'
				,propietario='${body.propietario}'
				,descripcion='${body.descripcion}'
				,celular_arr='${body.celular_arr}'
				,direccion='${body.direccion}'
				,servicios='${body.servicios}'
				,privicia_distrito_region_pais='${body.privicia_distrito_region_pais}'
				 WHERE id_config='1'`;
	// console.log(sql);
    lt.db('pg',titular,function(err,client,done){
    	client.query(sql,function(err,dt){ done();
    		if(err) throw err;

			res.send(dt.rows);	
    	});
    });
	
}
exports.allDataConfig = function(req, res, next){
	var sql = `SELECT * FROM config`;
	// console.log(sql);
    lt.db('pg',titular,function(err,client,done){
    	client.query(sql,function(err,dt){
    		if(err) throw err; done();

			res.send(dt.rows);
    	});
    });
 //    .all(sql, function(err, dt){
	// 	if(err) throw err;

	// 	res.send(dt);
	// }).close();
	
}
exports.getHeaderReceipt = function(req, res, next){
	var sql = `SELECT * FROM config`;
	// console.log(sql);
    lt.db('pg',titular,function(err,client,done){
    	client.query(sql,function(err,dt){ done();
    		console.log(dt.rows);
			if(err) throw err; 

			res.send(dt.rows);
    	});
    });
 //    .all(sql, function(err, dt){
	// 	if(err) throw err;

	// 	res.send(dt);
	// }).close();
	
}
exports.setTypeDivisa = function(req, res, next){

	var sql = `UPDATE config SET divisa='${req.body.setDivisa}' WHERE id_config='1'`;
	// console.log(sql);
    lt.db('pg',titular,function(err,client,done){
    	client.query(sql,function(err, dt){ done();
    		if(err){ 
				throw err;
				res.send(false);
			}else
				res.send(true);
	    	});
    });

}
exports.getTypeDivisa = function(req, res, next){

	var sql = `SELECT divisa FROM config WHERE id_config='1'`;
	// console.log(sql);
    lt.db('pg',titular, function(err,client,done){
    	client.query(sql, function(err,dt){ done();
    		if(err){ 
				throw err;
				res.send(false);
			}else
				res.send(dt.rows[0].divisa);
    	});
    });
	
}