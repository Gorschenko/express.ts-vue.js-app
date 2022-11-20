import { inject, injectable } from 'inversify'
import { Query } from 'mongoose'
import { TYPES } from '../types'
import { Course } from './course.entity'
import { ICourseRepository } from './course.repository.interface'
import { ICourseService } from './course.service.interface'
import { CourseCreateDto } from './dto/course-create.dto'
import { CourseEditDto } from './dto/course-edit.dto'

@injectable()
export class CourseService implements ICourseService {
  constructor(@inject(TYPES.CourseRepository) private courseRepository: ICourseRepository) {}

  async create({ title, price, image }: CourseCreateDto): Promise<Course> {
    const newCourse = new Course(title, price, image)
    return this.courseRepository.create(newCourse)
  }

  async fetch(): Promise<Course[] | null> {
    return await this.courseRepository.fetch()
  }

  async delete(id: string): Promise<Boolean> {
    await this.courseRepository.delete(id)
    return true
  }

  async edit(course: CourseEditDto): Promise<Boolean> {
    await this.courseRepository.edit(course)
    return true
  }
}
