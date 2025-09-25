const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

if (navToggleBtn && header) {
navToggleBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  header.classList.toggle("active");
});
}



//show go top btn when scroll window to 500px
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (!goTopBtn) return;
  window.scrollY >= 500 ? goTopBtn.classList.add("active")
    : goTopBtn.classList.remove("active");
});

// Favorite buttons on product cards
(function initFavoriteButtons(){
  const favButtons = document.querySelectorAll('.favorite-btn');
  if (!favButtons.length) return;
  favButtons.forEach(function(btn){
    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      btn.classList.toggle('active');
      const icon = btn.querySelector('ion-icon');
      if (icon) {
        icon.setAttribute('name', btn.classList.contains('active') ? 'heart' : 'heart-outline');
      }
    });
  });
})();

// Video slider controls for products page
(function initVideoSlider(){
  const slider = document.querySelector('.video-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.video-slide');
  if (slides.length === 0) return;
  let index = 0;
  const show = (i) => {
    slides.forEach((v, idx) => {
      v.classList.toggle('active', idx === i);
    });
  };
  show(index);
  const prevBtn = slider.querySelector('.video-nav.prev');
  const nextBtn = slider.querySelector('.video-nav.next');
  if (prevBtn) prevBtn.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; show(index); });
  if (nextBtn) nextBtn.addEventListener('click', () => { index = (index + 1) % slides.length; show(index); });
})();


// Contact us
function validatePhoneNumber() {
  var mobileNumber = document.getElementById("mobileNumber").value;
  var regex = /^(09|03|07|08)[0-9]{8}$/;

  if (regex.test(mobileNumber)) {
      alert("Số điện thoại hợp lệ.");
      return true; // Cho phép form được gửi đi
  } else {
      alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
      return false; // Ngăn form gửi đi khi số điện thoại không hợp lệ
  }
}
