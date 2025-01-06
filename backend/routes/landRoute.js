// routes/landRoute.js
const express = require("express");
const router = express.Router();
const Land = require("../models/land");

// Get all land sections
router.get("/land", async (req, res) => {
  try {
    const lands = await Land.find();
    const transformedData = lands.reduce((acc, land) => {
      acc[land.section] = land.crops;
      return acc;
    }, {});
    res.json(transformedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific land section
router.get("/land/:section", async (req, res) => {
  try {
    const land = await Land.findOne({ section: req.params.section });
    if (!land) return res.status(404).json({ message: "Section not found" });
    res.json(land);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Add a new land section
router.post("/", async (req, res) => {
  const land = new Land({
    section: req.body.section,
    crops: req.body.crops || [],
  });
  try {
    const newLand = await land.save();
    res.status(201).json(newLand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new crop to a section
router.post("/:section/crops", async (req, res) => {
  try {
    const land = await Land.findOne({ section: req.params.section });
    if (!land) return res.status(404).json({ message: "Section not found" });

    const newCrop = {
      cropNameLand: req.body.cropNameLand,
      area: req.body.area,
      plantingDate: req.body.plantingDate,
      harvestDate: req.body.harvestDate,
      numberOfPlants: req.body.numberOfPlants,
    };

    land.crops.push(newCrop);
    await land.save();
    res.status(201).json(newCrop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update crop details
router.put("/:section/crops/:cropId", async (req, res) => {
  try {
    const land = await Land.findOne({ section: req.params.section });
    if (!land) return res.status(404).json({ message: "Section not found" });

    const crop = land.crops.id(req.params.cropId);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    // Update fields
    crop.cropNameLand = req.body.cropNameLand || crop.cropNameLand;
    crop.area = req.body.area || crop.area;
    crop.plantingDate = req.body.plantingDate || crop.plantingDate;
    crop.harvestDate = req.body.harvestDate || crop.harvestDate;
    crop.numberOfPlants =
      req.body.numberOfPlants !== undefined
        ? req.body.numberOfPlants
        : crop.numberOfPlants;

    await land.save();
    res.json(crop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



const { ObjectId } = require("mongoose").Types;

router.delete("/:section/crops/:cropId", async (req, res) => {
  try {
    const cropId = new ObjectId(req.params.cropId); // Convert cropId to ObjectId

    // Find the land section and pull the crop from the crops array
    const result = await Land.findOneAndUpdate(
      { section: req.params.section }, // Find the section
      { $pull: { crops: { _id: cropId } } }, // Remove the crop with the matching _id
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({ message: "Crop deleted successfully", land: result });
  } catch (err) {
    console.error("Error in delete route:", err);
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
