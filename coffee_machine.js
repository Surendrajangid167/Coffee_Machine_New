let water = 300;
let milk = 200;
let coffee = 230;
let money = 0;

const coffeePrices = {
    espresso: 2.00,
    latte: 2.50,
    cappuccino: 3.00
};

const coinValues = {
    quarters: 0.25,
    dimes: 0.10,
    nickels: 0.05,
    pennies: 0.01
};

let selectedCoffee = null;

function displayMessage(message) {
    document.getElementById("display").innerText = message;
}

function selectCoffee(type) {
    selectedCoffee = type;
    displayMessage(`Selected ${type}. Please insert $${coffeePrices[type]} to proceed.`);
}

function insertCoins() {
    if (!selectedCoffee) {
        displayMessage("Please select a coffee first.");
        return;
    }

    let quarters = parseInt(document.getElementById("quarters").value) || 0;
    let dimes = parseInt(document.getElementById("dimes").value) || 0;
    let nickels = parseInt(document.getElementById("nickels").value) || 0;
    let pennies = parseInt(document.getElementById("pennies").value) || 0;

    let insertedMoney = quarters * coinValues.quarters +
                        dimes * coinValues.dimes +
                        nickels * coinValues.nickels +
                        pennies * coinValues.pennies;

    processTransaction(insertedMoney);
}

function processTransaction(insertedMoney) {
    let price = coffeePrices[selectedCoffee];
    if (insertedMoney >= price) {
        let change = (insertedMoney - price).toFixed(2);
        if (checkResources()) {
            deductResources();
            money += price;
            localStorage.setItem("money", money);
            displayMessage(`Enjoy your ${selectedCoffee}! Change: $${change}`);
        }
    } else {
        displayMessage("Insufficient money. Please insert more coins.");
    }
}

function checkResources() {
    const resourcesNeeded = {
        espresso: { water: 120, milk: 50, coffee: 60 },
        latte: { water: 100, milk: 50, coffee: 75 },
        cappuccino: { water: 70, milk: 80, coffee: 90 }
    };

    const { water: reqWater, milk: reqMilk, coffee: reqCoffee } = resourcesNeeded[selectedCoffee];

    if (water < reqWater) {
        displayMessage("Not enough water.");
        return false;
    } else if (milk < reqMilk) {
        displayMessage("Not enough milk.");
        return false;
    } else if (coffee < reqCoffee) {
        displayMessage("Not enough coffee.");
        return false;
    }
    return true;
}

function deductResources() {
    const resourcesUsed = {
        espresso: { water: 120, milk: 50, coffee: 60 },
        latte: { water: 100, milk: 50, coffee: 75 },
        cappuccino: { water: 70, milk: 80, coffee: 90 }
    };
    
    const { water: useWater, milk: useMilk, coffee: useCoffee } = resourcesUsed[selectedCoffee];
    water -= useWater;
    milk -= useMilk;
    coffee -= useCoffee;
}

function showReport() {
    displayMessage(`Water: ${water}ml\nMilk: ${milk}ml\nCoffee: ${coffee}g\nMoney Earned: $${money.toFixed(2)}`);
}
