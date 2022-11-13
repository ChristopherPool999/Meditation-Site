"use strict"; 
const calendarFormat = (year, month) => {
    const date = month && year !== undefined ? new Date(year, month, 1) : new Date();
    const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((date.getFullYear() % 4) === 0) {
        daysInEachMonth[1] = 29;
    }

    let firstCalendarDate = date.getDate();
    let weekDay = date.getDay();

    while (firstCalendarDate !== 1) {
        weekDay > 0 ? weekDay-- : weekDay = 6;
        firstCalendarDate--;
    }

    const previousMonthDays = (month) => {
        return month > 0 ? daysInEachMonth[date.getMonth() - 1] : daysInEachMonth[11];
    }

    // first calendar date is the previous sunday to the 1st of the month. Will be last week if 1st is a sunday.
    firstCalendarDate = previousMonthDays(date.getMonth()) - (weekDay > 0 ? weekDay - 1 : 6);
    let calendarDays = [];
    while (firstCalendarDate <= previousMonthDays(date.getMonth())) {
        calendarDays.push(firstCalendarDate++);                             
    }
    firstCalendarDate = 1;
    while (firstCalendarDate <= daysInEachMonth[date.getMonth()]) {
        calendarDays.push(firstCalendarDate++);
    }
    firstCalendarDate = 1;
    while (calendarDays.length < 42) {
        calendarDays.push(firstCalendarDate++);
    }
    return [calendarDays, [date.getDate(), date.getMonth(), date.getFullYear()]];
}

export { calendarFormat };