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

				// Get formatted date
				content.formattedDate = dateToMDY(content.updateddate);

				// Get blog image
				content.imageAdSmallURL = contentClient.getRenditionURL({
					'itemGUID': (content.data.blog_image_ad_small instanceof Object) ? content.data.blog_image_ad_small.id : content.data.blog_image_ad_small,
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

	function dateToMDY(date) {
		var dateObj = new Date(date.value);
		var options = {year: 'numeric', month: 'long', day: 'numeric'};
		var formattedDate = dateObj.toLocaleDateString('en-US', options);
		return formattedDate;
	}

	return ContentLayout;
});<a href="{{scsData.detailPageLink}}">
	<div class="blog-overlay">
		<div class="button-wrapper">
			<div class="button">{{data.blog_category}}</div>
		</div>

		<img class="image" src="{{imageAdSmallURL}}">	
		<div class="contentItem" id="{{id}}-contentItem">
			<div class="date">{{formattedDate}}</div>
			<div class="name">{{name}}</div>
			<div class="description">{{description}}</div>
		</div>
	</div>
</a>