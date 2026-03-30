import { getRawToken, refreshAccessToken } from '@/lib/auth'

const BASE_URL = import.meta.env.VITE_API_URI ?? ''

export async function apiClient(url: string, options: RequestInit = {}, retry = true): Promise<Response> {

  const token = getRawToken()

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { 
      Authorization: `Bearer ${ token }` 
    } : {})
  }

  const res = await fetch(BASE_URL + url, { ...options, headers })

  if( !res.ok ) {
    
    if (res.status === 401 && retry) {

      // accessToken 만료 가능성, refreshToken 시도
      const newToken = refreshAccessToken()

      if( newToken ) {
        return apiClient(url, options, false)
      }

      // 갱신실패 시 권한없음 이벤트 발행
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))

    }

    throw new Error(`HTTP 에러: ${res.status}`)

  }


  return res

}

export const http = {

  get(url: string, options?: RequestInit) {
    return apiClient(url, { ...options, method: 'GET' })
  },

  post(url: string, data?: unknown, options?: RequestInit) {
    return apiClient(url, { ...options, method: 'POST', body: JSON.stringify(data) })
  },

  put(url: string, data?: unknown, options?: RequestInit) {
    return apiClient(url, { ...options, method: 'PUT', body: JSON.stringify(data) })
  },

  patch(url: string, data?: unknown, options?: RequestInit) {
    return apiClient(url, { ...options, method: 'PATCH', body: JSON.stringify(data) })
  },

  delete(url: string, options?: RequestInit) {
    return apiClient(url, { ...options, method: 'DELETE' })
  },

}