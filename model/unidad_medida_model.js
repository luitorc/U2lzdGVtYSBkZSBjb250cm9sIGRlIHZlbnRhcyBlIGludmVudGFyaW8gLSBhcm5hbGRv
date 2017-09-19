var lt = require('../helper/luitor_helper.js');

// var db = lt.conex('sqlite');

exports.getUnidadMedida = function(req, res, next){

	lt.db('pg',titular,function(err,client,done){
		client.query("SELECT * FROM unidad_medida ",function(err,obj){ done();
			lt.return(obj.rows,res,next);
		});
	});
	// .all("SELECT * FROM unidad_medida ", function(err, obj) {
	// // console.log(obj);
	//   lt.return(obj,res,next);
	// }).close();
}