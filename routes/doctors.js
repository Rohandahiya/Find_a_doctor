var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var connection = mysql.createConnection({
	host: 'localhost',
	database: 'findadoc',
	user: 'Hospital',
	password: 'Rohan@007'
});

connection.connect();


router.get('/', function(req, res, next) {
  if(req.query.state){
    var query =  connection.query("SELECT * FROM doctors WHERE state = ?",req.query.state,function(err,rows){
      if(err) throw err;
      res.render('doctors',{
        doctors:rows
      });
  })
  }
  else{
    var query =  connection.query("SELECT * FROM doctors",function(err,rows){
      if(err) throw err;
      res.render('doctors',{
        doctors:rows
      });
  })
  }
  
});

router.get('/details/:id', function(req, res, next) {
  var query =  connection.query("SELECT * FROM doctors WHERE doc_id = ?",req.params.id,function(err,rows){
    if(err) throw err;
    res.render('details',{
      doctor:rows[0]
    });
})
});

router.get('/category/:name', function(req, res, next) {
  var query =  connection.query("SELECT * FROM doctors WHERE category = ?",req.params.name,function(err,rows){
    if(err) throw err;
    res.render('doctors',{
      doctors:rows
    });
})
});

router.get('/add', function(req, res, next) {
  var query =  connection.query("SELECT * FROM categories",function(err,rows){
    if(err) throw err;
    res.render('add-doctors',{
      categories:rows
    });
})
});

router.post('/add',(req,res)=>{
  var fullname = req.body.full_name;
  var category = req.body.category;
  var newpatients = req.body.new_patients;
  var graduationyear = req.body.graduation_year;
  var practicename = req.body.practice_name;
  var streetaddress = req.body.street_address;
  var city = req.body.city;
  var state = req.body.state;

  var project = {
    full_name:fullname,
    category:category,
    new_patients:newpatients,
    graduation_year:graduationyear,
    practice_name:practicename,
    street_address:streetaddress,
    city:city,
    state:state
  }

  var query = connection.query('INSERT INTO doctors SET ?',project,function(err,result){
      console.log('Error '+ err)
      console.log('Success '+ result)
  })

  res.location('/doctors');
  res.redirect('/doctors')

})

module.exports = router;
