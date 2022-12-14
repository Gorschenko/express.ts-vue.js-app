const authMiddleware = ({ next, store, nextMiddleware }) => {
  if (!store.getters['user/user']) {
    return next({
      name: 'main-page'
    })
  } else {
    return  nextMiddleware()
  }
}
export default authMiddleware;