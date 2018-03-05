import React from 'react'


const promo = {
  href:
    '/CafeSupremo/product-catalog/details/Promo/Promo_core_074f7960-db53-481c-8daf-ab831f5b8cdc/A free pastry!',
  contentId: 'Promo_core_074f7960-db53-481c-8daf-ab831f5b8cdc-contentItem',
  name: 'A free pastry!',
  description: '(for a limited time only)',
  src:
    'https://www.mycontentdemo.com/content/published/api/v1/digital-assets/DigitalAsset_proxy_dd886f14-a26c-46b0-b541-5f6650fa0400/default?cb=_cache_7d24',
  alt: ''
}


const noMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
}
const Component = () => ( 
                       <div className={'scs-component-container scs-sectionlayout'} >
                        <div className='scs-container-styles'>
                          <div className='scs-component-content'>
                            <div className={'scs-component-container'} >
                              <div className='scs-component-bounding-box'>
                                  <div
                                    className='scs-custom-component scs-component scs-component-default-style'
                                    style={noMargin}
                                  >
                                    <div
                                      className='scs-component-content'
                                      style={{ width: '100%' }}
                                    >
                                      <div className='scs-custom-component-wrapper'>
                                        <Promo
                                          {...promo}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='scs-hidden' />
                              </div>
                          </div>
                        </div>
                    </div>
    </div>)

const Promo = ({id,href,contentId, name, description,src,alt}) => (
  <div>
    <a href={href}>
      <div className='promo-default'>
        <div className='contentItem Right Light' id={contentId}>
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
          <button type='button'>more</button>
        </div>

        <img
          className='image image-fill'
          id={contentId + '-image'}
          src={src}
          alt={alt}
        />
      </div>
    </a>
  </div>
)
export default Component
