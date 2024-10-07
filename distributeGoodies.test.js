const { distributeGoodies } = require('./distributeGoodies');

describe('Goodie Distribution', () => {
    test('should return correct goodies with minimum price difference', () => {
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
        const result = distributeGoodies(goodies, 4);
        expect(result.minDiff).toBe(3121);
        expect(result.selectedGoodies.map(g => g.name)).toEqual([
            'Fitbit Plus',
            'Microwave Oven',
            'Alexa',
            'Digital Camera'
        ]);
    });
});
