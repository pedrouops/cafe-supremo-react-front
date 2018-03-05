import React from 'react'

const blank =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
const Component = ({ data }) => {
  const {
    alignment = 'left',
    backgroundColor = '',
    borderColor = '#808080',
    borderRadius = 0,
    borderStyle = 'none',
    borderWidth = 1,
    iconSize = 28,
    iconSpacing = 10,
    images = [],
    marginBottom = 5,
    marginLeft = 5,
    marginRight = 5,
    marginTop = 5
  } = data
  let imageStyle = {
    width: iconSize + 'px',
    height: iconSize + 'px',
    display: 'inline-block',
    margin: '0px ' + iconSpacing + 'px 0px 0px'
  }
  return (
    <div className='scs-component-bounding-box'>
      <div>
        <div
          className='scs-socialbar scs-component scs-socialbar-default-style'
          style={{
            textAlign: alignment,
            marginTop: marginTop,
            marginRight: marginRight,
            marginBottom: marginBottom,
            marginLeft: marginLeft
          }}
        >
          <div className='scs-component-content'>
            <div className='scs-socialbar-container'>
              {images.map(e => (
                <a href={e.link} target='_blank'>
                  <img
                    className={'scs-socialbar-icon ' + e['class']}
                    src={blank}
                    alt=''
                    title=''
                    style={imageStyle}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='scs-hidden' />
      </div>
    </div>
  )
}

export default Component
