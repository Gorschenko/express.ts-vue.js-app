import { Course } from './course.entity'

export interface ICourseRepository {
  create: (course: Course) => Promise<Course>
  getCourses: () => Promise<Course[] | null>
}
