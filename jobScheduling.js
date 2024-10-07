function jobScheduling(jobs) {
    // Sort jobs by their end time so we can maximize the number of non-overlapping jobs.
    jobs.sort((a, b) => a.endTime - b.endTime);

    const n = jobs.length;  // Number of jobs

    // dp[i] will store the maximum profit we can earn by considering jobs up to index i.
    const dp = Array(n).fill(0);

    // taskGroups[i] will store the group of jobs that leads to the maximum profit up to index i.
    const taskGroups = Array(n).fill(null).map(() => []);

    // The first job alone has its own profit and is the only job in its group.
    dp[0] = jobs[0].profit;
    taskGroups[0].push(jobs[0]);

    // Helper function to find the last non-overlapping job before the current job.
    function findLastNonConflict(index) {
        // Check each job before the current one to find the last non-conflicting job.
        for (let i = index - 1; i >= 0; i--) {
            if (jobs[i].endTime <= jobs[index].startTime) {
                return i;
            }
        }
        return -1;  // No non-conflicting job found
    }

    // Process all jobs from the second job (index 1) to the last one.
    for (let i = 1; i < n; i++) {
        let includeProfit = jobs[i].profit;  // Profit if we include the current job
        let group = [jobs[i]];  // The current job starts a new group

        // Find the last non-conflicting job and add its profit to the current one.
        const lastNonConflict = findLastNonConflict(i);
        if (lastNonConflict !== -1) {
            includeProfit += dp[lastNonConflict];
            group = [...taskGroups[lastNonConflict], jobs[i]];  // Combine groups
        }

        // Choose the better option: either take the current job (and its group) or skip it.
        if (includeProfit > dp[i - 1]) {
            dp[i] = includeProfit;  // Update max profit
            taskGroups[i] = group;  // Update task group
        } else {
            dp[i] = dp[i - 1];  // Max profit remains the same if we skip the current job
            taskGroups[i] = [...taskGroups[i - 1]];  // Copy the previous group
        }
    }

    // The maximum profit John can earn is the last value in the dp array.
    const maxProfit = dp[n - 1];
    const selectedTasks = taskGroups[n - 1];  // Jobs John selects

    // Calculate how many jobs and earnings are left for others
    const remainingJobs = jobs.filter(job => !selectedTasks.includes(job));
    const remainingProfit = remainingJobs.reduce((sum, job) => sum + job.profit, 0);

    return [remainingJobs.length, remainingProfit];  // Return number of jobs and profit left for others
}

// Test Examples Bundled as an Array
const testCases = [
    {
        description: "Test Case 1: Basic Example",
        jobs: [
            { startTime: 900, endTime: 1030, profit: 100 },
            { startTime: 1000, endTime: 1200, profit: 500 },
            { startTime: 1100, endTime: 1200, profit: 300 }
        ],
        expected: [2, 400]
    },
    {
        description: "Test Case 2: Non-overlapping Jobs",
        jobs: [
            { startTime: 800, endTime: 1000, profit: 200 },
            { startTime: 1030, endTime: 1200, profit: 300 },
            { startTime: 1230, endTime: 1400, profit: 400 }
        ],
        expected: [0, 0]  // John takes all jobs
    },
    {
        description: "Test Case 3: All Jobs Overlap",
        jobs: [
            { startTime: 900, endTime: 1200, profit: 400 },
            { startTime: 1000, endTime: 1300, profit: 600 },
            { startTime: 1100, endTime: 1400, profit: 500 }
        ],
        expected: [2, 900]  // John takes the 2nd job with the highest profit
    },
    {
        description: "Test Case 4: Single Job",
        jobs: [
            { startTime: 900, endTime: 1030, profit: 150 }
        ],
        expected: [0, 0]  // John takes the only job
    },
    {
        description: "Test Case 5: Overlapping and Non-overlapping Jobs",
        jobs: [
            { startTime: 900, endTime: 1030, profit: 200 },
            { startTime: 1000, endTime: 1100, profit: 300 },
            { startTime: 1100, endTime: 1300, profit: 250 },
            { startTime: 1200, endTime: 1300, profit: 350 }
        ],
        expected: [2, 450]  // John takes the 2nd and 4th jobs
    },
    {
        description: "Test Case 6: Complex Job Timings",
        jobs: [
            { startTime: 900, endTime: 1000, profit: 200 },
            { startTime: 930, endTime: 1030, profit: 150 },
            { startTime: 1030, endTime: 1130, profit: 300 },
            { startTime: 1130, endTime: 1230, profit: 350 }
        ],
        expected: [1, 150]  // John takes the 1st, 3rd, and 4th jobs
    }
];

// Execute All Test Cases
testCases.forEach((testCase, index) => {
    const result = jobScheduling(testCase.jobs);
    console.log(`\n${testCase.description}`);
    console.log(`Expected Output: Tasks: ${testCase.expected[0]}, Earnings: ${testCase.expected[1]}`);
    console.log(`Actual Output: Tasks: ${result[0]}, Earnings: ${result[1]}`);
    console.log(result[0] === testCase.expected[0] && result[1] === testCase.expected[1] ? "Test Passed!" : "Test Failed!");
});

module.exports = { jobScheduling }