const adminMiddleware = ({ next, store, nextMiddleware }) => {
  if (!store.getters['auth/isAdmin']) {
    return next({
      name: 'main-page'
    })
  } else {
    return  nextMiddleware()
  }
}
export default adminMiddleware;