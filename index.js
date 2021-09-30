$(document).ready(function() {
    var startGame = function () {

        var count = 10;
        var timerStart = 1;
        var playerScore = 0;
    
        var countdown = function () {
            var counter = setInterval(timer, 1000);
            function timer () {
                count = count - 1;
                if (count === 0) {
                    var restart = confirm('Game Over!\nYour Score is: ' + playerScore + '\nWould you like to play again?')
                    while (restart === true) {
                        startGame();
                        } 
                    clearInterval(counter);
                    return;
                }
                $('#timer').text(count);
            }   
        }
    
        var randomNumber = function () {
            return Math.floor((Math.random() * 10) + 1);
        }
    
        var questionGenerator = function () {
            var question = {};
            var num1 = randomNumber();
            var num2 = randomNumber();
            
            question.answer = num1 + num2;
            question.equation = num1 + " + " + num2;
            return question;
        }
    
        var createNewQuestion = function () {
            questionGenerator();
            currentQuestion = questionGenerator();
            console.log(currentQuestion);
            $('#equation').text(currentQuestion.equation);  
        }
        createNewQuestion();
    
        var checkAnswer = function (answerInput, answer) {
            if (answerInput === answer) {
                count += 1;
                playerScore += 1;
                createNewQuestion();
                $('#timer').text(count);
                $('#score').text('Player Score: ' + playerScore)
                $('#answerInput').val('');
                console.log('Correct');
            } else {
                console.log(answerInput);
                console.log('Wrong!');
            }
          };
    
        var restartGame = function () {
                count += 10;
                timerStart += 1;
                playerScore = 0;
                createNewQuestion();
                $('#score').text('Player Score: ' + playerScore)
                $('#timer').text(count);
                $('#answerInput').val('');
        }
    
        $('#answerInput').on('keyup', function(answerInput, answer) {
            if (timerStart === 1) {
                timerStart -= 1;
                countdown(); 
            }
            checkAnswer(Number($(this).val()), currentQuestion.answer);
        });
    }
    
    startGame();
   
});
