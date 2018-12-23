var questions = [
    // make each question an object holding the question and four answers
    {
        // make a question property and an array of the answers
        question: 'Who is the main character of The Witcher III?',
        answers: ['Geralt of Rivia', 'Kratos', 'Nathan Drake', 'Super Mario']
    },
    {
        question:'What is the NFL record for most passing touchdowns in a season?',
        answers: ['49','55','50','63']
    },
    {
        question:'What is the name of the regional manager of Dunder Mifflin (Scranton Branch)?',
        answers: ['Dwight Schrute','Leslie Knope','Jim Halper','Michael Scott']
    },
   {
        question:'In what year did America gain its independence from Great Britain?',
        answers: ['1590','1886','1776','1973']
    },
    {
        question:'What are the components of water?',
        answers: ['CO2','H20','02','H2SO4']
    },

   {
        question: 'What is the square root of 20,736?...cubed',
        answers: ['2,985,984','144','20,736','429,981,696']
    }
]
$('.correctAnswer').hide();//hide the correctAnswer
$('.answerImage').hide();//hide the gif

//write a function that calls the question and its four answers
function writeQuestion(arr) {
    $('.question, #answer1, #answer3, #answer4, #answer2').show();
    $('.question').html("<p>" + arr.question + "</p>");
    $('#answer1').html("<p>" + arr.answers[3] + "</p>");
    $('#answer3').html("<p>" + arr.answers[1] + "</p>");
    $('#answer4').html("<p>" + arr.answers[0] + "</p>");
    $('#answer2').html("<p>" + arr.answers[2] + "</p>");
    startTime();
}

//when you click the div the game will start
$('h2').on('click', function() {
    writeQuestion(questions[0]);
});


// create a timer set maxTime to 20
var maxTime = 10;
var intervalId;

function startTime() {
    $('.timeRemaining').append('Time Remaining: ' + timer)
    clearInterval(intervalId);
    intervalId=setInterval(decrement, 1000);
}
//and display it on the page with the question and its answers
function decrement () {
    $(".timeRemaining").html("<h2>Time Remaining: " + maxTime + "</h2>"); 
    maxTime--;
    if (maxTime === -1) {
        timeOut();
        maxTime=10;
    }
}
var unanswered=0;
// if timer runs out run time out function
function timeOut() {
    $('.correctAnswer').show();//show the correctAnswer
    $('.answerImage').show();//show the gif
    $('.correctAnswer').append('<p>' + 'OUT OF TIME!' + '</p>')
    $('.answerImage').append('<img src="assets/images/out_of_time.gif" alt="no more time" width="300px: height="300"/>');
    $('.question, #answer1, #answer3, #answer4, #answer2').hide();
    $('.question, #answer1, #answer3, #answer4, #answer2').empty();
    clearInterval(intervalId);
    setTimeout(nextQuestion, 2000);
    unanswered++;
}

function resetTimer() {
    maxTime=10;
}
//make a function that can move the game to the next question
var questionIndex=1;
function nextQuestion() {
    $('.correctAnswer').hide();//hide the correctAnswer
    $('.answerImage').hide();//hide the gif
    $('.correctAnswer').empty()
    $('.answerImage').empty();
    $('.question, #answer1, #answer3, #answer4, #answer2').show();
    startTime();
    writeQuestion(questions[questionIndex]);
    questionIndex++;
};
var correctAnswers = [  
    questions[0].answers[0],
    questions[1].answers[1],
    questions[2].answers[3],
    questions[3].answers[2],
    questions[4].answers[1],
    questions[5].answers[0]
] //figure out how to recognize a member of this array
console.log(correctAnswers)
var correct=0;
var wrong=0;
//define the correct answers
$(".answer").on('click', function() {
    console.log('hi');
   console.log(this)
    if(correctAnswers.indexOf($(this).val()) > 0) {
        
        correct++;
        $('.answerImage').show();//show the gif
        $('.answerImage').append('<img src="assets/images/correct_answer.gif" alt="no more time" width="300px: height="300"/>');
        console.log()
        setTimeout(nextQuestion, 2000);
    }else {
        wrong++;
        console.log('wrong')
    }
    
});
//set correct answer and wrong answer total to zero
// var correct=0;
// var wrong=0;
// var answer=false
// $('.answer').on('click', correctAnswerDetector);
// function correctAnswerDetector() {
//     questionOne.answers[0]=true;
//     questionTwo.answers[1]=true;
//     questionThree.answers[3]=true;
//     questionFour.answers[2]=true;
//     questionFive.answers[1]=true;
//     questionSix.answers[0]=true;
//     if(answer=true) {
//         //if the answer is correct
//         correct++;
//         $('.answerImage').show();//show the gif
//         $('.answerImage').append('<img src="assets/images/correct_answer.gif" alt="no more time" width="300px: height="300"/>');

//         setTimeout(nextQuestion, 5000);
//     }
//     else {
//         //if the answer is wrong
//         wrong++;
//         $('.correctAnswer').show();//show the correctAnswer
//         $('.answerImage').show();//show the gif
//         $('.correctAnswer').append('<p>' + correctAnswer + '</p>')
//         $('.answerImage').append('<img src="assets/images/wrong_answer.gif" alt="no more time" width="300px: height="300"/>');
//     }
// }
// create a wrong answer/timeout function //clear wrong answers // make it display correct answer  //display a gameover gif  //set timer to move to next question

// create a correct answer function //clear wrong answers //show right answer  //make it display a correct answer gif //set timer to move to next question

// create an end game function that provides stats for the game and provides an option to start over