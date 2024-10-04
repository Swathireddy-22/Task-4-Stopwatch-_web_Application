let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 10);
        running = true;
        toggleButtons(true);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, length = 2) {
    return String(number).padStart(length, '0');
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        toggleButtons(false);
    }
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00.00";
    lapsList.innerHTML = '';
    toggleButtons(false);
    lapCounter = 0;
}

function lapTimer() {
    if (running) {
        lapCounter++;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${display.innerHTML}`;
        lapsList.appendChild(lapItem);
    }
}

function toggleButtons(isRunning) {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning;
    resetBtn.disabled = !isRunning && difference === 0;
    lapBtn.disabled = !isRunning;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
