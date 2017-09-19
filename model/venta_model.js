var lt = require('../helper/luitor_helper.js');

// var db = lt.conex('pg');

exports.deleteSale = function(req, res, next){
	// var obj = lt.getAjax(req,res);
	var sql = `DELETE FROM venta WHERE id_venta=${req.body.id_venta}`;
	console.log(sql);

	lt.db('pg',titular,function(err,client,done){
		client.query(sql,function(err,obj){
			if(req.body.controller)
	        	res(true);
	        else
	        	res.send(true);
		});
	});
	
	
}
exports.setRestoreProduct = function(req, res, next){
	// var obj = lt.getAjax(req,res);
	var sql = `UPDATE producto SET stock=stock+${req.body.cant_v} WHERE id_producto=${req.body.id_producto}`;
	// console.log(sql);
	lt.db('pg',titular,function(err,client,done){
		client.query(sql,function(err,obj){
			if(err){
	            console.log(err);
	            res(false);
	        }else{
	        	res(true);
	        }
		});
	});
	
}
exports.getProductsXsale = function(req, res, next){
	// var obj = lt.getAjax(req,res);
	var sql = `SELECT * FROM producto_venta WHERE id_venta=${req.body.id_venta}`;
	console.log(sql);
	lt.db('pg',titular,function(err,client,done){
		client.query(sql,function(err,obj){ done();
			if(err){
	            console.log(err);
	            res(obj.rows);
	        }else{
	        	res(obj.rows);
	        }
		});
	});
	
	
}
exports.viewXreceipt = function(req, res, next){
	var obj = lt.getAjax(req,res);
	var sql = `SELECT * FROM venta AS ven`
			+` INNER JOIN producto_venta AS pve ON ven.id_venta = pve.id_venta`
			+` INNER JOIN unidad_medida AS ume ON pve.unidad_medida_v = ume.id_unidad_medida`
			+` WHERE ven.id_venta = '${obj.id_venta}'`
			+` ORDER BY pve.id_venta DESC`;
	console.log(sql);
	lt.db('pg',titular,function(err,client,done){
		client.query(sql,function(err,obj1){
			console.log("ViewXreceipt: ");
			// console.log(obj1);
			// console.log(obj1);
			if(err){
	            console.log(err);
	        }else{
	            lt.return(obj1, res, next);
	        }
		});
	});
}
exports.save = function(req, res, next){
	var user = req.session.user;
	var obj = lt.getAjax(req,res);
	var sql=`Vacio`;
	console.log("SESSION DESCUENTO: ");
	var discount = req.session.discount;
	console.log(discount);
	if(discount!= undefined){
		if(discount.state == "true" && discount.percent > 0){
			console.log("ENTROOOO!");
			obj.total = obj.total - parseFloat(discount.price);

			sql = `INSERT INTO venta (total, fecha, hora, nombre_cl, direccion_cl, telf_cl, dni_cl, ruc_cl, nro_boleta, nro_factura, id_usuario_vendedor, nro_recibo,id_usuario,total_proveedor,discount_percent,discount_price)`
			+`VALUES('${obj.total}','${obj.fecha}','${obj.hora}','${obj.nombre_cl}','${obj.direccion_cl}','${obj.telf_cl}'`
				+`,'${obj.dni_cl}','${obj.ruc_cl}','${obj.nro_boleta}','${obj.nro_factura}','${obj.id_usuario_vendedor}','${obj.nro_recibo}','${user.id_usuario}','${obj.total_proveedor}','${discount.percent}','${discount.price}') RETURNING id_venta`;
		}
	}else{
		console.log("NO ENTROOOOO");
		sql = `INSERT INTO venta (total, fecha, hora, nombre_cl, direccion_cl, telf_cl, dni_cl, ruc_cl, nro_boleta, nro_factura, id_usuario_vendedor, nro_recibo,id_usuario,total_proveedor)`
		+`VALUES('${obj.total}','${obj.fecha}','${obj.hora}','${obj.nombre_cl}','${obj.direccion_cl}','${obj.telf_cl}'`
			+`,'${obj.dni_cl}','${obj.ruc_cl}','${obj.nro_boleta}','${obj.nro_factura}','${obj.id_usuario_vendedor}','${obj.nro_recibo}','${user.id_usuario}','${obj.total_proveedor}') RETURNING id_venta`;
	}
	console.log("SQL:---->");
	console.log(sql);
	lt.db('pg',titular,function(err,client,done){
		client.query(sql,function(err,res1){
			var id_venta = res1.rows[0].id_venta;
			console.log(res1);
			// return;
			if(err){
	            console.log(err);
	        }else{
	            console.log("Guardo venta  ID: "+id_venta);
	            saveProductoVenta(obj.listProduct, id_venta, function(confirm){
	            	if(confirm){
	            		res({id_venta: id_venta});
	            	}else{
	            		console.log("Error al anexar Productos");

	            		res(false);
	            	}
	            });

	        }
		});
	});
	// .run(sql
	// ,function(err){
	// 	if(err){
 //            console.log(err);
 //        }else{
 //        	var id_venta = this.lastID;
 //            console.log("Guardo venta  ID: "+this.lastID);
 //            saveProductoVenta(obj.listProduct, this.lastID, function(confirm){
 //            	if(confirm){
 //            		res({id_venta: id_venta});
 //            	}else{
 //            		console.log("Error al anexar Productos");

 //            		res(false);
 //            	}
 //            });

 //        }
	// }).close();
	// console.log(obj.listProduct);
	function saveProductoVenta(lpr, id_venta, callback1){ //saleDetails
		var cont = 0;
		// for( i in lpr ){
		var i=-1;
		read_lpr();
		function read_lpr(){
			i++;
			var sql = `INSERT INTO producto_venta (id_producto, id_venta, cant_v, unidad_medida_v, precio_v, subtotal_v, tipo_moneda_v, nombrep_v)`
			+`VALUES('${lpr[i].id_producto}','${id_venta}','${lpr[i].cantList}','${lpr[i].unidad_medida_v}','${lpr[i].precio_v}','${lpr[i].subtotal_v}'`
				+`,'${lpr[i].tipo_moneda_v}','${lpr[i].nombrep_v}') RETURNING id_producto_venta`;
			lt.db('pg',titular,function(err,client,done){
				client.query(sql,function(err,res1){ done();
					var id_producto_venta = res1.rows[0].id_producto_venta;
					cont++;
					if(err){
			            console.log(err);
			        }else{
			            console.log("- producto_venta regis ID: "+id_producto_venta);
			            // console.log(cont+" == "+lpr.length);
			            if( cont == lpr.length ){
			            	console.log("Procediendo a reducir stock");
			            	reductionStock(lpr,function(confirm){
			            		if(confirm)
			            			callback1(true);
			            		else
			            			callback1(false);
			            	});
			            	
			            } //Preguntamos si termino de Registrar todos los productos
			        	else{
			            	// console.log("No se pudo ingresar a la funcion para reducir stock");
			            	read_lpr();
			        	}
			        }
				});
			});
			
           
		}
	}
								
	function reductionStock(lpr,callback2){ //Reducimos stock
		console.log("Dentro de Reducción de stock");
		var cont =0;
		// for( i in lpr ){
		var i=-1;
		read_lpr2();
		function read_lpr2(){
			i++;
			var sql = `UPDATE producto SET stock=stock-'${lpr[i].cantList}' WHERE id_producto = '${lpr[i].id_producto}'`;
			lt.db('pg',titular,function(err,client,done){
				client.query(sql,function(err,res1){ done();
					cont++;
		            console.log("Se redujo stock");
	        		if(err){
			            console.log("LEER:"+err);
			        }else{
			        	console.log("2: "+cont+" == "+lpr.length);

			        	if(cont == lpr.length){
			        		callback2(true);
			        	}else
			        		read_lpr2();
			        }
				});
			});
			
		}
	}
}
exports.view = function(req, res, next){

	var sql = `SELECT * FROM venta ORDER BY id_venta DESC`;
	lt.db('pg',titular,function(err,client,done){
		client.query(sql, function(err,obj){
			if(err){
	            console.log(err);
	        }else{
	            // console.log(obj);
	            lt.return(obj, res, next);
	        }
		});
	});

	// .all(`SELECT * FROM venta ORDER BY id_venta DESC`,function(err, obj){
	// 	if(err){
 //            console.log(err);
 //        }else{
 //            // console.log(obj);
 //            lt.return(obj, res, next);
 //        }
	// }).close();
}


