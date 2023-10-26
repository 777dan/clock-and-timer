function rotateClockHands() {
  const hourHand = document.getElementById("hour-hand");
  const minuteHand = document.getElementById("minute-hand");
  const secondHand = document.getElementById("second-hand");

  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDegrees = (360 / 12) * (hours + minutes / 60);
  const minuteDegrees = (360 / 60) * (minutes + seconds / 60);
  const secondDegrees = (360 / 60) * seconds;

  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;
}

setInterval(rotateClockHands, 1000);
rotateClockHands();


const startButton = document.getElementById("start-timer");
const stopButton = document.getElementById("stop-timer");
const resetButton = document.getElementById("reset-timer");
const timerHours = document.getElementById("timer-hours");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const timerDisplay = document.getElementById("timer-display");

let timerInterval;
let hoursRemaining = 0;
let minutesRemaining = 0;
let secondsRemaining = 0;

function updateTimerDisplay() {
  timerDisplay.value = `${String(hoursRemaining).padStart(2, "0")}:${String(minutesRemaining).padStart(2, "0")}:${String(secondsRemaining).padStart(2, "0")}`;
}

function startTimer() {
  hoursRemaining = parseInt(timerHours.value, 10);
  minutesRemaining = parseInt(timerMinutes.value, 10);
  secondsRemaining = parseInt(timerSeconds.value, 10);

  updateTimerDisplay();

  timerInterval = setInterval(function () {
    if (hoursRemaining === 0 && minutesRemaining === 0 && secondsRemaining === 0) {
      clearInterval(timerInterval);
      timerDisplay.value = "Time is up!";
    } else {
      if (secondsRemaining === 0) {
        if (minutesRemaining === 0) {
          hoursRemaining--;
          minutesRemaining = 59;
        } else {
          minutesRemaining--;
        }
        secondsRemaining = 59;
      } else {
        secondsRemaining--;
      }
      updateTimerDisplay();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  hoursRemaining = 0;
  minutesRemaining = 0;
  secondsRemaining = 0;
  timerHours.value = 0;
  timerMinutes.value = 0;
  timerSeconds.value = 0;
  updateTimerDisplay();
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", () => clearInterval(timerInterval));
resetButton.addEventListener("click", resetTimer);

