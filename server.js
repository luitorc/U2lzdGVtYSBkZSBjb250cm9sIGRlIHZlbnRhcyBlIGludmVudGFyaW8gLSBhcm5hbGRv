titular = 'luis.torres';
process.env.TZ = "America/Lima";

var lt = require('./helper/luitor_helper.js');

// var PORT = 3000;
//var PORT = 49155;
var PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');

var express  = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var path = require('path');
var cons= require('consolidate');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var route = require('./routes');
app.engine('.jade',cons.jade);
app.set('view engine', 'jade');
// console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
//Para session
app.use(cookieParser());
// app.set('trust proxy', 1);
app.set('trust proxy', 1) // trust first proxy
app.use(session({ 
    secret: 'keyboard cat', 
    cookie: { maxAge: false }
}))

// app.use(function(req,res,next){
//     res.locals.listProduct = 0;
//     req.session.listProduct = 0;
//     next();
// });
//use - for post
// app.use(bodyParser.json({limit: '1mb'})); // support json encoded bodies
app.use(bodyParser.json({limit: '1mb'})); // support json encoded bodies
// app.use(bodyParser.json({limit: '28byte'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true ,limit: '1mb'})); // support encoded bodies

//routers
// app.all(/^\/.*/, function (req, res) { //Si el sitio estuviera en mantenimiento,
//     // res.send('en mantenimiento');
// });
// app.all('*', function (req, res) { //Si el sitio estuviera en mantenimiento,
//     // res.send('en mantenimiento');
// });
/* SECTION CONFIG */
app.post('/config@getHeaderReceipt',lt.model('config').getHeaderReceipt);
app.post('/config@allDataConfig',lt.model('config').allDataConfig);
app.post('/config@setTypeDivisa',lt.model('config').setTypeDivisa);
app.post('/config@getTypeDivisa',lt.model('config').getTypeDivisa);
app.post('/config@setDataReceipt',lt.model('config').setDataReceipt);

/* CONFIG-FIN */
//Access
app.get('/', route.index);
app.post('/user@logear',lt.controller('user').logear);
app.get('/user@session_close',lt.controller('user').session_close);
//**
app.get('/principal', route.principal);
//-- VENTAS
app.get('/sales', route.sales);
    app.post('/sales_setviewsales', lt.controller('sales').setviewsales );
    app.post('/sales@restaurarProducts', lt.controller('sales').restaurarProducts );
    app.post('/venta@deleteSale', lt.model('venta').deleteSale );

app.post('/producto@getData',lt.model('producto').getData);
app.get('/receipt', route.receipt);
    app.post('/tool@discount',function(req,res,next){
        req.session.tool = {
            discount_state: req.body.discount_state
            ,discount_percent: req.body.discount_percent
            ,discount_price: req.body.discount_price
        }
        console.log(req.session.tool);
        res.send("save Params discount");
    });
//Administración de productos
app.get('/product_management', route.product_management);
app.get('/config', route.config);
app.post('/deleteProduct', lt.model('producto').deleteProduct);


// app.get('/perfil', route.perfil);
//POST
app.post('/jaja',function(req, res, next){
	console.log(req.body.nombre);
	next();
});

app.post('/getProduct', lt.model('producto').getData );
app.post('/saveProduct', lt.model('producto').save );
app.post('/updateProduct', lt.model('producto').update );
app.post('/getUnidadMedida', lt.model('unidad_medida').getUnidadMedida );

app.post('/saveCheckSession', lt.controller('gestionProduct').saveCheckSession );
app.post('/deleteProductCart', lt.controller('gestionProduct').deleteProductCart );
app.post('/getCheckSession', lt.controller('gestionProduct').getCheckSession );
app.post('/sellCart', lt.controller('sales').sellCart );
app.post('/receiptView', lt.controller('sales').receiptView );

/* ProductosManager */

app.post('/producto@getStockAll', lt.model('producto').getStockAll );

/* ProviderManager */
app.get('/addProvider',route.addProvider);
app.post('/providerManager@add', lt.model('providerManager').add );
app.post('/providerManager@getAll_1', lt.model('providerManager').getAll_1 );


io.on('connection',function(socket){
	console.log("Conectado: "+socket.id);
    socket.on('data_req', function (dt){
    	io.emit('data_res',dt+" mama");
    });

    socket.on('disconnect',function(){
    	console.log("Salio de seccion");
    });
});

//Delay Estimado

http.listen(PORT,function(){
    console.log('server listening on port '+PORT);
    
});
