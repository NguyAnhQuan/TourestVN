const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

navToggleBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  header.classList.toggle("active");
});



//show go top btn when scroll window to 500px

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  window.scrollY >= 500 ? goTopBtn.classList.add("active")
    : goTopBtn.classList.remove("active");
});


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
