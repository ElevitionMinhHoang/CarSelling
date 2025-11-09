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
