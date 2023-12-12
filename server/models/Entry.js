const mongoose = require('mongoose');

// const setName = (name) => _.escape(name).trim();

const EntrySchema = new mongoose.Schema({
  feeling: {
    type: Number,
    required: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  manage: {
    type: String,
    required: true,
    trim: true,
  },
  future: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  date: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  }
});

EntrySchema.statics.toAPI = (doc) => ({
  summary: doc.summary,
  feeling: doc.feeling,
  manage: doc.feeling,
  future: doc.future,
  date: doc.date,
});

const EntryModel = mongoose.model('Entry', EntrySchema);
module.exports = EntryModel;
