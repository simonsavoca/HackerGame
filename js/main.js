// Load saved data from localStorage
function loadGameData() {
    const savedData = localStorage.getItem("hackerGameData");
    if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Reinitialize tasks as Task instances
        parsedData.tasks.greenHat = parsedData.tasks.greenHat.map(taskData => new Task(taskData));
        parsedData.tasks.blackHat = parsedData.tasks.blackHat.map(taskData => new Task(taskData));

        // Reinitialize user as Player instance
        parsedData.user = new Player(parsedData.user);

        gameData = parsedData;
    }
}

// Save data to localStorage
function saveGameData() {
    localStorage.setItem("hackerGameData", JSON.stringify(gameData));
}

// Update UI
function updateUI() {
    gameData.tick++;
    document.getElementById("tick").innerText = format(gameData.tick);
    document.getElementById("user-level").innerText = format(gameData.user.level, 0);
    document.getElementById("user-xp").innerText = `${format(gameData.user.xp, 0)} / ${format(gameData.user.level * 100, 0)}`;
    document.getElementById("user-money").innerText = `${format(gameData.user.money)}`;
    document.getElementById("botnet-count").innerText = gameData.botnet.count;
    document.getElementById("proxy-count").innerText = gameData.proxy.count;
    document.getElementById("miner-count").innerText = gameData.miner.count;
    document.getElementById("botnet-cost").innerText = `$${format(gameData.botnet.cost)}`;
    document.getElementById("proxy-cost").innerText = `$${format(gameData.proxy.cost)}`;
    document.getElementById("miner-cost").innerText = `$${format(gameData.miner.cost)}`;

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
        const isLocked = !task.areRequirementsMet(gameData.completedTasks); // Check if task is locked
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.level}</td>
            <td>$${format(task.moneygain)} x ${format((Math.pow(settings.miner.gainMultiplier, gameData.miner.count)))} = $${format(task.moneygain * Math.pow(settings.miner.gainMultiplier, gameData.miner.count))}</td>
            <td>${task.xpgain}xp x ${format(Math.pow(settings.proxy.xpMultiplier, gameData.proxy.count))} = ${format((task.xpgain * Math.pow(settings.proxy.xpMultiplier, gameData.proxy.count)))}xp</td>
            <td>${format((task.duration))}</td>
            <td>${format((50 / Math.pow(settings.botnet.timeReduction, gameData.botnet.count)))}</td>
            <td>${format(timeRemaining)}</td>
            <td>${format(task.progress)}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${progressPercentage}%;"></div>
                </div>
            </td>
        `;
        if (isLocked) {
            row.classList.add("table-secondary"); // Add a "locked" style
            row.querySelectorAll("td").forEach(cell => cell.style.opacity = "0.5");
        }
        container.appendChild(row);
    });
}

// Game loop
function gameLoop() {
    [...gameData.tasks.greenHat, ...gameData.tasks.blackHat].forEach((task) => {
        if (!task.areRequirementsMet(gameData.completedTasks)) {
            return; // Skip this iteration
        }
        if (task.updateProgress(Math.pow(settings.botnet.timeReduction, gameData.botnet.count))) {
            task.completeTask();            
            
            gameData.user.addMoney(task.calculateMoneyGain(Math.pow(settings.miner.gainMultiplier, gameData.miner.count)));
            gameData.user.addXP(task.calculateXPGain(Math.pow(settings.proxy.xpMultiplier, gameData.proxy.count)));
            
            if (gameData.user.xp >= gameData.user.getXPToLevelUp()) {
                gameData.user.levelUp();
            }
            // Add completed task to the list if not already present
            if (!gameData.completedTasks.includes(task)) {
                gameData.completedTasks.push(task);
            }
        }
    });
    updateUI();
    //saveGameData();
}

// Purchase botnet
document.getElementById("buy-botnet").addEventListener("click", () => {
    if (gameData.user.spendMoney(gameData.botnet.cost)) {
        gameData.botnet.count++;
        gameData.botnet.cost += settings.botnet.costIncrease;
        saveGameData();
        updateUI();
    }
});

// Purchase proxy
document.getElementById("buy-proxy").addEventListener("click", () => {
    if (gameData.user.spendMoney(gameData.proxy.cost)) {
        gameData.proxy.count++;
        gameData.proxy.cost += settings.proxy.costIncrease;
        saveGameData();
        updateUI();
    }
});

// Purchase miner
document.getElementById("buy-miner").addEventListener("click", () => {
    if (gameData.user.spendMoney(gameData.miner.cost)) {
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
var gameLoop = setInterval(gameLoop,1000/60);
var saveLoop = setInterval(saveGameData,3000);