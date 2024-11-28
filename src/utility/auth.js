export default {
  isAuth() {
    return localStorage.getItem("token") ? true : false
  },
  login({ token, user, rememberMe }) {
    localStorage.setItem("rememberMe", rememberMe)
    localStorage.setItem("token", token)
    localStorage.setItem("userData", JSON.stringify(user))
    if (!rememberMe) {
      sessionStorage.setItem("token", token)
      sessionStorage.setItem("userData", JSON.stringify(user))
    }
  },
  logout() {
    const lang = localStorage.getItem("lang") || "en"
    localStorage.clear()
    localStorage.setItem("lang", lang)
    sessionStorage.clear()
  }
}
