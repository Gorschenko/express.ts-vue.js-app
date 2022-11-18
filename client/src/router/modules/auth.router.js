import SignInPage from '@/views/auth/SignInPage'
import SignUpPage from '@/views/auth/SignUpPage'
// import adminMiddleware from '@/common/admin.middleware'
// import authMiddleware from '@/common/auth.middleware'

const auth = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInPage,
    meta: {
      layout: 'default',
      middleware: [
        // authMiddleware,
      ]
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpPage,
    meta: {
      layout: 'default',
      middleware: [
        // authMiddleware, adminMiddleware
      ]
    }
  }
]

export default auth