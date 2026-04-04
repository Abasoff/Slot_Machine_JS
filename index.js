const prompt = require("prompt-sync")();

const setDeposit = () =>{
    while(true){
        const depositAmount = prompt("Enter the amount of Deposit: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount,Try again");
        }
        else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while(true){
        const Lines = prompt("Enter the number of Lines to bet on: ");
        const numberOfLines = parseFloat(Lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines >= 3){
            console.log("Invalid line on bet,Try again");
        }
        else{
            return numberOfLines;
        }
    }
}

const getBet = (balance) => {
    while(true){
        const bet = prompt("Enter the total bet: ");
        const numberBet = parseFloat(Lines);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet >= balance){
            console.log("Invalid bet,Try again");
        }
        else{
            return numberBet;
        }
    }
}


let callBalance = setDeposit();
const numberOfLines = getNumberOfLines();
const callBet = getBet();
console.log(callBalance);
console.log(numberOfLines);
console.log(callBet);