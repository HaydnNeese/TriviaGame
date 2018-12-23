var correct = 0;
var wrong=0;
var unanswered=0;
var timer=10;
var questionIndex = 0;
var answerIndex=0;
var userAns = [];
var questions = [
    // make each question an object holding the question and three wrong answers and one correct answer
    {
        // make a question property and an array of the answers
        class: 'question1',
        question: 'Who is the main character of The Witcher III?',
        answers: ['Geralt of Rivia', 'Kratos', 'Nathan Drake', 'Super Mario'],
        correctAnswer: 0
    },
    {
        class: 'question2',
        question:'What is the NFL record for most passing touchdowns in a season?',
        answers: ['49','55','50','63'],
        correctAnswer: 1
    },
    {
        class: 'question3',
        question:'What is the name of the regional manager of Dunder Mifflin (Scranton Branch)?',
        answers: ['Dwight Schrute','Leslie Knope','Jim Halper','Michael Scott'],
        correctAnswer: 3
    },
   {
        class: 'question4',
        question:'In what year did America gain its independence from Great Britain?',
        answers: ['1590','1886','1776','1973'],
        correctAnswer: 2
    },
    {
        class: 'question5',
        question:'What are the components of water?',
        answers: ['CO2','H20','02','H2SO4'],
        correctAnswer: 1
    },

   {
        class: 'question6',
        question: 'What is the square root of 20,736?...cubed',
        answers: ['2,985,984','144','20,736','429,981,696'],
        correctAnswer: 0
    }
]

function restartGame() {
    document.location.reload();
}

$('resultsScene').hide();
function detectEndGame() {
    currentQuestion = questions[questionIndex];
    if (currentQuestion.class === 'question6') {
        resultsPage();
        $('button').on('click', function() {
            restartGame();
        })
        return;
    }
    else {
        
    }
    
    console.log(currentQuestion.class);
}

//get started click function
$('h2').on('click', function() {
    writeQuestion(questions[questionIndex]);// run write question function
    writeAnswers(questions[questionIndex].answers) //run write answer function
    $('h2').hide();//hide the click to get started element
    startTime(); //run start time function
});
//write question to page
function writeQuestion(currentQuestion) {
    var questionDiv = $("<div>");//make a div to hold question
    questionDiv.addClass("triviaQuestion");//add class
    questionDiv.attr("data-name", currentQuestion.class);// add data attribute name
    questionDiv.text(currentQuestion.question);//apply specific question to div
    $('.question').append(questionDiv);//put questionDiv to the html div with the class question
}

function writeAnswers(arr) {
    for (var i = 0; i < arr.length; i++) {//run a the code through a loop
        var answerDiv = $("<p>");//create p tag
        answerDiv.addClass("triviaAnswer");//add class
        answerDiv.attr("data-name", 'option')
        answerDiv.text(arr[i]);//put the info into the page
        $('.answers').append(answerDiv);//insert the p tag with its content to the page inside the div with the answers class
    }   
}

var intervalId;

