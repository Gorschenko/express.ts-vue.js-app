import { Course } from './course.entity'

export interface ICourseRepository {
  create: (course: Course) => Promise<Course>
  fetch: () => Promise<Course[] | null>
  find: (id: string) => Promise<Course | null>
}
