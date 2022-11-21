import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/auth/info',
    'GET',
  )
}

export {
  getUser,
}