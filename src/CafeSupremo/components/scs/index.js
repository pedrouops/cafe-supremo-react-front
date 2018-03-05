import React from 'react'

import Component from './scsComponent'
import ComponentGroup from './scsComponentGroup'
import Contentlist from './scsContentlist'
import Divider from './scsDivider'
import Image from './scsImage'
import Sectionlayout from './scsSectionlayout'
import Socialbar from './scsSocialbar'
import Title from './scsTitle'

const registry = {
  scsComponent: Component,
  scsComponentgroup: ComponentGroup,
  scsContentlist: Contentlist,
  scsDivider: Divider,
  scsImage: Image,
  scsSectionlayout: Sectionlayout,
  scsSocialbar: Socialbar,
  scsTitle: Title
}
function snakeToCamel (s) {
  return s.replace(/(-\w)/g, function (m) {
    return m[1].toUpperCase()
  })
}

const createComponent = ({ type, id, data }, key) => {
  const name = snakeToCamel(type)
  const Component = registry[name]
  if (!Component) return <div>{name} Not Found</div>
  return <Component key={key} type={type} id={id} data={data} />
}

export default createComponent
