# API 클라이언트

fetch 기반 `apiClient`와 axios 기반 `axiosClient` 두 가지를 제공합니다. 프로젝트에 맞는 하나를 선택해서 사용하세요.

## 공통 기능

- `VITE_API_URI` 기반 baseURL 자동 설정
- 토큰 자동 첨부 (`Authorization: Bearer {token}`)
- 401 시 refresh 토큰으로 재시도 (1회)
- refresh 실패 시 `auth:unauthorized` 이벤트 발행 → 강제 로그아웃

## apiClient (fetch)

`http` 헬퍼를 사용하면 axios와 유사한 방식으로 사용할 수 있습니다.

```ts
import { http } from '@/lib/apiClient'

// GET
const res = await http.get('/user/me')
const data = await res.json()

// POST
const res = await http.post('/posts', { title, content })

// PUT / PATCH / DELETE
await http.put('/posts/1', { title })
await http.patch('/posts/1', { title })
await http.delete('/posts/1')
```

fetch 옵션을 직접 전달할 경우 `apiClient`를 사용합니다.

```ts
import { apiClient } from '@/lib/apiClient'

const res = await apiClient('/posts', {
  method: 'POST',
  body: JSON.stringify({ title, content })
})
```

## axiosClient (axios)

```ts
import axiosClient from '@/lib/axiosClient'

const res = await axiosClient.get('/user/me')
const data = res.data

// POST
const res = await axiosClient.post('/posts', { title, content })
const data = res.data
```

axios 인스턴스이므로 `.get()`, `.post()` 등 axios API를 사용합니다.

## 환경변수

| 변수 | 설명 |
|---|---|
| `VITE_API_URI` | API 서버 baseURL (예: `https://api.example.com`) |

값이 없으면 현재 도메인 기준 상대경로로 요청합니다.
