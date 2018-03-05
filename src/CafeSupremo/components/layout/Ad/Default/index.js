import './design.css'

export default data => (
  <a href={data.ad_commerceurl} target='_blank'>
    <div class='ad-default'>
      <div class={'contentItem ' + data.ad_textcolor} id={id + '-contentItem'}>
        <div class='name'>{name}</div>
        <hr />
        <div class='description'>{description}</div>
        <button type='button'>shop now</button>
      </div>
      <img class='image' id={id + '-image'} src={imageSideURL} alt='' />
    </div>
  </a>
)
