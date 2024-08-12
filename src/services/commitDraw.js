import simpleGit from 'simple-git'
import jsonfile from 'jsonfile'
import fs from 'fs'
import path from 'path'

import drawConsoleTable from './tableController.js'

const INTENSITY = 1
const FILE_PATH = './changes.json'

const argv = process.argv.slice(2)[0]
const filePath = path.join(path.resolve(), 'draws\\', argv)

const buffer = JSON.parse(fs.readFileSync(filePath).toString())

if (!buffer.days) {
  console.log("FILE DON'T CONTAIN ANY DATES")
  process.exit()
}

const dates = buffer.days
const totalDates = dates.length

drawConsoleTable('creating your draw', totalDates, 0)

const sp = (s) => new Promise((r) => setTimeout(r, s))

let currentIndex = 0
try {
  for await (const key of [...Array(INTENSITY).keys()]) {
    for await (let [index, date] of dates.entries()) {
      currentIndex = index

      const actualDate = new Date(date)
      const dateToString = actualDate.toString()
      const localDateString = actualDate.toLocaleDateString()

      if (INTENSITY <= 1) {
        drawConsoleTable(`Drawing: ${localDateString}`, totalDates, index)
      } else {
        drawConsoleTable(
          `D:${localDateString} I:${key + 1}/${INTENSITY}`,
          totalDates,
          index
        )
      }

      await jsonfile.writeFileSync(FILE_PATH, {
        date: dateToString,
        number: key
      })

      await simpleGit()
        .add([FILE_PATH])
        .commit(dateToString, { '--date': dateToString })
        .push()
    }
  }
} catch (err) {
  drawConsoleTable(`Error drawing!`, totalDates, currentIndex, true)
  console.log(err)
  process.exit()
}

drawConsoleTable('Draw finished <3', totalDates, dates.length)
