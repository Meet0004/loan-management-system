// function updateDate() {
//     document.getElementById('todaysDate').innerText = new Date().toLocaleString();
// }
// setInterval(updateDate, 1000);
//const fetchUserData = require('../server.js');
console.log('pohoch gaye')


function setLoginName() {
  let loginNameEl = document.getElementById("loginName");
  let userNameEl = document.getElementById("userName");
  let userName = userNameEl.textContent.trim();
  if (!userName) loginNameEl.textContent = "Login";
}
setInterval(setLoginName, 1000);

//import { fetchUserData } from '../server.js';
document.getElementById("loginKarle").addEventListener("click", (event) => {
    window.location.href = '/login';
});
let konsaLoan;

function balance_update() {
    document.getElementById("paisa").innerText = 50000;
}

async function fetchAndDisplayUserData(username) {
    let tdp;
    try {
        const response = await fetch(`/user/${username}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const { data } = await response.json();

        console.log("Data received:", data);

        tdp = parseInt(data.Total_Daily_Paymentsc);
        // Displaying user data on the page
        document.getElementById('Loans-taken').textContent = data.Loans_Taken;
        console.log("Ahh : " + tdp);
        document.getElementById('Payments-Remaining').textContent = tdp;
        document.getElementById('Late-Payment-Fees').textContent = data.Late_Payment_Fees;
        document.getElementById('total-debt').textContent = data.Total_Debt;

        let balance = data.Balance
        if (balance <= 0) {
            balance = 50000.00;
        }
        document.getElementById('paisa').textContent = balance;

        let paybtn;
        let payButtonsArray = [];
        let takenFor = tdp; // Number of payments
        let totalRepayment = parseFloat(data.Total_Debt)
        let dailyRePayment = (totalRepayment/takenFor).toFixed(2);
        console.log(dailyRePayment, typeof(dailyRePayment))

        konsaLoan = data.Loans_Taken_Value;

        for (let i = 0; i < takenFor; i++) {
            console.log("loop me agaye")
            console.log(i)

            let dailyDiv = document.createElement('div');
            dailyDiv.className = 'dailydaily';
            document.getElementById('dailyPaymentDetail').appendChild(dailyDiv);

            // Create Pay button
            paybtn = document.createElement('button');
            paybtn.className = 'paybtn';
            paybtn.innerHTML = "Pay";
            payButtonsArray.push(paybtn);

            // create content
            let text = document.createElement('div');
            text.className = 'dailyDetailsOfDiv';
            // const dueDate = calculateDueDate(i + 1);
            text.innerHTML = `Day : ${i + 1}  <br>Pay ${dailyRePayment} as daily payment.<br> Total Loan Amount: ${totalRepayment}`;            

            dailyDiv.appendChild(paybtn);
            dailyDiv.appendChild(text);
        
            paybtn.addEventListener('click', () => {
                dailyDiv.remove();
                payButtonsArray.pop();
                tdp -= 1
                // update remaining payments
                let PaymentsRemaining = parseInt(document.getElementById('Payments-Remaining').innerHTML);
                PaymentsRemaining -= 1;
                document.getElementById('Payments-Remaining').innerHTML = PaymentsRemaining;
                
                // update total debt
                let totalDebt = parseFloat(document.getElementById('total-debt').innerHTML);
                let dailyPaymentValue = parseFloat(dailyRePayment);
                totalDebt -= dailyPaymentValue;
                document.getElementById('total-debt').innerHTML = totalDebt.toFixed(2);

                // update balance
                balance -= dailyPaymentValue;
                balance = balance.toFixed(2);
                document.getElementById('paisa').innerText = balance;

                let thoda;
                if (payButtonsArray.length === 1) {
                    let filhal = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2); // Convert to a number
                    thoda = filhal - dailyPaymentValue;
                    thoda = thoda.toFixed(2)
                    console.log(thoda)
                    console.log("ye thodaaaa : " + thoda);
                    balance -= thoda;
                    let final = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2) - thoda;
                    document.getElementById('total-debt').innerHTML = final.toFixed(2)
                }

                // check if all payments are done
                if (payButtonsArray.length === 0) {
                    document.getElementById('Loans-taken').innerHTML = 0;
                    //payEarlybtn.remove();

                    document.getElementsByClassName('below')[0].removeChild(Jaldi);
                    document.getElementById('BL-amt-range').style.display = "inline-block";
                    document.getElementById('BL-TakeLoan').style.display = "inline-block";
                    const loans = [document.getElementById('BL-TakeLoan'), document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
                    loans.forEach(loan => {
                        loan.disabled = false;
                        loan.style.cursor = "pointer";
                        loan.style.backgroundColor = "var(--color8)";
                    });
                    document.getElementById('msg').style.display = "block";
                    document.getElementById('payments-head').innerText = "Payments";

                    agreeDiv.remove();
                }
            });
        }
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }

    
    console.log("Konsa Loan tha reee : ", konsaLoan)
    if (konsaLoan == 0){
        document.getElementById('msg').style.display = "block";
        document.getElementById('payments-head').innerText = "Payments";
    }else{
        document.getElementById('payments-head').innerText = "Upcoming Payments"
        document.getElementById('msg').style.display = "none";
    }

    if (konsaLoan == 750){
        document.getElementById('BL-amt-range').style.display = "none";
        document.getElementById('BL-TakeLoan').style.display = "none";


        let Jaldi = document.createElement('div');
        Jaldi.className = 'payOffEarlySec';
        document.getElementsByClassName('below')[0].appendChild(Jaldi);

        let payEarlybtn = document.createElement('button');
        payEarlybtn.className = 'payOffEarly';
        payEarlybtn.innerHTML = "Pay Off Early";
        payEarlybtn.style.cursor = "pointer"
        Jaldi.appendChild(payEarlybtn);

        let loanButtons = [document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
        loanButtons.forEach(button => {
            button.disabled = true;
            button.style.cursor = "not-allowed";
            button.style.backgroundColor = "rgb(186, 208, 224)";
        });
        let val = parseInt(document.getElementById('custom-amt').value);
        if(val > 5000 && val<=1000000){
            document.getElementById('CL-TakeLoan').disabled = true;
            document.getElementById('CL-TakeLoan').style.cursor = "not-allowed";
            document.getElementById('CL-TakeLoan').style.backgroundColor = "var(--color12)";
        }

        if (konsaLoan == 0){
            document.getElementById('msg').style.display = "block";
            document.getElementById('payments-head').innerText = "Payments";
        }else{
            document.getElementById('payments-head').innerText = "Upcoming Payments"
            document.getElementById('msg').style.display = "none";
        }

        if (tdp == 0) {
            document.getElementById('Loans-taken').innerHTML = 0;
            //payEarlybtn.remove();

            document.getElementsByClassName('below')[0].removeChild(Jaldi);
            document.getElementById('BL-amt-range').style.display = "inline-block";
            document.getElementById('BL-TakeLoan').style.display = "inline-block";
            const loans = [document.getElementById('BL-TakeLoan'), document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
            loans.forEach(loan => {
                loan.disabled = false;
                loan.style.cursor = "pointer";
                loan.style.backgroundColor = "var(--color8)";
            });
            document.getElementById('msg').style.display = "block";
            document.getElementById('payments-head').innerText = "Payments";

            agreeDiv.remove();
        }
    }
    if(konsaLoan == 2000){

    }
    if(konsaLoan == 5000){
        
    }
    if(konsaLoan <= 5001){

    }

}

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

if (username && password) {

    let bal = document.getElementById("paisa");
    bal = parseFloat(bal.innerText)
    if (bal <= 0) {
        balance_update();
    }

    console.log("Printing Username through app2.js :", username + " | "+ password);
    // sample data to send
    const data = {
        usernameTOBE: username,
        passwordTOBE: password,
    };
    // send POST request to the server
    fetch('/send-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })    
    .then((response) => response.text())
    .then((message) => {
        console.log('Server response:', message);
    })
    .catch((error) => {
        console.error('Error sending data:', error);
    });
    fetchAndDisplayUserData(username);
} else {
    console.log("No credentials found in localStorage.");
}
document.getElementById('userName').innerText = username;

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('username'); 
    localStorage.removeItem('password');
    localStorage.clear(); 
});


// Replace 'exampleUsername' with the desired username

function updateDate() {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    const time = today.toLocaleTimeString();
    document.getElementById('todaysDate').innerText = `${formattedDate}, ${time}`;
}
setInterval(updateDate, 1000);
updateDate();


document.getElementById('BL-points').addEventListener('input', (evt) => {
    let BL_amt = 750, BL_int = 0.01
    let userInput = evt.target.value;
    let returnPayment = document.getElementById('BL-Return-Payment')
    let dailyPayment = document.getElementById('BL-Daily-Payment')
    let term = document.getElementById('BL-Loan-Term-Length')

    returnPayment.innerHTML = (BL_amt +((BL_amt * BL_int) * userInput)).toFixed(2)
    dailyPayment.innerHTML = ((returnPayment.innerHTML)/userInput).toFixed(2)
    term.innerHTML = userInput
})
document.getElementById('ML-points').addEventListener('input', (evt) => {
    let ML_amt = 2000, ML_int = 0.02;
    let userInput = evt.target.value;
    let returnPayment = document.getElementById('ML-Return-Payment')
    let dailyPayment = document.getElementById('ML-Daily-Payment')
    let term = document.getElementById('ML-Loan-Term-Length')

    returnPayment.innerHTML = (ML_amt +((ML_amt * ML_int) * userInput)).toFixed(2)
    dailyPayment.innerHTML = ((returnPayment.innerHTML)/userInput).toFixed(2)
    term.innerHTML = userInput
})

document.getElementById('PL-points').addEventListener('input', (evt) => {
    let PL_amt = 5000, PL_int = 0.025
    let userInput = evt.target.value;
    let returnPayment = document.getElementById('PL-Return-Payment')
    let dailyPayment = document.getElementById('PL-Daily-Payment')
    let term = document.getElementById('PL-Loan-Term-Length')

    returnPayment.innerHTML = (PL_amt +((PL_amt * PL_int) * userInput)).toFixed(2)
    dailyPayment.innerHTML = ((returnPayment.innerHTML)/userInput).toFixed(2) 
    term.innerHTML = userInput
})

function calculateDueDate(daysFromNow) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + daysFromNow); //increment date
    const formattedDate = dueDate.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    const daysLeft = daysFromNow === 0 ? "Today" : `${daysFromNow} day${daysFromNow > 1 ? 's' : ''} left`;
    return `${daysLeft} (${formattedDate})`;
}
const consentBtn = document.getElementById('loan-consent-btn');
const popup = document.getElementById('popup-container');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('popup-close');
const agreeBtn = document.getElementById('agree-btn');
let multiLoans = 0


let nicheBhej_DPV=0.00;
let time_of_TL;
let takenFor;
let DPV;

document.getElementById('BL-TakeLoan').addEventListener('click', (evt) => {
    //append the agree button to the popup content dynamically
    const agreeDiv = document.createElement('div');
    agreeDiv.id = 'agree-div';
    agreeDiv.style.textAlign = 'center'; // Ensure alignment
    agreeDiv.innerHTML = '<button id="agree-btn">I Agree</button>';
    document.getElementById('popup-content').appendChild(agreeDiv);

    overlay.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
    //add event listener for the agree button
    document.getElementById('agree-btn').addEventListener('click', () => {
      popup.style.display = 'none';
      overlay.style.display = 'none';
    });

    //trigger karrr
    document.getElementById('loan-consent-btn').click();
    
    //stimulate agreement click after consent
    document.getElementById('agree-btn').addEventListener('click', () => {
        agreeDiv.remove()

        let balance = document.getElementById('paisa').innerText;
        balance = parseFloat(balance);
        console.log("Current Balance : " + balance + "\n" + typeof(balance))

        let totalRepayment = document.getElementById('BL-Return-Payment').innerHTML
        let dailyRePayment = (document.getElementById('BL-Daily-Payment').innerHTML)
        takenFor = document.getElementById('BL-Loan-Term-Length').innerHTML
        DPV = parseFloat(dailyRePayment).toFixed(2)
        konsaLoan = 750;
        balance += 750.00
        console.log("Current Balance : " + balance)
        document.getElementById('paisa').innerText = balance

        document.getElementById('Loans-taken').innerHTML = 1
        document.getElementById('Payments-Remaining').innerHTML = takenFor
        document.getElementById('total-debt').innerHTML = totalRepayment
        time_of_TL = document.getElementById('todaysDate').innerHTML
        console.log(`Loan Taken even though u know LO NA NA LO 
            Total Repaymaent = ${totalRepayment}
            Daily Payment - ${dailyRePayment}
            Taken for = ${takenFor}
            at ${time_of_TL}`);
        
        nicheBhej_DPV  =  dailyRePayment
        document.getElementById('payments-head').innerText = "Upcoming Payments"
        document.getElementById('msg').style.display = "none";

        let loanButtons = [document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
        loanButtons.forEach(button => {
            button.disabled = true;
            button.style.cursor = "not-allowed";
            button.style.backgroundColor = "rgb(186, 208, 224)";
        });
        document.getElementById('BL-amt-range').style.display = "none";
        document.getElementById('BL-TakeLoan').style.display = "none";

        let Jaldi = document.createElement('div');
        Jaldi.className = 'payOffEarlySec';
        document.getElementsByClassName('below')[0].appendChild(Jaldi);

        let paybtn;
        let payButtonsArray = [];
        for(let i=0; i<takenFor; i++){
            setTimeout(() => {
                console.log(i)

                //pehle div banao
                let dailyDiv = document.createElement('div');
                dailyDiv.className = 'dailydaily';
                document.getElementById('dailyPaymentDetail').appendChild(dailyDiv);

                //fir paybtn banao
                paybtn = document.createElement('button');
                paybtn.className = 'paybtn';
                paybtn.innerHTML = "Pay";

                payButtonsArray.push(paybtn);
                //content dala
                let text = document.createElement('div');
                text.className = 'dailyDetailsOfDiv';
                const dueDate = calculateDueDate(i + 1);
                text.innerHTML = `Day : ${i + 1}  <br>Pay ${dailyRePayment} as daily payment.<br> Total Loan Amount: ${totalRepayment}<br> Due Date: ${dueDate}`;            

                dailyDiv.appendChild(paybtn);
                dailyDiv.appendChild(text);

                let payButtons = document.getElementsByClassName('paybtn');
                let kitnibar = payButtons.length;
                paybtn.addEventListener('click', () => {
                    dailyDiv.remove()
                    payButtons -= 1;
                    payButtonsArray.pop();
                    kitnibar--;
                    console.log("Kitni bar : ",kitnibar)
                    console.log("paybtn length : "+payButtons.length)

                    let PaymentsRemaining = parseInt(document.getElementById('Payments-Remaining').innerHTML);
                    PaymentsRemaining -= 1;
                    document.getElementById('Payments-Remaining').innerHTML = PaymentsRemaining;
                
                    let totalDebt = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2);
                    let dailyPaymentValue = parseFloat(dailyRePayment);
                
                    totalDebt = parseFloat(totalDebt) - dailyPaymentValue;
                    console.log(totalDebt)
                
                    document.getElementById('total-debt').innerHTML = totalDebt.toFixed(2);

                    balance -= dailyPaymentValue;
                    balance = balance.toFixed(2)
                    document.getElementById('paisa').innerText = balance


                    console.log(payButtons.length)
                    let thoda;
                    if (payButtons.length === 1) {
                        let filhal = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2); // Convert to a number
                        thoda = filhal - dailyPaymentValue;

                        thoda = thoda.toFixed(2)
                        console.log(thoda)
                        console.log("ye thodaaaa : " + thoda);
                        balance -= thoda;

                        let final = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2) - thoda;
                        document.getElementById('total-debt').innerHTML = final.toFixed(2)
                    }

                    if(payButtons.length === 0){    
                        console.log("Kisht Puri")
                        document.getElementById('Loans-taken').innerHTML = 0

                        payEarlybtn.remove()

                        document.getElementsByClassName('below')[0].removeChild(Jaldi)
                        document.getElementById('BL-amt-range').style.display = "inline-block";
                        document.getElementById('BL-TakeLoan').style.display = "inline-block";
                        const loans = [document.getElementById('BL-TakeLoan'),document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
                        loans.forEach(loan => {
                            loan.disabled = false;
                            loan.style.cursor = "pointer";
                            loan.style.backgroundColor = "var(--color8)";
                        });   
                        document.getElementById('msg').style.display = "block";
                        document.getElementById('payments-head').innerText = "Payments"

                        konsaLoan=0;

                        agreeDiv.remove()
                    }
                }) 
            }, i*100)
        }
        
        //Pay Off Early button
        let payEarlybtn = document.createElement('button');
        payEarlybtn.className = 'payOffEarly';
        payEarlybtn.innerHTML = "Pay Off Early";
        payEarlybtn.style.cursor = "pointer"
        Jaldi.appendChild(payEarlybtn);

        payEarlybtn.addEventListener('click', () => {
            agreeDiv.remove()
            konsaLoan = 0;
            let remainingBalNum = payButtonsArray.length;
            console.log("remainingBalNum ----> "+remainingBalNum);

            let needToBeReduced = dailyRePayment * remainingBalNum

            console.log("needToBeReduced ----> "+needToBeReduced)
            balance -= needToBeReduced

            let theProblemAmt = totalRepayment - (dailyRePayment*takenFor)

            theProblemAmt = parseFloat(theProblemAmt.toFixed(2))
            console.log("THE PROBLEM AMR : "+ theProblemAmt)

            console.log("BALANCE before adding "+ balance)
            balance -= theProblemAmt
            console.log("BALANCE after adding "+ balance)
            document.getElementById('paisa').innerText = balance.toFixed(2)

            //pehle section nikalna padega
            document.getElementsByClassName('below')[0].removeChild(Jaldi);

            //sab reset karna hoga
            document.getElementById('BL-amt-range').style.display = "inline-block";
            document.getElementById('BL-TakeLoan').style.display = "inline-block";
            document.getElementById('Loans-taken').innerHTML = 0;
            document.getElementById('Payments-Remaining').innerHTML = 0;
            document.getElementById('total-debt').innerHTML = 0;

            //Remove all the daily payment divs // easy thaa re
            document.getElementById('dailyPaymentDetail').innerHTML = ''; // me toh div hi nikal raha hu
            document.getElementById('msg').style.display = "block";

            const loans = [document.getElementById('BL-TakeLoan'),document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
            loans.forEach(loan => {
                loan.disabled = false;
                loan.style.cursor = "pointer";
                loan.style.backgroundColor = "var(--color8)";
            }); 

            document.getElementById('msg').style.display = "block";
            document.getElementById('payments-head').innerText = "Payments"
        });
    });
    konsaLoan = 0;
})


/************************************************************************ */


document.getElementById('ML-TakeLoan').addEventListener('click', (evt) => {
    //append the agree button to the popup content dynamically
    const agreeDiv = document.createElement('div');
    agreeDiv.id = 'agree-div';
    agreeDiv.style.textAlign = 'center'; // Ensure alignment
    agreeDiv.innerHTML = '<button id="agree-btn">I Agree</button>';
    document.getElementById('popup-content').appendChild(agreeDiv);

    overlay.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
    //add event listener for the agree button
    document.getElementById('agree-btn').addEventListener('click', () => {
      popup.style.display = 'none';
      overlay.style.display = 'none';
    });

    //triggu
    document.getElementById('loan-consent-btn').click();
    
    // imulate agreement click after consent
    document.getElementById('agree-btn').addEventListener('click', () => {
        agreeDiv.remove()

        let balance = document.getElementById('paisa').innerText;
        balance = parseFloat(balance);
        console.log("Current Balance : " + balance + "\n" + typeof(balance))

        let totalRepayment = document.getElementById('ML-Return-Payment').innerHTML
        let dailyRePayment = document.getElementById('ML-Daily-Payment').innerHTML
        let takenFor = document.getElementById('ML-Loan-Term-Length').innerHTML

        balance += 2000.00

        konsaLoan = 2000.00
        console.log("Current Balance : " + balance)
        document.getElementById('paisa').innerText = balance

        document.getElementById('Loans-taken').innerHTML = 1
        document.getElementById('Payments-Remaining').innerHTML = takenFor
        document.getElementById('total-debt').innerHTML = totalRepayment
        console.log(`Loan Taken even though u know LO NA NA LO 
            Total Repaymaent = ${totalRepayment}
            Daily Payment - ${dailyRePayment}
            Taken for = ${takenFor}`);

        document.getElementById('payments-head').innerText = "Upcoming Payments"
        document.getElementById('msg').style.display = "none";

        let loanButtons = [document.getElementById('BL-TakeLoan'), document.getElementById('PL-TakeLoan')];
        loanButtons.forEach(button => {
            button.disabled = true;
            button.style.cursor = "not-allowed";
            button.style.backgroundColor = "#bad0e0";
        });
        document.getElementById('ML-amt-range').style.display = "none";
        document.getElementById('ML-TakeLoan').style.display = "none";

        let Jaldi = document.createElement('div');
        Jaldi.className = 'payOffEarlySec';
        document.getElementsByClassName('below')[1].appendChild(Jaldi);

        let paybtn;
        let payButtonsArray = [];
        for(let i=0; i<takenFor; i++){
            setTimeout(() => {
                console.log(i)

                //pehle div banao
                let dailyDiv = document.createElement('div');
                dailyDiv.className = 'dailydaily';
                document.getElementById('dailyPaymentDetail').appendChild(dailyDiv);

                //fir paybtn banao
                let paybtn = document.createElement('button');
                paybtn.className = 'paybtn';
                paybtn.innerHTML = "Pay";
            
                payButtonsArray.push(paybtn);
                //content dala
                let text = document.createElement('div');
                text.className = 'dailyDetailsOfDiv';
                const dueDate = calculateDueDate(i + 1);
                text.innerHTML = `Day : ${i + 1}  <br>Pay ${dailyRePayment} as daily payment.<br> Total Loan Amount: ${totalRepayment}<br> Due Date: ${dueDate}`;            

                dailyDiv.appendChild(paybtn);
                dailyDiv.appendChild(text);

                let payButtons = document.getElementsByClassName('paybtn');
                let kitnibar = payButtons.length;
                paybtn.addEventListener('click', () => {
                    dailyDiv.remove()
                    //payButtons.length -= 1;
                    payButtons -= 1;
                    payButtonsArray.pop();
                    kitnibar--;
                    console.log("Kitni bar : ",kitnibar)
                    console.log("paybtn length : "+payButtons.length)

                    let PaymentsRemaining = parseInt(document.getElementById('Payments-Remaining').innerHTML);
                    PaymentsRemaining -= 1;
                    document.getElementById('Payments-Remaining').innerHTML = PaymentsRemaining;
                
                    let totalDebt = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2);
                    let dailyPaymentValue = parseFloat(dailyRePayment);
                
                    totalDebt = parseFloat(totalDebt) - dailyPaymentValue;
                    //totalDebt = totalDebt.tofixed(2)
                    console.log(totalDebt)
                
                    document.getElementById('total-debt').innerHTML = totalDebt.toFixed(2);

                    balance -= dailyPaymentValue;
                    balance = balance.toFixed(2)
                    document.getElementById('paisa').innerText = balance

                    console.log(payButtons.length)
                    let thoda;
                    if (payButtons.length === 1) {
                        let filhal = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2); // Convert to a number
                        thoda = filhal - dailyPaymentValue;

                        thoda = thoda.toFixed(2)
                        console.log(thoda)
                        console.log("ye thodaaaa : " + thoda);
                        balance -= thoda;

                        let final = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2) - thoda;
                        document.getElementById('total-debt').innerHTML = final.toFixed(2)
                    }

                    if(payButtons.length === 0){
                        console.log("Kisht Puri")
                        konsaLoan = 0;
                        document.getElementById('Loans-taken').innerHTML = 0

                        payEarlybtn.remove()

                        document.getElementsByClassName('below')[1].removeChild(Jaldi)
                        document.getElementById('ML-amt-range').style.display = "inline-block";
                        document.getElementById('ML-TakeLoan').style.display = "inline-block";
                        const loans = [document.getElementById('BL-TakeLoan'),document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')];0
                        loans.forEach(loan => {
                            loan.disabled = false;
                            loan.style.cursor = "pointer";
                            loan.style.backgroundColor = "var(--color8)";
                        });   
                        document.getElementById('msg').style.display = "block";
                        document.getElementById('payments-head').innerText = "Payments"
                    }
                })
            }, i*100)
        }


        //Pay Off Early button
        let payEarlybtn = document.createElement('button');
        payEarlybtn.className = 'payOffEarly';
        payEarlybtn.innerHTML = "Pay Off Early";
        payEarlybtn.style.cursor = "pointer"
        Jaldi.appendChild(payEarlybtn);

        payEarlybtn.addEventListener('click', () => {

            konsaLoan = 0

            let remainingBalNum = payButtonsArray.length;
            console.log("remainingBalNum ----> "+remainingBalNum);

            let needToBeReduced = dailyRePayment * remainingBalNum

            console.log("needToBeReduced ----> "+needToBeReduced)
            balance -= needToBeReduced

            let theProblemAmt = totalRepayment - (dailyRePayment*takenFor)

            theProblemAmt = parseFloat(theProblemAmt.toFixed(2))
            console.log("THE PROBLEM AMR : "+ theProblemAmt)

            console.log("BALANCE before adding "+ balance)
            balance -= theProblemAmt
            console.log("BALANCE after adding "+ balance)
            document.getElementById('paisa').innerText = balance.toFixed(2)

            //Remove the 'Pay Off Early' button section
            document.getElementsByClassName('below')[1].removeChild(Jaldi);

            //Reset the loan-related details and show input elements again
            document.getElementById('ML-amt-range').style.display = "inline-block";
            document.getElementById('ML-TakeLoan').style.display = "inline-block";
            document.getElementById('Loans-taken').innerHTML = 0;
            document.getElementById('Payments-Remaining').innerHTML = 0;
            document.getElementById('total-debt').innerHTML = 0;

            //Remove all the daily payment divs // easy thaa re
            document.getElementById('dailyPaymentDetail').innerHTML = '';
            document.getElementById('msg').style.display = "block";

            const loans = [document.getElementById('BL-TakeLoan'),document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')];
            loans.forEach(loan => { 
                loan.disabled = false; 
                loan.style.cursor = "pointer"; 
                loan.style.backgroundColor = "var(--color8)"; 
            }); 
            document.getElementById('msg').style.display = "block";
            document.getElementById('payments-head').innerText = "Payments"
        });
    });
    konsaLoan = 0;
})
/************************************************************************ */


document.getElementById('PL-TakeLoan').addEventListener('click', (evt) => {
    //append the agree button to the popup content dynamically
    const agreeDiv = document.createElement('div');
    agreeDiv.id = 'agree-div';
    agreeDiv.style.textAlign = 'center'; // Ensure alignment
    agreeDiv.innerHTML = '<button id="agree-btn">I Agree</button>';
    document.getElementById('popup-content').appendChild(agreeDiv);

    overlay.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
    //add event listener for the agree button
    document.getElementById('agree-btn').addEventListener('click', () => {
      popup.style.display = 'none';
      overlay.style.display = 'none';
    });

    //Trigger loan consent button click
    document.getElementById('loan-consent-btn').click();
    
    // imulate agreement click after consent
    document.getElementById('agree-btn').addEventListener('click', () => {
        agreeDiv.remove()

        let balance = document.getElementById('paisa').innerText;
        balance = parseFloat(balance);
        console.log("Current Balance : " + balance + "\n" + typeof(balance))

        let totalRepayment = document.getElementById('PL-Return-Payment').innerHTML
        let dailyRePayment = document.getElementById('PL-Daily-Payment').innerHTML
        takenFor = document.getElementById('BL-Loan-Term-Length').innerHTML
        DPV = parseFloat(dailyRePayment).toFixed(2)
        balance += 5000.00
        konsaLoan = 5000.00;
        console.log("Current Balance : " + balance)
        document.getElementById('paisa').innerText = balance

        document.getElementById('Loans-taken').innerHTML = 1
        document.getElementById('Payments-Remaining').innerHTML = takenFor
        document.getElementById('total-debt').innerHTML = totalRepayment
        console.log(`Loan Taken even though u know LO NA NA LO 
            Total Repaymaent = ${totalRepayment}
            Daily Payment - ${dailyRePayment}
            Taken for = ${takenFor}`);

        nicheBhej_DPV  =  dailyRePayment
        document.getElementById('payments-head').innerText = "Upcoming Payments"
        document.getElementById('msg').style.display = "none";

        let loanButtons = [document.getElementById('BL-TakeLoan'), document.getElementById('ML-TakeLoan')];
        loanButtons.forEach(button => {
            button.disabled = true; 
            button.style.cursor = "not-allowed"; 
            button.style.backgroundColor = "#bad0e0"; 
        });
        document.getElementById('PL-amt-range').style.display = "none";
        document.getElementById('PL-TakeLoan').style.display = "none";

        let Jaldi = document.createElement('div');
        Jaldi.className = 'payOffEarlySec';
        document.getElementsByClassName('below')[2].appendChild(Jaldi);

        let paybtn;
        let payButtonsArray = [];
        for(let i=0; i<takenFor; i++){
            setTimeout(() => {
                console.log(i)

                //pehle div banao
                let dailyDiv = document.createElement('div');
                dailyDiv.className = 'dailydaily';
                document.getElementById('dailyPaymentDetail').appendChild(dailyDiv);

                //fir paybtn banao
                let paybtn = document.createElement('button');
                paybtn.className = 'paybtn';
                paybtn.innerHTML = "Pay";

                payButtonsArray.push(paybtn);
                //content dala
                let text = document.createElement('div');
                text.className = 'dailyDetailsOfDiv';
                const dueDate = calculateDueDate(i + 1);
                text.innerHTML = `Day : ${i + 1}  <br>Pay ${dailyRePayment} as daily payment.<br> Total Loan Amount: ${totalRepayment}<br> Due Date: ${dueDate}`;            

                dailyDiv.appendChild(paybtn);
                dailyDiv.appendChild(text);

                
                let payButtons = document.getElementsByClassName('paybtn');
                let kitnibar = payButtons.length;
                paybtn.addEventListener('click', () => {
                    dailyDiv.remove()
                    //payButtons.length -= 1
                    payButtons -= 1;
                    payButtonsArray.pop();
                    kitnibar--;
                    console.log("Kitni bar : ",kitnibar)
                    console.log("paybtn length : "+payButtons.length)

                    let PaymentsRemaining = parseInt(document.getElementById('Payments-Remaining').innerHTML);
                    PaymentsRemaining -= 1;
                    document.getElementById('Payments-Remaining').innerHTML = PaymentsRemaining;
                
                    let totalDebt = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2);
                    let dailyPaymentValue = parseFloat(dailyRePayment);
                
                    totalDebt = parseFloat(totalDebt) - dailyPaymentValue;
                    console.log(totalDebt)
                
                    document.getElementById('total-debt').innerHTML = totalDebt.toFixed(2);

                    balance -= dailyPaymentValue;
                    balance = balance.toFixed(2)
                    document.getElementById('paisa').innerText = balance


                    console.log(payButtons.length)
                    let thoda;
                    if (payButtons.length === 1) {
                        let filhal = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2); // Convert to a number
                        thoda = filhal - dailyPaymentValue;

                        thoda = thoda.toFixed(2)
                        console.log(thoda)
                        console.log("ye thodaaaa : " + thoda);
                        balance -= thoda;

                        let final = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2) - thoda;
                        document.getElementById('total-debt').innerHTML = final.toFixed(2)
                    }

                    if(payButtons.length === 0){
                        console.log("Kisht Puri")
                        konsaLoan = 0;
                        document.getElementById('Loans-taken').innerHTML = 0

                        payEarlybtn.remove()

                        document.getElementsByClassName('below')[2].removeChild(Jaldi)
                        document.getElementById('PL-amt-range').style.display = "inline-block";
                        document.getElementById('PL-TakeLoan').style.display = "inline-block";
                        const loans = [document.getElementById('BL-TakeLoan'),document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
                        loans.forEach(loan => { 
                            loan.disabled = false; 
                            loan.style.cursor = "pointer"; 
                            loan.style.backgroundColor = "var(--color8)"; 
                        });   
                        document.getElementById('msg').style.display = "block";
                        document.getElementById('payments-head').innerText = "Payments"
                    }
                })
            }, i*100)
        }

        //Pay Off Early button
        let payEarlybtn = document.createElement('button');
        payEarlybtn.className = 'payOffEarly';
        payEarlybtn.innerHTML = "Pay Off Early";
        payEarlybtn.style.cursor = "pointer"
        Jaldi.appendChild(payEarlybtn);

        payEarlybtn.addEventListener('click', () => {
            
            let remainingBalNum = payButtonsArray.length;
            console.log("remainingBalNum ----> "+remainingBalNum);

            let needToBeReduced = dailyRePayment * remainingBalNum

            console.log("needToBeReduced ----> "+needToBeReduced)
            balance -= needToBeReduced

            let theProblemAmt = totalRepayment - (dailyRePayment*takenFor)

            theProblemAmt = parseFloat(theProblemAmt.toFixed(2))
            console.log("THE PROBLEM AMR : "+ theProblemAmt)

            console.log("BALANCE before adding "+ balance)
            balance -= theProblemAmt
            console.log("BALANCE after adding "+ balance)
            document.getElementById('paisa').innerText = balance.toFixed(2)

            //Remove the 'Pay Off Early' button section
            document.getElementsByClassName('below')[2].removeChild(Jaldi);

            //Reset the loan-related details and show input elements again
            document.getElementById('PL-amt-range').style.display = "inline-block";
            document.getElementById('PL-TakeLoan').style.display = "inline-block";
            document.getElementById('Loans-taken').innerHTML = 0;
            document.getElementById('Payments-Remaining').innerHTML = 0;
            document.getElementById('total-debt').innerHTML = 0;

            //Remove all the daily payment divs // easy thaa re
            document.getElementById('dailyPaymentDetail').innerHTML = '';
            document.getElementById('msg').style.display = "block";

            const loans = [document.getElementById('BL-TakeLoan'),document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
            loans.forEach(loan => { 
                loan.disabled = false; 
                loan.style.cursor = "pointer"; 
                loan.style.backgroundColor = "var(--color8)"; 
            }); 

            document.getElementById('msg').style.display = "block";
            document.getElementById('payments-head').innerText = "Payments"

            konsaLoan = 0;
        });
    });
    konsaLoan = 0;
})

/************************************************************************ */

function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}


document.getElementById('custom-loan').addEventListener('click', openPopup)
document.getElementById('close-btn').addEventListener('click', closePopup)

// Disable the button initially
document.getElementById('CL-TakeLoan').disabled = false;
document.getElementById('CL-TakeLoan').style.cursor = "not-allowed";
document.getElementById('CL-TakeLoan').style.backgroundColor = "var(--color12)";

document.getElementById('custom-amt').addEventListener('input', () => {
    let val = parseInt(document.getElementById('custom-amt').value);
    //amt limit me rehna chahiye 5000 < amt <= 1000000 
    if(val > 5000 && val<=1000000){
        document.getElementById('CL-TakeLoan').disabled = false;
        document.getElementById('CL-TakeLoan').style.cursor = "pointer";
        document.getElementById('CL-TakeLoan').style.backgroundColor = "var(--color8)";
    }
    else {
        document.getElementById('CL-TakeLoan').disabled = true;
        document.getElementById('CL-TakeLoan').style.cursor = "not-allowed";
        document.getElementById('CL-TakeLoan').style.backgroundColor = "var(--color12)";
    }
});

document.getElementById('custom-term').addEventListener('input', (evt) => {
    document.getElementById('loan-term').innerHTML = evt.target.value;
})

document.getElementById('CL-TakeLoan').addEventListener('click', (evt) => {
    //append the agree button to the popup content dynamically
    const agreeDiv = document.createElement('div');
    agreeDiv.id = 'agree-div';
    agreeDiv.style.textAlign = 'center'; // Ensure alignment
    agreeDiv.innerHTML = '<button id="agree-btn">I Agree</button>';
    document.getElementById('popup-content').appendChild(agreeDiv);

    overlay.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
    //add event listener for the agree button
    document.getElementById('agree-btn').addEventListener('click', () => {
      popup.style.display = 'none';
      overlay.style.display = 'none';
    });

    //Trigger loan consent button click
    document.getElementById('loan-consent-btn').click();
    
    // imulate agreement click after consent
    document.getElementById('agree-btn').addEventListener('click', () => {
        agreeDiv.remove()
        
        document.getElementById('CL-TakeLoan').disabled = true;

        let balance = document.getElementById('paisa').innerText;
        balance = parseFloat(balance);
        console.log("Current Balance : " + balance + "\n" + typeof(balance))

        let CL_amt = document.getElementById('custom-amt').value;
        let CL_tenure = document.getElementById('custom-term').value;
        let CL_int = 0.025
        CL_amt = parseFloat(CL_amt)
        CL_tenure = parseFloat(CL_tenure)



        console.log(CL_amt, CL_tenure, typeof(CL_amt));
        
        let takenAMT = CL_amt + (CL_amt * CL_int * CL_tenure);
        takenAMT = parseFloat(takenAMT.toFixed(2));
        console.log("Total taken"+takenAMT)
        balance += CL_amt;

        takenFor = CL_tenure
        
        console.log("Current Balance : " + balance)
        document.getElementById('paisa').innerText = balance.toFixed(2);

        time_of_TL = document.getElementById('todaysDate').innerHTML

        document.getElementById('total-debt').innerHTML =  CL_amt + (CL_amt * CL_int * CL_tenure);

        let filhal = document.getElementById('todaysDate');
        console.log(filhal.innerHTML);
        closePopup()
        document.getElementById('custom-loan').classList.remove("hover");
        document.getElementById('custom-loan').style.opacity = ".6";
        document.getElementById('custom-loan').style.cursor = "not-allowed";

        //last $5000 loan ko nikala aur naya dala
        document.getElementById('loan3').style.display = "none";
        document.getElementById('loan4').style.display = "inline-block";

        //dusro ko band kardiya
        let loanButtons = [document.getElementById('ML-TakeLoan'), document.getElementById('BL-TakeLoan')]; 
        loanButtons.forEach(button => {
            button.disabled = true;
            button.style.cursor = "not-allowed";
            button.style.backgroundColor = "rgb(186, 208, 224)";
        });

        document.getElementById('CL-money').innerHTML = CL_amt;
        document.getElementById('CL-Loan-Term-Length').innerHTML = CL_tenure;

        //Assuming dailyRePayment and totalRepayment calculations
        let dailyRePayment = (takenAMT / CL_tenure).toFixed(2); //Example calculation
        let totalRepayment = CL_amt; //Total repayment is initially the loan amount


        DPV = (dailyRePayment).toFixed(2)
        nicheBhej_DPV  =  (dailyRePayment).toFixed(2)

        document.getElementById('payments-head').innerText = "Upcoming Payments"
        document.getElementById('msg').style.display = "none";

        document.getElementById('Loans-taken').innerHTML = 1
        document.getElementById('Payments-Remaining').innerHTML = CL_tenure
        document.getElementById('total-debt').innerHTML =  CL_amt + (CL_amt * CL_int * CL_tenure);

        let paybtn;
        let payButtonsArray = [];
        for(let i = 0; i < CL_tenure; i++) {
            setTimeout(() => {
                console.log(i);

                let dailyDiv = document.createElement('div');
                dailyDiv.className = 'dailydaily';
                document.getElementById('dailyPaymentDetail').appendChild(dailyDiv);

                let paybtn = document.createElement('button');
                paybtn.className = 'paybtn';
                paybtn.innerHTML = "Pay";
                payButtonsArray.push(paybtn);

                let text = document.createElement('div');
                text.className = 'dailyDetailsOfDiv';
                const dueDate = calculateDueDate(i + 1);
                text.innerHTML = `Day : ${i + 1}  <br>Pay ${dailyRePayment} as daily payment.<br> Total Loan Amount: ${totalRepayment}<br> Due Date: ${dueDate}`;            

                dailyDiv.appendChild(paybtn);
                dailyDiv.appendChild(text);


                let payButtons = document.getElementsByClassName('paybtn');
                let kitnibar = payButtons.length;
                paybtn.addEventListener('click', () => {
                    dailyDiv.remove();
                    payButtons -= 1;
                    payButtonsArray.pop();
                    kitnibar--;
                    console.log("Kitni bar : ",kitnibar)
                    console.log("paybtn length : "+payButtons.length)

                    let PaymentsRemaining = parseInt(document.getElementById('Payments-Remaining').innerHTML);
                    PaymentsRemaining -= 1;
                    document.getElementById('Payments-Remaining').innerHTML = PaymentsRemaining;
                
                    let totalDebt = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2);
                    let dailyPaymentValue = parseFloat(dailyRePayment);
                
                    totalDebt = parseFloat(totalDebt) - dailyPaymentValue;
                    console.log(totalDebt)
                
                    document.getElementById('total-debt').innerHTML = totalDebt.toFixed(2);

                    balance -= dailyPaymentValue;
                    balance = balance.toFixed(2)
                    document.getElementById('paisa').innerText = balance


                    console.log(payButtons.length)
                    let thoda;
                    if (payButtons.length === 1) {
                        let filhal = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2); // Convert to a number
                        thoda = filhal - dailyPaymentValue;

                        thoda = thoda.toFixed(2)
                        console.log(thoda)
                        console.log("ye thodaaaa : " + thoda);
                        //balance -= thoda;

                        let final = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2) - thoda;
                        document.getElementById('total-debt').innerHTML = final.toFixed(2)
                    }

                    if(payButtons.length === 0){
                        console.log("Kisht Puri")
                        document.getElementById('Loans-taken').innerHTML = 0

                        //payEarlybtn.remove()

                        const loans = [document.getElementById('BL-TakeLoan'),document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')]; 
                        loans.forEach(loan => {
                            loan.disabled = false;
                            loan.style.cursor = "pointer";
                            loan.style.backgroundColor = "var(--color8)";
                        });   
                        document.getElementById('msg').style.display = "block";
                        document.getElementById('payments-head').innerText = "Payments"

                        console.log("Ab kaam kara na")

                        document.getElementById('loan3').style.display = "inline-block";
                        document.getElementById('loan4').style.display = "none";
                        document.getElementById('custom-loan').classList.add("hover");
                        document.getElementById('custom-loan').style.opacity = "1";
                        document.getElementById('custom-loan').style.cursor = "pointer";
                    }
                });
            }, i * 100);
        }
        document.getElementById('PayOffEarly').addEventListener('click', () => {
            agreeDiv.remove();
            document.getElementById('CL-TakeLoan').disabled = false;
        
            let remainingBalNum = payButtonsArray.length;
            console.log("Remaining Payments: " + remainingBalNum);
        
            let remainingDebt = dailyRePayment * remainingBalNum; // Total remaining payments
            console.log("Remaining Debt: " + remainingDebt);

            needtoBebalanced = parseFloat(document.getElementById('total-debt').innerHTML) - remainingDebt
        
            balance -= remainingDebt+needtoBebalanced;
            console.log("Updated Balance: " + balance);
        
            //Update
            document.getElementById('paisa').innerText = balance.toFixed(2);
            document.getElementById('total-debt').innerHTML = "0";
        
            // Reset loans and UI
            const loans = [
                document.getElementById('BL-TakeLoan'),
                document.getElementById('ML-TakeLoan'),
                document.getElementById('PL-TakeLoan')
            ];
            loans.forEach(loan => {
                loan.disabled = false;
                loan.style.cursor = "pointer";
                loan.style.backgroundColor = "var(--color8)";
            });
        
            document.getElementById('loan4').style.display = "none";
            document.getElementById('loan3').style.display = "inline-block";
            document.getElementById('custom-loan').classList.add("hover");
            document.getElementById('custom-loan').style.opacity = "1";
            document.getElementById('custom-loan').style.cursor = "pointer";
        
            // Clear daily payment details and reset UI
            document.getElementById('dailyPaymentDetail').innerHTML = '';
            document.getElementById('msg').style.display = "block";
            document.getElementById('payments-head').innerText = "Payments";
            document.getElementById('Loans-taken').innerHTML = "0";
            document.getElementById('Payments-Remaining').innerHTML = "0";
        });        
    });
});

/************************************************************************ */ 


document.getElementById('save-data').addEventListener('click', async () => {
    // Extract values from input fields
    const name = document.getElementById('userName').innerText;
    const key = password 
    const time = time_of_TL;
    const Loanstaken = parseInt(document.getElementById('Loans-taken').innerHTML);
    //const loantakenVal = parseFloat(document.getElementById('money').innerHTML).toFixed(2);
    const totaldailypays = parseFloat(document.getElementById('Payments-Remaining').innerHTML).toFixed(2);
    const DPVv = isNaN(DPV) ? null : parseFloat(DPV).toFixed(2); // Sanitize DPV
    const latefees = parseFloat(document.getElementById('Late-Payment-Fees').innerHTML).toFixed(2);
    const totalDebt = parseFloat(document.getElementById('total-debt').innerHTML).toFixed(2);
    const balancia = parseFloat(document.getElementById('paisa').innerHTML).toFixed(2);

    // Send the data to the backend
    const response = await fetch('/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            key,
            time,
            Loanstaken,
            konsaLoan,
            totaldailypays,
            DPVv,
            latefees,
            totalDebt,
            balancia,
        }),
    });
    await console.log('data sent')
    const result = await response.json();
    alert(result.message);

    await console.log('Hogya?')
});


/************************************************************************ */
consentBtn.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

// document.getElementById('agree-btn').addEventListener('click', () => {
    // popup.style.display = 'none';
    // overlay.style.display = 'none';
// });

