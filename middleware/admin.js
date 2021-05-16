export default ({ $auth, error, redirect }) => {
  if (!$auth.user) {
    return redirect('/')
  }
  const { status } = $auth.user
  console.log(status)
  if (status !== 'vld') {
    return error({
      statusCode: 401,
      message: 'You are not allowed to see this page.',
    })
  }
}
