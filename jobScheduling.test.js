const { jobScheduling } = require('./jobScheduling');

describe('Job Scheduling', () => {
    test('should return correct number of tasks and earnings for others', () => {
        const jobs = [
            { startTime: 900, endTime: 1030, profit: 100 },
            { startTime: 1000, endTime: 1200, profit: 500 },
            { startTime: 1100, endTime: 1200, profit: 300 }
        ];

        const result = jobScheduling(jobs);
        expect(result).toEqual([2, 400]);  // 2 jobs left, 400 earnings for others
    });

    test('should return correct number of tasks and earnings for another case', () => {
        const jobs = [
            { startTime: 900, endTime: 1000, profit: 250 },
            { startTime: 945, endTime: 1200, profit: 550 },
            { startTime: 1130, endTime: 1500, profit: 150 }
        ];

        const result = jobScheduling(jobs);
        expect(result).toEqual([2, 400]);  // 2 jobs left, 400 earnings for others
    });

    test('should handle single job case', () => {
        const jobs = [
            { startTime: 900, endTime: 1000, profit: 100 }
        ];

        const result = jobScheduling(jobs);
        expect(result).toEqual([0, 0]);  // John takes the only job, 0 jobs left
    });
});
