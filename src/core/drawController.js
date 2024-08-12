const FILE_NAME = 'draw'

const drawHTML = (name) => `
<div class="draw">
    <span>${name}</span>
    <button onclick="renderDraw('draws/teste1 copy.txt')">load</button>
</div>
`

function loadDraws() {
  const fi = document.getElementById('file_input')
  const files = Array.from(fi.files)
  console.log(files)

  const listDraws = document.getElementById('list-draws')
  let draws = ''

  if (files && files.length > 0) {
    files.forEach((f) => (draws += drawHTML(f.name)))
    listDraws.innerHTML = draws
  }
}

function renderDraw() {}

function downloadDraw(yearOfDraw, daysToSave) {
  const data = {
    year: yearOfDraw,
    days: daysToSave
  }

  const dataAsTxt = new Blob([JSON.stringify(data)])

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(dataAsTxt, FILE_NAME)
  } else {
    const elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(dataAsTxt, { oneTimeOnly: true })
    elem.download = FILE_NAME
    elem.style.display = 'none'
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }

  console.log(data)
}
