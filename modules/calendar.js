"use strict"; 
const calendar = function() {
    let date = new Date();

    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.todaysDate = [date.getDate(), this.month, this.year];

    this.formatMonthDays = () => {
        const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((this.year % 4) === 0) {
            daysInEachMonth[1] = 29;
        }
        
        let calendarDayDate = this.todaysDate[0];
        let weekDayOfFirst = date.getDay();
        if (this.month !== this.todaysDate[1] && this.year !== this.todaysDate[2]) {
            let newDate = new Date(this.month, this.year);
            calendarDayDate = newDate.getDate();
            weekDayOfFirst = newDate.getDay();
        }
    
        while (calendarDayDate !== 1) {
            weekDayOfFirst > 0 ? weekDayOfFirst-- : weekDayOfFirst = 6;
            calendarDayDate--;
        }
    
        const previousMonthDays = () => {
            return this.month > 0 ? daysInEachMonth[this.month - 1] : daysInEachMonth[11];
        }
    
        // first calendar date is the previous sunday to the 1st of the month. Will be last week if 1st is a sunday.
        calendarDayDate = previousMonthDays() - (weekDayOfFirst > 0 ? weekDayOfFirst - 1 : 6);
        let calendarDaysFormat = [];
        while (calendarDayDate <= previousMonthDays(this.month)) {
            calendarDaysFormat.push(calendarDayDate++);                             
        }
        calendarDayDate = 1;
        while (calendarDayDate <= daysInEachMonth[this.month]) {
            calendarDaysFormat.push(calendarDayDate++);
        }
        calendarDayDate = 1;
        while (calendarDaysFormat.length < 42) {
            calendarDaysFormat.push(calendarDayDate++);
        }
        this.format = calendarDaysFormat;
    }
    this.formatMonthDays();    

    this.calendarHeader = () => {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
                "October", "November", "December"];
        return this.year === this.todaysDate[2] ? [monthNames[this.month]] : [monthNames[this.month], this.year];
        
    }

    this.previousMonth = () => {
        if (this.month <= 0) {
            this.month = 11;
            this.year--;
        } else if (this.month > 0) {
            this.month--;
        }
        this.formatMonthDays();
    }

    this.nextMonth = () => {
        if (this.month >= 11) {
            this.month = 0;
            this.year++;
        } else if (this.month < 11) {
            this.month++;
        }
        this.formatMonthDays();
    }
}

export { calendar };