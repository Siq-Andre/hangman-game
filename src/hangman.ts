export class hangman{

    private secretWord: string;
    private guessedLetters: string[];
    private errors: number;
    private userAnswer: string;
    private win: boolean;
    private lose: boolean;

    constructor(){
        this.secretWord = this.chooseSecretWord();
        this.guessedLetters = [];
        this.errors = 0;
        this.userAnswer = '#'.repeat(this.secretWord.length);
        this.win = false;
        this.lose = false;
    }

    getSecretWord(): string{
        return this.secretWord;
    }

    getGuessedLetters(): string[]{
        return this.guessedLetters;
    }

    getErrors(): number{
        return this.errors;
    }

    getUserAnswer(): string{
        return this.userAnswer;
    }

    getWin(): boolean{
        return this.win;
    }

    getLose(): boolean{
        return this.lose;
    }

    allPossibleWords(): string[]{
        var possibleWords = [
            "html",
            "css",
            "javascript",
            "python",
            "sql",
            "database",
            "react",
            "frontend",
            "backend",
            "java",
            "angular",
            "node",
            "express",
            "mongodb",
            "typescript",
            "bootstrap",
            "github",
            "function",
            "object",
            "class",
            "string",
            "framework",
            "code",
            "computer",
            "server",
            "script",
            "firewall",
            "terminal",
            "windows",
            "linux",
            "memory",
            "while",
            "else",
            "switch",
            "array",
            "internet"
        ];

        return possibleWords;
    }

    chooseSecretWord(): string{
        var possibleWords = this.allPossibleWords();
        var index = Math.floor(Math.random() * possibleWords.length);
        return possibleWords[index];
    }

    gameResult(): void{
        var maxErrorsAllowed: number = 5;
        if (this.userAnswer === this.secretWord){
            this.win = true;
        }
        else if (this.errors > maxErrorsAllowed){
            this.lose = true;
        }
    }

    checkUsedLetter(letter: string): boolean{
        if(this.guessedLetters.includes(letter)){
            alert(`The letter ${letter} has already been used`);
            return false;
        }

        this.guessedLetters.push(letter);
        return true;
    }

    addLetterToSecretWord(letter: string): void{
        let userAnswerHelper = '';
    
                for (let i = 0; i < this.secretWord.length; i++) {
                    if (this.secretWord[i] === letter) {
                        userAnswerHelper += letter;
                    } else {
                        userAnswerHelper += this.userAnswer[i];
                    }
                }
                this.userAnswer = userAnswerHelper;
    }

    guessLetter(guess: string): void{
        const letter = guess.toLowerCase();
        
        if (this.checkUsedLetter(letter)){
            if((this.secretWord.indexOf(letter)) == -1){
                this.errors = this.errors + 1;
            } 
            
            else {
                this.addLetterToSecretWord(letter);                
            }
    
            this.gameResult();
        }       
        
    }
}