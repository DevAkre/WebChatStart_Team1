var id;
var power= true;

$(document).ready(function () {
    $('#sendText').click(sendText);
    $('#checkText').click(sendText);
    $('#stopChat').click(toggleChat);
    $('#refreshChat').click(refresh);
    
    var input = document.getElementById("textinput");

    // Respond to enter key
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        sendText();
      }
    });

    //id = document.getElementById("idinput");
    id = $('#idinput').val();
    console.log("ID:",id);

});

function toggleChat(){
  power = !power;
  if(!power){
    $('#chatBox').css( "border", "3px solid red" ).css( "filter", "grayscale(70%)" )
    $('#stopChat').attr("value","Start");
  }else{
    $('#chatBox').css( "border", "3px solid lightgreen" ).css( "filter", "grayscale(0%)" )
    $('#stopChat').attr("value","Stop");
  }
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// Function to force scrollable window at bottom
function updateScroll(){
    var element = document.getElementById("chatBox");
    element.scrollTop = element.scrollHeight;
}


 // Respond to send button
function sendText() {
  console.log("sendText");
  if(!power)return;
  // Get the text from the text box
  inText = $('#textinput').val();
  id = $('#idinput').val();
  // Clear the input text
  $('#textinput').val("");

  //document.getElementById('chatBox').innerHTML += "<font color='red'>You: </font>" + inText+"<br />";
  // force to bottom
  updateScroll();

  message=inText.replace("","+");
  $.ajax(
    {
    type: "get",
    url: "/cgi-bin/team1_webchat.py?message=" + message + "&id="+id,
    dataType: "text",
    success:  processResults,
    error: function(request, ajaxOptions, thrownError)
    {
        $("#debug").text("error with get:"+request+thrownError);
    }
  });
}

function refresh(){
  message ="------"
  id="REFRESHING"
  updateScroll();
  $.ajax(
    {
    type: "get",
    url: "/cgi-bin/team1_webchat.py?message=" + message + "&id="+id,
    dataType: "text",
    success:  processResults,
    error: function(request, ajaxOptions, thrownError)
    {
        $("#debug").text("error with get:"+request+thrownError);
    }
  });
}

function processResults(data) {
  // add to the bottom of the chat box
  console.log("got:"+data);
  $('#chatBox').append(data);
}
