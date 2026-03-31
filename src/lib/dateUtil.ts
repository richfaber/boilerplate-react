import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

// "2026-03-31"
export const formatDate = (date) => dayjs(date).format('YYYY-MM-DD')
// "2026-03-31 14:05:00" — format 인자로 커스텀 가능
export const formatDateTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(format)
// "2026-03" — 달력, 월별 통계에서 사용
export const formatMonth = (date) => dayjs(date).format('YYYY-MM')

// date1 - date2 차이 반환 (양수: date1이 더 나중, 음수: date1이 더 이전)
export const diffDays = (date1, date2) => dayjs(date1).diff(dayjs(date2), 'day')
export const diffHours = (date1, date2) => dayjs(date1).diff(dayjs(date2), 'hour')
export const diffMinutes = (date1, date2) => dayjs(date1).diff(dayjs(date2), 'minute')

// date1 이 date2 보다 이전인지
export const isBefore = (date1, date2) => dayjs(date1).isBefore(dayjs(date2))
// date1 이 date2 보다 이후인지
export const isAfter = (date1, date2) => dayjs(date1).isAfter(dayjs(date2))
// 오늘인지
export const isToday = (date) => dayjs(date).isSame(dayjs(), 'day')

// 당일 00:00:00 — 기간 조회 시작점
export const startOfDay = (date) => dayjs(date).startOf('day').toDate()
// 당일 23:59:59 — 기간 조회 끝점
export const endOfDay = (date) => dayjs(date).endOf('day').toDate()