import PropTypes from 'prop-types'
import createComponent from '../scs'
import grid2react from '../system/grid2react'

const Component = ({ type, id, data }, context) => {
  const { components, grid } = data
  return grid2react(grid, components, (id, key) =>
    createComponent(context.pageData.components(id), key)
  )
}
Component.contextTypes = { pageData: PropTypes.object }

export default Component
