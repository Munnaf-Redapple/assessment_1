let time = require('../libs/timeLib');
const timeZone = 'Asia/Calcutta';
let cron = require('node-cron');


//Function cron job
let schedulers = {};

let destroySchedule = (id) => {
    console.log(`destroying schedule : ${id}`);
    let task = schedulers[`${id}`];
    task.destroy();
}

let stopSchedule = (id) => {
    console.log(`stopping schedule : ${id}`);
    let task = schedulers[`${id}`];
    task.stop();
}

let setSchedule = (id, end_time, cb) => {
    try {
        let dayofWeek = time.getDay(end_time);
        let formatDate = time.convertToLocalTime(end_time);
        let formatDateArr = formatDate.split(' ');
        let dateArr = formatDateArr[0].split('-');
        let timeArr = formatDateArr[1].split(':');

        let cronstr = `${parseInt(timeArr[2])} ${parseInt(timeArr[1])} ${parseInt(timeArr[0])} ${parseInt(dateArr[0])} ${parseInt(dateArr[1])} ${parseInt(dayofWeek)}`;

        console.log(`CronSTR : ${cronstr} | TimeZone : ${timeZone} | isValidCron : ${cron.validate(cronstr)}`);

        let task = cron.schedule(cronstr, cb, {
            scheduled: false,
            timezone: timeZone
        });
        schedulers[`${id}`] = task;
        console.log('starting task scheduler!!');
        task.start();
    } catch (err) {
        console.log('ERRPR : ', err);
    }
};


let getScheduledList = () => {
    let tasks = cron.getTasks();
    return tasks;
}

module.exports = {
    destroySchedule: destroySchedule,
    stopSchedule: stopSchedule,
    setSchedule: setSchedule,
    getScheduledList: getScheduledList
}