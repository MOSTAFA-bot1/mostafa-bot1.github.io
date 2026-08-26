document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("تم الارسال");
    });
  }
});
