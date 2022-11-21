import CoursesPage from '@/views/courses/CoursesPage'
import CoursesCatalog from '@/views/courses/CoursesCatalog'

const meta = {
  layout: 'default',
}

const courses = [
  {
    path: '/courses',
    name: 'courses',
    component: CoursesPage,
    meta,
    redirect: { name: 'courses-catalog' },
    children: [
      {
        path: '/courses-catalog',
        name: 'courses-catalog',
        component: CoursesCatalog,
        meta,
      },
    ],
  },
]

export default courses