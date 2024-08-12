let lastIndex = 0

export default function drawConsoleTable(text, total, drawIndex, err = false) {
  const textCharLength = text.length
  const textString =
    text +
    '                     '
      .split('')
      .splice(0, 21 - textCharLength)
      .join('')

  const totalDatesCharLength = total.toString().length
  const drawIndexCharLength = drawIndex.toString().length
  const totalDatesString =
    drawIndex +
    ' / ' +
    total +
    '          '
      .split('')
      .splice(0, 12 - (totalDatesCharLength + drawIndexCharLength))
      .join('')

  const totalBars = 31
  const proportion = drawIndex / total
  const percentage = Math.floor(proportion * 100)
  const barPercentage = Math.floor(totalBars * proportion)
  const percentageString =
    '   '
      .split('')
      .splice(0, 3 - percentage.toString().length)
      .join('') + percentage
  const leftBars = totalBars - barPercentage
  const barString =
    '\x1b[32m\x1b[1m█\x1b[0m'.repeat(barPercentage) +
    '\x1b[90m░\x1b[0m'.repeat(leftBars)

  const RM = RESET_COLOR + (err ? ERROR_COLOR : MAIN_COLOR)

  console.clear()
  console.log(`${RM}
    ╔════════════════════════╦════════════════╗
    ║   ${TITLE}GIT DECOR${RM}            ║ ${TITLE}total dates${RM}    ║ ${GRAY}░░${RM}
    ║   ${WHITE}${textString}${RM}║ ${WHITE}${totalDatesString}${RM}║ ${GRAY}░░${RM}
    ╠════════════════════════╩════════════════╣ ${GRAY}░░${RM}
    ║   ${barString}${RM} ${WHITE}${percentageString}%${RM}  ║ ${GRAY}░░${RM}
    ╚═════════════════════════════════════════╝ ${GRAY}░░${RM}
      ${GRAY}░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░${RESET_COLOR}
`)
}

const WHITE = '\x1b[37m'
const GRAY = '\x1b[90m\x1b[2m'
const RESET_COLOR = '\x1b[0m'
const MAIN_COLOR = '\x1b[37m'
const ERROR_COLOR = '\x1b[31m'
const TITLE = '\x1b[35m\x1b[4m'
