const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  filename: String,
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const cropSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
    trim: true
  },
  scientificName: {
    type: String,
    trim: true
  },
  cropType: {
    type: String,
    required: true,
    enum: ['Fruit', 'Vegetable', 'Spice', 'Grain', 'Oil', 'Beverage']
  },
  growthCycle: {
    type: Number,
    required: true,
    min: 1
  },
  optimalGrowingConditions: {
    type: String,
    required: true,
    enum: ['Cool and Humid', 'Warm and Dry', 'Hot and Humid', 'Moderate with Partial Shade']
  },
  soilTypePreference: {
    type: String,
    required: true,
    enum: ['Loamy', 'Sandy', 'Clay', 'Silty']
  },
  expectedYieldValue: {
    type: Number,
    required: true,
    min: 0,
  },
  expectedYieldUnit: {
    type: String,
    required: true,
    enum: ['kg/acre', 'tons/hectare', 'kg/hectare'],
  },
  
  fertilizerType: {
    type: String,
    required: true,
    enum: ['Nitrogen-based', 'Phosphorus-based', 'Potassium-based', 'Organic', 'Compost']
  },
  fertilizerQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  fertilizerFrequency: {
    type: String,
    required: true,
    enum: ['Weekly', 'Monthly', 'Bi-Annually', 'Annually']
  },
  harvestFrequency: {
    type: String,
    required: true,
    enum: ['Daily', 'Weekly', 'Monthly', 'Yearly']
  },
  compatibleCrops: [{
    type: String,
    trim: true
  }],
  attachments: [attachmentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

cropSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Crop', cropSchema);