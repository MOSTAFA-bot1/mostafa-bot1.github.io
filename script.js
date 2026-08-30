document.addEventListener('DOMContentLoaded', () => {
  const whatsappButton = document.querySelector('.whatsapp-button');

  if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  }

  const contactForm = document.getElementById('contact');

  if (!contactForm) return;

  const submitButton = contactForm.querySelector('.contact-submit');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const subject = contactForm.querySelector('input[name="subject"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !subject || !message) {
      alert('يرجى تعبئة جميع الحقول المطلوبة قبل الإرسال.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }

    if (!submitButton) return;

    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'جارٍ الإرسال...';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('فشل في إرسال الرسالة');
      }

      contactForm.reset();
      window.location.href = 'success.html';
    } catch (error) {
      alert('حدثت مشكلة أثناء إرسال الرسالة، الرجاء المحاولة مرة أخرى.');
      console.error(error);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
});
