$(document).ready(onReady);

//page load
function onReady (){
  console.log('JS and JQ up and running!');

//event listeners
$('')

//page load functions
getTask();
}

function getTask(){
  $.ajax ({
    url: '/getTask',
    method: 'GET',
    success: function (response){
      console.log('in getTask', response);

      for (var i = 0; i < response.length; i++) {
        var name ='<p class= "task-person">'+response[i].who + '</p>';
        var thing = '<p class= "task-text">'+response[i].what+'</p>';
        var when = '<p class= "task-date">'+response[i].due+'</p>';
        var info = '<p class= "task-notes">'+response[i].notes+'</p>';
        var compButton = '<button id="complete-button">Complete</button>';
        var delButton = '<button id="cdelete-button">Delete</button>';
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


//use for complete and delete
// $.ajax ({
//   url: '/getTask' + idNum,
//   method: 'GET',
//   success: function (response){
//     console.log('in getTask');
// }//end success
// });//end ajax
