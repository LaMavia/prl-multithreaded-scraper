import Axios from 'axios'
import { JSDOM } from 'jsdom'

function onDocJsDom(html: string) {
  const { window } = new JSDOM(html)
  const { document } = window
  return Array.from(document.querySelectorAll('p'))
    .map(p => p.textContent)
    .filter(x => /solidarn/gi.test(x)).length > 0
    ? document.getElementById('firstHeading').textContent
    : ''
}

process.on('message', (url: string) => {
  Axios.get(url)
    .then(r => r.data)
    .then(onDocJsDom)
    .then(process.send)
})
