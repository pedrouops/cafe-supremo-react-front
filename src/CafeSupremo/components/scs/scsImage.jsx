import React from 'react'

const Image = ({ type, id, data }) => {
  const {
    width = 300,
    imageName = 'my-image',
    imageUrl,
    alignment = 'left',
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    marginTop = 0
  } = data
  const src = imageUrl.replace(
    '[!--$SCS_CONTENT_URL--]',
    '/CafeSupremo/content'
  )
  const style={
            textAlign: alignment,
            marginTop: marginTop,
            marginRight: marginRight,
            marginBottom: marginBottom,
            marginLeft: marginLeft
          }
  return (
    <div className='scs-component-bounding-box'>
        <div
          className='scs-image scs-component scs-image-default-style'
          style={style}
        >
          <div className='scs-component-content' style={{ width: width }}>
            <div className='scs-image-container'>
              <img alt={imageName} className='scs-image-image' src={src} />
            </div>
          </div>
        </div>
        <div className='scs-hidden' />
    </div>
  )
}

export default Image
