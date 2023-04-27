// show the current time
const currentTime = document.getElementById('h1');
const audio = new Audio('Project/mixkit-rooster-crowing-in-the-morning-2462.wav');
audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

const upcomingAlarmList = document.getElementById('upcoming-alarms-list');
const addAlarm = document.querySelector('.setAlarm');

// Store all the alarms in alarmlist
const alarmList = []; 

// Playing the alarm and show the alert message
function ring(realTime) {
    audio.play();
    alert(`It's ${realTime}`);
}

// Show the current time
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours() % 12);
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const realTime = `${hour}:${minutes}:${seconds}`;

    currentTime.innerText = `${hour}:${minutes}:${seconds}`;

    //     Here we check the alarmList includes the current time
    //     if yes, then ring method is called
    if (alarmList.includes(realTime)) {
        ring(realTime);
    }
}

// If the number is less than 10 then append 0 before the number.
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// Stop the currently playing alarm
function stopAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
}

// removes the alarm from the upcoming-alarms-list when user click on "Delete Alarm" button
upcomingAlarmList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
});

// removes the alarm from the alarmList array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;
    alarmList.push.apply(alarmList, newList);
}


// Adds newAlarm to the upcoming-alarms-list as a new list item
function addNewAlarm(newAlarm) {
    const html = 
    `<li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    upcomingAlarmList.innerHTML += html
};


// Set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', event => {

    event.preventDefault(); // to prevent default behaviour of webpage

    let hour = formatTime(addAlarm.hr.value);
    if (hour === '0') {
        hour = '00'
    }
    let minute = formatTime(addAlarm.min.value);
    if (minute === '0') {
        minute = '00'
    }
    let second = formatTime(addAlarm.sec.value);
    if (second === '0') {
        second = '00'
    }

    const newAlarm = `${hour}:${minute}:${second}`

    // add newAlarm to alarmList array
    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm)) {
            alarmList.push(newAlarm);
            addNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})

// updateTime() method call every second
setInterval(updateTime, 1000);
