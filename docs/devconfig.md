# 개발환경설정

## 경로 Alias

`@`를 `src/`의 절대경로로 사용:

```ts
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

```tsx
// 사용 예
import Button from '@/component/Button'
```

---

## 빌드 번들 분리

라우트별 lazy import로 JS/CSS가 자동 분리되며, 라이브러리는 `manualChunks`로 별도 청크로 묶음:

| 청크 | 내용 |
|------|------|
| `vendor` | React, react-dom, react-router-dom |
| `plugin` | 그 외 node_modules, src/vendor/ |
| 페이지별 | lazy import된 페이지 컴포넌트 |

```ts
manualChunks: (id) => {
  if (id.includes('node_modules') || id.includes('src/vendor')) {
    if (['node_modules/react/', 'node_modules/react-dom/', 'node_modules/react-router-dom/', 'node_modules/react-router/']
      .some(pkg => id.includes(pkg))) return 'vendor'
    return 'plugin'
  }
}
```

> `src/vendor/` — 보안 정책 등으로 npm 설치가 불가한 경우 라이브러리를 직접 저장하는 폴더

---

## 빌드 출력 경로

```
dist/
├── js/     # JS 청크
├── css/    # CSS 청크
├── image/  # 이미지
└── font/   # 폰트
```

---

## SCSS 전역 자동 주입

모든 scss 파일에 아래 파일이 자동으로 주입됨:

```
src/resource/style/define/variable  # 변수
src/resource/style/define/mixin     # 믹스인
src/resource/style/vendor/sassy-cubic-bezier
```

---

## 이미지 최적화

빌드 시 `vite-plugin-image-optimizer`로 자동 압축:

| 포맷 | 설정 |
|------|------|
| jpg/jpeg/png/webp | quality 80 |
| gif | optimizationLevel 3 |
| svg | preset-default (cleanupIds 제외) |

---

## 개발 서버

```
port: 5003
```
