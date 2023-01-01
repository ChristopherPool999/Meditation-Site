"use strict"; 
const simpleCalendar = function() {

    let displayedDate = new Date();
    const todaysDate = [displayedDate.getDate(), displayedDate.getMonth(), displayedDate.getFullYear()];
    let displayedMonth = todaysDate[1];
    let displayedYear = todaysDate[2];

    var getCalendarFormat = () => {
        const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        displayedDate.setFullYear(displayedYear, displayedMonth, 1);
        if ((displayedYear % 4) === 0) {
            daysInEachMonth[1] = 29;
        }
        // first calendar date is the previous sunday to the 1st of the month. Will be a week behind from 1st if 1st is a sunday.
        const previousMonthDays = displayedMonth > 0 ? daysInEachMonth[displayedMonth - 1] : daysInEachMonth[11];
        let calendarDaysBefore1st = displayedDate.getDay() > 0 ? displayedDate.getDay() - 1 : 6;
        let calendarDate = previousMonthDays - calendarDaysBefore1st;
        const calendarDaysFormat = [];

        while (calendarDate <= previousMonthDays) {
            calendarDaysFormat.push(calendarDate++);                             
        }
        calendarDate = 1;
        while (calendarDate <= daysInEachMonth[displayedMonth]) {
            calendarDaysFormat.push(calendarDate++);
        }
        calendarDate = 1;
        while (calendarDaysFormat.length < 42) {
            calendarDaysFormat.push(calendarDate++);
        }
        return calendarDaysFormat;
    }
    var updateDates = grid => {
        let isCurrentMonth = false;
        const calendarDays = getCalendarFormat();
        for (let i = 0; i < 42; i++) {
            const isCurrentDay = calendarDays[i] === todaysDate[0] && displayedMonth === todaysDate[1] 
                    && displayedYear === todaysDate[2];
            grid[i].innerHTML = calendarDays[i];
            if (calendarDays[i] === 1) {
                isCurrentMonth = !isCurrentMonth;
            }
            if (isCurrentMonth) {
                if (isCurrentDay) { 
                    grid[i].classList.toggle("today");
                } else if (grid[i].classList[1] === "today") {
                    grid[i].classList.toggle("today");
                }
            }
            isCurrentMonth ? grid[i].style.color = "white" : grid[i].style.color = "rgb(154, 154, 154)";
        }
    }
    var updateHeader = monthElement => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
                "October", "November", "December"];

        monthElement.innerHTML = (displayedYear === todaysDate[2]) ? 
                monthNames[displayedMonth] : [monthNames[displayedMonth], displayedYear].join(" ");
        displayedMonth === todaysDate[1] && displayedYear === todaysDate[2] ? 
                monthElement.style.color = "white" : monthElement.style.color = "grey";
    }
    var changeToPreviousMonth = () => {
        if (displayedMonth <= 0) {
            displayedMonth = 11;
            displayedYear--;
        } else if (displayedMonth > 0) {
            displayedMonth--;
        }
        updateCalendarInterface();
    }
    var changeToNextMonth = () => {
        if (displayedMonth >= 11) {
            displayedMonth = 0;
            displayedYear++;
        } else if (displayedMonth < 11) {
            displayedMonth++;
        }
        updateCalendarInterface();
    }
    var newCalendarFragment = () => {
        const calendarNode = document.querySelector(".simple__calendar");
        const calendarCopy = document.createDocumentFragment();
        calendarCopy.appendChild(calendarNode.cloneNode(true));

        const calendarGrid = calendarCopy.querySelectorAll(".calendar__dates");
        const monthName = calendarCopy.querySelector(".calendar__month");
        updateHeader(monthName);
        updateDates(calendarGrid);
        return calendarCopy;
    }
    var updateCalendarInterface = () => {
        const calendarNode = document.querySelector(".simple__calendar");
        const updatedNode = newCalendarFragment();
        document.body.replaceChild(updatedNode, calendarNode);

        const calendarHeader = document.querySelector(".calendar__header");
        calendarHeader.addEventListener("click", event => {
            if (event.target.id === "last__month" || event.target.id === "last__month__bar") {
                changeToPreviousMonth();
            }
            if (event.target.id === "next__month" || event.target.id === "next__month__bar") {
                changeToNextMonth();
            }
        });
    }
    var getCalendarHtml = () => {
        return `
            <div class="calendar__container">
                <div class="calendar__header">
                    <div class="change__month__button" id="last__month">
                        <span class="arrow__bar" id="last__month__bar"></span>
                        <span class="arrow__bar" id="last__month__bar"></span>
                    </div>
                    <div class="calendar__month__container">
                        <span class="calendar__month">November</span>
                    </div>
                    <div class="change__month__button" id="next__month">
                        <span class="arrow__bar" id="next__month__bar"></span>
                        <span class="arrow__bar" id="next__month__bar"></span>
                    </div>
                </div>
                <div class="calendar">
                    <span class="daysOfTheWeek">S</span><span class="daysOfTheWeek">M</span> 
                    <span class="daysOfTheWeek">T</span><span class="daysOfTheWeek">W</span> 
                    <span class="daysOfTheWeek">T</span><span class="daysOfTheWeek">F</span>
                    <span class="daysOfTheWeek">S</span>  
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                    <span class="calendar__dates"></span><span class="calendar__dates"></span><span class="calendar__dates"></span>
                </div>
            </div>`;
    }
    this.createCalendar = () => {
        document.querySelector(".simple__calendar").innerHTML = getCalendarHtml();
        updateCalendarInterface();
    }
}

export { simpleCalendar };