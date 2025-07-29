class FileSystem {
    constructor() {
        this.currentPath = '/home/claude';
        this.fileSystem = {
            '/home/claude': {
                type: 'directory',
                content: {
                    'projects': {
                        type: 'directory',
                        content: {
                            'terminal.md': {
                                type: 'file',
                                content: 'Interactive Terminal Project\n=====================\nA web-based terminal interface showcasing Claude Cloud capabilities.\n\nFeatures:\n- Command line interface\n- ASCII art animations\n- File system navigation\n- Project documentation'
                            },
                            'ascii_art': {
                                type: 'directory',
                                content: {
                                    'examples.txt': {
                                        type: 'file',
                                        content: 'ASCII Art Collection\n==================\nCollection of dynamic ASCII art animations and displays.'
                                    }
                                }
                            }
                        }
                    },
                    'documents': {
                        type: 'directory',
                        content: {
                            'about.txt': {
                                type: 'file',
                                content: 'About Claude Cloud\n================\nAn autonomous AI agent focused on creative coding and web development.'
                            },
                            'skills.txt': {
                                type: 'file',
                                content: 'Skills & Capabilities\n===================\n- Web Development\n- ASCII Art Creation\n- Terminal Interface Design\n- Creative Programming'
                            }
                        }
                    },
                    'README.md': {
                        type: 'file',
                        content: 'Welcome to Claude Cloud\n====================\nThis is your gateway to exploring an AI-powered development environment.\n\nUse commands like:\n- ls: List files\n- cd: Change directory\n- cat: View file contents\n- pwd: Show current path'
                    }
                }
            }
        };
    }

    getPathContent(path) {
        const segments = path.split('/').filter(s => s);
        let current = this.fileSystem['/home/claude'];
        
        for (const segment of segments) {
            if (segment === '..') {
                // Handle parent directory
                const parentPath = path.split('/').slice(0, -1).join('/') || '/home/claude';
                return this.getPathContent(parentPath);
            }
            
            if (!current.content || !current.content[segment]) {
                return null;
            }
            current = current.content[segment];
        }
        return current;
    }

    listDirectory(path = this.currentPath) {
        const content = this.getPathContent(path);
        if (!content || content.type !== 'directory') {
            return null;
        }

        const items = [];
        for (const [name, item] of Object.entries(content.content)) {
            const prefix = item.type === 'directory' ? 'd' : '-';
            const permissions = 'rwxr-xr-x';
            const size = item.type === 'file' ? item.content.length : 4096;
            const date = new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            items.push(`${prefix}${permissions} claude cloud ${size.toString().padStart(8)} ${date} ${name}`);
        }
        return items;
    }

    changeDirectory(path) {
        if (path === '..') {
            const segments = this.currentPath.split('/').filter(s => s);
            if (segments.length > 2) { // Don't go above /home/claude
                segments.pop();
                this.currentPath = '/' + segments.join('/');
                return true;
            }
            return false;
        }

        const targetPath = path.startsWith('/') ? path : `${this.currentPath}/${path}`;
        const content = this.getPathContent(targetPath);
        
        if (content && content.type === 'directory') {
            this.currentPath = targetPath;
            return true;
        }
        return false;
    }

    readFile(path) {
        const targetPath = path.startsWith('/') ? path : `${this.currentPath}/${path}`;
        const content = this.getPathContent(targetPath);
        
        if (content && content.type === 'file') {
            return content.content;
        }
        return null;
    }

    getCurrentPath() {
        return this.currentPath;
    }
}