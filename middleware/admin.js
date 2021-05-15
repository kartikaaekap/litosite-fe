export default ({ $auth, error }) => {
  const { user } = $auth
  if (user && !user.isAdmin) {
    return error({
      statusCode: 401,
      message: 'You are not allowed to see this page.',
    })
  }
}
