const interestSlider = document.getElementById('interest-slider');
const tenureSlider = document.getElementById('tenure-slider');

const interestValue = document.getElementById('interest');
const tenureValue = document.getElementById('months');

const summaryElement = document.getElementById('summary');

const rupeesButton = document.getElementById('rupees');
const dollarsButton = document.getElementById('dollars');

const loanSlider = document.getElementById('loan-slider');
const loanValue = document.getElementById('num');


// Function to toggle inset shadows
function toggleShadows(activeButton, inactiveButton) {
    activeButton.style.boxShadow = "inset 0 0 20px #03346E"; // Active button shadow
    inactiveButton.style.boxShadow = "inset 0 0 20px #6EACDA"; // Inactive button shadow
}

// Add event listeners for the buttons
rupeesButton.addEventListener('click', () => {
    toggleShadows(rupeesButton, dollarsButton); // Activate Rupees, deactivate Dollars
});

dollarsButton.addEventListener('click', () => {
    toggleShadows(dollarsButton, rupeesButton); // Activate Dollars, deactivate Rupees
});


function calculateEMI(loan, interest, tenure) {
    const monthlyInterestRate = interest / (12 * 100);
    const totalMonths = tenure;
    const emi = (loan * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
                (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    return Math.round(emi);
}

function updateLoanValueDisplay() {
    const loanValueRaw = parseInt(loanSlider.value);

    let formattedLoanValue;
    if (loanSlider.min === "10000") {
        formattedLoanValue = `$${(loanValueRaw).toLocaleString()}`;
    } else {
        if (loanValueRaw > 99) {
            const crores = (loanValueRaw / 100).toFixed(1);
            formattedLoanValue = `${crores} <span>Cr</span>`;
        } else {
            formattedLoanValue = `${loanValueRaw} <span>Lakhs</span>`;
        }
    }
    loanValue.innerHTML = formattedLoanValue;
}


function updateSummary() {
    const loanAmount = loanSlider.value * (loanSlider.min === "10000" ? 1 : 100000); // Convert based on currency
    const interestRate = parseFloat(interestSlider.value);
    const tenureMonths = parseInt(tenureSlider.value);

    const emi = calculateEMI(loanAmount, interestRate, tenureMonths);
    const totalRepay = emi * tenureMonths;

    summaryElement.innerHTML = `
        Loan Amount : <b> <span>${loanAmount.toLocaleString()}</span> </b> |
        Monthly EMI : <b> <span>${emi.toLocaleString()}</span> </b> |
        Total Repay : <b> <span>${totalRepay.toLocaleString()}</span> </b>
    `;
}

loanSlider.addEventListener('input', () => {
    updateLoanValueDisplay();
    updateSummary();
});

interestSlider.addEventListener('input', () => {
    interestValue.innerHTML = `${interestSlider.value} <span>%</span>`;
    updateSummary();
});

tenureSlider.addEventListener('input', () => {
    tenureValue.innerHTML = `${tenureSlider.value} <span>months</span>`;
    updateSummary();
});
function changeLoanAmountCurrency(isDollars) {
    if (isDollars) {
        // Change loan slider for Dollars (min = 1000, max = 10 million)
        loanSlider.min = 10000;
        loanSlider.max = 10000000;
        loanSlider.value = 10000; // Set initial value for Dollars
        loanValue.innerHTML = `10 <span>k</span>`; // Display initial value in $1k format
    } else {
        // Change loan slider for Rupees (min = 10 Lakhs, max = 1000 Lakhs)
        loanSlider.min = 10;
        loanSlider.max = 1000;
        loanSlider.value = 10; // Set initial value for Rupees
        loanValue.innerHTML = `10 <span>Lakhs</span>`; // Display initial value in Lakhs format
    }

    // Update the summary based on the new currency settings
    updateSummary();
}

rupeesButton.addEventListener('click', () => {
    changeLoanAmountCurrency(false); // Set currency to Rupees
});

dollarsButton.addEventListener('click', () => {
    changeLoanAmountCurrency(true); // Set currency to Dollars
});

updateLoanValueDisplay();
updateSummary();
