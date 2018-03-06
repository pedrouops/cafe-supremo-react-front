import './designs/default/design.css'
import './assets/css/styles.css'
import './assets/plugins/bootstrap/css/bootstrap.css'

import Header from './Header'
import Footer from './Footer'
import Slot from '../../components/sytem/Slot'

const BlogDetails = () => (
  <div>
    {/* Needed to override the default Sites Theme styles */}
    {/* Add the header into this layout page */}
    <Header />
    <Slot className='headline scs-slot' id='headline' />
    <Slot className='content blog-content scs-slot' id='blog-content' />
    {/* Add the footer into this layout page */}
    <Footer />
  </div>
)
