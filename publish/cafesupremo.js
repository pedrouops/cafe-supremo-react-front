const fetch = require('node-fetch')
const structure = require('../src/data/structure.json')

const contentTypes = ['Ad', 'Promo', 'Blog']
const token = '11ad271cc1ae61bd03249332e8445c96'
// &fields=ALL
const host = 'https://demo-gse00009991.sites.us2.oraclecloud.com'

const itemsURL = ({ contentType, maxResults, sortOrder }) =>
  `${host}/content/published/api/v1/items?field:type:equals=${contentType}&contentType=published&orderBy=${esc(
    sortOrder
  )}&limit=${maxResults}&access-token=${token}`

const dump = s => {
  console.log(JSON.stringify(s, null, 2))
  return s
}
const write = data => {
  fs.writeFileSync(
    'src/data/content/cafesupremo.json',
    JSON.stringify(data, null, 2)
  )
  return data
}

const pages = [12, 34, 39, 41, 43, 44].reduce(
  (a, id) =>
    Object.assign(a, { [id]: require('../src/data/pages/' + id + '.json') }),
  {}
)
const queryOp = ({ contentType, maxResults, sortOrder }) => ({
  contentType,
  maxResults,
  sortOrder
})
const fieldsFromContentList = [
  'contentTypes',
  'dateFilter',
  'dateFilterBegin',
  'dateFilterEnd',
  'dateFilterNumber',
  'dateFilterNumber2',
  'dateFilterUnits',
  'maxResults',
  'queryString',
  'sortOrder'
]
const queries = Object.values(pages)
  .map(page => Object.values(page.base.componentInstances))
  .reduce((a, e) => a.concat(e), [])
  .filter(e => e.type === 'scs-contentlist')
  .map(e =>
    fieldsFromContentList.reduce(
      (a, i) => Object.assign(a, { [i]: e.data[i] }),
      {}
    )
  )

// console.log(queries)
const esc = encodeURIComponent
const key = ({ contentType, maxResults, sortOrder }) =>
  `${contentType};${maxResults};${sortOrder}`

const typeQueries = queries
  .map(({ contentTypes, ...other }) => ({
    contentType: contentTypes[0],
    ...other
  }))
  .sort((a, b) => key(a).localeCompare(key(b)))

const fetchItem = link => {
  return fetch(`${link.href}?access-token=${token}`)
    .then(r => r.json())
    .then(data => ({ [link.id]: { data: data } }))
}
const fetchItems = data => {
  const links = Object.values(data)
    .map(e =>
      e.data.items.map(e => ({ id: e.id, href: e.link.href, rel: e.link.rel }))
    )
    .reduce((a, e) => a.concat(e), [])
    .sort((a, b) => a.href.localeCompare(b.href))
    .filter((e, i, a) => a.indexOf(e) === i)
  const itemFetches = links.map(fetchItem)
  return Promise.all(itemFetches)
    .then(a => a.reduce((a, e) => Object.assign(a, e), {}))
    .then(r => Object.assign(data, r))
}
const fetches = Promise.all(
  typeQueries.map(e =>
    fetch(itemsURL(e))
      .then(response => response.json())
      .then(data => ({ [key(e)]: { data: data, query: queryOp(e) } }))
  )
)
fetches
  .then(a => a.reduce((a, e) => Object.assign(a, e), {}))
  .then(fetchItems)
  .then(write)
