var mysql = require('mysql'),
    Todo  = require('../config/models/Todo'),
    tabel = 'tbl_barang',
    con = Todo.con();

function genHead(rows){
    var response = [];
    var header = Object.keys(rows[0]);
    var data = new Array(rows.length);

    for(var i = 0; i < rows.length; i++) {
        var cube = rows[i];
        data[i] = new Array(header.length);

        for(var j = 0; j < header.length; j++) {
            data[i][j] = cube[header[j]];
        }
    }

    response.push({header,data});             
    
    return response;
}

module.exports = {
    get: function(req, res){
        var query = 'SELECT A.ID,A.Nama,B.NamaKategori as Kategori,Harga, Stok,Satuan, A.DateAdd, A.DateUpd  FROM `'+tabel+'` as A INNER JOIN tbl_kategori as B ON A.ID_Kategori = B.ID ';

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
        res.setHeader('Content-Type', 'application/json');  

        con.query(query, function(err, rows, fields) {
            if (!err){
                var response = [];
                response.push({'result' : 'success'});

                if (rows.length != 0) {
                    var dt = genHead(rows);
                    
                    response.push({'header' : dt[0].header});             
                    response.push({'data' : dt[0].data}); 
                } else {
                    response.push({'msg' : 'No Result Found'});
                }

                con.release();
                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });

    },
    getInput: function(req, res){
        var query = 'SELECT A.ID,A.Nama,Harga, Stok, Satuan  FROM `'+tabel+'` as A INNER JOIN tbl_kategori as B ON A.ID_Kategori = B.ID ';

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
        res.setHeader('Content-Type', 'application/json');  

        con.query(query, function(err, rows, fields) {
            if (!err){
                var response = [];
                response.push({'result' : 'success'});

                if (rows.length != 0) {
                    var dt = genHead(rows);
                    
                    response.push({'header' : dt[0].header});             
                    response.push({'data' : dt[0].data}); 
                } else {
                    response.push({'msg' : 'No Result Found'});
                }

                con.release();

                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });
    },

    getID : function(req, res) {
        var id = req.params.id;
        var query = 'SELECT * FROM `'+tabel+'` as A INNER JOIN tbl_kategori as B ON A.ID_Kategori = B.ID WHERE A.ID="'+id+'"';
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
        res.setHeader('Content-Type', 'application/json');  

        con.query(query, function(err, rows, fields) {
            if (!err){
                var response = [];
                response.push({'result' : 'success'});

                if (rows.length != 0) {
                    response.push({'data' : rows}); 
                } else {
                    response.push({'msg' : 'No Result Found'});
                }
                con.release();
                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });
    },

    add : function (req,res) {
        var response = []; 

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
        res.setHeader('Content-Type', 'application/json');  

        console.log(req.body);
        if (typeof req.body.ID !== 'undefined'&&
            typeof req.body.ID_Kategori !== 'undefined'&&
            typeof req.body.Nama !== 'undefined'&&
            typeof req.body.Harga !== 'undefined'&&
            typeof req.body.Satuan !== 'undefined') {

            var ID          = req.body.ID;
            var ID_Kategori = req.body.ID_Kategori;
            var Nama        = req.body.Nama;
            var Alias       = req.body.Alias;
            var Harga       = req.body.Harga;
            var Satuan      = req.body.Satuan;
            
            var query = 'INSERT INTO `'+tabel+'`(`ID`, `ID_Kategori`, `Nama`, `Alias`, `Harga`, `Satuan`)'+ 
                    'VALUES ("'+ID+'",'+ID_Kategori+',"'+Nama+'","'+Alias+'",'+Harga+',"'+Satuan+'")';

            con.query(query, function(err, result) {
                if (!err){
 
                    if (result.affectedRows != 0) {
                        response.push({'result' : 'success'});
                    } else {
                        response.push({'msg' : 'No Result Found'});
                    }
                    con.release();
                    res.status(200).send(JSON.stringify(response));
                } else {
                    res.status(400).send(err);
                }
            });

        
        } else {
            response.push({'result' : 'error', 'msg' : 'Please fill required details'});
            
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
            res.setHeader('Content-Type', 'application/json');  

            res.status(200).send(JSON.stringify(response));
        }
    },


    update : function (req,res) {
        var id = req.params.id, response = [];

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
        res.setHeader('Content-Type', 'application/json');  

        if (typeof req.body.ID_Kategori !== 'undefined'&&
            typeof req.body.Nama !== 'undefined'&&
            typeof req.body.Harga !== 'undefined'&&
            typeof req.body.Satuan !== 'undefined') {

            var ID_Kategori = req.body.ID_Kategori;
            var Nama        = req.body.Nama;
            var Alias       = req.body.Alias;
            var Harga       = req.body.Harga;
            var Satuan      = req.body.Satuan;

            var query ='UPDATE `'+tabel+'` SET '+
                    '`ID_Kategori`='+ID_Kategori+',`Nama`="'+Nama+'",'+
                    '`Alias`="'+Alias+'",`Harga`='+Harga+',`Satuan`="'+Satuan+'"'+
                    'WHERE ID="'+id+'"';

            con.query(query, function(err, result) {
                if (!err){
 
                    if (result.affectedRows != 0) {
                        response.push({'result' : 'success'});
                    } else {
                        response.push({'msg' : 'No Result Found'});
                    }
                    con.release();
                    res.status(200).send(JSON.stringify(response));
                } else {
                    res.status(400).send(err);
                }
            });
 
        
        } else {
            response.push({'result' : 'error', 'msg' : 'Please fill required details'});

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
            res.setHeader('Content-Type', 'application/json');  

            res.status(200).send(JSON.stringify(response));
        }
    }
};