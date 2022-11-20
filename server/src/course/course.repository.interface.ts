import { Query } from 'mongoose'
import { Course } from './course.entity'
import { CourseEditDto } from './dto/course-edit.dto'
export interface ICourseRepository {
  create: (course: Course) => Promise<Course>
  fetch: () => Promise<Course[] | null>
  delete: (id: string) => Promise<Query<{}, {}>>
  edit: (course: CourseEditDto) => Promise<Query<{}, {}>>
}
