export default ({ $auth, redirect }) => {
  console.log('hai')
  if (!$auth.user) {
    return true
  }
  const role = $auth.user.status
  switch (role) {
    case 'cnt':
      return redirect('/indexlogin')
    case 'vld':
      return redirect('/verifikator')
    default:
      return true
  }
}
