const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}


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
        const lines = prompt("Enter the number of Lines to bet on: ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid line on bet,Try again");
        }
        else{
            return numberOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the total bet per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invalid bet,Try again");
        }
        else{
            return numberBet;
        }
    }
}

const spin = () =>{
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const transposeArray = (reels) =>{
    const rows  = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    // Sadece bahis yatırılan satır sayısı kadar dön
    for (let i = 0; i < lines; i++) {
        const row = rows[i];
        let allSame = true; // Başta her satırı "kazandı" kabul ediyoruz

        // Senin mantığın: Her elemanı bir sonrakiyle kıyasla
        // ÖNEMLİ: i < row.length - 1 (Çünkü sonuncunun bir sonrası yok!)
        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] !== row[j + 1]) {
                allSame = false; // Bir tane bile farklı bulursak "kazanç yok"
                break;           // Döngüden çık, daha fazla bakmaya gerek yok
            }
        }

        // Eğer döngü bittiğinde allSame hala true ise, hepsi aynıdır
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[row[0]];
        }
    }

    return winnings;
};

const Game = () => {
    let balance = setDeposit();

    while (true) {
        console.log("Current balance: $" + balance);

        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);

        // KRİTİK DÜZELTME: Bakiyeden eksiltiyoruz
        balance -= bet * numberOfLines; 

        const reels = spin();
        const rows = transposeArray(reels);
        
        // DÜZELTME: Parametreyi içeri gönderiyoruz
        printRows(rows); 

        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;

        console.log("You won: $" + winnings);

        if (balance <= 0) {
            console.log("You ran out of money! Game Ends.");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n): ");
        
        // DÜZELTME: "y" tırnak içinde olmalı
        if (playAgain.toLowerCase() != "y") {
            console.log("Thanks for playing! Your final balance: $" + balance);
            break;
        }
    }
}

Game();