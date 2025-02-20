document.getElementById('BL-points').addEventListener('input',(evt)=>{
    console.log(evt.target.value)

    let amt = 750, int = 0.01
    let userInput = evt.target.value;
    let TotalRepayment = document.getElementById('BL-Return-Payment')
    let dailyPayment = document.getElementById('BL-Daily-Payment')
    let days = document.getElementById('BL-Loan-Term-Length')

    let DAY = days.innerHTML = userInput
    let TOTAL = TotalRepayment.innerHTML = (amt + ((amt * int)*userInput)).toFixed(2);
    let DAILY = (TOTAL/DAY).toFixed(2)

    dailyPayment.innerHTML = DAILY
})


document.getElementById('ML-points').addEventListener('input', (evt) => {
    console.log(evt.target.value)

    let amt = 2000, int = 0.02
    let userInput = evt.target.value;
    let TotalRepayment = document.getElementById('ML-Return-Payment')
    let dailyPayment = document.getElementById('ML-Daily-Payment')
    let days = document.getElementById('ML-Loan-Term-Length')
    
    let DAY = days.innerHTML = userInput
    let TOTAL = TotalRepayment.innerHTML = (amt + ((amt * int)*userInput)).toFixed(2);
    let DAILY = (TOTAL/DAY).toFixed(2)

    dailyPayment.innerHTML = DAILY
})

document.getElementById('PL-points').addEventListener('input', (evt) => {
    console.log(evt.target.value);
    let amt = 5000, int = 0.025
    let userInput = evt.target.value;
    let TotalRepayment = document.getElementById('PL-Return-Payment')
    let dailyPayment = document.getElementById('PL-Daily-Payment')
    let days = document.getElementById('PL-Loan-Term-Length')
    
    let DAY = days.innerHTML = userInput
    let TOTAL = TotalRepayment.innerHTML = (amt + ((amt * int)*userInput)).toFixed(2);
    let DAILY = (TOTAL/DAY).toFixed(2)

    dailyPayment.innerHTML = DAILY
})


var loansTaken = 0
var loansTakenValue = parseInt(document.getElementById('Loans-taken').innerHTML)

var paymentsRemaining = 0
var paymentsRemainingValue = parseInt(document.getElementById('Payments-Remaining').innerHTML)

