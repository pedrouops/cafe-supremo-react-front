// retrieve content from CEC
//
const pathname = '/content/published/api/v1/items'
const accessToken = '11ad271cc1ae61bd03249332e8445c96'

//      "search": "?field:type:equals=Ad&contentType=published&fields=ALL&orderBy=updateddate%3Adesc&limit=1"
//

const retrieve = ({ contentType, orderBy = 'updateddate:desc', limit = 3 }) => {
  const key = [contentType, orderBy, limit].join('|')

  const search = {
    'field:type:equals': contentType,
    contentType: 'published',
    fields: 'ALL',
    orderBy: orderBy,
    limit: limit
  }
}
