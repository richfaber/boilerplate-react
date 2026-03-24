export const tokenStorage = {
  
  getAccess() {
    return localStorage.getItem('accessToken')
  },

  setAccess(token: string) {
    localStorage.setItem('accessToken', token)
  },

  removeAccess() {
    localStorage.removeItem('accessToken')
  },

  getRefresh() {
    return localStorage.getItem('refreshToken')
  },

  setRefresh(token: string) {
    localStorage.setItem('refreshToken', token)
  },

  removeRefresh() {
    localStorage.removeItem('refreshToken')
  }

}