let BLLiya = document.getElementById('BL-TakeLoan')
BLLiya.addEventListener('click', (evt) => {
    BLLiya.disabled = true;                     //done
    BLLiya.style.cursor = "not-allowed";                     //done
    BLLiya.style.backgroundColor = "#bad0e0";                     //done

    let loanButtons = [document.getElementById('ML-TakeLoan'), document.getElementById('PL-TakeLoan')];            //done
    loanButtons.forEach(button => {            //done
        button.disabled = true;            //done
        button.style.cursor = "not-allowed";            //done
        button.style.backgroundColor = "#bad0e0";            //done
    });

    document.getElementById('ML-TakeLoan').disable = true;
    let amtTaken = document.getElementById('BL-Return-Payment').innerHTML            //done
    let dailyAmt = document.getElementById('BL-Daily-Payment').innerHTML            //done
    let takenFor = document.getElementById('BL-Loan-Term-Length').innerHTML            //done

    console.log(`LOAN TAKEN EVEN THOUGH U KNOW LO NA NA LO 
        AMT TAKEN FOR = ${takenFor}
        TOTAL LIYA = ${amtTaken}
        AB ROZ BHARNA HAI = ${dailyAmt}`);            //done
    
    loansTaken++;            //done
    document.getElementById('Loans-taken').innerHTML = loansTaken            //done
    paymentsRemainingValue = amtTaken            //done
    document.getElementById('total-debt').innerHTML = paymentsRemainingValue            //done
    document.getElementById('Payments-Remaining').innerHTML = takenFor            //done
    document.getElementById('msg').style.display = "none"            //done

    for (let i = 0; i < takenFor; i++) {
        let payButtons = document.getElementsByClassName('paybtn');
        setTimeout(() => {
            //pehle div banao
            let dailyDiv = document.createElement('div');
            dailyDiv.className = 'dailydaily';
            document.getElementById('dailyPaymentDetail').appendChild(dailyDiv);
                
            //fir paybtn banao
            let paybtn = document.createElement('button');
            paybtn.className = 'paybtn';
            paybtn.innerHTML = "Pay";
    
            //content dala
            let text = document.createElement('div');
            text.innerHTML = `Day ${i + 1}: <br>Pay ${dailyAmt} as daily payment.<br> Total Loan Amount: ${amtTaken}`;
            
            dailyDiv.appendChild(paybtn);
            dailyDiv.appendChild(text);
    
            paybtn.addEventListener('click', () => {
                let val = document.getElementById('total-debt').innerHTML;
                val = parseFloat(val).toFixed(2);
            
                let dailyAmount = parseFloat(dailyAmt).toFixed(2);
            
                if (val > 0) {
                    val = val - dailyAmount;
                    if (val < 0) 
                        val = 0;
                    val = parseFloat(val).toFixed(2)
                    // Update
                    document.getElementById('total-debt').innerHTML = val;
                    let daysRemaining = document.getElementById('Payments-Remaining')
                    let daysRemainingVal = daysRemaining.innerText
                    daysRemainingVal = parseInt(daysRemainingVal)
                    daysRemainingVal--
                    document.getElementById('Payments-Remaining').innerHTML = daysRemainingVal
                }
            
                // Remove the corresponding dailyDiv
                dailyDiv.remove();
            
                // Check if this is the last payment
                let payButtons = document.getElementsByClassName('paybtn');
                if (payButtons.length === 0) {
                    console.log("Kisht puri");
                    document.getElementById('total-debt').innerHTML = 0;
                    document.getElementById('Loans-taken').innerHTML = 0;

                    //Remove the 'Pay Off Early' button section
                    document.getElementsByClassName('below')[0].removeChild(Jaldi);

                    //Reset the loan-related details and show input elements again
                    document.getElementById('BL-amt-range').style.display = "inline-block";
                    document.getElementById('BL-TakeLoan').style.display = "inline-block";
                    document.getElementById('Loans-taken').innerHTML = 0;
                    document.getElementById('Payments-Remaining').innerHTML = 0;
                    document.getElementById('total-debt').innerHTML = 0;

                    //Remove all the daily payment divs // easy thaa re
                    document.getElementById('dailyPaymentDetail').innerHTML = '';
                    document.getElementById('msg').style.display = "block";

                    payEarlybtn.remove()


                    const loans = [BLLiya, MLLiya, PLLiya];
                    loans.forEach(loan => {
                        loan.disabled = false;
                        loan.style.cursor = "pointer";
                        loan.style.backgroundColor = "var(--color8)";
                    });
                }
            });

            let lastButton = payButtons[payButtons.length - 1]; // Access the last button
            lastButton.addEventListener('click',(evt) => {
                console.log("Kisht puri");
                document.getElementById('total-debt').innerHTML = 0;
                document.getElementById('Loans-taken').innerHTML = 0;
            })
        }, i * 50);
    }

    document.getElementById('BL-amt-range').style.display = "none";            //done
    document.getElementById('BL-TakeLoan').style.display = "none";            //done
    let Jaldi = document.createElement('div');            //done
    Jaldi.className = 'payOffEarlySec';            //done
                
    document.getElementsByClassName('below')[0].appendChild(Jaldi);            //done
                
    //Pay Off Early button            //done
    let payEarlybtn = document.createElement('button');            //done
    payEarlybtn.className = 'payOffEarly';            //done
    payEarlybtn.innerHTML = "Pay Off Early";            //done
    payEarlybtn.style.cursor = "pointer"            //done
    Jaldi.appendChild(payEarlybtn);            //done

    payEarlybtn.addEventListener('click', () => {            //done
        //Remove the 'Pay Off Early' button section            //done
        document.getElementsByClassName('below')[0].removeChild(Jaldi);            //done

        //Reset the loan-related details and show input elements again            //done
        document.getElementById('BL-amt-range').style.display = "inline-block";            //done
        document.getElementById('BL-TakeLoan').style.display = "inline-block";            //done
        document.getElementById('Loans-taken').innerHTML = 0;            //done
        document.getElementById('Payments-Remaining').innerHTML = 0;            //done
        document.getElementById('total-debt').innerHTML = 0;            //done
                //done
        //Remove all the daily payment divs // easy thaa re            //done
        document.getElementById('dailyPaymentDetail').innerHTML = '';            //done
        document.getElementById('msg').style.display = "block";            //done
            //done
        //abling all btns            //done
        const loans = [BLLiya, MLLiya, PLLiya];            //done
        loans.forEach(loan => {            //done
            loan.disabled = false;            //done
            loan.style.cursor = "pointer";            //done
            loan.style.backgroundColor = "var(--color8)";            //done
        });            //done
        loansTakenValue.innerHTML = 0;            //done
        loansTaken = 0;            //done
    });            //done
})


