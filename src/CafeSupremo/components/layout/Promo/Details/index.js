import './design.css'

const ContentLayout = () => (
  <div className='promo-details'>
    <img className='image' src={imageBannerURL} />
    <div className='border'>
      <div className='document'>
        <div className='contentItem'>
          <div className='date'>{formattedDate}</div>
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
          <div className='content'>{data.promo_content}</div>
        </div>
      </div>
    </div>
  </div>
)
