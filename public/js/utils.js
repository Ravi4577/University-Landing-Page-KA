// Utility Functions for University Landing Pages

/**
 * Show alert message to user
 * @param {string} message - The message to display
 * @param {string} type - Alert type: 'success', 'error', 'warning', 'info'
 * @param {string} containerId - ID of container to append alert to
 */
function showAlert(message, type = 'info', containerId = 'alertContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    container.innerHTML = '';
    container.appendChild(alert);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate Indian phone number (10 digits starting with 6-9)
 * @param {string} phone 
 * @returns {boolean}
 */
function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

/**
 * Validate form field and show error
 * @param {HTMLElement} field 
 * @param {function} validator 
 * @param {string} errorMessage 
 * @returns {boolean}
 */
function validateField(field, validator, errorMessage) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    if (!validator(field.value)) {
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
        return false;
    }
    
    formGroup.classList.remove('error');
    return true;
}

/**
 * Show loading state on button
 * @param {HTMLElement} button 
 * @param {boolean} loading 
 */
function setButtonLoading(button, loading) {
    if (loading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.innerHTML = '<span class="spinner"></span>Submitting...';
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || 'Submit';
    }
}

/**
 * Make API request with error handling
 * @param {string} url 
 * @param {object} options 
 * @returns {Promise}
 */
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

/**
 * Format currency in Indian Rupees
 * @param {number} amount 
 * @returns {string}
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Debounce function to limit execution rate
 * @param {function} func 
 * @param {number} wait 
 * @returns {function}
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Smooth scroll to element
 * @param {string} elementId 
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Copy text to clipboard
 * @param {string} text 
 * @returns {Promise}
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Copy failed:', error);
        return false;
    }
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showAlert,
        validateEmail,
        validatePhone,
        validateField,
        setButtonLoading,
        apiRequest,
        formatCurrency,
        debounce,
        smoothScrollTo,
        copyToClipboard
    };
}
