# 날짜 유틸

`dayjs` 기반 날짜 유틸. `src/lib/dateUtil.ts`

## 설치

```bash
npm install dayjs
```

## 포맷

```ts
import { formatDate, formatDateTime, formatMonth } from '@/lib/dateUtil'

formatDate(new Date())                        // "2026-03-31"
formatDateTime(new Date())                    // "2026-03-31 14:05:00"
formatDateTime(new Date(), 'MM/DD HH:mm')    // "03/31 14:05"  커스텀 포맷
formatMonth(new Date())                       // "2026-03"
```

## Diff

두 날짜의 차이를 숫자로 반환합니다. 양수면 date1이 더 나중, 음수면 date1이 더 이전입니다.

```ts
import { diffDays, diffHours, diffMinutes } from '@/lib/dateUtil'

diffDays(now, yesterday)     // 1
diffHours(now, yesterday)    // 24
diffMinutes(now, yesterday)  // 1440
```

## 비교

```ts
import { isBefore, isAfter, isToday } from '@/lib/dateUtil'

isBefore(yesterday, now)   // true
isAfter(tomorrow, now)     // true
isToday(new Date())        // true
```

## 시작/끝

기간 조회 API 파라미터로 주로 사용합니다.

```ts
import { startOfDay, endOfDay } from '@/lib/dateUtil'

startOfDay(new Date())  // 2026-03-31 00:00:00
endOfDay(new Date())    // 2026-03-31 23:59:59
```
