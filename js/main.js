// Game data structure
let gameData = {
    tick: 0,
    user: {
        level: 1,
        xp: 0,
        money: 0,
    },
    botnet: {
        count: 0,
        cost: settings.botnet.startingCost,
    },
    proxy: {
        count: 0,
        cost: settings.proxy.startingCost,
    },
    miner: {
        count: 0,
        cost: settings.miner.startingCost,
    },
    tasks: {
        greenHat: settings.tasks.greenHat.map((task) => ({ ...task, level: 1, progress: 0 })),
        blackHat: settings.tasks.blackHat.map((task) => ({ ...task, level: 1, progress: 0 })),
    },
};

const map = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Od", "Nd", "V", "Uv", "Dv", "Tv",
    "Qav", "Qiv", "Sxv", "Spv", "Ov", "Nv", "Tr", "Ut", "Dt", "Tt"];

const outputAsCookies = (number) => {
if (number < 1000) return number.toString();
//if (number < 1000) return number.toFixed(2).toString();

let log = Math.log10(number);
let div = log - log % 3;
let index = div / 3;
while (index >= map.length) {
    // ran out of map elements
    index -= 1;
    div -= 3;
}

//return (number / Math.pow(10, div)).toPrecision(3) + " " + map[index];
return (number / Math.pow(10, div)).toFixed(2) + " " + map[index];
};


// Load saved data from localStorage
function loadGameData() {
    const savedData = localStorage.getItem("hackerGameData");
    if (savedData) {
        gameData = JSON.parse(savedData);
    }
}

// Save data to localStorage
function saveGameData() {
    localStorage.setItem("hackerGameData", JSON.stringify(gameData));
}

// Update UI
function updateUI() {
    gameData.tick++;
    document.getElementById("tick").innerText = gameData.tick;
    document.getElementById("user-level").innerText = gameData.user.level;
    document.getElementById("user-xp").innerText = `${outputAsCookies(gameData.user.xp)} / ${gameData.user.level * 100}`;
    document.getElementById("user-money").innerText = outputAsCookies(gameData.user.money);
    document.getElementById("botnet-count").innerText = gameData.botnet.count;
    document.getElementById("proxy-count").innerText = gameData.proxy.count;
    document.getElementById("miner-count").innerText = gameData.miner.count;
    document.getElementById("botnet-cost").innerText = `$${outputAsCookies(gameData.botnet.cost)}`;
    document.getElementById("proxy-cost").innerText = `$${outputAsCookies(gameData.proxy.cost)}`;
    document.getElementById("miner-cost").innerText = `$${outputAsCookies(gameData.miner.cost)}`;

    updateTasksUI("green-hat-tasks", gameData.tasks.greenHat);
    updateTasksUI("black-hat-tasks", gameData.tasks.blackHat);

    document.getElementById("buy-botnet").disabled = gameData.user.money < gameData.botnet.cost;
    document.getElementById("buy-proxy").disabled = gameData.user.money < gameData.proxy.cost;
    document.getElementById("buy-miner").disabled = gameData.user.money < gameData.miner.cost;
}

function updateTasksUI(containerId, tasks) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    tasks.forEach((task) => {
        const progressPercentage = (task.progress / task.duration) * 100;
        const timeRemaining = ((task.duration)- task.progress)
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.level}</td>
            <td>$${outputAsCookies(task.moneygain)} x ${outputAsCookies((Math.pow(settings.miner.gainMultiplier, gameData.miner.count)))} = ${outputAsCookies(task.moneygain * Math.pow(settings.miner.gainMultiplier, gameData.miner.count))}</td>
            <td>${task.xpgain}xp x ${outputAsCookies(Math.pow(settings.proxy.xpMultiplier, gameData.proxy.count))} = ${outputAsCookies((task.xpgain * Math.pow(settings.proxy.xpMultiplier, gameData.proxy.count)))}</td>
            <td>${outputAsCookies((task.duration))}</td>
            <td>${outputAsCookies((50 / Math.pow(settings.botnet.timeReduction, gameData.botnet.count)))}</td>
            <td>${outputAsCookies(timeRemaining)}</td>
            <td>${outputAsCookies(task.progress)}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${progressPercentage}%;"></div>
                </div>
            </td>
        `;
        container.appendChild(row);
    });
}

// Game loop
function gameLoop() {
    [...gameData.tasks.greenHat, ...gameData.tasks.blackHat].forEach((task) => {
    //[...gameData.tasks.greenHat].forEach((task) => {
        //task.progress += 50 * Math.pow(settings.botnet.timeReduction, gameData.botnet.count);
        task.progress += 50 / Math.pow(settings.botnet.timeReduction, gameData.botnet.count);
        if (task.progress >= task.duration) {
            task.progress = 0;
            gameData.user.money += task.moneygain * Math.pow(settings.miner.gainMultiplier, gameData.miner.count);
            gameData.user.xp += task.xpgain * Math.pow(settings.proxy.xpMultiplier, gameData.proxy.count);;

            task.level++;
            task.moneygain += 10;
            task.duration += 2000;

            if (gameData.user.xp >= gameData.user.level * 100) {
                gameData.user.level++;
                gameData.user.xp = 0;
            }
        }
    });

    saveGameData();
    updateUI();
}

// Purchase botnet
document.getElementById("buy-botnet").addEventListener("click", () => {
    if (gameData.user.money >= gameData.botnet.cost) {
        gameData.user.money -= gameData.botnet.cost;
        gameData.botnet.count++;
        gameData.botnet.cost += settings.botnet.costIncrease;
        saveGameData();
        updateUI();
    }
});

// Purchase proxy
document.getElementById("buy-proxy").addEventListener("click", () => {
    if (gameData.user.money >= gameData.proxy.cost) {
        gameData.user.money -= gameData.proxy.cost;
        gameData.proxy.count++;
        gameData.proxy.cost += settings.proxy.costIncrease;
        saveGameData();
        updateUI();
    }
});

// Purchase miner
document.getElementById("buy-miner").addEventListener("click", () => {
    if (gameData.user.money >= gameData.miner.cost) {
        gameData.user.money -= gameData.miner.cost;
        gameData.miner.count++;
        gameData.miner.cost += settings.miner.costIncrease;
        saveGameData();
        updateUI();
    }
});

// Reset game
document.getElementById("reset-button").addEventListener("click", () => {
    localStorage.removeItem("hackerGameData");
    window.location.reload();
});

// Initialize game
loadGameData();
updateUI();
setInterval(gameLoop,1000/60);