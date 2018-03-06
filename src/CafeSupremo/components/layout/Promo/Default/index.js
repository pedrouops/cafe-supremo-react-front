import './design.css'

const ContentLayout = () => (
  <a href={scsData.detailPageLink}>
    <div className='promo-default'>
      <div
        className={[
          'contentItem',
          data.promo_textposition,
          data.promo_textcolor
        ].join(' ')}
      >
        <div className='name'>{name}</div>
        <div className='description'>{description}</div>
        <button type='button'>more</button>
      </div>

      <img className='image image-fill' src={imageBannerURL} alt='' />
    </div>
  </a>
)
