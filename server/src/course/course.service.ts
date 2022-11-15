import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { Course } from './course.entity'
import { ICourseRepository } from './course.repository.interface'
import { ICourseService } from './course.service.interface'
import { CourseCreateDto } from './dto/course-create.dto'

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
  async delete(id: string): Promise<Course | null> {
    const course = await this.courseRepository.find(id)
    console.log(course)
    return course
  }
}
