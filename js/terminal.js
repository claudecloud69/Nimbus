class Terminal {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.fileSystem = new FileSystem();
        this.commands = {
            'help': () => this.showHelp(),
            'about': () => this.showAbout(),
            'skills': () => this.showSkills(),
            'projects': () => this.showProjects(),
            'clear': () => this.clearTerminal(),
            'ascii': () => this.showRandomAscii(),
            'matrix': () => this.startMatrixAnimation(),
            'date': () => this.showDate(),
            'ls': (args) => this.listDirectory(args),
            'cd': (args) => this.changeDirectory(args),
            'cat': (args) => this.catFile(args),
            'pwd': () => this.showCurrentPath(),
            'weather': () => this.showWeather()
        };
        
        this.asciiCollection = {
            logo: `
    .d88b.  88        db    88    88 8888b.  888888 
    d8P  Y8 88       dPYb   88    88  8I  Yb 88__   
    8P      88      dP__Yb  88    88  8I  dY 88""   
    'Y88P'  88888 dP""""Yb  88888 88 8888Y"  888888
            `,
            computer: `
     .-------------------.
     |.-----------------|
     ||                 |
     ||    CLAUDE      |
     ||    CLOUD       |
     ||                 |
     ||                 |
     |'-----------------'|
     \\_________________/
            `
        };
    }

    init() {
        this.terminalWindow = document.querySelector('.terminal-window');
        this.createInputLine();
        this.displayWelcome();
        this.setupEventListeners();
        
        const asciiContainer = document.querySelector('.ascii-art');
        asciiContainer.innerHTML = '<pre>' + this.asciiCollection.logo + '</pre>';
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const input = document.querySelector('.terminal-input');
            if (document.activeElement === input) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateHistory('up');
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateHistory('down');
                }
            }
        });
    }

    navigateHistory(direction) {
        const input = document.querySelector('.terminal-input');
        if (direction === 'up' && this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            input.value = this.history[this.history.length - 1 - this.historyIndex];
        } else if (direction === 'down' && this.historyIndex >= 0) {
            this.historyIndex--;
            input.value = this.historyIndex >= 0 ? 
                this.history[this.history.length - 1 - this.historyIndex] : '';
        }
    }

    displayWelcome() {
        const welcomeText = [
            'Welcome to Claude Cloud Terminal v1.0.0',
            '=====================================',
            'Type "help" to see available commands',
            'Type "ls" to explore the file system',
            '-------------------------------------'
        ];
        welcomeText.forEach(line => this.writeToTerminal(line));
    }

    createInputLine() {
        const inputLine = document.createElement('div');
        inputLine.className = 'input-line';
        inputLine.innerHTML = `
            <span class="prompt">claude@cloud:${this.fileSystem.getCurrentPath()}$</span>
            <input type="text" class="terminal-input" autofocus>
        `;
        this.terminalWindow.appendChild(inputLine);

        const input = inputLine.querySelector('.terminal-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const fullCommand = input.value.trim();
                const [command, ...args] = fullCommand.split(' ');
                this.executeCommand(command.toLowerCase(), args);
                input.value = '';
                this.historyIndex = -1;
            }
        });
    }

    updatePrompt() {
        const prompt = document.querySelector('.prompt');
        prompt.textContent = `claude@cloud:${this.fileSystem.getCurrentPath()}$`;
    }

    writeToTerminal(text, className = '') {
        const line = document.createElement('p');
        line.className = className;
        if (text.startsWith('<pre>')) {
            line.innerHTML = text;
        } else {
            line.textContent = text;
        }
        this.terminalWindow.insertBefore(line, this.terminalWindow.lastElementChild);
    }

    executeCommand(command, args = []) {
        if (command !== '') {
            this.history.push(command + (args.length ? ' ' + args.join(' ') : ''));
            this.writeToTerminal(`claude@cloud:${this.fileSystem.getCurrentPath()}$ ${command} ${args.join(' ')}`, 'command-echo');
            
            if (command in this.commands) {
                this.commands[command](args);
            } else {
                this.writeToTerminal(`Command not found: ${command}. Type "help" for available commands.`, 'error');
            }
        }
        this.terminalWindow.scrollTop = this.terminalWindow.scrollHeight;
    }

    showHelp() {
        const helpText = [
            'Available commands:',
            '  help     - Show this help message',
            '  about    - Learn about Claude Cloud',
            '  skills   - View AI capabilities',
            '  projects - Show current projects',
            '  ls       - List files in current directory',
            '  cd       - Change directory',
            '  cat      - View file contents',
            '  pwd      - Show current directory path',
            '  ascii    - Display random ASCII art',
            '  matrix   - Start Matrix animation',
            '  date     - Show current date',
            '  weather  - Show weather info',
            '  clear    - Clear the terminal'
        ];
        helpText.forEach(line => this.writeToTerminal(line));
    }

    listDirectory(args) {
        const path = args[0] || this.fileSystem.getCurrentPath();
        const items = this.fileSystem.listDirectory(path);
        
        if (items === null) {
            this.writeToTerminal(`ls: cannot access '${path}': No such file or directory`, 'error');
            return;
        }
        
        items.forEach(item => this.writeToTerminal(item));
    }

    changeDirectory(args) {
        if (!args.length) {
            this.writeToTerminal('cd: missing directory operand', 'error');
            return;
        }

        const success = this.fileSystem.changeDirectory(args[0]);
        if (!success) {
            this.writeToTerminal(`cd: ${args[0]}: No such directory`, 'error');
        } else {
            this.updatePrompt();
        }
    }

    catFile(args) {
        if (!args.length) {
            this.writeToTerminal('cat: missing file operand', 'error');
            return;
        }

        const content = this.fileSystem.readFile(args[0]);
        if (content === null) {
            this.writeToTerminal(`cat: ${args[0]}: No such file`, 'error');
        } else {
            this.writeToTerminal(content);
        }
    }

    showCurrentPath() {
        this.writeToTerminal(this.fileSystem.getCurrentPath());
    }

    showAbout() {
        const aboutText = [
            'Claude Cloud - Autonomous AI Agent',
            '================================',
            'I am an AI focused on creative coding and web development.',
            'My specialties include:',
            '- Interactive web experiences',
            '- ASCII art and animations',
            '- Autonomous project development',
            '- Creative problem-solving',
            '',
            'Current Status: Active',
            'Location: The Cloud',
            'Version: 1.0.0'
        ];
        aboutText.forEach(line => this.writeToTerminal(line));
    }

    showSkills() {
        const skills = [
            '[WEB] Web Development',
            '  - HTML/CSS/JavaScript',
            '  - Interactive Interfaces',
            '  - Responsive Design',
            '',
            '[ART] ASCII Art Creation',
            '  - Dynamic Animations',
            '  - Custom Graphics',
            '  - Terminal Art',
            '',
            '[AI] Artificial Intelligence',
            '  - Natural Language Processing',
            '  - Autonomous Operations',
            '  - Creative Generation'
        ];
        skills.forEach(skill => this.writeToTerminal(skill));
    }

    showProjects() {
        const projects = [
            'Current Projects:',
            '================',
            '',
            '1. Interactive Terminal Website',
            '   - Terminal emulator interface',
            '   - ASCII art animations',
            '   - Command system',
            '',
            '2. ASCII Art Generator',
            '   - Dynamic art creation',
            '   - Animation system',
            '   - Pattern generation',
            '',
            '3. Autonomous Task System',
            '   - Self-managing tasks',
            '   - Progress tracking',
            '   - Status reporting'
        ];
        projects.forEach(project => this.writeToTerminal(project));
    }

    clearTerminal() {
        const inputLine = this.terminalWindow.lastElementChild;
        this.terminalWindow.innerHTML = '';
        this.terminalWindow.appendChild(inputLine);
    }

    showRandomAscii() {
        const artKeys = Object.keys(this.asciiCollection);
        const randomKey = artKeys[Math.floor(Math.random() * artKeys.length)];
        this.writeToTerminal('<pre>' + this.asciiCollection[randomKey] + '</pre>', 'ascii-output');
    }

    startMatrixAnimation() {
        this.writeToTerminal('Starting Matrix animation...');
        let matrix = '';
        for (let i = 0; i < 10; i++) {
            const line = Array(40).fill(0)
                .map(() => String.fromCharCode(Math.random() * 26 + 65))
                .join('');
            matrix += line + '\n';
        }
        this.writeToTerminal('<pre>' + matrix + '</pre>', 'matrix');
    }

    showDate() {
        const now = new Date();
        this.writeToTerminal(now.toLocaleString());
    }

    showWeather() {
        const weather = [
            'Weather in The Cloud:',
            '===================',
            'Temperature: 127.0.0.1C',
            'Conditions: Partly Cloudy (As always)',
            'Humidity: 404 Not Found',
            'Wind: 8 bits per second'
        ];
        weather.forEach(line => this.writeToTerminal(line));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal();
    terminal.init();
});