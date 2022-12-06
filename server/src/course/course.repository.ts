import e from 'express'
import { inject, injectable } from 'inversify'
import { Query } from 'mongoose'
import CourseModel from '../database/models/course.models'
import { MongoService } from '../database/mongo.service'
import { TYPES } from '../types'
import { Course } from './course.entity'
import { ICourseRepository } from './course.repository.interface'
import { CourseEditDto } from './dto/course-edit.dto'

@injectable()
export class CourseRepository implements ICourseRepository {
  constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}
  async create(course: Course): Promise<Course> {
    const newCourse = new CourseModel({ ...course })
    return await newCourse.save()
  }
  async fetch(id?: string): Promise<Course[] | null> {
    if (id) {
      return await CourseModel.find({ _id: id })
    } else {
      return await CourseModel.find()
    }
  }
  async delete(id: string): Promise<Query<{}, {}>> {
    return await CourseModel.deleteOne({ id })
  }
  async edit(course: CourseEditDto): Promise<void | null> {
    const { _id } = course
    const copyCourse = Object.assign({}, course as any)
    delete copyCourse._id
    return await CourseModel.findByIdAndUpdate(_id, course)
  }
}
