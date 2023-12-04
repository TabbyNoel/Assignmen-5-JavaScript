const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const highScores = [];

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function playGame() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let numberOfTries = 0;
    let guess;

    do {
        guess = await askQuestion('Guess a number between 1 and 100: ');
        guess = parseInt(guess);
        numberOfTries++;

        if (guess > randomNumber) {
            console.log('Too high!');
        } else if (guess < randomNumber) {
            console.log('Too low!');
        }
    } while (guess !== randomNumber);

    console.log(`Congratulations! You guessed the number, and it took you ${numberOfTries} tries to guess it!`);
    let playerName;
    do {
        playerName = await askQuestion('Enter your name for the high score: ');
    } while (!playerName.trim());

    highScores.push({ name: playerName, score: numberOfTries });
}

function viewHighScores() {
    console.log('Highscores:');
    for (const highScore of highScores) {
        console.log(`${highScore.name}: ${highScore.score}`);
    }
}

async function mainMenu() {
    let choice;
    do {
        choice = await askQuestion('\nMain Menu:\n1. Play Game\n2. View Highscores\n3. Quit\nChoose an option (1, 2, or 3): ');

        switch (choice) {
            case '1':
                await playGame();
                break;
            case '2':
                viewHighScores();
                break;
            case '3':
                console.log('Goodbye! Thanks for playing!');
                break;
            default:
                console.log('Invalid choice, please try again.');
        }
    } while (choice !== '3');
}

mainMenu().then(() => rl.close());
