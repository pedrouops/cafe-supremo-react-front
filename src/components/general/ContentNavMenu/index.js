import React from 'react'
import './nav-menu.css'

const SubMenu = ({ destination, target, label, submenus, classes }) => (
  <li className={classes}>
    <a
      className='dropdown-toggle'
      data-hover='dropdown'
      href={destination}
      target={target}
    >
      {label}
    </a>

    {submenus.length > 0 && (
      <ul className='dropdown-menu'>
        {submenus.map((e, index) => <SubMenu key={index} {...e} />)}
      </ul>
    )}
  </li>
)
const ContentType = ({ menuDivId, categoryOptions, showContentView }) => (
  <div className='dropdown' style={{ width: 'calc(100% + 20px)' }}>
    <div
      className='dropdown-menu content-menu scs-component-content'
      id={menuDivId}
      style={{ display: 'none' }}
    >
      {showContentView && (
        <div
          className='dropdown-container scs-contentlist'
          id={'cl_' + menuDivId}
        />
      )}
      <div className='block-container'>
        <ol className='blocks'>
          {categoryOptions.map(({ category, label, contentItems }, index) => (
            <li key={index}>
              <p>
                <a data-category={category}>{label}</a>
              </p>
              <ol>
                {contentItems.map(({ detailPage, itemName }, index) => (
                  <li key={index}>
                    <a href={detailPage} />
                    {itemName}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </div>
)

const NavContainer = ({
  navMenus,
  showDropdownMenu,
  contentTypes,
  showContentView
}) => (
  <div className='navcontainer'>
    <nav className='main-nav' role='navigation'>
      <div className='navbar-header'>
        <button
          className='navbar-toggle'
          type='button'
          data-toggle='collapse'
          data-target='.navbar-collapse'
        >
          <span className='sr-only'>Toggle navigation</span>
          <i
            className='glyphicon glyphicon-menu-hamburger'
            aria-hidden='true'
          />
        </button>
      </div>

      <div
        className='collapse navbar-collapse navbar-responsive-collapse width'
        id='topnav'
      >
        <ul className='nav navbar-nav'>
          {navMenus.map(
            ({ destination, target, name, submenus, classes }, index) => (
              <li key={index} className={classes}>
                <a
                  className='dropdown-toggle'
                  data-hover='dropdown'
                  href={destination}
                  target={target}
                >
                  {name}
                </a>
                {submenus.length > 0 && (
                  <ul className='dropdown-menu'>
                    {submenus.map((e, index) => <SubMenu key={index} {...e} />)}
                  </ul>
                )}
              </li>
            )
          )}
        </ul>
      </div>
      {showDropdownMenu
        ? contentTypes
          .filter(e => e.hasCategoryField)
          .map((e, index) => (
            <ContentType
              key={index}
              {...e}
              showContentView={showContentView}
            />
          ))
        : ''}
    </nav>
  </div>
)

export default NavContainer
