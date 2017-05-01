$(document).ready(onReady);

//page load
function onReady (){
  console.log('JS and JQ up and running!');

//event listeners
$('#results-div').on('click', '#complete-button', completeTask);
$('#create-button').on('click', addTask);
$('#results-div').on('click', '#delete-button', deleteTask);


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

      }//end for loop
    }//end success
  });//end ajax
}// end getTask

function completeTask (){
  console.log('in completeTask');
  $(this).parent().css( "background-color", "#a23c3c" );//pull out later to maintain color on reload?
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
      $('#who-task').attr("placeholder", "add a name").val("").focus().blur();
      $('#what-task').attr("placeholder", "add a task").val("").focus().blur();
      $('#when-task').attr("placeholder", "add a due date").val("").focus().blur();
      $('#notes-task').attr("placeholder", "add your notes").val("").focus().blur();
      getTask();
      }//end success
  });//end POST
}//end addTask

function deleteTask (){
  // console.log('in delete task');
  // console.log($(this).data('id'));
  confirm("Do you really want to delete?");
  var deleteObject = {
    id: $(this).data('id')
  };
  console.log(deleteObject);
  $.ajax({
    url: '/deleteTask',
    method: 'POST',
    data: deleteObject,
    success: function(){
      $('#results-div').empty();
      getTask();
    }//end success
  });//end ajax
}// end deleteTask

function abandonGame () {
  var confirmAnswer = confirm("Do you really want to quit?");
  if (confirmAnswer) {
    console.log('quitter!!!');
    $('.game-div').empty();
    $('.game-div').append('<h1 id="quitter" >QUITTER!!!</h1>');
    setTimeout (function () {loadGame() ;},5000);

  }
}
