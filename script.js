let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');

let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let numClosedDoors = 3;
let currentlyPlaying = true;

let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';

let openDoor1;
let openDoor2;
let openDoor3;

let startButton = document.getElementById('start');
let resultDisplay = document.getElementById('result');

let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const randomChoreDoorGenerator = () => {
  choreDoor = Math.floor(Math.random() * numClosedDoors);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor1 = botDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 2:
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 3:
      openDoor2 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 4:
      openDoor3 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      break;
    case 5:
      openDoor3 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor2 = beachDoorPath;
      break;
  }
}

const isBot = (door) => {
  console.log(door.src);
  console.log(botDoorPath);
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
}

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver('lose');
  }
}

door1.onclick = () => {
  if (!isClicked(door1) && currentlyPlaying) {
    door1.src = openDoor1;
  playDoor(door1);
  }
}
door2.onclick = () => {
  if (!isClicked(door2) && currentlyPlaying) {
    door2.src = openDoor2;
  playDoor(door2);
  }
}
door3.onclick = () => {
  if (!isClicked(door3) && currentlyPlaying) {
  door3.src = openDoor3;
  playDoor(door3);
  }
}

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
  toggleButton();
}

let startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
	currentlyPlaying = true;
  randomChoreDoorGenerator();
}

const toggleButton = () => {
  let x = document.getElementById('start');
  if (x.style.visibility === 'hidden') {
    x.style.visibility = 'visible';
  }else {
    x.style.visibility = 'hidden';
    resultDisplay.innerHTML = '&nbsp;';
  }
}

const gameOver = (status) => {
  if (status === 'win') {
    resultDisplay.innerHTML = 'You win! Play again?';
    getYourScore();
  } else {
    resultDisplay.innerHTML = 'Game over! Play again?';
    score = 0;
    currentStreak.innerHTML = score;
  }
  toggleButton();
  currentlyPlaying = false;
}

const getYourScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
}

startRound();
