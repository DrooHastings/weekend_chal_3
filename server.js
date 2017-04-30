//requires
var path = require ('path');
var bodyParser = require ('body-parser');
var express = require ('express');
var pg = require ('pg');
var app = express();

//port
var port = 8888;

//config
var config = {
  database: 'tasks',
  host: 'localhost',
  port: 5432,
  max: 12
};//end config

//globals
taskArray = []; //dummy array
var pool = new pg.Pool (config);

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// create server
app.listen (port, function(){
  console.log('server up on :', port);

});//end server up

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});//end base url

app.get('/getTask', function(req, res){
  console.log('/getTask route hit');

  pool.connect( function (err, connection, done){
    if (err){
      console.log("error in /getTask");
      res.send(400);
    }
    else {
      console.log('connected to the db in /getTask');
      taskArray= [];
      var taskSet = connection.query("SELECT * from tasks");
      // console.log(taskSet);
      taskSet.on('row', function(row){
        taskArray.push(row);
      }); //end on row magic
      taskSet.on('end', function(){
        done();
        res.send(taskArray);
      });//end on end
    } //end else
  }); // end pool connect
});//end getTask

app.post('/completeTask', function(req, res){
  // console.log('this is req.body:', req.body.id);
  pool.connect(function(err, connection, done){
    if (err) {
      res.send(400);
    }//end err
    else {
      var resultSet = connection.query("UPDATE tasks SET active=false WHERE id=$1", [req.body.id]);
      done();
      res.send(200);
    }//end else
  });//end pool.connect
});//end completeTask

app.post('/addTask', function(req, res){
  // console.log('this is addTask server side req.body:', req.body);
  pool.connect(function(err, connection, done){
    if (err) {
      res.send(400);
    }//end err
    else {
      console.log('successfully connecting to DB!!!');
      var resultSet = connection.query("INSERT INTO tasks (who, what, due, notes) values ($1, $2, $3, $4)", [req.body.who, req.body.what, req.body.when, req.body.notes]);
      taskArray = [];
      done();
      res.send(200);
    }//end else

  });//end pool.connect

});//end addTask
