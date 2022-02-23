const colors = ['green', 'red', 'rgba(133,122,200)', '#f15025'];

const color = document.querySelector('.color');
const btn = document.getElementById('btn');

btn.addEventListener('click', function () {
  const randomNum = getRandom();

  document.body.style.backgroundColor = colors[randomNum];
  color.textContent = colors[randomNum];
});

function getRandom() {
  return Math.floor(Math.random() * colors.length);
}
