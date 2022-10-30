import { Course } from './course.entity'
import { CourseCreateDto } from './dto/course-create.dto'

export interface ICourseService {
  fetch(): Promise<Course[] | null>
  create(dto: CourseCreateDto): Promise<Course>
  delete(_id: string): Promise<Course | null>
}
