import { Query } from 'mongoose'
import { Course } from './course.entity'
import { CourseCreateDto } from './dto/course-create.dto'

export interface ICourseService {
  fetch(): Promise<Course[] | null>
  create(dto: CourseCreateDto): Promise<Course>
  delete(id: string): Promise<Boolean>
}
