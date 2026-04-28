// AI Studio Apps Interactive Features
// Search, Filter, and Modal functionality

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFilters();
    initializeAppCards();
    addLoadingStates();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('app-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterApps(searchTerm);
    });
}

// Filter apps by search term
function filterApps(searchTerm) {
    const appCards = document.querySelectorAll('.app-card');
    let visibleCount = 0;
    
    appCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.querySelector('.category')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    updateResultsCount(visibleCount);
}

// Category filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
            
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterByCategory(category) {
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        const cardCategory = card.querySelector('.category')?.textContent.toLowerCase() || '';
        
        if (category === 'all' || cardCategory === category.toLowerCase()) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Interactive app cards
function initializeAppCards() {
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        // Add click to launch
        card.addEventListener('click', function(e) {
            if (!e.target.matches('a')) {
                const link = this.querySelector('a');
                if (link) link.click();
            }
        });
        
        // Add hover effect data
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Loading states for app links
function addLoadingStates() {
    const appLinks = document.querySelectorAll('.app-card a');
    
    appLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.innerHTML = 'Launching... ⏳';
            this.style.opacity = '0.7';
        });
    });
}

// Update results count
function updateResultsCount(count) {
    const counter = document.getElementById('results-count');
    if (counter) {
        counter.textContent = `Showing ${count} tools`;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+K or Cmd+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('app-search')?.focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('app-search');
        if (searchInput) {
            searchInput.value = '';
            filterApps('');
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .app-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .filter-btn {
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        border: 1px solid rgba(255,255,255,0.3);
        background: transparent;
        color: white;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: rgba(78, 205, 196, 0.3);
        border-color: #4ecdc4;
    }
`;
document.head.appendChild(style);
