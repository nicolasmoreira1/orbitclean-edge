var cur = 0;
var total = 3;

function updateSlide() {
  document.getElementById('slides').style.transform = 'translateX(-' + (cur * 100) + '%)';
  document.querySelectorAll('.dot').forEach(function(d, i) {
    d.classList.toggle('active', i === cur);
  });
}

function slideNext() {
  cur = (cur + 1) % total;
  updateSlide();
}

function slidePrev() {
  cur = (cur - 1 + total) % total;
  updateSlide();
}

function goSlide(n) {
  cur = n;
  updateSlide();
}

setInterval(slideNext, 5000);