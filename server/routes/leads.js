const express = require('express');
const router = express.Router();
const axios = require('axios');
const { body, validationResult } = require('express-validator');

// Store leads locally (for development/testing)
const leads = [];

// Validation middleware
const validateLead = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name should only contain letters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[6-9]\d{9}$/).withMessage('Please enter a valid 10-digit Indian phone number'),
    body('state')
        .trim()
        .notEmpty().withMessage('State is required')
        .isLength({ min: 2, max: 50 }).withMessage('State name must be between 2 and 50 characters'),
    body('courseInterested')
        .trim()
        .notEmpty().withMessage('Course interested is required')
        .isLength({ min: 2, max: 100 }).withMessage('Course name must be between 2 and 100 characters'),
    body('intakeYear')
        .trim()
        .notEmpty().withMessage('Intake year is required')
        .isInt({ min: 2024, max: 2030 }).withMessage('Please enter a valid intake year'),
    body('consent')
        .isBoolean().withMessage('Consent must be a boolean')
        .equals('true').withMessage('You must accept the consent to proceed')
];

// Submit lead form
router.post('/submit', validateLead, async (req, res, next) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }

        const { fullName, email, phone, state, courseInterested, intakeYear, consent } = req.body;

        const leadData = {
            id: Date.now().toString(),
            fullName,
            email,
            phone,
            state,
            courseInterested,
            intakeYear,
            consent,
            submittedAt: new Date().toISOString(),
            source: 'Landing Page'
        };

        // Store locally
        leads.push(leadData);

        // Send to Pipedream webhook if configured
        const pipedreamUrl = process.env.PIPEDREAM_WEBHOOK_URL;
        if (pipedreamUrl) {
            try {
                await axios.post(pipedreamUrl, leadData, {
                    timeout: 5000
                });
            } catch (pipedreamError) {
                console.error('Pipedream submission error:', pipedreamError.message);
                // Don't fail the request if Pipedream fails, just log it
            }
        }

        res.status(201).json({
            success: true,
            message: 'Lead submitted successfully! We will contact you soon.',
            leadId: leadData.id
        });

    } catch (error) {
        console.error('Lead submission error:', error);
        next(error); // Pass to global error handler
    }
});

// Get all leads (admin endpoint - for testing)
router.get('/', (req, res) => {
    res.json({
        success: true,
        totalLeads: leads.length,
        data: leads
    });
});

// Get lead by ID
router.get('/:leadId', (req, res) => {
    const lead = leads.find(l => l.id === req.params.leadId);
    if (!lead) {
        return res.status(404).json({
            success: false,
            message: 'Lead not found'
        });
    }
    res.json({
        success: true,
        data: lead
    });
});

module.exports = router;
