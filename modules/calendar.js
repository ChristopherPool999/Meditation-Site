// logic

// have a year to store all user meditation data
// if e.g 2021 doesnt exist dont map any information
// if 2022 does exist then map information.
// have array in side 2022 object, for time meditated
// dynamically create each month (e.g when user clicks next month)
// map the data we already have

// when dynamically creating each month
// should be able to make some math equation 
// to figure out which day is the 1st of the month
// leap year makes it 1 day ahead


const calendar = function() {
    this.year = 2022;
    this.firstWeekdayByMonth = [7, 3, 3, 6, 1, 4, 6, 2, 5, 7, 3, 5]; // 1 = sunday. 2 = monday. 3 = tuesday...
    this.daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.month = 11;

    this.nextFirstWeekday = () => {
        if (++this.month < 13) {
            return this.firstWeekdayByMonth[this.month - 1];
        } 
        this.month = 1;
        this.year++;
        if (this.year % 4 !== 0) { // not a leap year
            for (let i = 0; i < 12; i++) {
                this.firstWeekdayByMonth[i] < 7 ? this.firstWeekdayByMonth[i] += 1 : this.firstWeekdayByMonth[i] = 1;
            }
        } else {
            for (let i = 0; i < 12; i++) { // is a leap year
                if (i <= 1) {
                    this.firstWeekdayByMonth[i] < 7 ? this.firstWeekdayByMonth[i] += 1 : this.firstWeekdayByMonth[i] = 1;
                } 
                if (i > 1) {
                    if (i < 6) {
                        this.firstWeekdayByMonth[i] += 2;
                    }
                    if (i === 6) {
                        this.firstWeekdayByMonth[i] = 1;
                    }
                    if (i === 7) {
                        this.firstWeekdayByMonth[i] = 2;
                    } 
                }
            }
        }
        return this.firstWeekdayByMonth[this.month - 1];
    }
}

let foo = new calendar();

for (let i = 0; i < 36; i++) {
    console.log(foo.nextFirstWeekday());
    console.log(foo.month);
    console.log(foo.year);
    console.log("------------------");   
}