let MLLiya = document.getElementById('ML-TakeLoan')
MLLiya.addEventListener('click', (evt) => {
    MLLiya.disabled = true;
    MLLiya.style.cursor = "not-allowed";
    MLLiya.style.backgroundColor = "#bad0e0"

    //kuch ni ML lene par BL & PL ko band kiya
    let loanButtons = [document.getElementById('BL-TakeLoan'), document.getElementById('PL-TakeLoan')];
    loanButtons.forEach(button => {
        button.disabled = true;
        button.style.cursor = "not-allowed";
        button.style.backgroundColor = "#bad0e0";
    });

    let amtTaken = document.getElementById('ML-Return-Payment').innerHTML
    let dailyAmt = document.getElementById('ML-Daily-Payment').innerHTML
    let takenFor = document.getElementById('ML-Loan-Term-Length').innerHTML

    console.log(`LOAN TAKEN EVEN THOUGH U KNOW LO NA NA LO 
        AMT TAKEN FOR = ${takenFor}
        TOTAL LIYA = ${amtTaken}
        AB ROZ BHARNA HAI = ${dailyAmt}`);


    loansTaken++;

    document.getElementById('Loans-taken').innerHTML = loansTaken
    paymentsRemainingValue = amtTaken
    document.getElementById('total-debt').innerHTML = paymentsRemainingValue
    document.getElementById('Payments-Remaining').innerHTML = takenFor
    document.getElementById('msg').style.display = "none"
    
    for (let i = 0; i < takenFor; i++) {
        let payButtons = document.getElementsByClassName('paybtn');
        setTimeout(() => {
            //pehle div banao
            let dailyDiv = document.createElement('div');
            dailyDiv.className = 'dailydaily';
            document.getElementById('dailyPaymentDetail').appendChild(dailyDiv);

            //fir paybtn banao
            let paybtn = document.createElement('button');
            paybtn.className = 'paybtn';
            paybtn.innerHTML = "Pay";

            //content dala
            let text = document.createElement('div');
            text.innerHTML = `Day ${i + 1}: <br>Pay ${dailyAmt} as daily payment.<br> Total Loan Amount: ${amtTaken}`;

            dailyDiv.appendChild(paybtn);
            dailyDiv.appendChild(text);    

            paybtn.addEventListener('click', () => {
                
                let val = document.getElementById('total-debt').innerHTML;
                val = parseFloat(val).toFixed(2);

                let dailyAmount = parseFloat(dailyAmt).toFixed(2);
            
                // Subtract the daily amount only if there's remaining debt
                if (val > 0) {
                    val = val - dailyAmount;
                    // If val goes below 0, set it to 0
                    if (val < 0) {
                        val = 0;
                    }

                    val = parseFloat(val).toFixed(2)
                    // Update the total debt value in the DOM
                    document.getElementById('total-debt').innerHTML = val;
                    let daysRemaining = document.getElementById('Payments-Remaining')
                    let daysRemainingVal = daysRemaining.innerText
                    daysRemainingVal = parseInt(daysRemainingVal)
                    daysRemainingVal--
                    document.getElementById('Payments-Remaining').innerHTML = daysRemainingVal
                }
            
                // Remove the corresponding dailyDiv
                dailyDiv.remove();
            
                // Check if this is the last payment
                let payButtons = document.getElementsByClassName('paybtn');
                if (payButtons.length === 0) {
                    // console.log("Kisht puri");
                    // document.getElementById('total-debt').innerHTML = 0;
                    // document.getElementById('Loans-taken').innerHTML = 0;
                
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
                
                    payEarlybtn.remove()
                
                    const loans = [BLLiya, MLLiya, PLLiya];
                    loans.forEach(loan => {
                        loan.disabled = false;
                        loan.style.cursor = "pointer";
                        loan.style.backgroundColor = "var(--color8)";
                    });
                }                
            });

            let lastButton = payButtons[payButtons.length - 1]; // Access the last button
            lastButton.addEventListener('click',(evt) => {
                console.log("Kisht puri");
                document.getElementById('total-debt').innerHTML = 0;
                document.getElementById('Loans-taken').innerHTML = 0;
                loansTakenValue.innerHTML = 0;            //done
                loansTaken = 0;  
            })
            
        }, i * 50);
    }

    document.getElementById('ML-amt-range').style.display = "none";
    document.getElementById('ML-TakeLoan').style.display = "none";
    let Jaldi = document.createElement('div');
    Jaldi.className = 'payOffEarlySec';
            
    document.getElementsByClassName('below')[1].appendChild(Jaldi);
            
    let payEarlybtn = document.createElement('button');
    payEarlybtn.className = 'payOffEarly';
    payEarlybtn.innerHTML = "Pay Off Early";
    payEarlybtn.style.cursor = "pointer"
    Jaldi.appendChild(payEarlybtn);

    payEarlybtn.addEventListener('click', () => {
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
        //abling all btns
        const loans = [BLLiya, MLLiya, PLLiya];
        loans.forEach(loan => {
            loan.disabled = false;
            loan.style.cursor = "pointer";
            loan.style.backgroundColor = "var(--color8)";
        });
        loansTakenValue.innerHTML = 0;            //done
        loansTaken = 0;  
    });
    //pay early btn ends

})


