import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"

const startBtn = document.querySelector("[data-start]");
startBtn.disabled = true;
startBtn.classList.add('js-main-button')

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

const myInput = document.querySelector(".myInput");
const fp = flatpickr(myInput, {
    locale: Ukrainian,
    enable: [
        {
            from: 'today', 
            to: '2050-12-31'
        }],
    enableTime: true,
    allowInput: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            return Notiflix.Report.failure('error', 'oберіть валідну дату!');
        }
        startBtn.classList.remove('js-main-button')
        startBtn.disabled = false;
    },
});

function updateTimer() {
    const currentDate = new Date();
    const selectedDate = fp.selectedDates[0];

    const totalSeconds = Math.floor(((selectedDate.getTime() - currentDate.getTime()) / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');

    if (totalSeconds === 0) {
        myInput.disabled = false;
        myInput.classList.remove('js-main-button')
        clearInterval(timerId);
        return;
    };
}
let timerId ;

startBtn.addEventListener("click", () => {
    timerId = setInterval(updateTimer, 1000);
    myInput.disabled = true;
    myInput.classList.add('js-main-button')
    startBtn.disabled = true;
    startBtn.classList.add('js-main-button')
});