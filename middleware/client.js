export default ({ $auth, error }) => {
  const { isAdmin } = $auth.user
  if (isAdmin) {
    return error({
      statusCode: 401,
      message: 'You are not allowed to see this page.',
    })
  }
}
