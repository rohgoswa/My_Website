// ==========================================
// ROBUST SCRIPT.JS (Fixes Local File Issues)
// ==========================================

// 1. Safe Theme Application (Runs immediately)
(function() {
    try {
        // Try to get saved theme, but don't crash if it fails
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            document.documentElement.setAttribute('data-theme', localTheme);
        }
    } catch (err) {
        console.log("Note: LocalStorage is blocked (normal when running locally).");
    }
})();

// 2. Wait for Page Load
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script initialized.");

    // --- THEME TOGGLE LOGIC ---
    const toggleBtn = document.getElementById('theme-toggle');
    
    if (toggleBtn) {
        console.log("Theme toggle button connected.");
        
        toggleBtn.addEventListener('click', function() {
            // 1. Get current theme
            let current = document.documentElement.getAttribute('data-theme');
            
            // 2. Determine new theme
            // If currently dark, switch to light. Otherwise, switch to dark.
            const target = current === 'dark' ? 'light' : 'dark';
            
            // 3. Apply the change visually (This part always works)
            document.documentElement.setAttribute('data-theme', target);
            
            // 4. Try to save it (This part might fail locally, and that's okay)
            try {
                localStorage.setItem('theme', target);
                console.log("Theme saved:", target);
            } catch (err) {
                console.warn("Could not save theme preference (running locally).");
            }
        });
    } else {
        console.error("Error: Button with ID 'theme-toggle' not found.");
    }

    // --- MOBILE MENU LOGIC ---
    const mobileBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Optional: Animate the hamburger icon
            const spans = mobileBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                // You can add specific transform styles here if needed
                // or handle it via CSS classes
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});