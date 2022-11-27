import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/auth/info',
    'GET',
  )
}

const addCourse = async course => {
  return await useHttp(
    '/auth/add-course',
    'PATCH',
    course
  )
}

export {
  getUser,
  addCourse,
}