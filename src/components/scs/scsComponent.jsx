import PropTypes from 'prop-types'
import React from 'react'
import SearchButton from '../general/SearchButton'
import ContentNavMenu from '../general/ContentNavMenu/Menu'
// import DynamicContentList from '../general/DynamicContentList'
// import DynamicContentMenu from '../general/DynamicContentMenu'

const DynamicContentList = <div>DynamicContentList</div>
const DynamicContentMenu = <div>DynamicContentMenu</div>

const comps = {
  'Search-Button': SearchButton,
  ContentNavMenu: ContentNavMenu,
  DynamicContentList: DynamicContentList,
  DynamicContentMenu: DynamicContentMenu
}

const Component = ({ type, id, data }, context) => {
  console.log('scsComponent', type, id, data)
  const Child = comps[id]
  const {
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    alignment,
    componentId,
    componentLayout
  } = data
  const className =
    'scs-custom-component scs-component ' +
    componentId +
    '-' +
    componentLayout +
    '-style'
  const style = {
    textAlign: alignment,
    marginTop: marginTop,
    marginRight: marginRight,
    marginBottom: marginBottom,
    marginLeft: marginLeft
  }
  return (
    <div className='scs-component-container'>
      <div className='scs-component-bounding-box'>
        <div>
          <div className={className} style={style}>
            <div className='scs-component-content' style={{ width: '100%' }}>
              <div className='scs-custom-component-wrapper'>
                <Child />
              </div>
            </div>
            <div />
          </div>
          <div className='scs-hidden' />
        </div>
      </div>
    </div>
  )
}

Component.contextTypes = { pageData: PropTypes.object }

export default Component
