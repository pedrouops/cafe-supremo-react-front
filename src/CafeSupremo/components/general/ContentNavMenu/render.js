/* global SCS, SCSRenderAPI */
/* globals define */
define(
  [
    'knockout',
    'jquery',
    'css!./css/nav-menu.css',
    'text!./template.html',
    'scs-components/comp/component-context',
    'scs-components/comp/components-default'
  ],
  function (ko, cecsJQuery, css, navMenuTemplate, compCtx, compDefaults) {
    'use strict'

    // Set $ to the jQuery defined by theme if available, because that jQuery can access the Bootstrap plugin from theme
    // $ falls back to the jQuery provided by CECS product, so the component can still work when hosting site's theme
    // doesn't have jQuery plugin included.
    var $ = typeof jQuery === 'function' ? jQuery : cecsJQuery

    // -------------------
    // Sub Menu ViewModel
    // -------------------
    var Submenu = function (label, destination, target, classes, submenus) {
      var self = this
      self.label = ko.observable(label)
      self.destination = ko.observable(destination)
      self.target = ko.observable(target)
      self.classes = ko.observable(classes)
      self.submenus = ko.observableArray(submenus)
    }

    // --------------------
    // Component ViewModel
    // --------------------
    var ComponentViewModel = function (args) {
      var self = this
      self.dependencyMissing = false

      // Verify jQuery is available
      if (typeof $ !== 'function') {
        console.error('jQuery plugin is not available')
        self.dependencyMissing = true
        return
      }

      // Verify Bootstrap is available
      if (typeof $.fn.modal !== 'function') {
        console.error('Bootstrap plugin is not available')
        self.dependencyMissing = true
        return
      }

      var SitesSDK = args.SitesSDK,
        renderAPI = compCtx.getRenderApi(),
        caasApi = compCtx.caasApi

      // Get section layouts
      var sectionLayouts = compDefaults.components.filter(function (category) {
        return category.name === 'COMP_CONFIG_SECTION_LAYOUTS_CATEGORY_NAME'
      })
      sectionLayouts =
        (sectionLayouts && sectionLayouts[0] && sectionLayouts[0].list) || []
      var defaultSectionLayout = sectionLayouts[0]

      // Available sort orders
      var sortOrders = [
        'name:asc',
        'name:des',
        'updateddate:asc',
        'updateddate:des'
      ]

      self.viewMode = args.viewMode

      self.templateDfd = $.Deferred()

      // component observables
      self.contentTypeMetadata = ko.observableArray()
      self.showDropdownMenu = ko.observable()
      self.showContentView = ko.observable()
      self.contentConfigs = ko.observableArray()
      self.navMenus = ko.observableArray()
      self.contentTypes = ko.observableArray()
      self.externalSiteEnabled = ko.observable()
      self.externalSites = ko.observableArray()

      // handle initialization
      self.postMetadataUpdate = false
      self.customSettingsDataInitialized = ko.observable(false)
      self.initialized = ko.computed(function () {
        return self.customSettingsDataInitialized()
      }, self)

      // Handle property changes
      self.updateCustomSettingsData = function (customData) {
        // console.log("render.js UPDATECUSTOMSETTINGSDATA, customData = ", JSON.stringify(customData));

        if (self.postMetadataUpdate) {
          self.postMetadataUpdate = false
          return // Skip this method after the setProperty call to update contentTypeMetadata
        }

        if (customData) {
          self.showDropdownMenu(
            customData.hasOwnProperty('showDropdownMenu')
              ? customData.showDropdownMenu
              : false
          )
          self.showContentView(
            customData.hasOwnProperty('showContentView')
              ? customData.showContentView
              : false
          )
          self.externalSiteEnabled(
            customData.hasOwnProperty('externalSiteEnabled')
              ? customData.externalSiteEnabled
              : false
          )
          if (customData.hasOwnProperty('contentConfigs')) {
            var configArray = []
            for (var type in customData.contentConfigs) {
              if (customData.contentConfigs.hasOwnProperty(type)) {
                var configuration = customData.contentConfigs[type]
                configArray.push({
                  name: type,
                  queryString: configuration.hasOwnProperty('queryString')
                    ? configuration.queryString
                    : '',
                  layoutCategory: configuration.hasOwnProperty('layoutCategory')
                    ? configuration.layoutCategory
                    : '',
                  detailPage: configuration.hasOwnProperty('detailPage')
                    ? configuration.detailPage
                    : ''
                })
              }
            }
            self.contentConfigs(JSON.parse(JSON.stringify(configArray)))
          }
          if (customData.hasOwnProperty('contentTypeMetadata')) {
            self.contentTypeMetadata(
              JSON.parse(JSON.stringify(customData.contentTypeMetadata))
            )
          }
          if (customData.hasOwnProperty('externalSites')) {
            self.externalSites(customData.externalSites)
          }
        }
        if (self.customSettingsDataInitialized()) {
          // Already initialized
          // Update observables to re-render the nav menu
          self.setupContentTypes()
        } else {
          if (self.viewMode === 'edit') {
            // In edit mode, update contentTypeMetadata in customSettingsData if it is unset or stale
            self.updateContentTypeMetadata(customData).done(function (metadata) {
              self.customSettingsDataInitialized(true)
              self.setupContentTypes() // Initial rendering of nav menu in edit mode
            })
          } else {
            self.customSettingsDataInitialized(true)
            self.setupContentTypes() // Initial rendering of nav menu in non-edit mode
          }
        }
      }

      self.updateContentTypeMetadata = function (customData) {
        var dfd = $.Deferred()
        var origMetadataString = JSON.stringify(customData.contentTypeMetadata)
        var metadata = []
        var callback = function (data) {
          // console.log("Content Types: ", data);
          var menuIndex = 0
          var i,
            j,
            k,
            name,
            matchTopPage,
            hasCategoryField,
            catOps,
            categoryOptions,
            menuDivId

          for (i = 0; i < data.items.length; i++) {
            name = data.items[i].name
            matchTopPage = false
            hasCategoryField = false
            categoryOptions = []
            menuDivId = null

            // First check if this content type matches with a top level page
            for (j = 0; j < self.topPageNames.length; j++) {
              if (name.toUpperCase() === self.topPageNames[j].toUpperCase()) {
                matchTopPage = true
                break
              }
            }

            // Then check whether this content type contains a _category field
            if (matchTopPage) {
              for (j = 0; j < data.items[i].fields.length; j++) {
                if (
                  data.items[i].fields[j].name ===
                  name.toLowerCase() + '_category'
                ) {
                  hasCategoryField = true
                  menuDivId = 'contentmenu' + ++menuIndex
                  catOps = data.items[i].fields[j].settings.caas.editor.options
                  if (catOps && catOps.valueOptions) {
                    for (k = 0; k < catOps.valueOptions.length; k++) {
                      categoryOptions.push({
                        category: catOps.valueOptions[k].value,
                        label: catOps.valueOptions[k].label
                      })
                    }
                  }

                  break
                }
              }
            }

            metadata.push({
              name: name,
              hasCategoryField: hasCategoryField,
              categoryOptions: categoryOptions,
              menuDivId: menuDivId
            })
          }

          if (origMetadataString !== JSON.stringify(metadata)) {
            if (origMetadataString) {
              // metadata changed since last save
              var msg =
                'Content Types have changed in the "ContentNavMenu" component on this page. In order for these changes to take effect, the Site must be saved and re-published.'
              alert(msg)
            }

            // Update and save customSettingsData
            self.postMetadataUpdate = true
            customData.contentTypeMetadata = JSON.parse(
              JSON.stringify(metadata)
            )
            // console.log("render.js TO SAVE customSettingsData: ", JSON.stringify(customData));
            SitesSDK.setProperty('customSettingsData', customData) // TODO: should we restringnify entire customData before save?

            // Update observable
            self.contentTypeMetadata(JSON.parse(JSON.stringify(metadata)))
          }

          dfd.resolve(metadata)
        }

        var errorCallback = function (jqXHR, textStatus, errorThrown) {
          console.error(
            "Can't get content types: ",
            jqXHR,
            textStatus,
            errorThrown
          )
        }

        var accessToken = ''
        if (renderAPI) {
          // get the access tokens from the site info
          var accessTokens = renderAPI.getSiteProperty('targetAccessTokens')

          // get the default token
          if (accessTokens) {
            for (var i = 0; i < accessTokens.length; i++) {
              if (accessTokens[i].name === 'defaultToken') {
                accessToken = accessTokens[i].value
                break
              }
            }
          }
        }

        $.ajax({
          type: 'GET',
          // Make the limit 10,000 just to make sure we get all the Content Types on the system so this never fails
          url: '/content/management/api/v1/aggregates/types?limit=10000&links=',
          dataType: 'json'
        })
          .done(callback)
          .fail(errorCallback)

        return dfd.promise()
      }

      //  Listen for changes to the settings data.
      self.updateSettings = function (settings) {
        if (settings.property === 'customSettingsData') {
          self.updateCustomSettingsData(settings.value)
        }
      }

      // Recursively check whether the given page is an ancestor of the current page
      self.checkCurrentParent = function (pageId) {
        var navNode = SCS.structureMap[pageId]
        var isCurrentParent = false
        var c, subcurrent

        if (navNode.children.length > 0) {
          for (c = 0; c < navNode.children.length; c++) {
            subcurrent =
              SCS.navigationCurr === navNode.children[c]
                ? true
                : self.checkCurrentParent(navNode.children[c])
            if (subcurrent) {
              isCurrentParent = true
              break
            }
          }
        }

        return isCurrentParent
      }

      // Get the names of the top level pages (who are child pages of the root/home page)
      // In edit mode, also save it in browser's session storage for it to be accessed from settings dialog.
      self.getTopPageNames = function () {
        var topPageNames = []
        var children = SCS.structureMap[SCS.navigationRoot].children
        for (var i = 0; i < children.length; i++) {
          topPageNames.push(SCS.structureMap[children[i]].name)
        }

        if (SCSRenderAPI.renderMode === 'edit') {
          if (window.sessionStorage) {
            window.sessionStorage.setItem(
              'oracle.cecs.topPageNames',
              JSON.stringify(topPageNames)
            )
          }
        } else {
          if (window.sessionStorage) {
            window.sessionStorage.removeItem('oracle.cecs.topPageNames')
          }
        }

        return topPageNames
      }

      self.topPageNames = self.getTopPageNames()

      // In edit mode, retrieve all the detail pages and save it in browser's session storage for use by settings dialog.
      self.getDetailPages = function () {
        if (SCSRenderAPI.renderMode === 'edit') {
          var detailPages = []
          for (var pageId in SCS.structureMap) {
            if (SCS.structureMap.hasOwnProperty(pageId)) {
              if (SCS.structureMap[pageId].isDetailPage) {
                detailPages.push({
                  pageId: pageId,
                  pageName: SCS.structureMap[pageId].name
                })
              }
            }
          }

          if (window.sessionStorage) {
            window.sessionStorage.setItem(
              'oracle.cecs.detailPages',
              JSON.stringify(detailPages)
            )
          }
        } else {
          if (window.sessionStorage) {
            window.sessionStorage.removeItem('oracle.cecs.detailPages')
          }
        }
      }

      self.getDetailPages()

      // Get the configured detail page id for the given content type if available. Otherwise, get a detail page
      // whose name partially match with the content type name. Finally, get a random detail page.
      self.getDetailPageId = function (contentType) {
        var detailPageId = -1,
          contentDetailPageId = -1

        if (contentType) {
          var configArray = self.contentConfigs()
          if (configArray) {
            var i,
              detailPage = null
            for (i = 0; i < configArray.length; i++) {
              if (contentType === configArray[i].name) {
                detailPage = configArray[i].detailPage
                if (detailPage) {
                  contentDetailPageId = parseInt(detailPage, 10)
                  contentDetailPageId = isNaN(contentDetailPageId)
                    ? -1
                    : contentDetailPageId
                }
                break
              }
            }
          }
        }

        if (detailPageId === -1 && contentDetailPageId === -1) {
          for (var prop in SCS.structureMap) {
            if (SCS.structureMap.hasOwnProperty(prop)) {
              if (SCS.structureMap[prop].isDetailPage) {
                if (detailPageId === -1) {
                  detailPageId = SCS.structureMap[prop].id
                }
                if (!contentType || contentDetailPageId !== -1) {
                  break
                }
                if (
                  SCS.structureMap[prop].name
                    .toUpperCase()
                    .indexOf(contentType.toUpperCase()) >= 0
                ) {
                  contentDetailPageId = SCS.structureMap[prop].id
                  break
                }
              }
            }
          }
        }
        return contentDetailPageId !== -1 ? contentDetailPageId : detailPageId
      }

      // Get the layout name based off of the contentType
      self.getLayoutName = function (contentType, layoutCategory) {
        var layoutName
        var callback = function (contentLayoutArray) {
          for (var i = 0; i < contentLayoutArray.length; i++) {
            if (contentLayoutArray[i].type === contentType) {
              var categoryListArray = contentLayoutArray[i].categoryList
              for (var x = 0; x < categoryListArray.length; x++) {
                if (categoryListArray[x].categoryName === layoutCategory) {
                  layoutName = categoryListArray[x].layoutName
                  break
                }
              }
            }
          }
        }

        var errorCallback = function (jqXHR, textStatus, errorThrown) {
          console.error(
            "Can't get content layouts: ",
            jqXHR,
            textStatus,
            errorThrown
          )
        }

        $.ajax({
          type: 'GET',
          url: SCSRenderAPI.getSitePrefix() + 'caas_contenttypemap.json',
          dataType: 'json',
          async: false
        })
          .done(callback)
          .fail(errorCallback)

        return layoutName
      }

      // Get the configured layout category for the given content type if available, or the "Default" category.
      self.getLayoutCategory = function (contentType, layoutCategory) {
        var layoutCategory = null

        if (contentType) {
          var configArray = self.contentConfigs()
          if (configArray) {
            var i
            for (i = 0; i < configArray.length; i++) {
              if (contentType === configArray[i].name) {
                layoutCategory = configArray[i].layoutCategory
                break
              }
            }
          }
        }

        return layoutCategory || 'Default'
      }

      // Get the configured additional query string for the given content type.
      self.getAdditionalQueryString = function (contentType) {
        var queryString = null

        if (contentType) {
          var configArray = self.contentConfigs()
          if (configArray) {
            var i
            for (i = 0; i < configArray.length; i++) {
              if (contentType === configArray[i].name) {
                queryString = configArray[i].queryString
                break
              }
            }
          }
        }

        return queryString
      }

      // Gets the detail page URL for the given Content Item or null if no detail page is defined
      self.getDetailPageLinkForContent = function (
        detailPageId,
        contentType,
        contentItemId,
        contentItemName
      ) {
        return detailPageId === -1
          ? null
          : SCSRenderAPI.getPageLinkData(detailPageId, {
            contentType: contentType,
            contentId: contentItemId,
            contentName: contentItemName
          }).href
      }

      // Fetch configured external site URL for the given page or null
      self.getExternalUrl = function (pageName) {
        var externalUrl = null

        if (self.externalSiteEnabled() && self.externalSites()) {
          for (var i = 0; i < self.externalSites().length; i++) {
            if (
              self.externalSites()[i].name &&
              self.externalSites()[i].name.toUpperCase() ===
                pageName.toUpperCase()
            ) {
              externalUrl = self.externalSites()[i].url
              break
            }
          }
        }

        return externalUrl
      }

      // Recursively build sub menus for a given top page.
      self.buildSubmenus = function (navNode) {
        var submenus = []

        if (navNode.children.length > 0) {
          for (var c = 0; c < navNode.children.length; c++) {
            var childNodeId = navNode.children[c]
            var isCurrent = SCS.navigationCurr === childNodeId
            var isLast = c === navNode.children.length - 1
            var childNode =
              childNodeId >= 0 ? SCS.structureMap[childNodeId] : null
            if (
              (childNode && typeof childNode.hideInNavigation !== 'boolean') ||
              childNode.hideInNavigation === false
            ) {
              var name = childNode.name
              var classes =
                childNode.children.length > 0 ? 'dropdown-submenu' : 'dropdown'
              if (isCurrent) {
                classes += ' current'
              } else if (self.checkCurrentParent(childNodeId)) {
                classes += ' currParent'
              }
              if (isLast) {
                classes += ' last'
              }
              var externalUrl = self.getExternalUrl(name)
              var target = externalUrl ? '_blank' : '_self'
              var destination = externalUrl || null
              if (destination === null) {
                var linkData = SCSRenderAPI.getPageLinkData(childNode.id) || {}
                destination = linkData.href ? linkData.href : ''
              }
              var childSubmenus = self.buildSubmenus(childNode)
              submenus.push(
                new Submenu(name, destination, target, classes, childSubmenus)
              )
            }
          }
        }

        return submenus
      }

      // Construct a top page menu. If the page has a matching content type, also construct its content dropdown menu,
      // including render a
      self.addNavMenu = function (pageId, isCurrent, isLast, showSubmenus) {
        var navNode = SCS.structureMap[pageId]
        var name, externalUrl, linkData, destination, target, classes
        var submenus = []
        var contentTypeDef = null
        var detailPageId = -1
        var i, category
        var query, additionalQueryString

        if (
          navNode &&
          (typeof navNode.hideInNavigation !== 'boolean' ||
            navNode.hideInNavigation === false)
        ) {
          name = navNode.name
          target = '_self'
          externalUrl = self.getExternalUrl(name)
          if (externalUrl) {
            destination = externalUrl
            target = '_blank'
          } else {
            linkData = SCSRenderAPI.getPageLinkData(navNode.id) || {}
            destination = linkData.href ? linkData.href : ''
          }
          classes = 'dropdown'

          if (isCurrent) {
            classes += ' current'
          } else if (
            pageId !== SCS.navigationRoot &&
            self.checkCurrentParent(pageId)
          ) {
            classes += ' currParent'
          }
          if (isLast) {
            classes += ' last'
          }

          for (i = 0; i < self.contentTypes().length; i++) {
            if (
              navNode.name.toUpperCase() ===
              self.contentTypes()[i].name.toUpperCase()
            ) {
              contentTypeDef = self.contentTypes()[i]
              break
            }
          }

          if (contentTypeDef && contentTypeDef.hasCategoryField) {
            classes += ' content-link'
            classes += ' ' + contentTypeDef.menuDivId + '-link'

            detailPageId = self.getDetailPageId(contentTypeDef.name) // TODO: cache it?

            if (SCSRenderAPI.renderMode === 'edit') {
              // Get layouts for the content type
              var callback = function (data) {
                // console.log("callback data ", data);
                var layoutCategories = []
                var category, storedItem
                for (category in data) {
                  if (data.hasOwnProperty(category)) {
                    layoutCategories.push({
                      category: category,
                      name: data[category]
                    })
                  }
                }
                if (window.sessionStorage) {
                  storedItem = window.sessionStorage.getItem(
                    'oracle.cecs.layoutCategories'
                  )
                  if (!storedItem) {
                    storedItem = {}
                  } else {
                    storedItem = JSON.parse(storedItem)
                  }
                  storedItem[contentTypeDef.name] = layoutCategories
                  window.sessionStorage.setItem(
                    'oracle.cecs.layoutCategories',
                    JSON.stringify(storedItem)
                  )
                }
              }
              var errorCallback = function (jqXHR, textStatus, errorThrown) {
                console.error(
                  "Can't get layout categories for content type " +
                    contentTypeDef.name +
                    ': ',
                  jqXHR,
                  textStatus,
                  errorThrown
                )
              }
              compCtx.caasApi.getContentCategoriesForType(
                contentTypeDef.name,
                callback,
                errorCallback
              )
            } // TODO: removeItem from sessionStorage in non edit mode?

            // Callback after CAAS API called
            var callback = function (data) {
              // CAAS success
              var i,
                category,
                contentItems = null

              if (data.count > 0) {
                // Fetch the category from results data
                category =
                  data.items[0].data[
                    contentTypeDef.name.toLowerCase() + '_category'
                  ]

                // Locate the contentItems for the given category
                for (i = 0; i < contentTypeDef.categoryOptions().length; i++) {
                  if (
                    category === contentTypeDef.categoryOptions()[i].category
                  ) {
                    contentItems = contentTypeDef.categoryOptions()[i]
                      .contentItems
                    break
                  }
                }

                if (contentItems !== null) {
                  processCategoryQuery(data, contentItems)
                }
              }

              function processCategoryQuery (data, contentItems) {
                for (var j = 0; j < data.items.length; j++) {
                  contentItems.push({
                    itemName: data.items[j].name,
                    detailPage: self.getDetailPageLinkForContent(
                      detailPageId,
                      contentTypeDef.name,
                      data.items[j].id,
                      data.items[j].name
                    )
                  })
                }
              }
            }

            // Error Callback after CAAS API call fails
            var errorCallback = function (xhr, textStatus, errorThrown) {
              //	console.error('Failed to GET the search results due to ' + textStatus + ': ' + err);
              // CAAS error
              console.error(
                "Can't get " +
                  contentTypeDef.name +
                  ' items under category ' +
                  category,
                textStatus,
                errorThrown
              )
            }

            // Find top 10 most recent content items under each category
            for (i = 0; i < contentTypeDef.categoryOptions().length; i++) {
              category = contentTypeDef.categoryOptions()[i].category
              query =
                'fields=ALL&limit=10&links=&field:type:equals=' +
                contentTypeDef.name +
                '&field:' +
                contentTypeDef.name.toLowerCase() +
                '_category=' +
                category +
                '&orderBy=updateddate:des'
              compCtx.caasApi
                .getContentClient()
                .getItems({
                  search: query
                })
                .then(callback, errorCallback)
            }

            if (self.showContentView()) {
              // Render the most recent content item of the content type
              query = 'field:type:equals=' + contentTypeDef.name
              additionalQueryString = self.getAdditionalQueryString(
                contentTypeDef.name
              )
              self.getContentItems(
                query,
                additionalQueryString,
                contentTypeDef.menuDivId
              )
            }
          } else {
            if (showSubmenus) {
              submenus = self.buildSubmenus(navNode)
            }
          }

          self.navMenus.push({
            name: name,
            destination: destination,
            target: target,
            classes: classes,
            submenus: ko.observableArray(submenus)
          })
        }
      }

      // Initialize UI bound observables
      // TODO: When CaaS API supports "/content/management/api/v1/aggregates/types" in POD/production env for
      // unauthenticated users, invoke CaaS API for content type metadata instead of reading from customSettingsData.
      self.setupContentTypes = function () {
        // Clear observables first
        self.contentTypes([])
        self.navMenus([])

        var metadataArray = self.contentTypeMetadata()
        var i, j, name, hasCategoryField, categoryOptions, menuDivId
        var isCurrent, isLast, children

        // Populate self.contentTypes from self.contentTypeMetadata, in particular, make sure categoryOptions and
        // each option's contentItems are observable arrays. Otherwise, top 10 per category results from
        // async Caas API calls wouldn't show up in the dropdown menu.
        for (i = 0; i < metadataArray.length; i++) {
          name = metadataArray[i].name
          hasCategoryField = metadataArray[i].hasCategoryField
          menuDivId = metadataArray[i].menuDivId

          categoryOptions = ko.observableArray()
          for (j = 0; j < metadataArray[i].categoryOptions.length; j++) {
            categoryOptions.push({
              category: metadataArray[i].categoryOptions[j].category,
              label: metadataArray[i].categoryOptions[j].label,
              contentItems: ko.observableArray()
            })
          }
          self.contentTypes.push({
            name: name,
            hasCategoryField: hasCategoryField,
            categoryOptions: categoryOptions,
            menuDivId: menuDivId
          })
        }

        // Go through site structure map to set up top level navigation menus
        // First add HOME menu
        isCurrent = SCS.navigationCurr === SCS.navigationRoot
        self.addNavMenu(
          SCS.navigationRoot,
          isCurrent,
          false /* isLast */,
          false /* showSubmenus */
        )
        // Then add menus for sub pages under HOME
        children = SCS.structureMap[SCS.navigationRoot].children
        for (i = 0; i < children.length; i++) {
          isCurrent = SCS.navigationCurr === children[i]
          isLast = i === children.length - 1
          self.addNavMenu(
            children[i],
            isCurrent,
            isLast,
            true /* showSubmenus */
          )
        }

        // console.log("contentTypes: ", self.contentTypes());
        // console.log("navMenus: ", JSON.stringify(self.navMenus()));

        // The following listener registration code must be run after the component template is added in DOM
        self.templateDfd.done(function () {
          // Remove rightarrow character on empty dropdown-submenu ('.dropdown-submenu > a:after')
          $('.dropdown-submenu > a').each(function () {
            // console.log("<a> next sibling's tag name: ", $(this).next().prop('tagName'));
            if (
              $(this)
                .next()
                .prop('tagName') !== 'UL'
            ) {
              $(this).addClass('no-arrow')
            }
          })

          $('.navbar-collapse')
            .on('shown.bs.collapse', function () {
              $('.navbar-toggle').addClass('dropped')
            })
            .on('hidden.bs.collapse', function () {
              $('.navbar-toggle').removeClass('dropped')
            })

          // register mouseenter & mouseleave listeners
          $('#topnav .dropdown').mouseenter(function () {
            // console.log("TOP MENU mouse enter");
            var menuDivId, classes, classList, i

            $('.dropdown-menu.content-menu').hide()
            $('.dropdown.content-link').removeClass('currDropdownTop')

            if ($(this).hasClass('content-link')) {
              classes = $(this).attr('class')
              classList = classes.split(' ')
              for (i = 0; i < classList.length; i++) {
                if (classList[i].indexOf('contentmenu') >= 0) {
                  menuDivId = classList[i].substring(0, classList[i].length - 5)
                  break
                }
              }

              $('#' + menuDivId + '.dropdown-menu.content-menu').show()
              $(this).addClass('currDropdownTop')
            }
          })
          $('.dropdown.content-link').mouseleave(function () {
            // console.log("TOP MENU mouse leave");
            if (SCSRenderAPI.renderMode !== 'edit') {
              $('.dropdown-menu.content-menu').hide()
              $(this).removeClass('currDropdownTop')
            }
          })
          $('.dropdown-menu.content-menu')
            .mouseenter(function () {
              // console.log("DROPDOWN MENU mouse enter");
              $(this).show()
              $(
                '.dropdown.content-link.' + $(this).attr('id') + '-link'
              ).addClass('currDropdownTop')
            })
            .mouseleave(function () {
              // console.log("DROPDOWN MENU mouse leave");
              if (SCSRenderAPI.renderMode !== 'edit') {
                $(this).hide()
                $('.dropdown.content-link').removeClass('currDropdownTop')
              }
            })
          // Listener on menus with external site navigation
          $(".dropdown-toggle[target='_blank']").click(function (event) {
            // console.log("EXTERNAL SITE MENU clicked");
            $(this).blur() // remove focus on the menu after it is clicked so it is not highlighted
            $(this)
              .next('.dropdown-menu')
              .css('display', '') // reenable menu's dropdown if it is present
          })
        })
      }

      // Construct and run a Caas query for the given content type and query
      self.getContentItems = function (query, additionalQueryString, menuDivId) {
        var self = this
        var offset = 0
        var sortOrder = 'updateddate:des'
        var pvalue

        if (additionalQueryString) {
          var predicates = additionalQueryString.split('&')
          for (var pi = 0; pi < predicates.length; pi++) {
            if (predicates[pi]) {
              var pnv = predicates[pi].split('=')
              if (pnv && pnv.length === 2) {
                pvalue = pnv[1]
                if (pnv[0] === 'offset') {
                  pvalue = parseInt(pvalue, 10)
                  if (!isNaN(pvalue) && pvalue >= 0) {
                    offset = pvalue
                  }
                } else if (pnv[0] === 'orderBy') {
                  if (sortOrders.indexOf(pvalue) >= 0) {
                    sortOrder = pvalue
                  }
                }
              }
            }
          }
        }

        // Callback after CAAS API called
        var callback = function (searchResults) {
          self.renderList(self, searchResults, menuDivId)
        }

        // Error Callback after CAAS API call fails
        var errorCallback = function (xhr, textStatus, err) {
          console.error(
            'Failed to GET the search results due to ' + textStatus + ': ' + err
          )
        }

        query =
          query +
          '&contentType=published&fields=ALL&orderBy=' +
          sortOrder +
          '&limit=1&links=&offset=' +
          offset
        compCtx.caasApi
          .getContentClient()
          .getItems({
            search: query
          })
          .then(callback, errorCallback)
      }

      // Render a Content Item on the given dropdown menu
      self.renderList = function (self, searchResultsObject, menuDivId) {
        var seededLayout = defaultSectionLayout
        if (!seededLayout) {
          console.error('No layouts found')
          return
        }

        if (searchResultsObject.items.length === 0) {
          console.error('No search results')
          return
        }

        var clContainerId = 'cl_' + menuDivId
        var tempSectionComponentId
        var tempComponentIds = []

        // Create a temporary 'contentitem' component for each item in the result set
        var detailPageId, layoutCategory, layoutName
        searchResultsObject.items.forEach(function (searchResultsItem) {
          // Only get these values once since they will be the same for every item
          if (detailPageId === undefined) {
            detailPageId = self.getDetailPageId(searchResultsItem.type)
          }
          if (layoutCategory === undefined) {
            layoutCategory = self.getLayoutCategory(searchResultsItem.type)
          }
          var componentData = {
            componentId: '',
            componentName: 'scsContentQueryItemInstance', // used to prevent drop into this component (see: component-edit.js)
            contentId: searchResultsItem.id,
            contentLayoutCategory: layoutCategory,
            contentPlaceholder: false,
            contentTypes: [searchResultsItem.type],
            // Purposely using '==' instead of '===' so that we catch both null and undefined
            contentViewing:
              SCSRenderAPI.renderMode === 'view' ? 'published' : 'draft',
            isCaaSLayout: true,
            detailPageId: detailPageId,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0
          }
          if (SCSRenderAPI.renderMode === 'view') {
            if (layoutName === undefined) {
              layoutName = self.getLayoutName(
                searchResultsItem.type,
                layoutCategory
              )
            }
            componentData.contentItemCache = {
              data: searchResultsItem,
              contentLayoutName: layoutName
            }
          } else {
            componentData.contentItemData = searchResultsItem
          }

          // create and store the transient component to be used in the section layout
          tempComponentIds.push(
            renderAPI.addComponentToPageModel({
              type: 'scs-component',
              id: 'scsCaaSLayout',
              data: componentData,
              isTemporary: true
            })
          )
        })

        var sectionLayoutComponent = {
          type: 'scs-sectionlayout',
          id: seededLayout.id, // name of the section layout in the server
          data: {
            components: tempComponentIds,
            customSettingsData: seededLayout.initialData.customSettingsData,
            componentFactory: seededLayout.initialData.componentFactory
          },
          isTemporary: true
        }

        // Create section layout in page model
        tempSectionComponentId = renderAPI.addComponentToPageModel(
          sectionLayoutComponent
        )

        // renderAPI.renderComponentInstance(componentId, slotId, position, isEditMode, columnNode, renderStyles, parentContentItemId, componentRenderMode, callback) {
        renderAPI.renderComponentInstance(
          tempSectionComponentId,
          clContainerId,
          {},
          false,
          $('#' + clContainerId)[0],
          undefined,
          undefined,
          'navigate',
          undefined
        )
      }

      // Get the current customSettingsData values
      SitesSDK.getProperty('customSettingsData', self.updateCustomSettingsData)

      // Listen for settings change
      SitesSDK.subscribe('SETTINGS_UPDATED', self.updateSettings)

      //		// TODO: Need to listen for any EXECUTE ACTION request to handle custom actions?
      //		SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.EXECUTE_ACTION, $.proxy(self.executeActionListener, self));
    }

    // ----------------------------------------------
    // Create a knockout-based component implemention
    // ----------------------------------------------
    var ComponentImpl = function (args) {
      // Initialze the custom component
      this.init(args)
    }

    // initialize all the values within the component from the given argument values
    ComponentImpl.prototype.init = function (args) {
      this.createViewModel(args)
      this.createTemplate(args)
      this.setupCallbacks()
    }

    // create the viewModel from the initial values
    ComponentImpl.prototype.createViewModel = function (args) {
      this.viewModel = new ComponentViewModel(args)
    }

    // create the template based on the initial values
    ComponentImpl.prototype.createTemplate = function (args) {
      // create a unique ID for the div to add, this will be passed to the callback
      this.contentId = args.id + '_content_' + args.mode
      // create a hidden custom component template that can be added to the DOM
      var template =
        typeof $ === 'function' && typeof $.fn.modal === 'function'
          ? navMenuTemplate
          : '<div style="margin: 20px;">The Site\'s theme must contain jQuery and Bootstrap plugins in order for this ContentNavMenu component to work.</div>'
      this.template = '<div id="' + this.contentId + '">' + template + '</div>'
    }

    //
    // SDK Callbacks
    // setup the callbacks expected by the SDK API
    //
    ComponentImpl.prototype.setupCallbacks = function () {
      //
      // callback - render: add the component into the page
      //
      this.render = $.proxy(function (container) {
        // console.log("render CALLBACK");
        var self = this

        // add the custom component template to the DOM
        $(container).append(this.template)

        // apply the bindings
        ko.applyBindings(this.viewModel, $('#' + this.contentId)[0])

        if (!this.viewModel.dependencyMissing) {
          // notify view model that the template is added in the DOM
          this.viewModel.templateDfd.resolve(true)

          // Overwrite 'overflow: hidden;' style on div.scs-custom-component-wrapper element.
          // Otherwise, dropdown menus are clipped.
          $(container)
            .closest('.scs-custom-component-wrapper')
            .css('overflow', 'visible')
          if (SCS.renderMode === 'edit') {
            $(container)
              .closest('.scs-component-bounding-box')
              .css('overflow', 'visible')
          }

          // register other listeners
          $(document).mouseup(function (e) {
            // console.log("mouseup listener");
            $('.dropdown-menu').each(function () {
              if (
                !$(this).is(e.target) && // if the target of the click isn't the container...
                $(this).has(e.target).length === 0
              ) {
                // ... nor a descendant of the container
                // Hide the dropdown menu
                $(this).hide()
                // Remove highlight on correspondent top menu
                var id = $(this).attr('id')
                $('.dropdown.content-link.' + id + '-link').removeClass(
                  'currDropdownTop'
                )
              }
            })
          })
          $(document).on(
            {
              mouseenter: function () {
                $(this)
                  .parents('.dropdown')
                  .addClass('curfocus')
              },
              mouseleave: function () {
                $(this)
                  .parents('.dropdown')
                  .removeClass('curfocus')
              }
            },
            '.dropdown-toggle'
          )
        }
      }, this)

      //
      // callback - update: handle property change event
      //
      this.update = $.proxy(function (args) {
        var self = this
        // deal with each property changed
        $.each(args.properties, function (index, property) {
          if (property) {
            if (property.name === 'customSettingsData') {
              self.viewModel.updateCustomSettingsData(property.value)
            }
          }
        })
      }, this)

      //
      // callback - dispose: cleanup after component when it is removed from the page
      //
      this.dispose = $.proxy(function () {
        // nothing required for this component since knockout disposal will automatically clean up the node
      }, this)
    }

    // ----------------------------------------------
    // Create the factory object for the component
    // ----------------------------------------------
    var componentFactory = {
      createComponent: function (args, callback) {
        // return a new instance of the component
        return callback(new ComponentImpl(args))
      }
    }

    return componentFactory
  }
)
