document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    // Theme toggle event
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Enhanced View More functionality
    const viewMoreButtons = document.querySelectorAll('.view-more');
    
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const detailsId = this.getAttribute('data-id');
            const detailsElement = document.getElementById(`details-${detailsId}`);
            const card = this.closest('.card');
            
            // Toggle the display of details
            if (detailsElement.style.display === 'none' || !detailsElement.style.display) {
                detailsElement.style.display = 'block';
                this.textContent = 'View Less';
                this.classList.add('active');
                
                // Smooth scroll to keep card in view if needed
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                detailsElement.style.display = 'none';
                this.textContent = 'View More';
                this.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for hero scroll indicator
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('main').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Add animation to cards when they come into view
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Handle view more button text toggle
    const viewMoreButtons = document.querySelectorAll('.view-more');
    
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);
            
            // Toggle button text
            if (targetElement.classList.contains('show')) {
                this.textContent = 'View More';
            } else {
                this.textContent = 'View Less';
                
                // Scroll to keep card in view if needed
                this.closest('.card').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    });
    
    // Close other open details when one is opened
    document.querySelectorAll('.image-details').forEach(detail => {
        detail.addEventListener('show.bs.collapse', function() {
            // Close all other open details
            document.querySelectorAll('.image-details.show').forEach(openDetail => {
                if (openDetail !== this) {
                    const collapseInstance = bootstrap.Collapse.getInstance(openDetail);
                    if (collapseInstance) {
                        collapseInstance.hide();
                    }
                    
                    // Update corresponding button text
                    const button = document.querySelector(`[data-bs-target="#${openDetail.id}"]`);
                    if (button) {
                        button.textContent = 'View More';
                    }
                }
            });
        });
    });
});