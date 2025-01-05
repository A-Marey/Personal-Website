$(document).ready(function () {
    var stopwatchRunning = false;
    var stopwatchSeconds = 0;
    var stopwatchInterval;

    var alarmSet = false;
    var alarmHour = 0;
    var alarmMinute = 0;

    $("#startStopBtn").on("click", function () {
        if (stopwatchRunning) {
            stopStopwatch();
        } else {
            startStopwatch();
        }
    });

    $("#resetBtn").on("click", function () {
        resetStopwatch();
    });

    $("#setAlarmBtn").on("click", function () {
        setAlarm();
    });

    setInterval(function () {
        updateClock();
        updateStopwatch();
        checkAlarm();
    }, 1000);

    function startStopwatch() {
        stopwatchRunning = true;
        $("#startStopBtn").text("Stop");
        stopwatchInterval = setInterval(function () {
            stopwatchSeconds++;
            updateStopwatch();
            checkAlarm();
        }, 1000);
    }

    function stopStopwatch() {
        stopwatchRunning = false;
        $("#startStopBtn").text("Start");
        clearInterval(stopwatchInterval);
    }

    function resetStopwatch() {
        stopwatchRunning = false;
        stopwatchSeconds = 0;
        $("#startStopBtn").text("Start");
        updateStopwatch();
    }

    function updateStopwatch() {
        var stopwatchHours = Math.floor(stopwatchSeconds / 3600);
        var stopwatchMinutes = Math.floor((stopwatchSeconds % 3600) / 60);
        var stopwatchSecs = stopwatchSeconds % 60;

        var stopwatchText = formatTime(stopwatchHours, stopwatchMinutes, stopwatchSecs);
        $("#stopwatch").text(stopwatchText);
    }

    function setAlarm() {
        alarmHour = parseInt(prompt("Enter the hour for the alarm (0-23):"), 10);
        alarmMinute = parseInt(prompt("Enter the minute for the alarm (0-59):"), 10);

        if (isNaN(alarmHour) || isNaN(alarmMinute) || alarmHour < 0 || alarmHour > 23 || alarmMinute < 0 || alarmMinute > 59) {
            alert("Invalid input. Please enter valid hours and minutes.");
            alarmSet = false;
        } else {
            alarmSet = true;
            alert("Alarm set for " + padNumber(alarmHour) + ":" + padNumber(alarmMinute));
        }
    }

    function checkAlarm() {
        if (alarmSet) {
            var now = new Date();
            var currentHour = now.getHours();
            var currentMinute = now.getMinutes();

            if (currentHour === alarmHour && currentMinute === alarmMinute) {
                alert("Alarm! It's " + padNumber(alarmHour) + ":" + padNumber(alarmMinute));
                resetAlarm();
            }
        }
    }

    function resetAlarm() {
        alarmSet = false;
        alarmHour = 0;
        alarmMinute = 0;
    }

    function updateClock() {
        var now = new Date();

        var seconds = now.getSeconds();
        var sdegree = seconds * 6;
        var srotate = "rotate(" + sdegree + "deg)";
        $("#sec").css({ "transform": srotate });

        var mins = now.getMinutes();
        var mdegree = mins * 6;
        var mrotate = "rotate(" + mdegree + "deg)";
        $("#min").css({ "transform": mrotate });

        var hours = now.getHours();
        var minsForHour = mins / 2;
        var hdegree = hours * 30 + minsForHour;
        var hrotate = "rotate(" + hdegree + "deg)";
        $("#hour").css({ "transform": hrotate });
    }

    function formatTime(hours, mins, seconds) {
        return padNumber(hours) + ":" + padNumber(mins) + ":" + padNumber(seconds);
    }

    function padNumber(number) {
        return (number < 10 ? "0" : "") + number;
    }
});
