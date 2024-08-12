const createTable = (year) => {
  const weekDayString = (day, dayShort, show) => `
<td class="ContributionCalendar-label" style="position: relative">
  <span class="sr-only">${day}</span>
  <span
    aria-hidden="true"
    style="clip-path: ${
      show ? 'None' : 'Circle(0)'
    }; position: absolute; bottom: -3px"
  >
  ${dayShort}
  </span>
</td>
`
  const weekDays = [
    ['Sunday', 'Sun'],
    ['Monday', 'Mon'],
    ['Tuesday', 'Tue'],
    ['Wednesday', 'Wed'],
    ['Thursday', 'Thu'],
    ['Friday', 'Fri'],
    ['Saturday', 'Sat']
  ]

  const daysOfYear = getDaysOfYear(year)

  let fullString = ''

  for (let i = 0; i < 7; i++) {
    fullString += "<tr style='height: 10px'>"

    fullString += weekDayString(weekDays[i][0], weekDays[i][1], i % 2 === 1)

    const actualWeekDay = daysOfYear[i]

    for (let day = 0; day < actualWeekDay.length; day++) {
      const actualDay = actualWeekDay[day]
      if (actualDay) {
        fullString += `
<td
    id="${actualDay.id}"
    data-date="${actualDay.month}/${actualDay.day}/${actualDay.year}"
    role="gridcell"
     class="ContributionCalendar-day"
></td>
`
      } else {
        fullString += '<td></td>'
      }
    }

    fullString += '</tr>'
  }

  document.getElementById('contributions_table_body').innerHTML = fullString

  document
    .getElementById('contributions_table')
    .addEventListener('contextmenu', (event) => event.preventDefault())

  daysOfYear.flat().forEach((dayOfYear) => {
    if (dayOfYear && dayOfYear.id) {
      addEvents(dayOfYear.id)
    }
  })
}
