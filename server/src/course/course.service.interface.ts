import { Course } from './course.entity'
import { CourseCreateDto } from './dto/course-create.dto'

export interface ICourseService {
  getCourses(): Promise<Course[] | null>
  create(dto: CourseCreateDto): Promise<Course>
}
