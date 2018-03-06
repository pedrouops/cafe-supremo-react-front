import PropTypes from 'prop-types'
import React from 'react'
import grid2react from './grid2react'
import createComponent from '../scs'

const Slot = ({ id, ...others }, context) => {
  const pd = context.pageData
  const { grid, components } = pd.slots(id)
  console.log('slot', id, components, grid)
  if (components.length === 0) return ''
  const Grid = () =>
    grid2react(grid, components, (id, key) =>
      createComponent(context.pageData.components(id), key)
    )

  return (
    <div id={id} {...others}>
      <Grid />
    </div>
  )
}
Slot.contextTypes = { pageData: PropTypes.object }
export default Slot
