export default ({ $auth, redirect }) => {
  const role = $auth.user && $auth.user.status
  switch (role) {
    case 'cnt':
      return redirect('/indexlogin')
    case 'vld':
      return redirect('/verifikator')
    default:
      return true
  }
}
