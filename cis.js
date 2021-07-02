$(document).ready(function () {
 
  var previous_frame = 0;
  var current_frame = 1;
  var total = 0;
  $("#total_score").html(total);
  $( "#ten" ).hide();

 $("input").change(function (){
  console.log("change " + this.value);
  // set up validations
  // 1. Scores must be a number and between 0 and 10 for each roll.
  var error = false;
  var message = ""
  if (!$.isNumeric(this.value)) {
    error = true;
    message = "Each Score must be a number";
    alert(message);
    this.value = 0;
    return;
  }
  // Each value must be between 0 and 10 for each roll
  if (this.value < 0 || this.value > 10) {
    error = true;
    message = "Each Score must be between 0 and 10";
    alert(message);
    this.value = 0;

    return;
  }

   var frame;
   roll = $(this).attr('id');
   // Are we in the 10th Frame?
   if (roll.charAt(7) == 0) {
     frame = 10;
   } else {
     frame = parseInt(roll.charAt(6));
   }
   console.log("frame " + frame);

  if (frame == 10) {
    calculateFrame(frame);
  } else {
    // If we are the 2nd roll - we can calculate the frame total
    var element = $(this).attr('id');
    var roll = element.charAt(element.length-1);
    if (roll == "2"){
      // need to check that the value in roll 1 is non-zero and less that 10.
      if ($("#frame_" + frame.toString() + "_1").val() == "") {
        error = true;
        message = "Please enter a value for the first roll"
        alert(message);
        return;
      } else {

        calculateFrame(frame);
      }
    }
  } 

  // }
  
 });

 function calculateFrame(frame_number){ 
   if (frame_number == 10){
    if (parseInt($("#frame_" + frame_number + "_1").val()) == 10) {
      $("#ten").show();
      if ($("#frame_" + frame_number + "_2").val() == "" || $("#frame_" + frame_number + "_3").val() == ""){
        alert("please enter a value in the for all rolls in the 10th frame");
        return;
        }
        frame_total = parseInt($("#frame_" + frame_number + "_1").val()) + parseInt($("#frame_" + frame_number + "_2").val()) + parseInt($("#frame_" + frame_number + "_3").val());
    } else {
      if ($("#frame_" + frame_number + "_1").val() == "" || $("#frame_" + frame_number + "_2").val() == ""){
        alert("Please enter a value for both the 2nd roll");
        return;
      }
      frame_total = parseInt($("#frame_" + frame_number + "_1").val()) + parseInt($("#frame_" + frame_number + "_2").val());
        if (frame_total == 10){
          $("#ten").show();
          if ($("#frame_" + frame_number + "_3").val() == ""){
            alert("please enter a value for the 3rd Roll");
            return;
            }
          frame_total = frame_total + parseInt($("#frame_" + frame_number + "_3").val());
        } else {

        }
      
    }
    $("#total_" + frame_number).html(frame_total);
    total = total + frame_total;
    $("#total_score").html(total);
   } else {
    var prev_frame_total = 0;
    frame_total = parseInt($("#frame_" + frame_number + "_1").val()) + parseInt($("#frame_" + frame_number + "_2").val());
    if (frame_total > 10) {
      error = true;
      message = "Frame can only add up to 10 points";
      alert(message);
      return;
    } else {
      if (frame_total == "10"){
        $("#total_" + frame_number.toString()).html("tbd");
      } else {
        $("#total_" + frame_number.toString()).html(frame_total);
        total = total + frame_total
      }
      if (previous_frame != 0) {
        // was there a strike or spare in the previous frame?
        if ( $("#total_" + previous_frame.toString()).html() == "tbd"){
          console.log("tdb");
          if ($("#frame_" + previous_frame.toString() + "_1").val() == "10"){
            prev_frame_total = 10 + frame_total
          } else {
            prev_frame_total = 10 + parseInt($("#frame_" + frame_number + "_1").val())
          }
          $("#total_" + previous_frame.toString()).html(prev_frame_total);
          total = total + prev_frame_total
      }
        
      }
      previous_frame = frame_number;
      current_frame += 1
      console.log(current_frame);
      $("#total_score").html(total);
      
      }
      
   }
   
 }

 function reset(){
  $("input:text").val("");
  $( "#ten" ).hide();
  var previous_frame = 0;
  var current_frame = 1;
  var total = 0;
  $("#total_score").html(total);

  for (let i = 1; i < 11; i++) {
   $("#total_" + i).html("");
  }    
 }
  $("#reset").click(function(){
  reset();
});



});