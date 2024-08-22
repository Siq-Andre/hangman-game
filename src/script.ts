import { hangman } from "./hangman.js";

let game: hangman;

(window as any).newGame = function(){
    game = new hangman();
    updateDisplay();
    resetGame();
    
}

document.getElementById("hangman__game")?.addEventListener("submit", function(event) {
    event.preventDefault(); 

    var letterInput = document.getElementById("letterInput") as HTMLInputElement;
    var letter = letterInput.value;

    game.guessLetter(letter);

    updateDisplay();

    gameResult();

    letterInput.value = '';
});

document.getElementById("resetButton")?.addEventListener("click", function() {      
    (window as any).newGame(); 
});

function resetGame(): void {
    var sendButton = document.getElementById("sendButton") as HTMLElement;
    var letterInput = document.getElementById("letterInput") as HTMLInputElement;
    var allPossibleWords = document.getElementById("allPossibleWords") as HTMLElement;
    var buttonForAllPossibleWords = document.getElementById("buttonForAllPossibleWords") as HTMLElement;
    var title = document.getElementById("title") as HTMLElement;

    sendButton.style.display = 'inline';
    letterInput.disabled = false;
    allPossibleWords.style.display = "none";
    buttonForAllPossibleWords.style.display = "inline";
    title.textContent = "try to guess the secret word";
}

function updateDisplay(): void {
    var secretWord = document.getElementById("secretWord") as HTMLElement;
    var usedLetters = document.getElementById("usedLetters") as HTMLElement;
    secretWord.textContent = `Secret Word: ${game.getUserAnswer()}`;
    usedLetters.textContent = `Already used letters: ${game.getGuessedLetters()}`;
    updateGallow();
}

function updateGallow(): void {
    const gameImage = document.getElementById("game_img") as HTMLImageElement;
    switch (game.getErrors()){
        case 0:
            gameImage.src = "./img/empty_gallow.jpg";
            break;
        case 1:
            gameImage.src = "./img/head.jpg";
            break;
        case 2:
            gameImage.src = "./img/torso.jpg";
            break;
        case 3:
            gameImage.src = "./img/arm1.jpg";
            break;
        case 4:
            gameImage.src = "./img/arm2.jpg";
            break;
        case 5:
            gameImage.src = "./img/leg1.jpg";
            break;
        case 6:
            gameImage.src = "./img/leg2.jpg";
            break;          
        

    }
}

document.getElementById("buttonForAllPossibleWords")?.addEventListener("click", function(){
    var allPossibleWords = document.getElementById("allPossibleWords") as HTMLElement;
    var buttonForAllPossibleWords = document.getElementById("buttonForAllPossibleWords") as HTMLInputElement;

    allPossibleWords.style.display = "inline";
    allPossibleWords.textContent = displayAllWords();
    buttonForAllPossibleWords.style.display = "none";
})

function displayAllWords(): string{
    var allWords = game.allPossibleWords();
    var allWordsDisplay = '';
    for (let word of allWords){
        allWordsDisplay += word + ', ';
    }

    return allWordsDisplay;
}

function gameResult(): void{
    var title = document.getElementById("title") as HTMLElement;
    var letterInput = document.getElementById("letterInput") as HTMLInputElement;
    var sendButton = document.getElementById("sendButton") as HTMLInputElement;

    if(game.getWin()){
        title.textContent = "Game Won! Congratulations";
        letterInput.disabled = true;
        sendButton.style.display = 'none';
    }

    if(game.getLose()){
        title.textContent = "Game over! Better luck next time";
        letterInput.disabled = true;
        sendButton.style.display = 'none';
    }
}
