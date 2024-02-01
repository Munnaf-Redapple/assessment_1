const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = process.env.TIME_ZONE

let now = () => {
    return moment.utc().format()
}
let currentTimeStamp = () => {
    return moment.utc().unix();
}

let currentDayStart = () => {
    return moment.utc().startOf('day').unix();
}
let convertToTimeStamp = (time) => {
    return moment(time).utc().unix()
}

let getLocalTime = () => {
    return moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
}

let getDay = (time) => {
    return moment(time).tz(timeZone).day();
}

let convertToLocalTime = (time) => {
    return momenttz.tz(time, timeZone).format('DD-MM-YYYY HH:mm:ss')
}

let convertToLocalDate = (time) => {
    return momenttz.tz(time, timeZone).format('YYYY-MM-DD')
}

let formatDate = (date) => {
    return moment(date).utc().format('DD-MM-YYYY HH:mm:ss')
}

let formatDateTime = (datetime) => {
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss')
}

let calculateTime = (diff) => {
    const diffDuration = moment.duration(diff);
    return {
        days: diffDuration.days(),
        hours: diffDuration.hours(),
        minutes: diffDuration.minutes(),
        seconds: diffDuration.seconds()
    }
}

let calculateTimeDiff = (firstdatetime, seconddatetime) => {
    const diff = moment(seconddatetime, "YYYY-MM-DD HH:mm:ss").diff(moment(firstdatetime, "YYYY-MM-DD HH:mm:ss"));
    return diff;
}

let currentDateTime = () => {
    return moment().format('DD/MM/YYYY HH:mm:ss')
}

let dateFormat = (datetime) => {
    return moment(datetime).format('DD/MM/YYYY HH:mm:ss')
}

let twentyFourHoursTimeFormat = (time) => {
    let momentObj = moment(time, ["h:mm A"]);
    //  console.log(momentObj.format("HH:mm:ss"));
    return momentObj.format("HH:mm:ss")
}

let calculateExpTime = (time) => {
    let finaldatetime = moment().add(time, 's');
    return momenttz.tz(finaldatetime, timeZone).unix();
}

let calculateTrackerTime = (input) => {
    let initialdatetime = moment(getLocalTime());
    let finaldatetime = moment(input);
    console.log(`input : ${input} initialdatetime : ${initialdatetime} finaldatetime : ${finaldatetime}`);
    let counter = finaldatetime.diff(initialdatetime, 'seconds');
    return counter;
}

let checkExpTime = (time) => {
    let current_time = moment().tz(timeZone).unix();
    let diff = time - current_time;
    if (diff > 0) {
        return true;
    } else {
        return false;
    }
}


let addTime = (extratime) => {
    let oldDateObj = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
    let newDateObj = moment(oldDateObj).add(extratime, 'm').toDate();
    return newDateObj;
}
module.exports = {
    now: now,
    getLocalTime: getLocalTime,
    convertToLocalTime: convertToLocalTime,
    formatDate: formatDate,
    formatDateTime: formatDateTime,
    calculateTime: calculateTime,
    currentDateTime: currentDateTime,
    dateFormat: dateFormat,
    twentyFourHoursTimeFormat: twentyFourHoursTimeFormat,
    calculateExpTime: calculateExpTime,
    calculateTimeDiff: calculateTimeDiff,
    convertToLocalDate: convertToLocalDate,
    calculateTrackerTime: calculateTrackerTime,
    checkExpTime: checkExpTime,
    currentDayStart: currentDayStart,
    currentTimeStamp: currentTimeStamp,
    convertToTimeStamp: convertToTimeStamp,
    getDay: getDay,
    addTime: addTime
}