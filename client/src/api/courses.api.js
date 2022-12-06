import { useHttp } from '@/common/http.middleware'

const createCourse = async formData => {
  return await useHttp(
    '/courses',
    'POST',
    formData,
  )
}

const editCourse = async formData => {
  return await useHttp(
    '/courses',
    'PUT',
    formData,
  )
}
const getCourses = async (id = '') => {
  return await useHttp(
    `/courses/${id}`,
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
  editCourse,
  getCourses,
  deleteCourse,
}