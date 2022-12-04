import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/auth/info',
    'GET',
  )
}

const addCourseToCart = async courseId => {
  return await useHttp(
    `/auth/cart/${courseId}`,
    'POST',
  )
}

const deleteCourseToCart = async courseId => {
  return await useHttp(
    `/auth/cart/${courseId}`,
    'DELETE',
  )
}

const updateFavorite = async (type, courseId) => {
  return await useHttp(
    `/auth/favorites/${type}/${courseId}`,
    'POST',
  )
}

export {
  getUser,
  addCourseToCart,
  deleteCourseToCart,
  updateFavorite,
}