import { inject, injectable } from 'inversify'
import CourseModel from '../database/models/course.models'
import { MongoService } from '../database/mongo.service'
import { TYPES } from '../types'
import { Course } from './course.entity'
import { ICourseRepository } from './course.repository.interface'

@injectable()
export class CourseRepository implements ICourseRepository {
  constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}
  async getCourses(): Promise<Course[] | null> {
    return null
  }
  async create(course: Course): Promise<Course> {
    const newCourse = new CourseModel({ ...course })
    return await newCourse.save()
  }
}
