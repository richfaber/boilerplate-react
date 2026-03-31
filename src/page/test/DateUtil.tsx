import {
  formatDate,
  formatDateTime,
  formatMonth,
  diffDays,
  diffHours,
  diffMinutes,
  isBefore,
  isAfter,
  isToday,
  startOfDay,
  endOfDay,
} from '@/lib/dateUtil'

const now = new Date()
const yesterday = new Date(Date.now() - 1000 * 60 * 60 * 24)
const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24)

export default function DateUtil() {
  return (
    <>
      <h2>포맷</h2>
      <p>formatDate: {formatDate(now)}</p>
      <p>formatDateTime: {formatDateTime(now)}</p>
      <p>formatDateTime (커스텀): {formatDateTime(now, 'MM/DD HH:mm')}</p>
      <p>formatMonth: {formatMonth(now)}</p>

      <h2>Diff (기준: 지금 vs 어제)</h2>
      <p>diffDays: {diffDays(now, yesterday)}</p>
      <p>diffHours: {diffHours(now, yesterday)}</p>
      <p>diffMinutes: {diffMinutes(now, yesterday)}</p>

      <h2>비교</h2>
      <p>isBefore(어제, 오늘): {String(isBefore(yesterday, now))}</p>
      <p>isAfter(내일, 오늘): {String(isAfter(tomorrow, now))}</p>
      <p>isToday(오늘): {String(isToday(now))}</p>
      <p>isToday(어제): {String(isToday(yesterday))}</p>

      <h2>시작/끝</h2>
      <p>startOfDay: {formatDateTime(startOfDay(now))}</p>
      <p>endOfDay: {formatDateTime(endOfDay(now))}</p>
    </>
  )
}
