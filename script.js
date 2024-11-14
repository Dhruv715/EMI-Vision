document.getElementById('emi-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanTenure = parseInt(document.getElementById('loan-tenure').value);
    const tenureUnit = document.querySelector('input[name="tenure-unit"]:checked').value;

    // EMI Calculation Logic
    if (!loanAmount || !interestRate || !loanTenure) {
        alert("Please fill in all fields.");
        return;
    }

    let numberOfMonths;
    if (tenureUnit === 'months') {
        numberOfMonths = loanTenure;
    } else if (tenureUnit === 'years') {
        numberOfMonths = loanTenure * 12;
    }

    const monthlyInterestRate = interestRate / 12 / 100;

    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - loanAmount;

    // Round the values
    document.getElementById('emi-value').textContent = `${Math.round(emi).toLocaleString()} INR`; // Round EMI and add INR text
    document.getElementById('interest-payable').textContent = `${Math.round(totalInterest).toLocaleString()} INR`; // Round interest and add INR text
    document.getElementById('total-amount').textContent = `${Math.round(totalAmount).toLocaleString()} INR`; // Round total and add INR text

    // Display Chart (Example - round chart with green ring and orange line)
    displayEMIChart(emi, totalAmount, totalInterest);
});

document.getElementById('reset-form').addEventListener('click', function() {
    document.getElementById('emi-result').style.display = 'none'; // Hide results on reset
    document.getElementById('emi-value').textContent = '-';
    document.getElementById('interest-payable').textContent = '-';
    document.getElementById('total-amount').textContent = '-';
    document.getElementById('emi-chart').innerHTML = ''; // Clear chart
});
