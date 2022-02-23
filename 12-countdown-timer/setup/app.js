const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// months are ZERO index based;
const futureDate = new Date(tempYear, tempMonth, tempDay + 5, 11, 30, 0);

// let futureDate = new Date(2020, 3, 24, 11, 30, 0);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const hour = futureDate.getHours();
const min = futureDate.getMinutes();
const day = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${day}, ${date} ${month} ${year}, ${hour}:${min}pm`;

function getRemainingTime() {
  const currentTime = new Date().getTime();
  const t = futureDate.getTime() - currentTime;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHr = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHr);
  let minutes = Math.floor((t % oneHr) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  let values = [days, hours, minutes, seconds];

  function format(value) {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  }

  items.forEach(function (item, index) {
    item.textContent = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
