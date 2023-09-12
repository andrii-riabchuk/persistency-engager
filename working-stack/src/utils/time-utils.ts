function formatDate(dateTime: Date): string {
  return dateTime.toISOString().slice(0, 10)
}

function lastYearRange(): [Date, Date] {
  let today = new Date()

  let todayYearAgo = new Date()
  todayYearAgo.setFullYear(today.getFullYear() - 1)

  return [todayYearAgo, today]
}

function lastYearRangeFormatted(): [string, string] {
  let [yearAgo, today] = lastYearRange().map(formatDate)
  return [yearAgo, today]
}

function todayFormatted(): string {
  return formatDate(new Date())
}

export default { formatDate, lastYearRangeFormatted, todayFormatted }
