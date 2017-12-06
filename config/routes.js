var express = require('express');
var path = require('path');


module.exports = function(app,envConfig){
	
	// register route controllers
	var barang = require(path.join(envConfig.rootPath,'/routes/barang'));
	// var dapur = require(path.join(envConfig.rootPath,'/routes/dapur'));
	// var departemen = require(path.join(envConfig.rootPath,'/routes/departemen'));
	// var gudang = require(path.join(envConfig.rootPath,'/routes/gudang'));
	// var kartu_stok = require(path.join(envConfig.rootPath,'/routes/kartu_stok'));
	// var kategori = require(path.join(envConfig.rootPath,'/routes/kategori'));
	// var pemakaian_barang = require(path.join(envConfig.rootPath,'/routes/pemakaian_barang'));
	// var pemakaian_barang_detail = require(path.join(envConfig.rootPath,'/routes/pemakaian_barang_detail'));
	// var penerimaan_barang = require(path.join(envConfig.rootPath,'/routes/penerimaan_barang'));
	// var penerimaan_barang_detail = require(path.join(envConfig.rootPath,'/routes/penerimaan_barang_detail'));
	// var permintaan = require(path.join(envConfig.rootPath,'/routes/permintaan'));
	// var permintaan_detail = require(path.join(envConfig.rootPath,'/routes/permintaan_detail'));
	// var pindah_gudang = require(path.join(envConfig.rootPath,'/routes/pindah_gudang'));
	// var pindah_gudang_detail = require(path.join(envConfig.rootPath,'/routes/pindah_gudang_detail'));
	// var purchase_order = require(path.join(envConfig.rootPath,'/routes/purchase_order'));
	// var purchase_order_detail = require(path.join(envConfig.rootPath,'/routes/purchase_order_detail'));
	// var supplier = require(path.join(envConfig.rootPath,'/routes/supplier'));

	var route = express.Router();
 	app.use('/barang', route); 	

	app.get('/barang/get', barang.get);
	app.get('/barang/getInput', barang.getInput);
	route.get('/get/:id',function(req,res){
		barang.getID(req,res);
	});
	route.post('/barang/add',function(req,res){
		barang.add(req,res);
	});
	route.post('/update/:id',function(req,res){
		barang.update(req,res);
	});
 
 
};