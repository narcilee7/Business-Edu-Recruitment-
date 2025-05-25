import mongoose, { Document, Schema, model } from 'mongoose'
import { Job as JobType } from '../types/job'

export type JobDoc = JobType & Document

const JobSchema = new Schema<JobDoc>(
  {
    jobId: { type: String, required: true },
    title: { type: String, required: true },
    company: {
      name: String,
      website: String,
      industry: String,
      size: String,
      location: String,
    },
    location: String,
    salary: String,
    salaryMin: Number,
    salaryMax: Number,
    experience: String,
    degree: String,
    description: String,
    tags: [String],
    source: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    crawledAt: { type: Date, required: true },
    updatedAt: Date,
    createdAt: { type: Date, required: true },
  },
  {
    timestamps: true
  }
)

// 索引
JobSchema.index({ jobId: 1, source: 1 }, { unique: true })

export const JobModel = model<JobDoc>('Job', JobSchema)