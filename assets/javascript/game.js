/*
  1. Initialization (put wins and loses counters to 0)
  2. Start game

  Starting a game:
  1. Initialize guesses counter to 9
  2. Clear the list of guesses
  3. Pick a letter at random
  ------
  4. User presses a key
  5. if key pressed is the same, then user wins -> increase win counter, start new game
  6. else decrease guesses counter
     if guesses counter is 0, then user loses -> increase loses counter, start new game
     else add letter to guessed letter list. Go to 4   
*/

// var computerChoices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// var wins = 0;
// var losses = 0;
// var guessChoices = [];

// document.onkeyup = function(event){
//   console.log(event);

// var userGuess = event.key;

// var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
// var options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// if (options.indexOf(userGuess) > -1) {

//   if (userGuess === computerGuess) {
//     wins++;
//     numGuesses = 9;
//     guessChoices = [];
//   }

//   if (userGuess != computerGuess) {
//     numGuesses --;
//     guessChoices.push(userGuess);
//   }

//   if (numGuesses === 0) {

//   numGuesses = 9;
//   losses ++;
//   guessChoices = [];

//   var html = 
// 			"<p>Wins: " + wins + "</p>" +
// 			"<p>Losses: " + losses + "</p>" +
// 			"<p>Guesses Left: " + numGuesses + "</p>" +
// 			"<p>Your Guesses so far: " + guessChoices.join(", ") + "</p>";

// 			document.querySelector("#game").innerHTML = html;

//   }

  
// }
// }

class Game {

  constructor(numberOfWins, numberOfLosses, guessesSoFar, letter) {
    this.numberOfWins = numberOfWins;
    this.numberOfLosses = numberOfLosses;
    this.guessesSoFar = guessesSoFar;
    this.letter = letter;
  }

  get letter() {
    return this._letter;
  }

  set letter(letter) {
    if(letter == null) {
      this._letter = Game.pickRandomLetter();
    } else {
      this._letter = letter;
    }
  }

  get guessesSoFar() {
    return this._guessesSoFar;
  }

  set guessesSoFar(guessesSoFar) {
    if(guessesSoFar == null) {
      this._guessesSoFar = [];
    } else {
      this._guessesSoFar = guessesSoFar;
    }
  }

  get numberOfLosses() {
    return this._numberOfLosses;
  }

  set numberOfLosses(numberOfLosses) {
    if(numberOfLosses == null || numberOfLosses < 0) {
      this._numberOfLosses = 0;
    } else {
      this._numberOfLosses = numberOfLosses;
    }
  }

  get numberOfWins() {
    return this._numberOfWins;
  }

  set numberOfWins(numberOfWins) {
    if(numberOfWins == null || numberOfWins < 0) {
      this._numberOfWins = 0;
    } else {
      this._numberOfWins = numberOfWins;
    }
  }

  guessesLeft() {
    return 9 - this.guessesSoFar.length;
  }

  static pickRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
  }

  isValidLetter(userLetter) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(letters.indexOf(userLetter) >= 0) {
      if(this.guessesSoFar.indexOf(userLetter) === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  guess(userLetter) {
    let userLetterInCaps = userLetter.toUpperCase();
    if(!this.isValidLetter(userLetterInCaps)) {
      return this;
    } else if(userLetterInCaps === this._letter) {
      return new Game(this.numberOfWins + 1, this.numberOfLosses, [], Game.pickRandomLetter());
    } else if(this.guessesLeft() - 1 === 0) {
      return new Game(this.numberOfWins, this.numberOfLosses + 1, [], Game.pickRandomLetter());
    } else {
      return new Game(this.numberOfWins, this.numberOfLosses, this.guessesSoFar.concat([userLetterInCaps]), this.letter);
    }
  }

}

let game = new Game(0, 0, [], null);

function renderResult(wins, losses, guessesLeft, guessesSoFar) {
  document.querySelector("#game").innerHTML = 
    "<p>Wins: " + wins +"</p>" +
    "<p>Losses: " + losses + "</p>" +
    "<p>Guesses Left: " + guessesLeft + "</p>" +
    "<p>Your Guesses So Far: " + guessesSoFar + "</p>";
}

document.body.addEventListener('keydown', function (event) {
  game = game.guess(event.key);
  renderResult(game.numberOfWins, game.numberOfLosses, game.guessesLeft(), game.guessesSoFar);
});

renderResult(game.numberOfWins, game.numberOfLosses, game.guessesLeft(), game.guessesSoFar);



