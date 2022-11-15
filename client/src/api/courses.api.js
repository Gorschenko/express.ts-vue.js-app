import { useHttp } from '@/common/http.middleware'

const createCourse = formData => {
  return useHttp(
    '/courses',
    'POST',
    formData,
  )
}

const getAllCourses = () => {
  return useHttp(
    '/courses'
  )
}

export {
  createCourse,
  getAllCourses,
}