var lt = require('../helper/luitor_helper.js');
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./db/'+dbAccount+'.db');

exports.getStockAll = function(req, res, next){
	var sql = `SELECT id_producto,nombrep,stock,id_proveedor FROM producto WHERE CAST(stock as decimal) < '10' ORDER BY stock ASC`;
	// console.log(sql);
    lt.db('pg',titular,function(err, client, done){
    	client.query(sql, function(err, dt){ done();
    		if(err){
	            console.log(err);
	            res.send(err);
	        }else{
	            res.send(dt.rows);
	        }
    	});
    });
	
}
exports.update = function(req, res, next){
	var obj = lt.getAjax(req,res);
	var sql = `UPDATE producto
		 SET nombrep='${obj.nombrep}'
		 ,description='${obj.description}'
		 ,stock='${obj.stock}'
		 ,id_unidad_medida='${obj.id_unidad_medida}'
		 ,precio='${obj.precio}'
		 ,precio_proveedor='${obj.precio_proveedor}'
		 ,id_proveedor=${obj.id_proveedor==''?null:obj.id_proveedor}
		 ,nro_ref='${obj.nro_ref}'
		 ,link='${obj.link}'
		  WHERE id_producto='${obj.id_producto}'`;
    console.log(sql);
    lt.db('pg',titular,function(err,client,done){
    	client.query(sql, function(err, dt){ done();
    		if(err){
    			console.log("ERROR!!!!!!!!!!!!!!!!!!");
    			console.log(err);
    			lt.return({msn:"Error Al actualizar"},res,next);

    		}else{
    			lt.return({msn:"Se Actualizo con exito"},res,next);
    			
    		}
    	});
    });

}

exports.deleteProduct = function(req, res, next){
	var obj = lt.getAjax(req,res);
	// console.log(obj.id_unidad_medida);
    var sql = `DELETE FROM producto WHERE id_producto=${obj.id_producto}`; 
    lt.db('pg',titular,function(err,client,done){
    	client.query(sql,function(err,obj){ done();
    		lt.return({msn:"Se elimino con exito",success:1},res,next);
    	});
    });
 //    .run().close();
	// console.log("Producto Eliminado");
	// lt.return({msn:"Se elimino con exito",success:1},res,next);
	
	
}
exports.save = function(req, res, next){
	var obj = lt.getAjax(req,res);
	// console.log(obj);
	// console.log(obj.id_unidad_medida);
	var sql = "INSERT INTO producto (nombrep,description,stock,precio,id_unidad_medida,id_usuario,activo,precio_proveedor,fecha,id_proveedor,nro_ref,link)"
	+"VALUES('"+obj.nombrep+"','"+obj.description+"','"+obj.stock+"','"+obj.precio+"','"+obj.id_unidad_medida+"',1,1,"+obj.precio_proveedor+",'"+obj.fecha+"',"+(obj.id_proveedor==''?null:obj.id_proveedor)+",'"+obj.nro_ref+"','"+obj.link+"')";
    lt.db('pg',titular, function(err,client,done){
    	// console.log(sql)
    	client.query(sql, function(err,obj1){ done();
    		console.log(obj1);
			lt.return({msn:"Se guardo con exito"},res,next);
			// lt.return({msn:"Se guardo con exito"},res,next);
			// res.send(sql);
    	});
    });
    // .run("INSERT INTO producto (nombrep,description,stock,precio,id_unidad_medida,id_usuario,activo,precio_proveedor,fecha,id_proveedor,nro_ref,link)"
	// +"VALUES('"+obj.nombrep+"','"+obj.description+"','"+obj.stock+"','"+obj.precio+"','"+obj.id_unidad_medida+"',1,1,"+obj.precio_proveedor+",'"+obj.fecha+"','"+obj.id_proveedor+"','"+obj.nro_ref+"','"+obj.link+"')").close();
	// console.log("entro a save");
	
	
}
exports.getData = function(req, res, next){
	console.log(req.session);
	// db.serialize(function() {
	lt.db('pg',titular,function(err, client, done){
		client.query("SELECT * FROM producto AS pro "
			+"INNER JOIN unidad_medida AS ume ON pro.id_unidad_medida = ume.id_unidad_medida"
			+" ORDER BY id_producto DESC", function(err, obj) { done();
				
			lt.return(obj.rows,res,next);
		});
	})
	// }).close();
}
exports.getDataXproduct = function(req, res, next){
	var obj = lt.getAjax(req,res);
	lt.db('pg',titular,function(err,client,done){
		client.query( `SELECT pro.*,ume.*,proveedor.razon_social as razon_social FROM producto AS pro 
		INNER JOIN unidad_medida AS ume ON pro.id_unidad_medida = ume.id_unidad_medida 
		LEFT JOIN proveedor ON pro.id_proveedor = proveedor.id_proveedor
		 WHERE id_producto=`+obj.id_producto, function(err,obj){ done();
			console.log("RSTA:");
			console.log(obj);
			lt.return(obj.rows, res,next);
		});
	});
}
