$(document).ready(function() {
    $('#message').text('Hello, World!');

    function loadRandomWord() {
        $.getJSON('./Scripts/words.json', function(data) {
            const words = data.hangman_words;
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex].word;
            const randomHint = words[randomIndex].hint;
            const wordContainer = $('#word-container');
            let numOfMistakes = 0;
            

            // Create underscores for each letter
            for (let i = 0; i < randomWord.length; i++) {
                wordContainer.append('<h1 class="letter">_</h1> ');
            }

            function displayHint(){
                $('div h5').text(`Hint: ${randomHint}`);
            }

          
            function updateWordDisplay(letter) {
                $('.letter').each(function(index) {
                    if (randomWord[index] === letter) {
                        $(this).text(letter);  
                    }
                });
            }

            function addWrongLetter(letter){
                $('.gallow').append(`<h4>Incorrect attempt: ${letter}</h4>`)
            }

            function updateHangmanImage(numOfMistakes){

                $('img').attr('src', `./Images/hangman${numOfMistakes.toString()}mistakes.png`)

            }

            function setGameOver(){
                let showAnswerClicked=false;

                $('li').fadeOut();
                $('h4').fadeOut();
                $('h5').fadeOut();
                    
                    
                $('#input-container').append('<h1>Game Over</h1>')
                $('#input-container').append('<h4>You reached your limit of incorrect attempts</h4>');
                $('#input-container').append('<button>Play Again</button>');
                $('#input-container').append('<button>Show Answer</button>');
                $('#input-container').css('text-align', 'center');
                $('h1').css('color', 'red');


                $('button:first').click(function(){
                        window.location.reload();
                })

                $('button:last').click(function(){
                    if(showAnswerClicked == false){
                        $('#input-container').append(`<h5>The word was: ${randomWord}</h5>`);
                        showAnswerClicked = true;
                        $(this).text('Hide Answer');
                    }else{
                        $('h5').fadeOut();
                        $(this).text('Show Answer');
                        showAnswerClicked = false;
                    }
                })
            }

            function setVictory(){
                $('li').fadeOut();
                $('h4').fadeOut();
                $('h5').fadeOut();
                
                $('img').attr('src', './Images/hangmanwinner0.png');
                $('#input-container').append('<h1>Victory</h1>');
                $('#input-container').append('<h4>Congratulations, You have guessed the word and saved your friend!</h4>');
                $('#input-container').append('<button>Play Again</button>');
                $('#input-container').css('text-align', 'center');
                $('h1').css('color', 'Green');

                $('button').click(function(){
                    window.location.reload();
                })
            }

            displayHint();

            $("li").click(function(){
                const letter = $(this).text();
                const letterFound = randomWord.includes(letter.toLowerCase());

                updateWordDisplay(letter.toLowerCase());

                if(!letterFound){
                    numOfMistakes++;
                    addWrongLetter(letter);
                    updateHangmanImage(numOfMistakes);
                }

                if(numOfMistakes === 6){
                    setGameOver();
                }

                const wordGuessed = $('.letter').text() === randomWord;

                if(wordGuessed){
                    setVictory();
                }

                $(this).fadeOut();
                

            })


        }).fail(function() {
            console.error("An error has occurred while loading the JSON file.");
        });
    }

    loadRandomWord();
});
