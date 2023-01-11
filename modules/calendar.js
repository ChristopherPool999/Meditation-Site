"use strict"; 
const simpleCalendar = function() {

    let displayedDate = new Date();
    const todaysDate = [displayedDate.getDate(), displayedDate.getMonth(), displayedDate.getFullYear()];
    let displayedMonth = todaysDate[1];
    let displayedYear = todaysDate[2];

    var isLeapYear = () => {
        return (displayedYear % 4) === 0;
    }
    var getDaysInMonth = () => {
        return isLeapYear() ?
            [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] :
            [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    var getPreviousMonthDays = () => {
        return displayedMonth > 0 ? getDaysInMonth()[displayedMonth - 1] : 
                getDaysInMonth()[11];
    }
    var getFirstGridDate = () => {
        // first date in calendar is the previous sunday to the 1st of the month.
        let daysBefore1st = displayedDate.getDay() > 0 ? displayedDate.getDay() : 7;
        return getPreviousMonthDays() - daysBefore1st + 1;
    }
    var getGridFormat = () => {
        let calendarDate = getFirstGridDate();
        const daysInGridFormat = [];

        while (calendarDate <= getPreviousMonthDays()) {
            daysInGridFormat.push(calendarDate++);                             
        }
        calendarDate = 1;
        while (calendarDate <= getDaysInMonth()[displayedMonth]) {
            daysInGridFormat.push(calendarDate++);
        }
        calendarDate = 1;
        while (daysInGridFormat.length < 42) {
            daysInGridFormat.push(calendarDate++);
        }
        return daysInGridFormat;
    }
    var isCurrentDay = day => {
        return getGridFormat()[day] === todaysDate[0] 
                && displayedMonth === todaysDate[1] 
                && displayedYear === todaysDate[2];
    }
    var toggleIscurrentMonth = (status, day) => {
        return getGridFormat()[day] === 1 ? !status : status;
    }
    var styleMonthColor = (isTodaysMonth, calendar, day) => {
        isTodaysMonth ? calendar[day].style.color = "white" : 
                calendar[day].style.color = "rgb(154, 154, 154)"
    }
    var changeStyleIfToday = (isTodaysMonth, calendar, day) => {
        if (isTodaysMonth && isCurrentDay(day)) { 
            calendar[day].classList.toggle("today");
        } else if (isTodaysMonth && calendar[day].classList[1] === "today") {
            calendar[day].classList.toggle("today");
        }
    }
    var updateDates = grid => {
        let isCurrentMonth = false;
        for (let i = 0; i < getGridFormat().length; i++) {
            grid[i].innerHTML = getGridFormat()[i];
            isCurrentMonth = toggleIscurrentMonth(isCurrentMonth, i);
            styleMonthColor(isCurrentMonth, grid, i);
            changeStyleIfToday(isCurrentMonth, grid, i);
        }
    }
    var getMonthNames = () => {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
                "October", "November", "December"];
    }
    var updateHeader = monthElement => {
        displayedYear === todaysDate[2] ? 
                monthElement.innerHTML = getMonthNames()[displayedMonth] : 
                monthElement.innerHTML = [getMonthNames()[displayedMonth], displayedYear].join(" ");
        displayedMonth === todaysDate[1] && displayedYear === todaysDate[2] ? 
                monthElement.style.color = "white" : 
                monthElement.style.color = "grey";
    }
    var changeToPreviousMonth = () => {
        if (displayedMonth <= 0) {
            displayedMonth = 11;
            displayedYear--;
        } else if (displayedMonth > 0) {
            displayedMonth--;
        }
        updateCalendarUI();
    }
    var changeToNextMonth = () => {
        if (displayedMonth >= 11) {
            displayedMonth = 0;
            displayedYear++;
        } else if (displayedMonth < 11) {
            displayedMonth++;
        }
        updateCalendarUI();
    }
    var addCalendarHandlers = () => {
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
    var updateCalendarUI = () => {
        displayedDate.setFullYear(displayedYear, displayedMonth, 1);
        const calendarCopy = document.createDocumentFragment();
        const oldCalendar = document.querySelector(".simple__calendar");
        calendarCopy.appendChild(oldCalendar.cloneNode(true));

        const calendarGridCopy = calendarCopy.querySelectorAll(".calendar__dates");
        const monthNameCopy = calendarCopy.querySelector(".calendar__month");
        updateHeader(monthNameCopy);
        updateDates(calendarGridCopy);
        document.body.replaceChild(calendarCopy, oldCalendar);
        addCalendarHandlers();
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
        updateCalendarUI();
    }
}

export { simpleCalendar };