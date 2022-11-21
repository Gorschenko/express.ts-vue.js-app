import { useHttp } from '@/common/http.middleware'

const signIn = async formData => {
  return await useHttp(
    '/auth/login',
    'POST',
    formData,
  )
}

const signUp = async formData => {
  return await useHttp(
    '/auth/register',
    'POST',
    formData,
  )
}

export {
  signIn,
  signUp,
}