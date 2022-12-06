import { Course } from './course.entity'
import { CourseCreateDto } from './dto/course-create.dto'
import { CourseEditDto } from './dto/course-edit.dto'

export interface ICourseService {
  fetch(id?: string): Promise<Course[] | null>
  create(dto: CourseCreateDto): Promise<Course>
  delete(id: string): Promise<Boolean>
  edit(dto: CourseEditDto): Promise<Boolean>
}
