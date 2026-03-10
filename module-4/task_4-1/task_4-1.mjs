"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";


const accountTypes = {
    Normal: "Brukskonto", Savings: "Sparekonto", Credit: "Kredittkonto", Pension: "Pensjonskonto"
};

const currencyTypes = {
    NOK: { value: 1.0000, name: "Norske kroner", denomination: "NOK" },
    EUR: { value: 0.0985, name: "Europeiske euro", denomination: "€" },
    USD: { value: 0.1091, name: "United states dollars", denomination: "$" },
    GBP: { value: 0.0847, name: "Pound sterling", denomination: "£" },
    INR: { value: 7.8309, name: "Indiske rupees", denomination: "₹" },
    AUD: { value: 0.1581, name: "Australian dollars", denomination: "A$" },
    PHP: { value: 6.5189, name: "Philippine pesos", denomination: "₱" },
    SEK: { value: 1.0580, name: "Svenske kroner", denomination: "SEK" },
    CAD: { value: 0.1435, name: "Canadian dollars", denomination: "C$" },
    THB: { value: 3.3289, name: "Thai baht", denomination: "฿" },
}


class TAccount {
    #type;
    #balance;
    #withdrawCount;
    #currencyType;

    constructor(aType) {
        this.#type = aType;
        this.#balance = 0;
        this.#withdrawCount = 0;
        this.#currencyType = currencyTypes.NOK;

    }

    #currencyConvert(aType) {
        return currencyTypes.NOK.value / this.#currencyType.value * aType.value;
    }

    toString() {
        return this.#type;
    }

    setType(aType) {
        let text = "The account type has changed from " + this.toString();
        this.#type = aType;
        printOut(text + " to " + this.toString());

    }

    getBalance() {
        return this.#balance.toFixed(2) + this.#currencyType.denomination;
    }

    deposit(aAmount, aCurrency) {
        if (aCurrency === undefined) {
            aCurrency = currencyTypes.NOK;
        }
        this.#currencyType = aCurrency;
        const denomination = this.#currencyType.denomination;
        this.#withdrawCount = 0;
        this.#balance += aAmount;

        printOut(aAmount + denomination + " deposited.");
        
        printOut("The new balance is: " + this.getBalance());
    }

    withdraw(aAmount, aCurrency) {
        if(aCurrency === undefined) {
            aCurrency = currencyTypes.NOK;
        }
        const denomination = this.#currencyType.denomination;
        this.#currencyType = aCurrency;
        switch (this.#type) {
            case accountTypes.Normal:
                this.#withdrawCount = 0;
                this.#balance -= aAmount;
                printOut(aAmount + denomination + " withdrawn. The new balance is: " + this.#balance.toFixed(2) + denomination);
                break;
            case accountTypes.Savings:
                if (this.#withdrawCount >= 3) {
                    printOut("You can not withdraw money from " + this.#type + " more than 3 times.");
                } else {
                    this.#balance -= aAmount;
                    this.#withdrawCount ++;
                    printOut(aAmount + denomination + " withdrawn. The new balance is: " + this.#balance.toFixed(2) + denomination);
                }
                break;
            case accountTypes.Credit:
                this.#withdrawCount = 0;
                this.#balance -= aAmount;
                printOut(aAmount + denomination + " withdrawn. The new balance is: " + this.#balance.toFixed(2) + denomination);
                break;
            case accountTypes.Pension:
                this.#withdrawCount = 0;
                printOut("You are not allowed to withdraw money from " + this.#type + ".");
                break;
        }
    }

    setCurrencyType(aType) {
        const exchange = this.#currencyConvert(aType);
        let text = "Currency type changed from " + this.#currencyType.name;
        if (this.#currencyType === aType) {
            return;
        } else {
            this.#currencyType = aType;
            printOut(text + " to " + this.#currencyType.name);
            this.#balance *= exchange;
            printOut("New balance is " + this.#balance.toFixed(2) + this.#currencyType.denomination)
        }
    }
}

printOut("Account Types: ");
printOut(accountTypes)
printOut(newLine)

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`${accountTypes.Normal}, ${accountTypes.Savings}, ${accountTypes.Credit}, ${accountTypes.Pension}.`);

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const myAccount = new TAccount(accountTypes.Normal);
printOut("myAccount = " + myAccount.toString());
myAccount.setType(accountTypes.Savings);
printOut("myAccount = " + myAccount.toString());

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(100);
myAccount.withdraw(25);
printOut("The current balance is: " + myAccount.getBalance());
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(25);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(10);
myAccount.setType(accountTypes.Pension);
myAccount.withdraw(10);
myAccount.setType(accountTypes.Savings);
myAccount.withdraw(10);

printOut("");
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(150);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.setCurrencyType(currencyTypes.SEK);
myAccount.setCurrencyType(currencyTypes.USD);
myAccount.setCurrencyType(currencyTypes.NOK);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
//FIKS!!
myAccount.deposit(12, currencyTypes.USD)
printOut(newLine);
