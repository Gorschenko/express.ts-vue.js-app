import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/auth/info',
    'GET',
  )
}

const addCourse = async courseId => {
  return await useHttp(
    `/auth/add-course/${courseId}`,
    'POST',
  )
}

export {
  getUser,
  addCourse,
}