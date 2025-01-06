const express = require('express');
const router = express.Router();
const Crop = require('../models/Cropmanagementmodel');
const uniqid = require("uniqid");
const { body, validationResult } = require("express-validator");



// Get all crops with filtering
router.get('/', async (req, res) => {
  try {
    const { search, cropType, soilType } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { cropName: new RegExp(search, 'i') },
        { scientificName: new RegExp(search, 'i') }
      ];
    }

    if (cropType) {
      query.cropType = cropType;
    }

    if (soilType) {
      query.soilTypePreference = soilType;
    }

    const crops = await Crop.find(query).sort({ createdAt: -1 });
    res.json(crops);
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single crop
router.get('/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    res.json(crop);
  } catch (error) {
    console.error('Error fetching crop:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Post

router.post(
  "/",  // Make sure this matches your frontend URL
  [
    body("cropName").notEmpty().withMessage("Crop name is required"),
    body("cropType").notEmpty().withMessage("Crop type is required"),
    body("growthCycle").isNumeric().withMessage("Growth cycle must be a number"),
    body("expectedYieldValue").isNumeric().withMessage("Expected yield value must be a number"),
    body("expectedYieldUnit").notEmpty().withMessage("Expected yield unit is required"),
    body("fertilizerType").notEmpty().withMessage("Fertilizer type is required"),
    body("fertilizerQuantity").isNumeric().withMessage("Fertilizer quantity must be a number"),
    body("fertilizerFrequency").notEmpty().withMessage("Fertilizer frequency is required")
  ],
  async (req, res) => {
    try {
      // Log the entire request for debugging
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);

      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: errors.array() 
        });
      }

      // Prepare crop data without attachments
      const cropData = {
        cropName: req.body.cropName,
        scientificName: req.body.scientificName || '',
        cropType: req.body.cropType,
        growthCycle: Number(req.body.growthCycle),
        optimalGrowingConditions: req.body.optimalGrowingConditions || '',
        soilTypePreference: req.body.soilTypePreference || '',
        expectedYieldValue: req.body.expectedYieldValue,
        expectedYieldUnit: req.body.expectedYieldUnit,
        fertilizerType: req.body.fertilizerType || '',
        fertilizerQuantity: req.body.fertilizerQuantity ? Number(req.body.fertilizerQuantity) : null,
        fertilizerFrequency: req.body.fertilizerFrequency || '',
        harvestFrequency: req.body.harvestFrequency || '',
        compatibleCrops: req.body.compatibleCrops ? req.body.compatibleCrops.split(',').map(crop => crop.trim()) : []
      };

      console.log('Preparing to save crop data:', cropData);

      const crop = new Crop(cropData);
      const savedCrop = await crop.save();
      
      console.log('Crop saved successfully:', savedCrop);
      res.status(201).json(savedCrop);
    } catch (error) {
      console.error('Detailed error:', error);
      res.status(500).json({ 
        message: "Server error", 
        error: error.message 
      });
    }
  }
);



// Update crop
router.put('/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Update the crop fields directly from req.body
    crop.cropName = req.body.cropName;
    crop.scientificName = req.body.scientificName || '';
    crop.cropType = req.body.cropType;
    crop.growthCycle = Number(req.body.growthCycle);
    crop.optimalGrowingConditions = req.body.optimalGrowingConditions || '';
    crop.soilTypePreference = req.body.soilTypePreference || '';
    crop.expectedYieldValue = Number(req.body.expectedYieldValue);
    crop.expectedYieldUnit = req.body.expectedYieldUnit;
    crop.fertilizerType = req.body.fertilizerType || '';
    crop.fertilizerQuantity = Number(req.body.fertilizerQuantity) || null;
    crop.fertilizerFrequency = req.body.fertilizerFrequency || '';
    crop.harvestFrequency = req.body.harvestFrequency || '';

    // Handle compatibleCrops as either an array or a string
    if (Array.isArray(req.body.compatibleCrops)) {
      crop.compatibleCrops = req.body.compatibleCrops;
    } else if (typeof req.body.compatibleCrops === 'string') {
      crop.compatibleCrops = req.body.compatibleCrops
        .split(',')
        .map(crop => crop.trim())
        .filter(crop => crop !== '');
    } else {
      crop.compatibleCrops = [];
    }

    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } catch (error) {
    console.error('Error updating crop:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});



const mongoose = require('mongoose');

router.delete('/:id', async (req, res) => {
  try {
    const cropId = req.params.id;
    console.log(`Delete request received for ID: ${cropId}`);

    if (!mongoose.Types.ObjectId.isValid(cropId)) {
      console.error(`Invalid ID format: ${cropId}`);
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const result = await Crop.findByIdAndDelete(cropId);

    if (!result) {
      console.error(`Crop not found for ID: ${cropId}`);
      return res.status(404).json({ message: 'Crop not found' });
    }

    console.log(`Crop with ID ${cropId} deleted successfully.`);
    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    console.error('Error during crop deletion:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;