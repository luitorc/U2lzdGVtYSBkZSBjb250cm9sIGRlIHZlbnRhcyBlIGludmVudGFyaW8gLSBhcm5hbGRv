var lt = require('../helper/luitor_helper.js');
var producto_model = lt.model('producto');
var venta_model = lt.model('venta');
var sales_model = lt.model('sales');

exports.restaurarProducts = function(req, res, next){
	venta_model.getProductsXsale(req,function(products){
		// console.log(products);
		var cont = 0;
		// for( i in products ){
		var i=-1;
		read_products();
		function read_products(){
			i++;
			venta_model.setRestoreProduct({
				body:{
					id_producto: products[i].id_producto
					,cant_v: products[i].cant_v
				}
			},function(confirm){
				cont++;
				console.log(confirm);
				if(cont==products.length){
					console.log("Proceso Terminado");

					//Eliminamos la venta para finalizar
					venta_model.deleteSale({
						body:{
							id_venta: req.body.id_venta
							,controller:true
						}
					},function(confirm){
						if(confirm){
							console.log("Venta Restaurada e Eliminada");
							res.send(req.body.id_venta);
						}
						else{
							console.log("Error al Restaurar");
							res.send(false);
						}

					})

				}else
					read_products();	
			});
		}
		// }
	});
}

exports.setviewsales = function(req, res, next){
	var today = new Date();
	var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
	var lastDay = lastDayOfMonth.getDate();
	var query = "SELECT * FROM venta WHERE fecha ";
	var q = req.body;
	switch(q.timeType){
		case 'Dia':
			query+= `BETWEEN date('${q.anio}-${q.mes}-${q.dia}') AND date('${q.anio}-${q.mes}-${q.dia}')`;
			break;
		case 'Semana':
			query+= `BETWEEN date('${q.date_ini}') AND date('${q.date_fin}')`;
			break;
		case 'Mes':
			query+= `BETWEEN date('${q.anio}-${q.mes}-01') AND date('${q.anio}-${q.mes}-${lastDay}')`;
			break;
		case 'Año':
			query+= `BETWEEN date('${q.anio}-01-01') AND date('${q.anio}-12-${lastDay}')`;
			break;
	}
	query+=" ORDER BY fecha DESC";
	console.log("QUERY: ");
	console.log(query);
	sales_model.getSalesXtime({ 
		query: query
	},function(obj){
		console.log("DATA RES: ");
		console.log(obj);
		
		res.send(obj);
	});
}
exports.receiptView = function(req, res, next){
	var obj = lt.getAjax(req,res);

	venta_model.viewXreceipt({ id_venta: obj.id_venta },function(obj1){
		console.log(obj1.rows);
		lt.return(obj1.rows,res,next);
	});
}

exports.sellCart = function(req,res,next){
	var obj = lt.getAjax(req,res);
	// console.log(req.session.venta.total);
	venta_model.save({
		total: req.session.venta.total
		,fecha: lt.getFechaStr(new Date())
		,hora: lt.getTimeStr(new Date())
		,nombre_cl: obj.nombre_cl
		,direccion_cl: obj.direccion_cl
		,telf_cl: obj.telf_cl
		,dni_cl: obj.dni_cl
		,ruc_cl: obj.ruc_cl
		,nro_boleta: obj.nro_boleta
		,nro_factura: obj.nro_factura
		,id_usuario_vendedor: 1
		,nro_recibo: '12011293'
		,listProduct: req.session.listProduct
		,total_proveedor: req.session.venta.total_proveedor
		,session: {
			user: req.session.user
			,discount: req.session.venta.discount
			
		}
	},function(obj1){
		console.log("SALIO DE SOLICITUD");
		console.log(obj1);
		// console.log("VENTA ID: "+obj1.id_venta);
		req.session.listProduct = []; //	Para recetear carrito
		req.session.arrayCheck = []; //	Para recetear carrito
		req.session.venta=[];
		req.session.tool=undefined;
		res.send({
			msn:"Se realizo la venta a '"+obj.nombre_cl +"'"
			,id_venta: obj1.id_venta
		})
	});

}
exports.getSales = function(req, res, next){
	venta_model.view({}, function(obj){
		console.log("ya esta");
		lt.return(obj,res,next);
	}, next);
}
