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

				// Get author image
				content.imageHeaderURL = contentClient.getRenditionURL({
					'itemGUID': (content.data.author_image_header instanceof Object) ? content.data.author_image_header.id : content.data.author_image_header,
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
});<div class="author-banner">
	<img class="image" src="{{imageHeaderURL}}">	
</div>
