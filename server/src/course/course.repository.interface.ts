import { Course } from './course.entity'
import { CourseEditDto } from './dto/course-edit.dto'

export interface ICourseRepository {
  fetch: (id?: string) => Promise<Course[] | null>
  create: (course: Course) => Promise<Course | null>
  delete: (id: string) => Promise<boolean>
  edit: (course: CourseEditDto) => Promise<Course | null>
}
