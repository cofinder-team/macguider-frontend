export const pastTime = () => {
  const now = new Date()
  const past = new Date(process.env.NEXT_PUBLIC_LAST_UPDATED_AT)

  const btw = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24))

  if (btw < 1) return '오늘'
  if (btw < 14) return `${btw}일 전`
  return `${Math.floor(btw / 7)}주 전`
}
