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
            { name: "Developpment", moneygain: 5, xpgain: 5, duration: 5000, need: ['Study', 10] },
            { name: "Training", moneygain: 10, xpgain: 10, duration: 10000 },
            { name: "Certification", moneygain: 15, xpgain: 15, duration: 15000 },
        ],
        blackHat: [
            { name: "Phishing", moneygain: 15, xpgain: 5, duration: 10000 },
            { name: "Exploit", moneygain: 15, xpgain: 5, duration: 10000 },
            { name: "Crypto", moneygain: 15, xpgain: 5, duration: 10000 },
            { name: "Ransomeware", moneygain: 15, xpgain: 5, duration: 10000 },
            { name: "Malware", moneygain: 15, xpgain: 5, duration: 10000 },
            { name: "Dark Web", moneygain: 15, xpgain: 5, duration: 10000 },
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