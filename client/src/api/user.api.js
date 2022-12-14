import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/user',
  )
}

const updateLabels = async (type, courseId) => {
  return await useHttp(
    `/user/labels/${type}/${courseId}`,
    'POST',
  )
}

export {
  getUser,
  updateLabels,
}