let PLLiya = document.getElementById('PL-TakeLoan')
PLLiya.addEventListener('click', (evt) => {
    PLLiya.disabled = true;
    PLLiya.style.cursor = "not-allowed";
    PLLiya.style.backgroundColor = "#bad0e0"

    //kuch ni ML lene par BL & PL ko band kiya
    let loanButtons = [document.getElementById('BL-TakeLoan'), document.getElementById('ML-TakeLoan')];
    loanButtons.forEach(button => {
        button.disabled = true;
        button.style.cursor = "not-allowed";
        button.style.backgroundColor = "#bad0e0";
    });

    document.getElementById('PL-TakeLoan').disabled = true;
    let amtTaken = document.getElementById('PL-Return-Payment').innerHTML
    let dailyAmt = document.getElementById('PL-Daily-Payment').innerHTML
    let takenFor = document.getElementById('PL-Loan-Term-Length').innerHTML

    console.log(`LOAN TAKEN EVEN THOUGH U KNOW LO NA NA LO 
        AMT TAKEN FOR = ${takenFor}
        TOTAL LIYA = ${amtTaken}
        AB ROZ BHARNA HAI = ${dailyAmt}`);

    loansTaken++;
    document.getElementById('Loans-taken').innerHTML = loansTaken
    paymentsRemainingValue = amtTaken
    document.getElementById('total-debt').innerHTML = paymentsRemainingValue
    document.getElementById('Payments-Remaining').innerHTML = takenFor
    document.getElementById('msg').style.display = "none"

    for (let i = 0; i < takenFor; i++) {
        let payButtons = document.getElementsByClassName('paybtn');
        setTimeout(() => {
            //pehle div banao
            let dailyDiv = document.createElement('div');
            dailyDiv.className = 'dailydaily';
            document.getElementById('dailyPaymentDetail').appendChild(dailyDiv);

            //fir paybtn banao
            let paybtn = document.createElement('button');
            paybtn.className = 'paybtn';
            paybtn.innerHTML = "Pay";

            //content dala
            let text = document.createElement('div');
            text.innerHTML = `Day ${i + 1}: <br>Pay ${dailyAmt} as daily payment.<br> Total Loan Amount: ${amtTaken}`;

            dailyDiv.appendChild(paybtn);
            dailyDiv.appendChild(text);    

            paybtn.addEventListener('click', () => {
                let val = document.getElementById('total-debt').innerHTML;
                val = parseFloat(val).toFixed(2);
            
                let dailyAmount = parseFloat(dailyAmt).toFixed(2);
            
                if (val > 0) {
                    val = val - dailyAmount;
                    if (val < 0)
                        val = 0;
                    val = parseFloat(val).toFixed(2)

                    //update
                    document.getElementById('total-debt').innerHTML = val;
                    let daysRemaining = document.getElementById('Payments-Remaining')
                    let daysRemainingVal = daysRemaining.innerText
                    daysRemainingVal = parseInt(daysRemainingVal)
                    daysRemainingVal--
                    document.getElementById('Payments-Remaining').innerHTML = daysRemainingVal
                }
            
                // Remove the corresponding dailyDiv
                dailyDiv.remove();
            
                // Check if this is the last payment
                let payButtons = document.getElementsByClassName('paybtn');
                if (payButtons.length === 0) {
                    console.log("Kisht puri");
                    document.getElementById('total-debt').innerHTML = 0;
                    document.getElementById('Loans-taken').innerHTML = 0;

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

                    payEarlybtn.remove()


                    const loans = [BLLiya, MLLiya, PLLiya];
                    loans.forEach(loan => {
                        loan.disabled = false;
                        loan.style.cursor = "pointer";
                        loan.style.backgroundColor = "var(--color8)";
                    });
                }
            });

            let lastButton = payButtons[payButtons.length - 1]; // Access the last button
            lastButton.addEventListener('click',(evt) => {
                console.log("Kisht puri");
                document.getElementById('total-debt').innerHTML = 0;
                document.getElementById('Loans-taken').innerHTML = 0;
            })
        }, i * 50);
    }

    document.getElementById('PL-amt-range').style.display = "none";
    document.getElementById('PL-TakeLoan').style.display = "none";
    let Jaldi = document.createElement('div');
    Jaldi.className = 'payOffEarlySec';
            
    document.getElementsByClassName('below')[2].appendChild(Jaldi);
            
    //Pay Off Early button
    let payEarlybtn = document.createElement('button');
    payEarlybtn.className = 'payOffEarly';
    payEarlybtn.innerHTML = "Pay Off Early";
    payEarlybtn.style.cursor = "pointer"
    Jaldi.appendChild(payEarlybtn);

    payEarlybtn.addEventListener('click', () => {
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
        //abling all btns
        const loans = [BLLiya, MLLiya, PLLiya];
        loans.forEach(loan => {
            loan.disabled = false;
            loan.style.cursor = "pointer";
            loan.style.backgroundColor = "var(--color8)";
        });
        loansTakenValue.innerHTML = 0;            //done
        loansTaken = 0;   
    }); 
})