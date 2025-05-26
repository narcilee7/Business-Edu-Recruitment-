import mongoose, { Schema, model } from 'mongoose'

const ByteDanceJobSchema = new Schema({
  id: String,
  title: String,
  jobInfo: String,
  description: String,
  requirements: String,
  location: String,
  createAt: String,
})

export const ByteDanceJobModel = mongoose.models.ByteDanceJob || model('ByteDanceJob', ByteDanceJobSchema)
