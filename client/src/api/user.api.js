import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/auth/info',
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

const fetchCart = async () => {
  return await useHttp(
    `/auth/cart`,
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
  fetchCart,
}