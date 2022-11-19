import { inject, injectable } from 'inversify'
import { Query } from 'mongoose'
import CourseModel from '../database/models/course.models'
import { MongoService } from '../database/mongo.service'
import { TYPES } from '../types'
import { Course } from './course.entity'
import { ICourseRepository } from './course.repository.interface'

@injectable()
export class CourseRepository implements ICourseRepository {
  constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}
  async create(course: Course): Promise<Course> {
    const newCourse = new CourseModel({ ...course })
    return await newCourse.save()
  }
  async fetch(): Promise<Course[] | null> {
    return await CourseModel.find()
  }
  async delete(id: string): Promise<Query<{}, {}>> {
    return await CourseModel.deleteOne({ id })
  }
}
