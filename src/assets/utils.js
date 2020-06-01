export const formatUpdateTime = (pushed_at) => {
  if (!pushed_at) {
    return '-'
  }
  const today = new Date()
  const updateDay = new Date(pushed_at)
  const times = today.getTime() - updateDay.getTime()
  const oneMinuteTime = 60 * 1000
  const oneHourTime = 60 * 60 * 1000
  const oneDayTime = 24 * 60 * 60 * 1000
  const oneMonthTime = 30 * 24 * 60 * 60 * 1000
  if (times < oneHourTime) {
    const result = times / (1000 * 60)
    return `${result.toFixed(0)} minutes ago`
  }
  if (times < oneDayTime) {
    const result = times / (1000 * 60 * 60)
    return `${result.toFixed(0)} hours ago`
  }
  if (times < oneMonthTime) {
    const result = times / (1000 * 60 * 60 * 24)
    return `${result.toFixed(0)} days ago`
  }
  const year = updateDay.getFullYear()
  const month = updateDay.getMonth() + 1
  const date = updateDay.getDate()
  return `on ${date} ${month} ${year}`
}
