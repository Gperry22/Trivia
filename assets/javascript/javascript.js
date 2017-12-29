var  currentQuestion, correct, incorrect, skipped, pickedAnswer;
var number = 25; //number of Seconds user has to reach targetScore
var intervalId; //var for the second decrement
var answer=false;
var isTimerRunning = false;

var questions= [
  {
    question: 'Areosmith and Run DMC wanted you to do what?',
    choices:  ['Walk this way','Live on a prayer','Dream on'],
    answer:   'Walk this way',
    gif:      'assets/images/aerosmith.gif',
  },
  {
    question: 'In 1975 Van McCoy ask you to do what?',
    choices:  ['Stay Alive','Move Side to Side','The Hustle'],
    answer:   'The Hustle',
    gif:      'assets/images/hustle.gif',
  },
  {
    question: 'What did Alanis Morrisette keep in her Pocket?',
    choices:  ['A Slim Jim','One Hand','A Switch Blade'],
    answer:   'One Hand',
    gif:      'assets/images/pocket.gif'
  },
  {
    question:  'You might not like PDA but Hootie and the Blowfish asked you to do something for him.',
    choices:   ['Hold my hand','Kiss him','Hug him'],
    answer:    'Hold my hand',
    gif:       'assets/images/hootie.gif'
  },
  {
    question: 'Did he do that? Yes he did. Steve Urkel wanted you to do this dance',
    choices:  ['The Urkel','The Electric Slide','The Macarena'],
    answer:   'The Urkel',
    gif:      'assets/images/urkel.gif',
  },
  {
    question: 'In 1977, Queen, said they would do what to you?',
    choices:  ['Dance the night Away','We Will Rock you','Rock you to Sleep'],
    answer:   'We Will Rock you',
    gif:      'assets/images/rockyou.gif'
  },
  {
    question: 'Kris Kross made you want to perform what type ofcalisthenics?',
    choices:  ['Strech','Push up','Jump'],
    answer:   'Jump',
    gif:      'assets/images/kriskross.gif'
  },
  {
    question: 'Journey asked you to PLEASE not do something',
    choices:  ['Living','Breathing','Believing'],
    answer:   'Believing',
    gif:      'assets/images/journey.gif'
  },
  {
    question: 'Kevin McCallister knows a cat who can really do the...',
    choices:  ['Charleston','Cool Jerk','Twist'],
    answer:   'Cool Jerk',
    gif:      'assets/images/cooljerk.gif'
  },
  {
    question: 'In 1973 Areosmith asked you to do what?',
    choices:  ['Sleep','Hold on','Dream On'],
    answer:   'Dream On',
    gif:      'assets/images/dreamon.gif'
  }
]


$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});


function newGame(){
    correct=0;
    incorrect=0;
    currentQuestion=0;
    skipped=0;
    newQuestion()
}

function newQuestion(){
      answer=false;
      $('#question').empty();
      $('#clock').removeClass("blink1");

  if (currentQuestion>= questions.length) {
      $('#question').empty();
      $('#question').append('GameOver<br><br>');
      $('#question').append("Correct: " + correct +  "<br>  Incorrect: " + incorrect +  "<br> Skipped: " + skipped + "<br>");
      $("#question").append("<button class='btn btn-primary blink' onclick='newGame()'>Play Again</button>");
      return false;
  }
  else
      runTimer()
      $('#questionPostion').text('Question # ' + (currentQuestion+1) + ' of ' + questions.length);
      $('#question').text(questions[currentQuestion].question)
  for(var i=0; i<questions[currentQuestion].choices.length; i++){
      var answerList = $('<div>');
      answerList.text(questions[currentQuestion].choices[i]);
      answerList.addClass('chooseAnswer');
      answerList.data("data-choiceValue", questions[currentQuestion].choices[i]);
      $('#question').append(answerList);
    }
  $('.chooseAnswer').on('click', function() {
        pickedAnswer = $(this).data("data-choiceValue");
        console.log(pickedAnswer);
        answer = true;
    if (answer === true) {
        checkAnswer()
      }
      });
}


function checkAnswer(){
    if (pickedAnswer === questions[currentQuestion].answer && answer === true) {
        correct++
        $('#question').empty();
        $('#question').html('Correct, The answer was "' + questions[currentQuestion].answer + '".<br><br>');
        stopClock()
        showGif()
    }
    else if (pickedAnswer != questions[currentQuestion].answer && answer === true) {
        incorrect++
        $('#question').empty();
        $('#question').html('Incorrect, The answer was "' + questions[currentQuestion].answer + '".<br><br>');
        stopClock()
        showGif()
    }
    else {
    }
}

function showGif(){
    var giphy = $('<img>');
    giphy.attr('src', questions[currentQuestion].gif);
    giphy.addClass('img-responsive');
    $('#question').append(giphy);
    setTimeout(newQuestion, 5000);
    currentQuestion++;
}


function runTimer() {
    isTimerRunning = true;
    intervalId = setInterval(decrement, 1000);
}

// decrement() decreases clock timer by -1. And sets if statment for if times runs out
function decrement() {
  if (currentQuestion < questions.length) {
        number--;
        $("#clock").html(number);
      if (number < 10) {
        $('#clock').addClass("blink1");
      }
      if (number === 0) {
        stopClock()
        skipped++
        $('#question').html('Out of Time! The answer was "' + questions[currentQuestion].answer + '".<br><br>');
        showGif()
      }
    }  else {
        $("#clock").html(" <h6><b>Game Over!</b></h6>");
  }
}

//stopClock clears the clock timer
function stopClock() {
    clearInterval(intervalId)
    isTimerRunning = false;
    number = 25
}
