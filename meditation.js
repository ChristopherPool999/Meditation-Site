"use strict";   
import { stopwatch } from "./modules/stopwatch.js";
import { calendar } from "./modules/calendar.js";

(() => {
    let calendarGrid = document.querySelectorAll(".calendar__dates");
    let monthName = document.querySelector(".calendar__month"); 
    const mainCalendar = new calendar(calendarGrid, monthName);
    mainCalendar.changeCalendar();

    document.addEventListener("click", event => {
        if (event.target.id === "last__month" || event.target.id === "last__month__bar") {
            mainCalendar.previousMonth();
            mainCalendar.changeCalendar();
        }
        if (event.target.id === "next__month" || event.target.id === "next__month__bar") {
            mainCalendar.nextMonth();
            mainCalendar.changeCalendar();
        }
    })
})();

(() => {
    const clockInterface = document.querySelectorAll(".time");
    const interfaceContainer = document.querySelector(".timer").classList; 
    const playButtonIcon = document.querySelector(".play__button__icon").classList;
    const mainClock = new stopwatch(clockInterface, playButtonIcon); // can start the search for a node from another querySelector to improve performance do this after fixing other shit lul
    document.addEventListener("keydown", input => {
        if (!isNaN(parseInt(input.key))) {
            mainClock.add(input.key);
        }
        else if (input.code === "Backspace") {
            mainClock.clear();
        }
        else if (input.code === "Space") {
            mainClock.pause();
        }
        else if (input.key === "Enter") {
            mainClock.start(interfaceContainer);
        }
    })

    document.addEventListener("click", event => {
        if (event.target.classList[0] === "play__button__icon" || event.target.classList[0]
                === "play__button__icon__highlight") {
            !mainClock.isActive ? mainClock.start(interfaceContainer) 
                    : mainClock.pause();
        }
    })

    mainClock.onTimerEnd = () => {
        let audio = new Audio("./images_sound/alarm.mp3");
        audio.play();
        playButtonIcon.toggle("active");
    }
})();

document.addEventListener("click", event => {
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