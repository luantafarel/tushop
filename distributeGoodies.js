const fs = require('fs');

function distributeGoodies(goodies, numEmployees) {
    // Sort the goodies by price in ascending order
    goodies.sort((a, b) => a.price - b.price);

    let minDiff = Infinity;  // Initialize the minimum difference to a large number
    let selectedGoodies = [];  // To store the selected goodies that result in the minimum difference

    // Sliding window approach to find the minimum price difference between the highest and lowest price in any group
    for (let i = 0; i <= goodies.length - numEmployees; i++) {
        const diff = goodies[i + numEmployees - 1].price - goodies[i].price;  // Calculate the difference
        if (diff < minDiff) {  // If we find a smaller difference, update minDiff
            minDiff = diff;
            selectedGoodies = goodies.slice(i, i + numEmployees);  // Store the goodies for this window
        }
    }

    return {
        selectedGoodies,  // The goodies that give the minimum price difference
        minDiff  // The minimum difference between the highest and lowest price
    };
}

// Sample Input (Initial Test Case)
const goodies = [
    { name: 'Fitbit Plus', price: 7980 },
    { name: 'IPods', price: 22349 },
    { name: 'MI Band', price: 999 },
    { name: 'Cult Pass', price: 2799 },
    { name: 'Macbook Pro', price: 229900 },
    { name: 'Digital Camera', price: 11101 },
    { name: 'Alexa', price: 9999 },
    { name: 'Sandwich Toaster', price: 2195 },
    { name: 'Microwave Oven', price: 9800 },
    { name: 'Scale', price: 4999 }
];

const numEmployees = 4;
const result = distributeGoodies(goodies, numEmployees);

// Writing the output to a file
const output = `The goodies selected for distribution are:
${result.selectedGoodies.map(goodie => `${goodie.name}: ${goodie.price}`).join('\n')}
And the difference between the chosen goodie with highest price and the lowest price is ${result.minDiff}`;

fs.writeFileSync('sample_output.txt', output);
console.log(output);

module.exports = {
    distributeGoodies
};

// Test Cases for the distributeGoodies function
const testCases = [
    {
        description: "Test Case 1: Initial example from goodies list",
        goodies: [
            { name: 'Fitbit Plus', price: 7980 },
            { name: 'IPods', price: 22349 },
            { name: 'MI Band', price: 999 },
            { name: 'Cult Pass', price: 2799 },
            { name: 'Macbook Pro', price: 229900 },
            { name: 'Digital Camera', price: 11101 },
            { name: 'Alexa', price: 9999 },
            { name: 'Sandwich Toaster', price: 2195 },
            { name: 'Microwave Oven', price: 9800 },
            { name: 'Scale', price: 4999 }
        ],
        numEmployees: 4,
        expected: {
            selectedGoodies: [
                { name: 'Fitbit Plus', price: 7980 },
                { name: 'Microwave Oven', price: 9800 },
                { name: 'Alexa', price: 9999 },
                { name: 'Digital Camera', price: 11101 }
            ],
            minDiff: 3121
        }
    },
    {
        description: "Test Case 3: All goodies with same price",
        goodies: [
            { name: 'Chocolate', price: 1000 },
            { name: 'Candy', price: 1000 },
            { name: 'Lollipop', price: 1000 },
            { name: 'Biscuit', price: 1000 }
        ],
        numEmployees: 2,
        expected: {
            selectedGoodies: [
                { name: 'Chocolate', price: 1000 },
                { name: 'Candy', price: 1000 }
            ],
            minDiff: 0
        }
    },
    {
        description: "Test Case 5: One goodie per employee",
        goodies: [
            { name: 'Gift Card', price: 2000 },
            { name: 'Keychain', price: 150 },
            { name: 'Notebook', price: 1200 },
            { name: 'Pen', price: 50 }
        ],
        numEmployees: 4,
        expected: {
            selectedGoodies: [
                { name: 'Pen', price: 50 },
                { name: 'Keychain', price: 150 },
                { name: 'Notebook', price: 1200 },
                { name: 'Gift Card', price: 2000 }
            ],
            minDiff: 1950
        }
    }
];

// Execute All Test Cases
testCases.forEach((testCase, index) => {
    const result = distributeGoodies(testCase.goodies, testCase.numEmployees);
    console.log(`\n${testCase.description}`);
    console.log(`Expected Output: ${JSON.stringify(testCase.expected.selectedGoodies)} with minDiff: ${testCase.expected.minDiff}`);
    console.log(`Actual Output: ${JSON.stringify(result.selectedGoodies)} with minDiff: ${result.minDiff}`);
    console.log(
        JSON.stringify(result.selectedGoodies) === JSON.stringify(testCase.expected.selectedGoodies) &&
        result.minDiff === testCase.expected.minDiff
        ? "Test Passed!"
        : "Test Failed!"
    );
});
