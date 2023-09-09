const daysDisplay = document.getElementById("days");
const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const restartButton = document.getElementById("restart");

let countdownInterval;
let remainingTime = 0;
let initialDuration = 0;

function updateDisplay(days, hours, minutes, seconds) {
  daysDisplay.textContent = days.toString().padStart(2, "0");
  hoursDisplay.textContent = hours.toString().padStart(2, "0");
  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function startTimer(duration) {
  clearInterval(countdownInterval);

  initialDuration = duration;

  const startTime = Date.now();
  const endTime = startTime + duration * 1000;

  countdownInterval = setInterval(() => {
    const currentTime = Date.now();
    remainingTime = Math.max(0, endTime - currentTime);

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    updateDisplay(days, hours, minutes, seconds);

    if (remainingTime === 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

startButton.addEventListener("click", () => {
  const minutes = parseInt(prompt("Enter minutes:"));
  if (!isNaN(minutes)) {
    startTimer(minutes * 60);
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(countdownInterval);
});

resetButton.addEventListener("click", () => {
  clearInterval(countdownInterval);
  updateDisplay(0, 0, 0, 0);
  remainingTime = 0;
  initialDuration = 0;
});

restartButton.addEventListener("click", () => {
  startTimer(initialDuration);
});
