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
})

const CourseModel = model<Course>('Course', courseSchema)

export default CourseModel
