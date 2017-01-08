/**
 * Created by jarvis on 14/12/16.
 */
var express = require('express');
var app = express();
var path = require('path');
app.set('views', path.join(__dirname, 'views')); // here the .ejs files is in views folders
app.set('view engine', 'ejs');
//app.use(express.static('public'));
app.get('/', function (req, res) {
    console.log("inside registration 1");
    res.render('registration1',{prev:0,data:0});
    // res.sendFile( __dirname + "/" + "registration1.html" );
})
//tell the template engine

app.get('/reg1_submit', function (req, res) {
    console.log("inside submit");
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'register'
    })
    var s1 = {emp_type:req.query.emp_type,ename:req.query.ename,fname:req.query.fname ,
        mname:req.query.mname,address: req.query.address,city: req.query.city,district: req.query.district
        ,state: req.query.state,pin: req.query.pin,email: req.query.email,dob: req.query.dob
        ,phone_no: req.query.phone_no,qualification: req.query.qualification,gender: req.query.gender,category: req.query.category
        ,area: req.query.area,medium: req.query.medium,program: req.query.program
        ,gov_emp: req.query.gov_emp,sub_date: req.query.sub_date};
    connection.query('INSERT INTO employee SET ?', s1, function(err,res){
        if(err) throw err;

        console.log("inside registration 2");
    });
    res.render('registration1',{prev:1, data:JSON.stringify(s1)});
    //res.render('registration2',{reg_id:1});
    /* res.render('registration2', { //render the index.ejs
     temp: temp,
     total:total
     });*/
    //res.sendFile( __dirname + "/" + "registration2.html" );
});


var server = app.listen(8171, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})