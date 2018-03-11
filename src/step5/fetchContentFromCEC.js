const fetch = require('node-fetch')
const path = require('path')

const fs = require('fs')

const contentTypes = ['Ad', 'Promo', 'Blog']

const token = '11ad271cc1ae61bd03249332e8445c96'
const host = 'https://demo-gse00009991.sites.us2.oraclecloud.com'

const itemsURL = ({ maxResults, sortOrder }) =>
  `${host}/content/published/api/v1/items?contentType=published&orderBy=${esc(
    sortOrder
  )}&limit=${maxResults}&access-token=${token}`

const dump = s => {
  console.log(JSON.stringify(s, null, 2))
  return s
}

const write = data => {
  fs.writeFileSync(
    path.join(__dirname, '/content.json'),
    JSON.stringify(data, null, 2)
  )
  return data
}

const esc = encodeURIComponent

const noDigitalAssets = e => e.type !== 'DigitalAsset'

const fetchItem = link => {
  return fetch(`${link.href}?access-token=${token}`)
    .then(r => r.json())
    .then(data => ({ [link.id]: { data: data } }))
}
const fetchItems = data => {
  const links = data.ALL.data.items
    .filter(noDigitalAssets)
    .map(e => ({ id: e.id, href: e.link.href, rel: e.link.rel }))
    .sort((a, b) => a.href.localeCompare(b.href))
    .filter((e, i, a) => a.indexOf(e) === i)
  const itemFetches = links.map(fetchItem)
  return Promise.all(itemFetches)
    .then(a => a.reduce((a, e) => Object.assign(a, e), {}))
    .then(r => Object.assign(data, r))
}
const fetches = fetch(
  itemsURL({ maxResults: 500, sortOrder: 'updateddate:desc' })
)
  .then(response => response.json())
  .then(data => ({ ALL: { data: data } }))

fetches.then(fetchItems).then(write)
