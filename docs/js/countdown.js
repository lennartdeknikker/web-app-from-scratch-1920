const Countdown = {
timer: 0,
init: function(launchDate) {  
  clearInterval(this.timer);
  this.startCountdown(launchDate);
},
startCountdown: function (compareDate) {

  this.timer = setInterval(function() {
    timeBetweenDates(compareDate);
  }, 1000);
  
  function timeBetweenDates(toDate) {
    let dateEntered = toDate;
    let now = new Date();
    let difference = dateEntered.getTime() - now.getTime();
  
    if (difference <= 0) {
      
      document.querySelector('.launch-days').innerHTML = '';
      document.querySelector('.launch-hours').innerHTML = '';
      document.querySelector('.launch-minutes').innerHTML = '';
      document.querySelector('.launch-seconds').innerHTML = '';
      clearInterval(Countdown.timer);
    
    } else {
      
      let seconds = Math.floor(difference / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
  
      hours %= 24;
      minutes %= 60;
      seconds %= 60;
  
      document.querySelector('.launch-days').innerHTML = days + ' days, ';
      document.querySelector('.launch-hours').innerHTML = hours + ' hours, ';
      document.querySelector('.launch-minutes').innerHTML = minutes + ' minutes, ';
      document.querySelector('.launch-seconds').innerHTML = seconds + ' seconds ';
    }
  }
  }
}

export { Countdown }