var number = 30; //number of Seconds user has to reach targetScore
var intervalId; //var for the second decrement
var isTimerRunning = false;
var answerNotChosen = false;
var nextButton = false;
var position = 0;
var question = 0;
var testPostion, testQues, chA, chB, chC, choice, choices;
var correct = 0;
var incorrect = 0;
var choice;
var array;
var questions = [
  ['Areosmith and Run DMC wanted you to do what?', 'Walk this way.', 'Live on a prayer.', 'Dream on.', 'A', 'assets/images/aerosmith.gif'],
  ['In 1975 Van McCoy ask you to do what?', 'Stay Alive', 'Move Side to Side', 'The Hustle', 'C', 'assets/images/hustle.gif'],
  ['What did Alanis Morrisette keep in her Pocket?', 'A Slim Jim', 'On Hand', 'A Switch Blade', 'B', 'assets/images/pocket.gif'],
  ['You might not like PDA but Hootie and the Blowfish asked you to do something for him.', 'Hold my hand', 'Kiss him', 'Hug him', 'A', 'assets/images/hootie.gif'],
  ['Did he do that? Yes he did. Steve Urkel wanted you to do this dance', 'The Urkel', 'The Electric Slide', 'The Macarena', 'A', 'assets/images/urkel.gif'],
  ['In 1977, Queen, said they would do what to you?', 'Dance the night Away', 'We will Rock you', 'Rock you to Sleep', 'B', 'assets/images/rockyou.gif'],
  ['Kris Kross made you want to perform what type ofcalisthenics?', 'Stretch', 'Push Up', 'Jump', 'C', 'assets/images/kriskross.gif'],
  ['Journey asked you to PLEASE not do something', 'Living', 'Breathing', 'Believing', 'C', 'assets/images/journey.gif'],
  ['Kevin McCallister knows a cat who can really do the...', 'Charleston', 'Cool Jerk', 'Twist', 'B', 'assets/images/cooljerk.gif'],
  ['In 1973 Areosmith asked you to do what?', 'Sleep', 'Hold on', 'Dream On', 'C', 'assets/images/dreamon.gif']
];


writeToDOM()
renderQuestion()
runTimer()



function renderQuestion() {
          nextBtn_Remove()
          winMessageAndGif()
          rmClass()

          if (position >= questions.length) {
            $('#testPosition').text('You got ' + correct + ' of ' + questions.length + " questions correct.")
            $('#testQues').text("Test completed")
            $('#show-number').html(" <b>Game Over!</b>");
            return false;
          }

      $('#testPosition').text('Question ' + (position + 1) + ' of ' + questions.length);
      question = questions[position][0];
      chA = questions[position][1];
      chB = questions[position][2];
      chC = questions[position][3];
      $('#testQues').html(question + "<br><br>");
      $("#testQues").append("<input type='radio' name='choices' value='A'>  " + chA + "<br>");
      $("#testQues").append("<input type='radio' name='choices' value='B'>  " + chB + "<br>");
      $("#testQues").append("<input type='radio' name='choices' value='C'>  " + chC + "<br><br>");
      $("#submitButton").append("<button class='button' onclick='checkAnswer()'>Submit</button>");
      emptyNotChecked()
}





///////////////////////Functions defined Below///////////////////
function checkAnswer() {
  choices = document.getElementsByName("choices");
        if (choices[0].checked || choices[1].checked || choices[2].checked) {
          for (var i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
              choice = choices[i].value;
            }
          }
    if (questions[position][4] === choice) {
          correct++;
          $("#correct").addClass("blink3");
          $("#correct").text("Correct " + correct);
          $("#winLosemessage").text("Correct!!!");
          $("#gif").append("<img src=\"" + questions[position][5] + "\">");
          submit_BtnRemove_NextBtn_Add()
          stopClock()
    }
    else if (questions[position][4] != choice) {
          incorrect++
          $("#incorrect").addClass("blink3");
          $("#incorrect").text("Incorrect " + incorrect);
          $("#winLosemessage").text("Better Luck Next Time...");
          $("#gif").append("<img src=\"" + questions[position][5] + "\">");
          stopClock()
          submit_BtnRemove_NextBtn_Add()
    }
    else {
          pleaseChooseAnAnswer()
    }
  }
}


function submit_BtnRemove_NextBtn_Add() {
  $('#submitButton').empty();
  if (nextButton === false) {
    nextButton = true;
    $("#submitButton").append("<button class='button' onclick='next_Question_And_Postion()'>Next</button>");
  }
}

function nextBtn_Remove() {
  $('#submitButton').empty();
  nextButton = false
}

function next_Question_And_Postion() {
  position++
  renderQuestion()
  stopClock()
  runTimer()
  decrement()
}

//Warning to Answer and empty Answer Not Checked in DOM
function pleaseChooseAnAnswer() {
  if (answerNotChosen === false) {
    answerNotChosen = true;
    var warning = $("<p>Please choose an Answer</p>");
    $('#notChecked').append(warning)
  }
}

//Warning to Answer and empty Answer Not Checked in DOM
function emptyNotChecked() {
  $('#notChecked').empty();
  answerNotChosen = false;
}

function winMessageAndGif() {
  $('#winLosemessage').empty();
  $('#gif').empty();
}

function runTimer() {
  isTimerRunning = true;
  intervalId = setInterval(decrement, 1000);
}

// decrement() decreases clock timer by -1. And sets if statment for if times runs out
function decrement() {
  if (position < questions.length) {
    number--;
    $("#show-number").html(number + " <h6><b>Seconds Left to answer...</b></h6>");
    if (number < 10) {
      $('#show-number').addClass("blink1");
    }
    if (number === 0) {
      stopClock()
      submit_BtnRemove_NextBtn_Add()
      incorrect++
      $("#incorrect").addClass("blink3");
      $("#incorrect").text("Incorrect " + incorrect);
      $("#winLosemessage").text("Better Luck Next Time...");
      $("#gif").append("<img src=\"" + questions[position][5] + "\">");
    }
  } else {
    $("#show-number").html(" <h6><b>Game Over!</b></h6>");
  }
}

//stopClock clears the clock timer
function stopClock() {
  clearInterval(intervalId)
  isTimerRunning = false;
  number = 30
}

function rmClass() {
  $('#show-number').removeClass("blink1");
  $("#correct").removeClass("blink3");
  $("#incorrect").removeClass("blink3");
}

function endOfGame() {
  $('#testPosition').text('You got ' + correct + ' of ' + questions.length + " questions correct.")
  $('#testQues').text("Test completed")
  $('#show-number').html(" <b>Game Over!</b>");
  return false;
}

function writeToDOM() {
  $('#show-number').html(number + " <b>seconds Left to reach the Target Score!</b>");
  $("#correct").text("Correct " + correct);
  $("#incorrect").text("Incorrect " + incorrect);
}
