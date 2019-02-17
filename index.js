var Word = require("./word.js");
var inquirer = require("inquirer");


var wordList = ["CANADA", "UNITED STATES", "MEXICO", "GUATEMALA", "NICARAGUA", "EL SALVADOR",
    "COSTA RICA", "BELIZE", "HONDURAS", "PANAMA", "BRAZIL", "VENEZUELA", "ARGENTINA",
    "CHILE", "COLOMBIA", "PERU", "ECUADOR", "BOLIVIA", "URUGUAY", "PARAGUAY", "GUYANA",
    "FRENCH GUIANA", "SURINAME"];

var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

function startGame() {
    if (wordList.length < 2) {
        wordList = ["CANADA", "UNITED STATES", "MEXICO", "GUATEMALA", "NICARAGUA", "EL SALVADOR",
            "COSTA RICA", "BELIZE", "HONDURAS", "PANAMA", "BRAZIL", "VENEZUELA", "ARGENTINA",
            "CHILE", "COLOMBIA", "PERU", "ECUADOR", "BOLIVIA", "URUGUAY", "PARAGUAY", "GUYANA",
            "FRENCH GUIANA", "SURINAME"];
    }
    select = Math.floor(Math.random() * wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord); 
        gameWord.createWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\n You have 10 tries to find the country in the Western Hemisphere.\n");
    promptUser();

    function promptUser() {
        if (counter < 10) {
            console.log(gameWord.showWord());
            inquirer.prompt({
                type: "input",
                name: "letter",
                message: "\nChoose a letter and press Enter. "

            }).then(function (data) {
                checkAnswer(data);
            });
        }
        else {
            console.log('\nToo bad! You ran out of guesses! \n');
            console.log(chosenWord);
            chosenWord = "";
            gameWord = "";
            select = 0;
            counter = 0;
            startGame();

        }
    }
    function checkAnswer(data) {
        if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
            var checkLetter = data.letter.toUpperCase();
            var temp = gameWord.showWord();
            gameWord.checkGuess(checkLetter);
            if (temp === gameWord.showWord()) {
                console.log("\nWrong letter! Try again!\n");
                counter++;
                console.log(((10 - counter) + " guesses remaining"));
                promptUser();

            }
            else {
                rightGuess();
            }
        }
        else {
            console.log("\nPlease enter a letter, ONE AT A TIME!\n");
            promptUser();
        }
    } 
    function rightGuess() {
        console.log("\n You guessed right! Good job!\n");
        if (chosenWord.replace(/ /g, "") == (gameWord.showWord()).replace(/ /g, "")) {
            console.log(gameWord.showWord());
            console.log("Holy crap! You win! Way to go!");
            chosenWord = "";
            gameWord = "";
            select = 0;
            counter = 0;
            startGame();
        }
        else {
            promptUser();
        }
    }
}
    startGame();

