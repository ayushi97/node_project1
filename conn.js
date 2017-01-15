/**
 * Created by jarvis on 14/12/16.
 */
var express = require('express');
var app = express();
var path = require('path');
app.set('views', path.join(__dirname, 'views')); // here the .ejs files is in views folders
app.set('view engine', 'ejs');
//app.use(express.static('public'));
var abc;
var id;
app.get('/', function (req, res) {
    console.log("inside registration 1");
    res.render('registration1',{prev:0,data:0});
    // res.sendFile( __dirname + "/" + "registration1.html" );
})
//tell the template engine
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    port : 3306, //port mysql
    database:'register'
})

app.get('/reg1_submit', function (req, res) {
    console.log("inside submit");

    /*var s1 = {emp_type:req.query.emp_type,ename:req.query.ename,fname:req.query.fname ,
     mname:req.query.mname,address: req.query.address,city: req.query.city,district: req.query.district
     ,state: req.query.state,pin: req.query.pin,email: req.query.email,dob: req.query.dob
     ,phone_no: req.query.phone_no,qualification: req.query.qualification,gender: req.query.gender,category: req.query.category
     ,area: req.query.area,medium: req.query.medium,program: req.query.program
     ,gov_emp: req.query.gov_emp,sub_date: req.query.sub_date};*/
    connection.query('INSERT INTO employee SET ?', req.query, function (err, result) {

        if (err) throw err;

        console.log("id of inseted row" + result.insertId);
        id = result.insertId;
        console.log(id + "id");
        connection.query('SELECT * FROM employee  where ID = ?', id, function (err, rows, fields) {
            //console.log("inside select" + rows[0] + "length" + rows.length);
            abc=JSON.stringify(rows[0]);
            res.render('preview1', {
                prev: 1,
                data: JSON.stringify(rows[0])
            });

        });

    });

});
//console.log(id+"this outter");

app.get('/update', function (req, res) {
    console.log("hiii");
    console.log(abc);
    res.render('registration1', {
        prev: 1,
        data: abc})

});

app.get('/update_sub', function (req, res) {
    console.log("inside update_sub");
    connection.query('UPDATE employee SET ? WHERE ID = ?', [req.query, id], function (err, rows, fields) {
        if (err) throw err;
        connection.query('SELECT * FROM employee  where ID = ?', id, function (err, rows, fields) {
            //console.log("inside select" + rows[0] + "length" + rows.length);
            //abc = JSON.stringify(rows[0]);
            res.render('preview1', {
                prev: 1,
                data: JSON.stringify(rows[0])

            });
        });


    });
});

app.get('/continue', function (req, res) {
    res.render('registration2');


});


var server = app.listen(3036, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

});

