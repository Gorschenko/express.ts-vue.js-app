import { Schema, model } from 'mongoose'
import { Course } from '../../course/course.entity'

const courseSchema: Schema = new Schema<Course>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  level: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const CourseModel = model<Course>('Course', courseSchema)

export default CourseModel
