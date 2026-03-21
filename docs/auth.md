# Auth

## 구조

```
src/
├── lib/auth.ts             ← signIn, signOut, getToken, getRefreshToken, refreshAccessToken (localStorage 상호작용)
└── context/AuthContext.tsx ← AuthProvider, useAuth hook (전역 상태 + 동작)
```

## AuthContext

`useAuth()`가 공급하는 값:

| 값 | 타입 | 설명 |
|---|---|---|
| `isAuthenticated` | boolean | 현재 로그인 여부 |
| `userId` | string \| null | 로그인한 사용자 ID |
| `role` | string \| null | 사용자 권한 |
| `signIn()` | () => void | 토큰 저장 + 상태 갱신 |
| `signOut()` | () => void | 토큰 삭제 + 상태 갱신 |

## 사용법

```tsx
const { isAuthenticated, userId, role, signIn, signOut } = useAuth()
```

- `useAuth()`는 반드시 `AuthProvider` 안에서 사용해야 함
- `signIn()`/`signOut()` 호출 시 상태가 자동 갱신됨

## 흐름

```
Login    → signIn()  → navigate(from)
Default  → signOut() → navigate('/')
ProtectedRoute → isAuthenticated 체크
```

## JWT 토큰 구조

- **Access Token** - API 인증용, 만료시간 짧음
- **Refresh Token** - Access Token 재발급용, 만료시간 김

현재는 Mock JWT 사용 (서버 없음). 실제 연동 시 `signIn()` 내부에서 axios 호출로 교체.

## Silent Refresh

`AuthProvider` 마운트 시 `useEffect`로 자동 실행:

```
1. Access Token 만료시간 확인
2. 만료 30초 전 setTimeout 예약
3. refreshAccessToken() 호출
4. 성공 → 상태 업데이트
5. 실패 → signOut() 강제 로그아웃
```

로그아웃 시 클린업(`clearTimeout`)으로 예약된 타이머 취소.

## lib vs util

- `lib/`: 외부 시스템(localStorage, API 등)과 상호작용하는 모듈
- `util/`: 순수 함수, 부수효과 없는 변환/계산
