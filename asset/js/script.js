/*=============== CAR FILTERING ===============*/
const filterItems = document.querySelectorAll('.filter__item');
const carCards = document.querySelectorAll('.car__card');

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items and add to the clicked one
        filterItems.forEach(el => el.classList.remove('active-filter'));
        item.classList.add('active-filter');

        const filterValue = item.getAttribute('data-filter');

        carCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'block'; // Or 'grid', 'flex', etc.
            } else {
                card.style.display = 'none';
            }
        });
    });
});


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header')
                       : header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);


/*=============== LOAN CALCULATOR ===============*/
const loanForm = document.getElementById('loan-form');
if (loanForm) {
    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get values from form inputs
        const carPrice = parseFloat(document.getElementById('car-price').value);
        const downPaymentPercent = parseFloat(document.getElementById('down-payment').value);
        const loanTermYears = parseFloat(document.getElementById('loan-term').value);
        const interestRatePercent = parseFloat(document.getElementById('interest-rate').value);

        // Basic validation
        if (isNaN(carPrice) || isNaN(downPaymentPercent) || isNaN(loanTermYears) || isNaN(interestRatePercent)) {
            alert('Vui lòng nhập đầy đủ và chính xác thông tin.');
            return;
        }

        // Calculations
        const downPaymentAmount = carPrice * (downPaymentPercent / 100);
        const loanAmount = carPrice - downPaymentAmount;
        const monthlyInterestRate = (interestRatePercent / 100) / 12;
        const numberOfPayments = loanTermYears * 12;

        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        // Display results with animation
        animateValue('result-down-payment', 0, downPaymentAmount, 500);
        animateValue('result-loan-amount', 0, loanAmount, 500);
        animateValue('result-monthly-payment', 0, monthlyPayment, 500);
    });
}

// Function to animate number counting up
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = `${value.toLocaleString('vi-VN')} VNĐ`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}


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
