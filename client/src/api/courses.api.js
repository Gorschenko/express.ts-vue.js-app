import { useHttp } from '@/common/http.middleware'

const createCourse = async formData => {
  return await useHttp(
    '/courses',
    'POST',
    formData,
  )
}

const getAllCourses = async () => {
  return await useHttp(
    '/courses'
  )
}

const deleteCourse = async id => {
  return await useHttp(
    `/courses/${id}`,
    'DELETE',
  )
}

export {
  createCourse,
  getAllCourses,
  deleteCourse,
}