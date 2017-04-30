$(document).ready(onReady);

//page load
function onReady (){
  console.log('JS and JQ up and running!');

//event listeners
$('#results-div').on('click', '#complete-button', completeTask);
$('#create-button').on('click', addTask);


//page load functions
getTask();
}

function getTask(){
  $.ajax ({
    url: '/getTask',
    method: 'GET',
    success: function (response){
      console.log('in getTask', response);
      $('results-div').empty();
      for (var i = 0; i < response.length; i++) {
        var name ='<p class= "task-person">'+response[i].who + '</p>';
        var thing = '<p class= "task-text">'+response[i].what+'</p>';
        var when = '<p class= "task-date">'+response[i].due+'</p>';
        var info = '<p class= "task-notes">'+response[i].notes+'</p>';
        var compButton = '<button id="complete-button" data-id=' +response[i].id + '>Complete</button>';
        var delButton = '<button id="delete-button" data-id=' +response[i].id + '>Delete</button>';
        $('#results-div').append('<div class="task-div">' + name + thing + when + info + compButton + delButton + '</div>' );


        // append('<TR>' + '<td>' +response[i].owner + '</td>' + '<td>' +response[i].pet + '</td>' + '<td>' +response[i].breed + '</td>' + '<td>' +response[i].color + '</td>' + '</tr>');
        // <div class="task-div" data-id='1'>
        //     <p id="task-text">Do the dishes</p>
        //     <p id="task-date">Tuesday May 2</p>
        //
        //     <button id="delete-button">Delete</button>
        // </div>
      }//end for loop
    }//end success
  });//end ajax
}// end getTask

function completeTask (){
  console.log('in completeTask');
  $(this).parent().css( "background-color", "red" );//pull out later to maintain color on reload?
  // console.log($(this).data('id'));
  var completeObject = {
    id: $(this).data('id')
  };
  // console.log(idNum);
  $.ajax ({
    url: '/completeTask',
    method: 'POST',
    data: completeObject,
    success: function (response){
      // console.log('in completeTask');

  }//end success
  });//end ajax
}

function addTask (){
  // console.log('in addTask');
  $('#results-div').empty();
  taskToSend = {
    who: $('#who-task').val(),
    what: $('#what-task').val(),
    when: $('#when-task').val(),
    notes: $('#notes-task').val()
  };//end taskToSend
  // console.log('this is taskToSend:', taskToSend);
  $.ajax ({
    url: '/addTask',
    method: 'POST',
    data: taskToSend,
    success: function (response){
      $('#results-div').empty();
      getTask();
      }//end success
  });//end POST
}//end addTask


//use for complete and delete
// $.ajax ({
//   url: '/getTask' + idNum,
//   method: 'GET',
//   success: function (response){
//     console.log('in getTask');
// }//end success
// });//end ajax
