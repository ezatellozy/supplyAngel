export default function ({ app, redirect }) {
  if (!app.$cookies.get('userToken')) {
    // console.log(store.state.auth.loggedIn)
    return redirect('/auth/login')
  }
}
