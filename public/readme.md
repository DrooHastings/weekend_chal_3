todos
==========
[x]on ready function
[x]build out index based on wireframe
[x]get tasks function w/ GET route
[x]app.get for get tasks
[x] complete tasks function w/ post route
[x] app.post in server for completeTasks
[] deleteTask function w/ DELETE route
[] app.delete in server
[x] addTask POST route
[x] app.post for addTask
[x] toggle color function on client side
[x] build database
[x] test getTask is getting data
[] add active = true in addTask server side?
[] empty inputs







Allow user to create task
Task stored in database
Refresh DOM to show all tasks
Complete task option
  completed tasks should look different (div id)
  Whether a task is completed or not should be in DB (like active in Millie's project)

Delete task option
  Must remove task from DB and DOM

Create alert that asks if user is sure the want to delete task

[] **PRO MODE** Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.  



Day 2 lecture (db)
===

in Postico:

- create new database ("psiGarage" in class)
- create a table within this new db ("cars")
 - id
 - year
 - make
 - model



In server.js:
- add require for "pg"
- add pool config object
- create new pool with this config

```javascript
var pg = require( 'pg' );

// setup config for the pool
var config = {
  database: 'psiGarage',
  host: 'localhost',
  port: 5432,
  max: 12
}; // end config

// create new pool using this config
var pool = new pg.Pool( config );
```

In the get /cars route:

- connect to db with pool
- send back to client connection status

```javascript
pool.connect( function( err, connection, done ){
  //check if there was an Error
  if( err ){
    console.log( err );
    // respond with PROBLEM!
    res.send( 400 );
  }// end Error
  else{
    console.log('connected to db');
    // close connection to reopen spot in pool
    done();
    // respond with OK
    res.send( 200 );
  } // end no error
}); //end pool
```

- restart server
- check that the console logs to see if connection to db is working

Getting data from the db:

- update pool connect to check if there is an error
- if no error hold the result set in a variable
- push each row in the result set into an array
- on result set end: close connection with done() and res.send the array

```javascript
pool.connect( function( err, connection, done ){
  //check if there was an Error
  if( err ){
    console.log( err );
    // respond with PROBLEM!
    res.send( 400 );
  }// end Error
  else{
    console.log('connected to db');
    // send query for all cars in the 'cars' table and hold in a variable (resultSet)
    var resultSet = connection.query( "SELECT * from cars" );
    // convert each row into an object in the allCars array
    // on each row, push the row into allCars
    resultSet.on( 'row', function( row ){
      allCars.push( row );
    }); //end on row
    // on end of rows send array as response
    resultSet.on( 'end', function(){
      // close connection to reopen spot in pool
      done();
      // res.send array of cars
      res.send( allCars );
    }); //end on end
  } // end no error
}); //end pool
```

- restart server
- add some dummy data to the table on db and it should show up on the DOM when refreshed
