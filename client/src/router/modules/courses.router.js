import CoursesPage from '@/views/courses/CoursesPage'
import CoursesCatalog from '@/views/courses/CoursesCatalog'
import CoursesInfo from '@/views/courses/CoursesInfo'

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
        path: '/courses/catalog',
        name: 'courses-catalog',
        component: CoursesCatalog,
        meta,
      },
      {
        path: '/courses/:id',
        name: 'courses-info',
        component: CoursesInfo,
        meta,
      },
    ],
  },
]

export default courses