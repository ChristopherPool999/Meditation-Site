"use strict"; 
const calendar = function() {
    let date = new Date();
    const todaysDate = [date.getDate(), date.getMonth(), date.getFullYear()];

    let month = todaysDate[1];
    let year = todaysDate[2];
    let calendarFormat;
    
    let formatCalendar = () => {
        date = new Date(year, month);
        const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((year % 4) === 0) {
            daysInEachMonth[1] = 29;
        }
    
        const previousMonthDays = () => {
            return month > 0 ? daysInEachMonth[month - 1] : daysInEachMonth[11];
        }
        // first calendar date is the previous sunday to the 1st of the month. Will be last week if 1st is a sunday.
        let calendarDate = previousMonthDays() - (date.getDay() > 0 ? date.getDay() - 1 : 6);

        let calendarDaysFormat = [];
        while (calendarDate <= previousMonthDays(month)) {
            calendarDaysFormat.push(calendarDate++);                             
        }
        calendarDate = 1;
        while (calendarDate <= daysInEachMonth[month]) {
            calendarDaysFormat.push(calendarDate++);
        }
        calendarDate = 1;
        while (calendarDaysFormat.length < 42) {
            calendarDaysFormat.push(calendarDate++);
        }
        calendarFormat = calendarDaysFormat;
    }
    formatCalendar();    

    this.changeCalendar = (calendarGrid, monthName) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
                "October", "November", "December"];
        monthName.innerHTML = year === todaysDate[2] ? [monthNames[month]].join(" ") 
                : [monthNames[month], year].join(" ");
        month === todaysDate[1] && year === todaysDate[2] ? monthName.style.color = "white" 
                : monthName.style.color = "grey";


        let isCurrentMonth = false;
        for (let i = 0; i < 42; i++) {
            calendarGrid[i].innerHTML = calendarFormat[i];
            if (calendarFormat[i] === 1) {
                isCurrentMonth = !isCurrentMonth;
            }
            isCurrentMonth ? calendarGrid[i].style.color = "white" : calendarGrid[i].style.color = "rgb(154, 154, 154)";
            if (isCurrentMonth && calendarFormat[i] === todaysDate[0] && year === todaysDate[2] && month === todaysDate[1]) { 
                calendarGrid[i].classList.toggle("today");
            } else if (calendarGrid[i].classList[1] === "today") {
                calendarGrid[i].classList.toggle("today");
            }
        }
    }

    this.previousMonth = () => {
        if (month <= 0) {
            month = 11;
            year--;
        } else if (month > 0) {
            month--;
        }
        formatCalendar();
    }

    this.nextMonth = () => {
        if (month >= 11) {
            month = 0;
            year++;
        } else if (month < 11) {
            month++;
        }
        formatCalendar();
    }
}

export { calendar };