import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/auth/info',
    'GET',
  )
}

const addCourseToCart = async courseId => {
  return await useHttp(
    `/auth/add-course/${courseId}`,
    'POST',
  )
}

const deleteCourseToCart = async courseId => {
  return await useHttp(
    `/auth/delete-course/${courseId}`,
    'DELETE',
  )
}

export {
  getUser,
  addCourseToCart,
  deleteCourseToCart,
}