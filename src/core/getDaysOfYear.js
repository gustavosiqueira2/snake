function getDaysOfYear(year) {
  // GET DAYS
  const daysOfYear = []
  const startDate = new Date(year, 0, 1)
  const endDate = new Date(year + 1, 0, 1)
  for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
    const dayOfWeek = date.toLocaleString('en', { weekday: 'short' })
    const day = date.getDate()
    const month = date.getMonth() + 1
    daysOfYear.push({ id: day + '/' + month, day, month, year, dayOfWeek })
  }

  // SORT WEEKDAYS
  const weeksDays = daysOfYear.reduce((acc, day) => {
    if (!acc[day.dayOfWeek]) {
      acc[day.dayOfWeek] = [day]
    } else {
      acc[day.dayOfWeek].push(day)
    }

    return acc
  }, {})
  const ordered = [
    weeksDays.Sun,
    weeksDays.Mon,
    weeksDays.Tue,
    weeksDays.Wed,
    weeksDays.Thu,
    weeksDays.Fri,
    weeksDays.Sat
  ]

  // ADD NULL DAYS
  const biggerWeekday = ordered.reduce((max, current) => {
    return current.length > max ? current.length : max
  }, 0)
  let addBefore = true

  const weekWithNullDays = ordered.map((week) => {
    if (week.length === biggerWeekday) {
      addBefore = false
    }
    if (week.length < biggerWeekday) {
      addBefore ? week.unshift(null) : week.push(null)
    }

    return week
  })

  return weekWithNullDays
}
