var lt = require('../helper/luitor_helper.js');

// var db = lt.conex('pg');
exports.add = function(req, res, next){
	console.log(req.query);
	console.log(req.body);
	var obj = req.body.obj_in;
	var sql = `INSERT INTO proveedor (razon_social,descripcion,telf,telf2,telf3,correo,direccion,fech_regis,link)
			VALUES('${obj.razon_social}','${obj.descripcion}','${obj.telf}','${obj.telf2}','${obj.telf3}','${obj.correo}','${obj.direccion}','${obj.fech_regis}','${obj.link}')`;
    // console.log(sql);
    lt.db('pg',titular,function(err,client,done){
    	client.query(sql, function(err,obj){ done();
    		res.send("1");
    	});
    });
 //    .run(sql).close();
	// res.send("1");
}
exports.getAll_1 = function(req, res, next){ //Razon Social y ID
	console.log(req.query);
	console.log(req.body);
	var obj = req.body.obj_in;
	var sql = `SELECT id_proveedor,razon_social FROM proveedor ORDER BY id_proveedor DESC`;
    // console.log(sql);
    lt.db('pg',titular,function(err, client, done){
    	client.query(sql,function(err,obj){
    		res.send(obj.rows);
    	});
    });
 //    .all(sql, function(err, obj) {
	// // console.log(obj);
	// 	res.send(obj);
	// }).close();
	
}
// exports.update = function(req, res, next){
// 	var obj = lt.getAjax(req,res);
// 	// console.log(obj.id_unidad_medida);
//     db.run("UPDATE producto"
//     	+" SET nombrep='"+obj.nombrep
//     	+"',stock='"+obj.stock
//     	+"',precio_proveedor='"+obj.precio_proveedor
//     	+"',precio='"+obj.precio
//     	+"',id_unidad_medida='"+obj.id_unidad_medida
//     	+"' WHERE id_producto='"+obj.id_producto+"'");
// 	console.log("entro a update");
// 	lt.return({msn:"Se Actualizo con exito"},res,next);
// }