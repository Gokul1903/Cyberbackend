const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Jobs = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Internship', 'Parttime', 'Full Time', 'Contract'],
    required: true,
  },
  salaryRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,  // Stores the image URL
    required: false, // Set to true if an image is mandatory
  },
}, { timestamps: true });

module.exports = mongoose.model('JobOpening', Jobs);