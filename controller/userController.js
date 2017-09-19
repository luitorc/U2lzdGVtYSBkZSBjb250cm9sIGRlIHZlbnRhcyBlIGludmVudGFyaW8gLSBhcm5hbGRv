var lt = require('../helper/luitor_helper.js');
var user_model = lt.model('user');

exports.logear = function(req, res, next){
	user_model.check({ 
		login: req.body.login
		,password: req.body.password
	},function(dt){
		if(dt.length > 0){
			req.session.user = dt[0];

			res.send(dt);
		}else
			res.send(false);
	},"return");
}
exports.session_close = function(req, res, next){
	req.session.destroy();
	res.redirect('/');
}