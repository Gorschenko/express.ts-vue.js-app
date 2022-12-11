import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { Course } from './course.entity'
import { ICourseRepository } from './course.repository.interface'
import { ICourseService } from './course.service.interface'
import { CourseCreateDto } from './dto/course-create.dto'
import { CourseEditDto } from './dto/course-edit.dto'

@injectable()
export class CourseService implements ICourseService {
  constructor(@inject(TYPES.CourseRepository) private courseRepository: ICourseRepository) {}

  async fetch(id?: string): Promise<Course[] | null> {
    return await this.courseRepository.fetch(id)
  }

  async create({ title, price, image }: CourseCreateDto): Promise<Course | null> {
    const newCourse = new Course(title, price, image)
    return this.courseRepository.create(newCourse)
  }

  async delete(id: string): Promise<boolean> {
    return await this.courseRepository.delete(id)
  }

  async edit(course: CourseEditDto): Promise<Course | null> {
    return await this.courseRepository.edit(course)
  }
}
