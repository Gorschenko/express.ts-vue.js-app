import { useHttp } from '@/common/http.middleware'

const signIn = async formData => {
  return await useHttp(
    '/entry/login',
    'POST',
    formData,
  )
}

const signUp = async formData => {
  return await useHttp(
    '/entry/register',
    'POST',
    formData,
  )
}

export {
  signIn,
  signUp,
}