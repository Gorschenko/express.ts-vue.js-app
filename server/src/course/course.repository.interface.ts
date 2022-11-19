import { Query } from 'mongoose'
import { Course } from './course.entity'
export interface ICourseRepository {
  create: (course: Course) => Promise<Course>
  fetch: () => Promise<Course[] | null>
  delete: (id: string) => Promise<Query<{}, {}>>
}
