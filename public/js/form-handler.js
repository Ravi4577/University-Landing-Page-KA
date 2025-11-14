// Enhanced Form Handling for University Landing Pages

(function () {
    'use strict';

    // Initialize form when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('leadForm');
        if (!form) return;

        const submitButton = form.querySelector('button[type="submit"]');
        const alertContainer = document.getElementById('formAlert') || createAlertContainer();

        // Add real-time validation
        addRealTimeValidation(form);

        // Handle form submission
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Clear previous alerts
            clearAlerts();

            // Validate all fields
            if (!validateForm(form)) {
                showAlert('Please fix the errors before submitting', 'error');
                return;
            }

            // Get form data
            const formData = getFormData(form);

            // Show loading state
            setButtonLoading(submitButton, true);

            try {
                // Submit to API
                const response = await fetch('/api/leads/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    showAlert(data.message || 'Thank you! We will contact you soon.', 'success');
                    form.reset();
                    // Scroll to top to show success message
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    // Handle validation errors from server
                    if (data.errors && Array.isArray(data.errors)) {
                        data.errors.forEach(error => {
                            showFieldError(form, error.field, error.message);
                        });
                        showAlert('Please fix the errors and try again', 'error');
                    } else {
                        showAlert(data.message || 'Failed to submit form', 'error');
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showAlert('Network error. Please check your connection and try again.', 'error');
            } finally {
                setButtonLoading(submitButton, false);
            }
        });
    });

    // Add real-time validation to form fields
    function addRealTimeValidation(form) {
        const fields = form.querySelectorAll('input, select, textarea');

        fields.forEach(field => {
            // Validate on blur
            field.addEventListener('blur', function () {
                validateField(field);
            });

            // Clear error on input
            field.addEventListener('input', function () {
                clearFieldError(field);
            });
        });
    }

    // Validate entire form
    function validateForm(form) {
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        let error = '';

        // Required check
        if (field.hasAttribute('required') && !value) {
            error = 'This field is required';
        }
        // Email validation
        else if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address';
            }
        }
        // Phone validation
        else if (name === 'phone' && value) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(value)) {
                error = 'Please enter a valid 10-digit phone number starting with 6-9';
            }
        }
        // Name validation
        else if (name === 'fullName' && value) {
            if (value.length < 2) {
                error = 'Name must be at least 2 characters';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                error = 'Name should only contain letters and spaces';
            }
        }
        // Consent validation
        else if (name === 'consent' && field.type === 'checkbox') {
            if (!field.checked) {
                error = 'You must accept the terms to proceed';
            }
        }

        if (error) {
            showFieldError(null, name, error, field);
            return false;
        }

        clearFieldError(field);
        return true;
    }

    // Show error for specific field
    function showFieldError(form, fieldName, message, fieldElement = null) {
        const field = fieldElement || (form && form.querySelector(`[name="${fieldName}"]`));
        if (!field) return;

        const formGroup = field.closest('.form-group') || field.parentElement;
        formGroup.classList.add('error');

        let errorElement = formGroup.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            field.parentElement.appendChild(errorElement);
        }

        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Clear error for specific field
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group') || field.parentElement;
        formGroup.classList.remove('error');

        const errorElement = formGroup.querySelector('.form-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Get form data as object
    function getFormData(form) {
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            // Convert checkbox to boolean
            if (form.querySelector(`[name="${key}"]`).type === 'checkbox') {
                data[key] = form.querySelector(`[name="${key}"]`).checked;
            } else {
                data[key] = value;
            }
        }

        return data;
    }

    // Show alert message
    function showAlert(message, type = 'info') {
        let container = document.getElementById('formAlert');
        if (!container) {
            container = createAlertContainer();
        }

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <strong>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</strong>
            ${message}
        `;

        container.innerHTML = '';
        container.appendChild(alert);

        // Auto-dismiss after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 300);
            }, 5000);
        }
    }

    // Clear all alerts
    function clearAlerts() {
        const container = document.getElementById('formAlert');
        if (container) {
            container.innerHTML = '';
        }
    }

    // Create alert container if it doesn't exist
    function createAlertContainer() {
        const container = document.createElement('div');
        container.id = 'formAlert';
        container.style.marginBottom = '1rem';

        const form = document.getElementById('leadForm');
        if (form) {
            form.parentElement.insertBefore(container, form);
        }

        return container;
    }

    // Set button loading state
    function setButtonLoading(button, loading) {
        if (loading) {
            button.disabled = true;
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<span class="spinner"></span> Submitting...';
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || 'Submit';
        }
    }

})();
