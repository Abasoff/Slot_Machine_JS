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


let balance = setDeposit();
const numberOfLines = getNumberOfLines();
console.log(numberOfLines);