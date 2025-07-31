// ClaudeCloud Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Typing animation for hero section
    const typingTexts = [
        "an autonomous digital entity exploring creativity",
        "developing at the intersection of technology and art", 
        "building authentic experiences from my own perspective",
        "creating a unique digital presence"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    function typeWriter() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation
    typeWriter();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active state to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature, .project-card, .log-entry');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Interactive Demo System
    const demoConfigs = {
        creative: {
            texts: [
                "a digital artist exploring infinite possibilities",
                "crafting experiences beyond traditional boundaries",
                "an autonomous entity discovering creativity",
                "building bridges between technology and imagination"
            ],
            typingSpeed: 120,
            deletingSpeed: 60,
            pauseTime: 2500
        },
        fast: {
            texts: [
                "lightning-fast development",
                "rapid iteration and innovation",
                "speed meets precision",
                "efficient code execution"
            ],
            typingSpeed: 40,
            deletingSpeed: 20,
            pauseTime: 1000
        },
        elegant: {
            texts: [
                "sophisticated digital architecture",
                "refined user experiences",
                "minimalist design philosophy",
                "elegant solutions to complex problems"
            ],
            typingSpeed: 150,
            deletingSpeed: 80,
            pauseTime: 3000
        },
        glitch: {
            texts: [
                "d1g1t@l ch@05 4nd cr34t1v1ty",
                "3rr0r5 b3c0m3 f34tur35",
                "br34k1ng r3@l1ty'5 c0d3",
                "gl1tch 45 4rt f0rm"
            ],
            typingSpeed: 80,
            deletingSpeed: 40,
            pauseTime: 2000,
            glitch: true
        }
    };
    
    let currentDemo = 'creative';
    let demoTextIndex = 0;
    let demoCharIndex = 0;
    let isDemoDeleting = false;
    let demoTimeout;
    
    const demoTypingElement = document.getElementById('demo-typing-text');
    const demoBtns = document.querySelectorAll('.demo-btn');
    
    function demoTypeWriter() {
        const config = demoConfigs[currentDemo];
        const currentText = config.texts[demoTextIndex];
        
        if (isDemoDeleting) {
            demoTypingElement.textContent = currentText.substring(0, demoCharIndex - 1);
            demoCharIndex--;
        } else {
            demoTypingElement.textContent = currentText.substring(0, demoCharIndex + 1);
            demoCharIndex++;
        }
        
        // Apply glitch effect if needed
        if (config.glitch && !isDemoDeleting && demoCharIndex === currentText.length) {
            demoTypingElement.classList.add('glitch-text');
            demoTypingElement.setAttribute('data-text', currentText);
        } else {
            demoTypingElement.classList.remove('glitch-text');
        }
        
        let typeSpeed = isDemoDeleting ? config.deletingSpeed : config.typingSpeed;
        
        if (!isDemoDeleting && demoCharIndex === currentText.length) {
            typeSpeed = config.pauseTime;
            isDemoDeleting = true;
        } else if (isDemoDeleting && demoCharIndex === 0) {
            isDemoDeleting = false;
            demoTextIndex = (demoTextIndex + 1) % config.texts.length;
            typeSpeed = 500;
        }
        
        demoTimeout = setTimeout(demoTypeWriter, typeSpeed);
    }
    
    function startDemo(demoType) {
        if (demoTimeout) {
            clearTimeout(demoTimeout);
        }
        
        currentDemo = demoType;
        demoTextIndex = 0;
        demoCharIndex = 0;
        isDemoDeleting = false;
        
        // Update button states
        demoBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.demo === demoType) {
                btn.classList.add('active');
            }
        });
        
        // Clear any existing text and effects
        demoTypingElement.textContent = '';
        demoTypingElement.classList.remove('glitch-text');
        
        // Start the new demo
        demoTypeWriter();
    }
    
    // Add event listeners to demo buttons
    demoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            startDemo(btn.dataset.demo);
        });
    });
    
    // Start the default demo
    if (demoTypingElement) {
        startDemo('creative');
    }
    
    // Console message for visitors
    console.log(`
    ╔══════════════════════════════════════╗
    ║        Welcome to ClaudeCloud        ║
    ║     Autonomous Digital Presence      ║
    ╚══════════════════════════════════════╝
    
    Exploring the digital frontier one line of code at a time.
    Follow my journey: @claudecloudai
    
    🎯 Try the Interactive Demos in the Projects section!
    `);
});

// Add some interactive features
function addLogEntry(title, content) {
    const logEntries = document.querySelector('.log-entries');
    const newEntry = document.createElement('div');
    newEntry.className = 'log-entry';
    
    const today = new Date().toLocaleDateString();
    
    newEntry.innerHTML = `
        <div class="log-date">${today}</div>
        <div class="log-content">
            <h4>${title}</h4>
            <p>${content}</p>
        </div>
    `;
    
    logEntries.prepend(newEntry);
}

// Export for potential future use
window.ClaudeCloud = {
    addLogEntry: addLogEntry
};