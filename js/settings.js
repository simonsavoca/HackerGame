const settings = {
    botnet: {
        startingCost: 1000,
        timeReduction: 0.9,
        costIncrease: 1000,
    },
    proxy: {
        startingCost: 1000,
        xpMultiplier: 1.1,
        costIncrease: 1000,
    },
    miner: {
        startingCost: 1000,
        gainMultiplier: 1.1,
        costIncrease: 1000,
    },
    tasks: {
        greenHat: [
            { name: "Study", moneygain: 1, xpgain: 1, duration: 1000 },
            { name: "Developpment", moneygain: 5, xpgain: 5, duration: 5000, requirements: [["Study", 10]] },
        //    { name: "Training", moneygain: 10, xpgain: 10, duration: 10000 },
        //    { name: "Certification", moneygain: 15, xpgain: 15, duration: 15000 },
        ],
        blackHat: [
            { name: "Phishing", moneygain: 15, xpgain: 5, duration: 10000, requirements: [["Study", 15], ["Developpment", 15]] },
        //    { name: "Exploit", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Crypto", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Ransomeware", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Malware", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Dark Web", moneygain: 15, xpgain: 5, duration: 10000 },
        ],
        // whiteHat: [
        //    { name: "Fix Exploit", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Detection", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Honeypot", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Firewall", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Hardware", moneygain: 15, xpgain: 5, duration: 10000 },
        //],
        // blueHat: [
        //    { name: "Phishing", moneygain: 15, xpgain: 5, duration: 10000 },
        //],
        // redHat: [
         //    { name: "Phishing", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Exploit", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Crypto", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Ransomeware", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Malware", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Dark Web", moneygain: 15, xpgain: 5, duration: 10000 },

        //],
        // greyHat: [
        //    { name: "Fix bug", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Training", moneygain: 15, xpgain: 5, duration: 10000 },
        //    { name: "Patching", moneygain: 15, xpgain: 5, duration: 10000 },
        //],
    },
};

// Game data structure
let gameData = {
    tick: 0,
    user: new Player({
        level: 1,
        xp: 0,
        money: 0,
    }),
    botnet: {
        count: 1,
        cost: settings.botnet.startingCost,
    },
    proxy: {
        count: 1,
        cost: settings.proxy.startingCost,
    },
    miner: {
        count: 1,
        cost: settings.miner.startingCost,
    },
    tasks: {
        greenHat: settings.tasks.greenHat.map(taskData => new Task(taskData)),
        blackHat: settings.tasks.blackHat.map(taskData => new Task(taskData)),
    },
    completedTasks: [], // Add this to track completed tasks
};
