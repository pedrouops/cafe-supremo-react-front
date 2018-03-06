import './design.css'

export default ({ name, description, data, id }) => {
  const imageBannerURL = contentClient.getRenditionURL({
    itemGUID:
      data.ad_image_banner instanceof Object
        ? data.ad_image_banner.id
        : data.ad_image_banner,
    contentType: contentType,
    secureContent: secureContent
  })
  return (
    <a href={data.ad_commerceurl} target='_blank'>
      <div className='ad-highlight'>
        <div
          className={
            'contentItem ' + data.ad_textposition + ' ' + data.ad_textcolor
          }
        >
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
          <button type='button'>shop now</button>
        </div>
        <img className='image image-fill' src={imageBannerURL} alt='' />
      </div>
    </a>
  )
}
