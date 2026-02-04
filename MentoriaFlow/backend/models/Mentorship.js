const mongoose = require('../db/conn')
const { Schema } = mongoose

const Mentorship = mongoose.model(
  'Mentorship',
  new Schema({
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    available: {
      type: Boolean,
    },
    user: Object,
    adopter: Object,
  }, {timestamps: true}),
)

module.exports = Mentorship