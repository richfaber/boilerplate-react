import axios from 'axios'
import { getRawToken, refreshAccessToken } from '@/lib/auth'

const baseURL = import.meta.env.VITE_API_URI ?? ''

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use((config) => {
  
  const token = getRawToken()
  if(token) config.headers.Authorization = `Bearer ${ token }`

  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401 && !error.config._retry) {

      error.config._retry = true

      // accessToken 만료 가능성, refreshToken 시도
      const newToken = refreshAccessToken()

      if( newToken ) {
        return axiosClient(error.config)
      }

      // 갱신 실패 시 AuthContext에 강제 로그아웃 요청
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))

    }

    return Promise.reject(error)
  }
)

export default axiosClient