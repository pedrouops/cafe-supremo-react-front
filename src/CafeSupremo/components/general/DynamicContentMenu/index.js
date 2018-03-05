import React from 'react'
import './menu.css'

const render = ({ responsiveStyle decoratedMenuItems=[], ...others }) =>
 (<div class="dynContentMenu">
    <style data-bind="text: responsiveStyle">{responsiveStyle}</style>
    <div role="navigation" data-bind="foreach: decoratedMenuItems">
  {decoratedMenuItems.map(({id,cssClass,label,click}) =>
        <span id ={id} className={cssClass}>
            <a href="#" className="dynContentMenuItem" onClick={click}>{label}</a>
        </span>
)}
    </div>
</div>)

export default render
