import './design.css'

export default data => (
  <a href={data.ad_commerceurl} target='_blank'>
    <div className='ad-default'>
      <div className={'contentItem ' + data.ad_textcolor}>
        <div className='name'>{name}</div>
        <hr />
        <div className='description'>{description}</div>
        <button type='button'>shop now</button>
      </div>
      <img className='image' src={imageSideURL} alt='' />
    </div>
  </a>
)
