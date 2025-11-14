const express = require('express');
const router = express.Router();
const university1 = require('../data/university1.json');
const university2 = require('../data/university2.json');

// Get all universities (simple endpoint)
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: university1.university.id,
                name: university1.university.name,
                location: university1.university.location,
                link: '/university/jnu'
            },
            {
                id: university2.university.id,
                name: university2.university.name,
                location: university2.university.location,
                link: '/university/ashoka'
            }
        ]
    });
});

// Get university details (nested JSON)
router.get('/jnu', (req, res) => {
    res.json({
        success: true,
        data: university1.university
    });
});

router.get('/ashoka', (req, res) => {
    res.json({
        success: true,
        data: university2.university
    });
});

// Get specific course details by university and course ID
router.get('/:uniId/courses', (req, res) => {
    const { uniId } = req.params;
    let universityData;

    if (uniId === 'jnu') {
        universityData = university1.university;
    } else if (uniId === 'ashoka') {
        universityData = university2.university;
    } else {
        return res.status(404).json({
            success: false,
            message: 'University not found'
        });
    }

    res.json({
        success: true,
        universityName: universityData.name,
        data: universityData.courses
    });
});

// Get course-wise fees modal data
router.get('/:uniId/fees', (req, res) => {
    const { uniId } = req.params;
    let universityData;

    if (uniId === 'jnu') {
        universityData = university1.university;
    } else if (uniId === 'ashoka') {
        universityData = university2.university;
    } else {
        return res.status(404).json({
            success: false,
            message: 'University not found'
        });
    }

    const courseFees = universityData.courses.map(course => ({
        id: course.id,
        name: course.name,
        duration: course.duration,
        feeRange: `₹${course.fees.min.toLocaleString()} - ₹${course.fees.max.toLocaleString()} per year`,
        feesPerYear: course.fees.perYear,
        fourYearTotal: course.duration === '4 Years'
            ? `₹${(course.fees.max * 4).toLocaleString()}`
            : course.duration === '3 Years'
                ? `₹${(course.fees.max * 3).toLocaleString()}`
                : `₹${(course.fees.max * 2).toLocaleString()}`
    }));

    res.json({
        success: true,
        universityName: universityData.name,
        data: courseFees
    });
});

// Get placements data
router.get('/:uniId/placements', (req, res) => {
    const { uniId } = req.params;
    let universityData;

    if (uniId === 'jnu') {
        universityData = university1.university;
    } else if (uniId === 'ashoka') {
        universityData = university2.university;
    } else {
        return res.status(404).json({
            success: false,
            message: 'University not found'
        });
    }

    res.json({
        success: true,
        universityName: universityData.name,
        data: universityData.placements
    });
});

// Get facilities data
router.get('/:uniId/facilities', (req, res) => {
    const { uniId } = req.params;
    let universityData;

    if (uniId === 'jnu') {
        universityData = university1.university;
    } else if (uniId === 'ashoka') {
        universityData = university2.university;
    } else {
        return res.status(404).json({
            success: false,
            message: 'University not found'
        });
    }

    res.json({
        success: true,
        universityName: universityData.name,
        data: universityData.facilities
    });
});

module.exports = router;
