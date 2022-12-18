"use strict"; 
import { createCalendarHtml } from "./calendarHtmlFormat.js";
const simpleCalendar = function() {

    createCalendarHtml();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
            "October", "November", "December"];
    const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let selectedDate = new Date();
    const todaysDate = [selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear()];
    let selectedMonth = todaysDate[1];
    let selectedYear = todaysDate[2];
    updateCalendar();

    function updateCalendar() {
        const calendarNode = document.querySelector(".simple__calendar__container");
        const calendarCopy = document.createDocumentFragment();
        calendarCopy.appendChild(calendarNode.cloneNode(true));
        const calendarGrid = calendarCopy.querySelectorAll(".calendar__dates");
        const monthName = calendarCopy.querySelector(".calendar__month");

        updateMonth(monthName);
        updateDates(calendarGrid);
        document.body.replaceChild(calendarCopy, document.querySelector(".simple__calendar__container"));
    }
    function getCalendarFormat() {
        selectedDate.setFullYear(selectedYear, selectedMonth, 1);
        if ((selectedYear % 4) === 0) {
            daysInEachMonth[1] = 29;
        }
        // first calendar date is the previous sunday to the 1st of the month. Will be last week if 1st is a sunday.
        let calendarDate = previousMonthDays() - (selectedDate.getDay() > 0 ? selectedDate.getDay() - 1 : 6);
        const calendarDaysFormat = [];
        while (calendarDate <= previousMonthDays(selectedMonth)) {
            calendarDaysFormat.push(calendarDate++);                             
        }
        calendarDate = 1;
        while (calendarDate <= daysInEachMonth[selectedMonth]) {
            calendarDaysFormat.push(calendarDate++);
        }
        calendarDate = 1;
        while (calendarDaysFormat.length < 42) {
            calendarDaysFormat.push(calendarDate++);
        }
        return calendarDaysFormat;
    }
    function previousMonthDays() {
        return selectedMonth > 0 ? daysInEachMonth[selectedMonth - 1] : daysInEachMonth[11];
    }
    function updateMonth(monthElement) {
        monthElement.innerHTML = (selectedYear === todaysDate[2]) ? 
                monthNames[selectedMonth] : [monthNames[selectedMonth], selectedYear].join(" ");
        (selectedMonth === todaysDate[1] && selectedYear === todaysDate[2]) ? 
                monthElement.style.color = "white" : monthElement.style.color = "grey";
    }
    function updateDates(grid) {
        let isCurrentMonth = false;
        const calendarDays = getCalendarFormat();
        for (let i = 0; i < 42; i++) {
            grid[i].innerHTML = calendarDays[i];
            if (calendarDays[i] === 1) {
                isCurrentMonth = !isCurrentMonth;
            }
            isCurrentMonth ? grid[i].style.color = "white" : grid[i].style.color = "rgb(154, 154, 154)";
            if (isCurrentMonth) {
                if (calendarDays[i] === todaysDate[0] && selectedMonth === todaysDate[1] 
                            && selectedYear === todaysDate[2] ) { 
                    grid[i].classList.toggle("today");
                } else if (grid[i].classList[1] === "today") {
                    grid[i].classList.toggle("today");
                }
            }
        }
    }
    this.previousMonth = () => {
        if (selectedMonth <= 0) {
            selectedMonth = 11;
            selectedYear--;
        } else if (selectedMonth > 0) {
            selectedMonth--;
        }
        updateCalendar();
    }
    this.nextMonth = () => {
        if (selectedMonth >= 11) {
            selectedMonth = 0;
            selectedYear++;
        } else if (selectedMonth < 11) {
            selectedMonth++;
        }
        updateCalendar();
    }
}

export { simpleCalendar };