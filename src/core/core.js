let currentYear = 2024

setTimeout(() => setYear(currentYear), 1)

function setYear(year) {
  currentYear = year
  createTable(year)
  document.getElementById('year_label').innerHTML = year
}

function clearDraw() {
  clearTable()
}

function changeTableYear(year) {
  setYear(year)

  clearDraw()

  createTable(year)
}

function saveDraw() {
  if (daysToDraw.size <= 0) {
    return
  }

  const daysMapped = []

  for (const day of daysToDraw.values()) {
    daysMapped.push(day)
  }

  downloadDraw(currentYear, daysMapped)

  clearDraw()
}
