const adminMiddleware = ({ next, store, nextMiddleware }) => {
  console.log('adminMiddleware')
  if (!store.getters['auth/isAdmin']) {
    return next({
      name: 'main-page'
    })
  } else {
    return  nextMiddleware()
  }
}
export default adminMiddleware;