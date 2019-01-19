var express = require('express');
var router = express.Router();
var mysql = require('mysql2')

var connection = mysql.createConnection({
	host: 'localhost',
	database: 'findadoc',
	user: 'Hospital',
	password: 'Rohan@007'
});

connection.connect();

router.get('/', function(req, res, next) {
  res.render('categories');
});

router.get('/add', function(req, res, next) {
  res.render('add-categories');
});

router.post('/add',(req,res)=>{
  var category = req.body.name;

  var project = {
    name:category
  }

  var query = connection.query('INSERT INTO categories SET ?',project,function(err,result){
      console.log('Error '+ err)
      console.log('Success '+ result)
  })

  res.location('/');
  res.redirect('/')

})

module.exports = router;
