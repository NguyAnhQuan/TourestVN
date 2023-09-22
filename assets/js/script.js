
// hiển thị thanh điều hướng khi < 992px
const navToggleBtn = document.querySelector(".nav-toggle-btn");
const header = document.querySelector(".header");

navToggleBtn.addEventListener("click",  () => {
  this.classList.toggle("active");
  header.classList.toggle("active");
});



// hiển thị nút lên trên khi cuộn cửa sổ tới 500px


const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", () => {
  goTopBtn.classList.toggle("active", window.scrollY >= 500);
});
