/* globals define */

define([
	'jquery',
	'mustache',
	'text!./layout.html',
	'css!./design.css'
], function($, Mustache, templateHtml, css) {
	'use strict';

	function ContentLayout(params) {
		this.contentItemData = params.contentItemData || {};
		this.scsData = params.scsData;
		this.contentClient = params.contentClient || params.scsData.contentClient;
	}

	ContentLayout.prototype = {
		render: function(parentObj) {
			try {
				
				var template,
					content = $.extend({}, this.contentItemData),
					contentClient = this.contentClient,
					contentType,
					secureContent = false;

				if (this.scsData) {
					content = $.extend(content, { 'scsData': this.scsData });
					contentType = content.scsData.showPublishedContent === true ? 'published' : 'draft';
					secureContent = content.scsData.secureContent;
				}

				content.imageBannerURL = contentClient.getRenditionURL({
					'itemGUID': (content.data.promo_image_banner instanceof Object) ? content.data.promo_image_banner.id : content.data.promo_image_banner,
					'contentType': contentType,
					'secureContent': secureContent
				});

				// Append HTML to DOM
				template = Mustache.render(templateHtml, content);
				$(parentObj).append(template);
				
			} catch (e) {
                console.error("Content Layout Component error: ", e);
			}
		}
	};

	return ContentLayout;
});<a href="{{scsData.detailPageLink}}">
	<div class="promo-default">
		<div class="contentItem {{data.promo_textposition}} {{data.promo_textcolor}}" id="{{id}}-contentItem">
			<div class="name">{{name}}</div>
			<div class="description">{{description}}</div>
			<button type="button">more</button>
		</div>


		<img class="image image-fill" id="{{id}}-image" src="{{imageBannerURL}}" alt="">
	</div>
</a>

