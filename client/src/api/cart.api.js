import { useHttp } from '@/common/http.middleware'

const addCourseToCart = async (cartId, courseId) => {
  return await useHttp(
    `/cart/${cartId}/add/${courseId}`,
    'POST',
  )
}

const deleteCourseToCart = async (cartId, courseId) => {
  return await useHttp(
    `/cart/${cartId}/delete/${courseId}`,
    'DELETE',
  )
}

const fetchCart = async cartId => {
  return await useHttp(
    `/cart/${cartId}`,
  )
}

export {
  addCourseToCart,
  deleteCourseToCart,
  fetchCart,
}