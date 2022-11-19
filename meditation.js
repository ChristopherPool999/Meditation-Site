"use strict";   
import { stopwatch } from "./modules/stopwatch.js";
import { calendar } from "./modules/calendar.js";

(() => {
    const mainCalendar = new calendar();
    let calendarGrid = document.querySelectorAll(".calendar__dates");
    let monthName = document.querySelector(".calendar__month"); 
    mainCalendar.changeCalendar(calendarGrid, monthName);

    document.addEventListener("click", function(event) {
        if (event.target.id === "last__month" || event.target.id === "last__month__bar") {
            mainCalendar.previousMonth();
            mainCalendar.changeCalendar(calendarGrid, monthName);
        }
        if (event.target.id === "next__month" || event.target.id === "next__month__bar") {
            mainCalendar.nextMonth();
            mainCalendar.changeCalendar(calendarGrid, monthName);
        }
    })
})();

(() => {
    const mainClock = new stopwatch(); // can start the search for a node from another querySelector to improve performance do this after fixing other shit lul
    const clockInterface = document.querySelectorAll(".time");
    const interfaceContainer = document.querySelector(".timer").classList;
    const playButtonIcon = document.querySelector(".play__button__icon").classList;

    document.addEventListener("keydown", function(input) {
        if (!isNaN(parseInt(input.key))) {
            console.log(123);
            mainClock.addToInterface(input.key, clockInterface);
        }
        else if (input.code === "Backspace") {
            mainClock.clearInterface(clockInterface, playButtonIcon);
        }
        else if (input === "Space") {
            mainClock.pauseInterface(playButtonIcon);
        }
        else if (input === "Enter") {
            mainClock.startTimerInterface(interfaceContainer, playButtonIcon);
        }
    })

    document.addEventListener("click", function(event) {
        if (event.target.classList[0] === "play__button__icon" || event.target.classList[0]
                === "play__button__icon__highlight") {
            !mainClock.isActive ? mainClock.startTimerInterface(interfaceContainer, playButtonIcon) 
                    : mainClock.pauseInterface(playButtonIcon);
        }
    })

    mainClock.onTimerEnd = () => {
        let audio = new Audio("./images_sound/alarm.mp3");
        audio.play();
        playButtonIcon.toggle("active");
    }
})();

document.addEventListener("click", function(event) {
    const navbarMenu = document.querySelector("#navbar__menu").classList;
    const mobileDropdown = document.querySelector(".navbar__toggle").classList;

    if (event.target.classList[0] === "bar" || event.target.classList[0] === "navbar__toggle" || 
                event.target.classList[0] === "navbar__toggle__highlight") {
        navbarMenu.toggle("active");
        mobileDropdown.toggle("active");
    }
    else if (navbarMenu[0] === "active" && event.target.classList[0] !== "tabs") {
        navbarMenu.toggle("active");
        mobileDropdown.toggle("active");
    }
})

// add calendar and tracking
// implement log data button
// cookies to save user information
// options for music played at end
// cover time with animated curtain
// functionality for FAQ, login, about
// light dark mode

// make responsive
// make it better looking --- look into UX design and other timer designs 