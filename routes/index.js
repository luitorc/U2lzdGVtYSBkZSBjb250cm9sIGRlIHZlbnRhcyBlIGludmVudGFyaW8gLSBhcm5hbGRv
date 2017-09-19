var lt = require('../helper/luitor_helper.js');

exports.index = function(req, res){
	res.render('index',{
		title: 'Welcome'
	});
}
exports.addProvider = function(req, res){
	res.render('addProvider',{
		title: 'Nuevo Proveedor'
		,user: req.session.user
	});
}
exports.config = function(req, res){
	res.render('config',{
		title: 'Configuración de cuenta'
		,user: req.session.user
	});
}
exports.product_management = function(req, res){
	res.render('product_management',{
		title: 'Administración de Productos'
		,user: req.session.user
	});
}
exports.receipt = function(req, res){
	var obj = lt.getAjax(req,res);
	if(!obj.idv)
		obj.idv = 0;
	res.render('receipt',{
		idv: obj.idv
		,cl: obj.cl
		,user: req.session.user
	});
}
exports.sales = function(req, res){
	// var venta_model = lt.model('venta');
	// var obj = lt.getAjax(req,res);
	// venta_model.view({},function(obj){
		// console.log(obj);
		res.render('sales',{
			user: req.session.user
		});
	// });
	
}

exports.principal = function(req, res){
	var obj = lt.getAjax(req,res);
	console.log("DB:");
	// console.log(req.session.user.titular);
	var sess = req.session;
	if (!sess.listProduct) {
    	sess.listProduct = [];
	}
		var gestionProduct = lt.controller('gestionProduct');
		var producto_model = lt.model('producto');
		switch(req.query.option){
			// case 'viewp':
			// 	gestionProduct.view({
					
			// 	},function(obj1){
			// 		res.render('principal', { 
			// 			sub_title: "Lista de productos"
			// 			,option: req.query.option
			// 			,number: obj.number
			// 			,products: obj1
			// 			,user: req.session.user
			// 			// ,listCart: sess.views
			// 			,listCart: req.session.listProduct
			// 			,idp:req.query.idp
			// 		});
			// 	});
			// 	break;
			case 'viewp':
				res.render('principal', { 
					sub_title: "Lista de productos"
					,option: req.query.option
					,user: req.session.user
					// ,listCart: sess.views
					,listCart: req.session.listProduct
					,idp:req.query.idp
				});
				break;
			case 'regisp':
				var sub_title;
				if( req.query.idp ){ //Exist id_producto? par actualizar
					sub_title = "Actualizacion de producto";
					producto_model.getDataXproduct({id_producto:req.query.idp},function(obj1){
						console.log(obj1);
						res.render('principal', { 
							sub_title: sub_title
							,option: req.query.option
							,dt: obj1[0]
							,user: req.session.user
						});
					});
				}else{
					sub_title = "Registro de nuevo producto";
					res.render('principal', { 
						sub_title: sub_title
						,option: req.query.option
						,dt: {
							id_producto: ""
							,nombrep: ""
							,stock: ""
							,precio: ""
							,precio_proveedor: ""
							,id_unidad_medida: ""
						}
						,user: req.session.user
					});
				}

				break;
			default:
					sub_title = "Registro de nuevo producto";
					res.render('principal', { 
						sub_title: sub_title
						,option: "other"
						,user: req.session.user
					});
				break;
		}
}
exports.saludo = function(req, res){
	var obj = lt.getAjax(req,res);

	res.send('hello world: -> '+obj.dt);
}
 