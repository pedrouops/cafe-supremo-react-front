import React from 'react'

function toStyle (value) {
  const props = value.split(';').filter(prop => {
    return !!prop
  })

  return props.reduce((props, prop) => {
    let [propName, propValue] = prop.split(/:(.*)/)
    propName = formatStylePropName(propName)
    return {
      ...props,
      [propName]: propValue && propValue.trim()
    }
  }, {})
}

function formatStylePropName (propName) {
  // Vendor prefixes other than "ms" should begin with a capital letter.
  // See: https://facebook.github.io/react/tips/inline-styles.html.
  propName = propName.replace(/^(\s+)?-(?=ms)/, '').trim()
  // Turn, for instance, "-webkit-property" into "WebkitProperty"
  // and "font-size" into "fontSize.
  return propName.replace(/(-\w)/g, match => {
    return match[1].toUpperCase()
  })
}

function getPropsFromAttributes (element) {
  const attributes = Array.from(element.attributes || [])

  return attributes.reduce((props, { name, value }) => {
    const propName = name === 'class' ? 'className' : name
    const propValue = name === 'style' ? toStyle(value) : value
    return {
      ...props,
      [propName]: propValue
    }
  }, {})
}

const NodeType = {
  ELEMENT: 1,
  TEXT: 3,
  COMMENT: 8
}

const grid2react = (source, components, factory) => {
  const parseNodes = (nodes = []) => {
    return Array.from(nodes).map((node, index) => {
      if (node.nodeType === NodeType.ELEMENT) {
        return parseElementNode(node, '' + index)
      }
      return node.nodeValue
    })
  }

  function getElementProps (element, key) {
    return {
      ...getPropsFromAttributes(element),
      key
    }
  }

  function parseElementNode (element, key) {
    let children = parseNodes(element.childNodes)
    const tagName = element.tagName.toLowerCase()
    const props = getElementProps(element, key)
    // grid magic happens here, append child component
    if (props.id && components.indexOf(props.id) !== -1) {
      children = factory(props.id)
    }
    return React.createElement(tagName, props, children)
  }
  if (!source || source.length === 0) return ''

  const tmp = document.createElement('div')
  tmp.innerHTML = source
  return parseNodes(tmp.childNodes)
}

export default grid2react
