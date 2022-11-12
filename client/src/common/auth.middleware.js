const authMiddleware = ({ next, store, nextMiddleware }) => {
  if (!store.getters['auth/isAuthenticated']) {
    return next({
      name: 'main-page'
    })
  } else {
    return  nextMiddleware()
  }
}
export default authMiddleware;