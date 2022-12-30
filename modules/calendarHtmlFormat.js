"use strict"
var createCalendarHtml = () => {
    document.querySelector(".simple__calendar").innerHTML = `
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

export { createCalendarHtml };