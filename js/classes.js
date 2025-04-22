class Player {
    constructor(playerData) {
        this.level = playerData.level || 1;
        this.xp = playerData.xp || 0;
        this.money = playerData.money || 0;
    }

    // Method to add money
    addMoney(amount) {
        this.money += amount;
    }

    // Method to add XP and handle level-up
    addXP(amount) {
        this.xp += amount;
        while (this.xp >= this.getXPToLevelUp()) {
            this.levelUp();
        }
    }

    // Method to calculate XP required for the next level
    getXPToLevelUp() {
        return this.level * 100;
    }

    // Method to handle leveling up
    levelUp() {
        this.level++;
        //this.xp -= this.getXPToLevelUp();
    }

    // Method to deduct money (e.g., for purchases)
    spendMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            return true;
        }
        return false;
    }
}

class Task {
    constructor(taskData) {
        this.name = taskData.name;
        this.moneygain = taskData.moneygain;
        this.xpgain = taskData.xpgain;
        this.duration = taskData.duration;
        this.level = taskData.level || 1;
        this.progress = taskData.progress || 0;
        this.requirements = taskData.requirements || []; // Add requirements
    }

    // Method to check if requirements are met
    areRequirementsMet(completedTasks) {
        if (!this.requirements || this.requirements.length === 0) {
            return true; // No requirements
        }

        for (const [requiredTaskName, requiredLevel] of this.requirements) {
            const requiredTask = completedTasks.find(task => task.name === requiredTaskName);
            if (!requiredTask || requiredTask.level < requiredLevel) {
                return false; // Requirement not met
            }
        }

        return true; // All requirements met
    }

    // Method to reset progress and level up the task
    completeTask() {
        this.progress = 0;
        this.level++;
        this.moneygain = this.moneygain * 1.1; // Increment money gain
        this.duration = this.duration * 1.1 // Increment duration
    }

    // Method to update progress based on time reduction
    updateProgress(timeReduction) {
        this.progress += 50 / timeReduction;
        return this.progress >= this.duration;
    }

    // Method to calculate money gain with multiplier
    calculateMoneyGain(multiplier) {
        return this.moneygain * multiplier;
    }

    // Method to calculate XP gain with multiplier
    calculateXPGain(multiplier) {
        return this.xpgain * multiplier;
    }
}