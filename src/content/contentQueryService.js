import data from '../data/content/cafesupremo.json'

const find = query => {
  const list = data[key(query)]
  console.log(list)
  const items = list.data.items || []
  console.log(items)

  return items.map(e => data[e.id].data)
}
const key = ({ contentType, maxResults, sortOrder }) =>
  `${contentType};${maxResults};${sortOrder}`

export { find }
