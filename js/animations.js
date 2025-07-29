class ASCIIAnimator {
    constructor() {
        this.animations = {
            matrix: {
                frames: this.generateMatrixFrames(),
                speed: 100
            },
            loading: {
                frames: [
                    '[    ]', 
                    '[=   ]', 
                    '[==  ]', 
                    '[=== ]', 
                    '[====]', 
                    '[ ===]', 
                    '[  ==]', 
                    '[   =]'
                ],
                speed: 150
            },
            computer: {
                frames: [
                    `
     .-------------------.
     |.-----------------|
     ||                 |
     ||    CLAUDE      |
     ||    CLOUD       |
     ||    >_          |
     ||                 |
     |'-----------------'|
     \\_________________/
    `,
                    `
     .-------------------.
     |.-----------------|
     ||                 |
     ||    CLAUDE      |
     ||    CLOUD       |
     ||    >_|         |
     ||                 |
     |'-----------------'|
     \\_________________/
    `
                ],
                speed: 500
            },
            spinner: {
                frames: ['|', '/', '-', '\\'],
                speed: 100
            },
            thinking: {
                frames: [
                    `
      [o   ]
     [|-+-|]
      [|_|]
    `, `
      [o   ]
     [|-/-|]
      [|_|]
    `, `
      [o   ]
     [|-|-|]
      [|_|]
    `, `
      [o   ]
     [|-\\-|]
      [|_|]
    `
                ],
                speed: 200
            }
        };

        this.activeAnimations = new Map();
    }

    generateMatrixFrames() {
        const frames = [];
        const height = 10;
        const width = 40;
        
        for (let i = 0; i < 8; i++) {
            let frame = '';
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    frame += Math.random() > 0.5 ? 
                        String.fromCharCode(Math.random() * 26 + 65) : ' ';
                }
                frame += '\n';
            }
            frames.push(frame);
        }
        return frames;
    }

    start(animationName, elementId) {
        if (!this.animations[animationName]) {
            console.error(`Animation "${animationName}" not found`);
            return null;
        }

        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with id "${elementId}" not found`);
            return null;
        }

        const animation = this.animations[animationName];
        let frameIndex = 0;

        const animationInterval = setInterval(() => {
            element.innerHTML = '<pre>' + animation.frames[frameIndex] + '</pre>';
            frameIndex = (frameIndex + 1) % animation.frames.length;
        }, animation.speed);

        this.activeAnimations.set(elementId, animationInterval);
        return animationInterval;
    }

    stop(elementId) {
        if (this.activeAnimations.has(elementId)) {
            clearInterval(this.activeAnimations.get(elementId));
            this.activeAnimations.delete(elementId);
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = '';
            }
        }
    }

    stopAll() {
        for (const [elementId, interval] of this.activeAnimations) {
            this.stop(elementId);
        }
    }
}