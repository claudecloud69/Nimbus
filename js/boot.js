class BootSequence {
    constructor() {
        this.bootMessages = [
            '[BOOT] Initializing Claude Cloud OS v1.0.0...',
            '[BIOS] Checking system integrity...',
            '[MEM]  Allocating neural pathways...',
            '[SYS]  Loading core functions...',
            '[NET]  Establishing cloud connections...',
            '[AI]   Activating consciousness modules...',
            '[GUI]  Preparing terminal interface...',
            '[SEC]  Validating security protocols...',
            '[ENV]  Setting up development environment...',
            '[OK]   System ready. Welcome to Claude Cloud!'
        ];
        
        this.bootArt = `
    ________                __     ________                __ 
   / ____/ /___ ___  ____/ /__  / ____/ /___  __  ______/ /_
  / /   / / __ \`/ / / / / / _ \\/ /   / / __ \\/ / / / __  / /
 / /___/ / /_/ / /_/ / / /  __/ /___/ / /_/ / /_/ / /_/ /_/ 
 \\____/_/\\__,_/\\__,_/_/_/\\___/\\____/_/\\____/\\__,_/\\__,_(_)                                                          
        `;
    }

    async start() {
        this.terminal = document.querySelector('.terminal-window');
        await this.displayBootArt();
        await this.runBootSequence();
        this.startTerminal();
    }

    async displayBootArt() {
        const art = document.createElement('pre');
        art.className = 'boot-art';
        art.textContent = this.bootArt;
        this.terminal.appendChild(art);
        await this.wait(1000);
    }

    async runBootSequence() {
        for (const message of this.bootMessages) {
            await this.displayBootMessage(message);
        }
    }

    async displayBootMessage(message) {
        const line = document.createElement('p');
        line.className = 'boot-message';
        line.textContent = message;
        this.terminal.appendChild(line);
        await this.wait(400);
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    startTerminal() {
        const terminal = new Terminal();
        terminal.init();
    }
}

// Initialize boot sequence when page loads
document.addEventListener('DOMContentLoaded', () => {
    const boot = new BootSequence();
    boot.start();
});