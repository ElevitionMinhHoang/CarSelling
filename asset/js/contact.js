/*=============== CONTACT FORM VALIDATION ===============*/
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.form__error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.form__input').forEach(el => el.style.borderColor = 'var(--border-color)');


        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Họ và tên là bắt buộc.');
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email là bắt buộc.');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(emailInput, 'Email không hợp lệ.');
            isValid = false;
        }

        if (isValid) {
            // On success
            alert('Cảm ơn bạn đã đăng ký thành công!');
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.form__error-message');
    input.style.borderColor = '#ef4444'; // Red for error
    error.textContent = message;
    error.style.color = '#ef4444';
    error.style.fontSize = 'var(--small-font-size)';
    error.style.marginTop = '0.25rem';
}
