# React 한계 및 의사결정

## CSS 언로드 불가 문제

### 문제
SPA 특성상 페이지 이동 시 lazy로 로드된 CSS가 누적되며 제거되지 않음.
4000페이지 × 50kb = 200MB 누적 가능성.

### React로 해결 불가한 이유
- 라우터와 CSS 관리가 분리된 라이브러리 구조
- CSS 언로드 메커니즘 미지원 (vue 는 설계에 포함되어 가능, Next.js 지원함)
- CSS-in-JS (styled-component) 는 난해한 사용법, 구조적 구성 불가능, SCSS 변수/MIXIN 사용불가, 협업 시 진입장벽 발생

### 파생 문제
- CSS가 누적 언로드 되지 않아 클래스명 충돌 방지를 위해 `.module.scss` 사용이 사실상 강제됨
- `.module.scss` + `styles.클래스명` 방식이 일반 CSS 문법과 달라 협업 시 진입장벽 발생

### 결론
대규모 페이지 레이아웃 관리는 Next.js 프로젝트에서 검증 필요.
React는 소규모 또는 CSS 누적이 문제되지 않는 규모에 적합.

## React Compiler 외부 mutable 상태 추적 불가 문제

### 문제
React Compiler가 외부 mutable 상태(i18next 등)의 변경을 추적하지 못해 렌더링은 되지만 화면이 갱신되지 않는 버그 발생.
React Compiler는 최적화 내용을 개발자 에게 알려주지 않아 원인 파악이 매우 어려움.

### 원인
React는 "UI = f(state)" 모델로 설계되어, 상태가 바뀌면 전체를 다시 렌더링함.
성능 문제를 개발자가 직접 해결하도록 React.memo, useMemo, useCallback 을 제공했고,
React Compiler는 이를 자동화한 것.

하지만 "같은 입력 → 같은 출력" 을 가정하고 메모이제이션을 삽입하기 때문에,
i18next.t('key') 처럼 외부 상태에 따라 결과가 달라지는 함수는 추적하지 못함.

### Vue와의 비교
Vue는 ref, reactive 기반 반응형 시스템으로 데이터 변경을 자동 추적함.
처음부터 "프레임워크가 추적한다" 는 설계 원칙을 가지고 있어 개발자가 메모이제이션을 신경 쓸 필요가 없음.
React Compiler가 하려는 일을 Vue는 설계 단계에서 해결한 셈.

### 개발자 관점
메모이제이션은 비즈니스 로직과 무관한 프레임워크 내부 최적화 문제임.
개발자가 신경 써야 할 대상이 아니며, 잘못 적용 시 오히려 버그의 원인이 됨.
React Compiler가 이를 자동화했으나 외부 상태 추적 실패 같은 엣지 케이스에서 조용히 버그를 만들어 디버깅 비용이 오히려 증가할 수 있음.

### 해결
t 함수에 locale 을 명시적 의존성으로 포함시켜 React Compiler가 추적 가능하게 함.

```ts
// 잘못된 방식
t: (key, options?) => i18next.t(key, options)

// 올바른 방식
t: (key, options?) => i18next.t(key, { lng: locale, ...options })
```

### 결론
React Compiler 환경에서 외부 mutable 상태를 쓸 때는 반드시 명시적 의존성을 React 상태와 연결해야 함.
대규모 프로젝트에서 React Compiler 도입 시 외부 라이브러리 호환성 검토 필요.