function startTime() {
    clearInterval(intervalId);//clear out setInterval definition
    intervalId=setInterval(decrement, 1000);//use the decrement function to make time decrease by 1 each second
}
//and display it on the page with the question and its answers
function decrement () {
    $(".timeRemaining").html("<h2>Time Remaining: " + timer + "</h2>");//write time remaining to page
    timer--;//decrement timer down by 1
    if (timer === -1) {// if timer runs out
        timeOut();//run timeout function
        timer=10; //reset timer to 10
    }
}
//make timeout function that sends a time out message and image after the timer hits zero
function timeOut() {
    $('.questionScene').hide();
    $('.correctAnswer').show();//show the correctAnswer
    $('.answerImage').show();//show the gif
    $('.correctAnswer').append('<p>' + 'OUT OF TIME!' + '</p>')//write text to screen
    $('.answerImage').append('<img src="assets/images/out_of_time.gif" alt="no more time" width="300px: height="300"/>'); //write image to screen
    clearInterval(intervalId); //clear interval previously set so that it doesnt stack
    setTimeout(nextQuestion, 1500); //run next question function after 2 seconds
    unanswered++;//increase unanswered question stats by 1
    // console.log(unanswered);
}
function resetTimer() {
    timer=10;
    startTime();
}
//make a function that will write the next question to the page
function nextQuestion() {
    detectEndGame();
    $('.question').empty();//empty previous question
    $('.answers').empty();//empty previous answers
    $('.correctAnswer').hide();//hide the correctAnswer
    $('.answerImage').hide();//hide the gif
    $('.correctAnswer').empty();//remove the previous text so it doesnt have multiple the next time the function runs
    $('.answerImage').empty();//remove the previous image so it doesnt have multiple the next time the function runs
    $('.questionScene').show();//reveal the questionScene again
    questionIndex++;//move to the next object in the questions array
    writeQuestion(questions[questionIndex]); //run write question function
    writeAnswers(questions[questionIndex].answers) //run answer question function
    resetTimer();
  
};


//write a function to detect the correct answer being clicked

$(document).on('click', '.triviaAnswer', function() {
    correctAnswerDetector();
});

function correctAnswerDetector() {
    currentQuestion=questions[questionIndex];//define currentQuestion
   
    var answerText = $(event.target).text();
    if(answerText === currentQuestion.answers[currentQuestion.correctAnswer]) {//if correct answer is clicked
        // console.log('correct');
        $('.questionScene').hide();
        $('.correctAnswer').show();//show the correctAnswer
        $('.answerImage').show();//show the gif
        $('.correctAnswer').append(answerText);
        $('.answerImage').append('<img src="assets/images/correct_answer.gif" alt="no more time" width="300px: height="300"/>')
        setTimeout(nextQuestion, 1500);//setTImeout for nextQuestion function to 1.5 seconds
        clearInterval(intervalId); //clear interval previously set so that it doesnt stack
        correct++;//increase correct var by 1
    }
    else {//if incorrect
        console.log('wrong');
        $('.questionScene').hide();
        $('.correctAnswer').show();//show the correctAnswer
        $('.answerImage').show();//show the gif
        //append correct answer and gif!
        $('.correctAnswer').append("Correct Answer: " + currentQuestion.answers[currentQuestion.correctAnswer]);
        $('.answerImage').append('<img src="assets/images/wrong_answer.gif" alt="no more time" width="300px: height="300"/>')
        setTimeout(nextQuestion, 1500);//setTImeout for nextQuestion function to 1.5 seconds
        clearInterval(intervalId); //clear interval previously set so that it doesnt stack
        wrong++;//increase wrong var by 1
    }
}


function resultsPage() {
    $('.questionScene').hide();
    $('.correctAnswer').hide();
    $('.answerImage').hide();
    $('.timeRemaining').hide();
    var correctAnswerDiv = $('<div>');
    correctAnswerDiv.addClass('correct');
    correctAnswerDiv.text('Total Correct: ' + correct);
    $('.resultsScene').append(correctAnswerDiv);
    var wrongAnswerDiv = $('<div>');
    wrongAnswerDiv.addClass('wrong');
    wrongAnswerDiv.text('Total Wrong: ' + wrong);
    $('.resultsScene').append(wrongAnswerDiv);
    var unansweredAnswerDiv = $('<div>');
    unansweredAnswerDiv.addClass('unanswered');
    unansweredAnswerDiv.text('Total Unanswered: ' + unanswered);
    $('.resultsScene').append(unansweredAnswerDiv);
    var restartButton = $('<button>');
    restartButton.addClass('restart');
    restartButton.text('RESTART');
    $('.resultsScene').append(restartButton);
    $('.resultsScene').show();
}




//if questionIndex equals 5
//run the resultPage function
//reveal a restart button

//make resultPage function

//make restartGame function