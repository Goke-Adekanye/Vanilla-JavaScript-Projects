const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

let counter = 0;

slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

nextBtn.addEventListener('click', () => {
  counter++;
  carousel();
  console.log(counter);
});
prevBtn.addEventListener('click', () => {
  counter--;
  carousel();
});

function carousel() {
  // ***** slides control *****
  //   if (counter === slides.length) counter = 0;
  //   if (counter < 0) counter = slides.length - 1;
  // ***** btn control *****
  counter === slides.length - 1
    ? (nextBtn.style.display = 'none')
    : (nextBtn.style.display = 'block');
  counter > 0 ? (prevBtn.style.display = 'block') : (prevBtn.style.display = 'none');

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

prevBtn.style.display = 'none';
