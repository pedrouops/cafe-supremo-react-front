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
                content.imageAvatarURL = contentClient.getRenditionURL({
                    'itemGUID': content.data.author_image_avatar.id,
                    'contentType': contentType,
					'secureContent': secureContent
                });

                // Append HTML to DOM
                var template = Mustache.render(templateHtml, content);
                $(parentObj).append(template);

            } catch (e) {
                console.error("Content Layout Component error: ", e);
            }
        }
    };

    return ContentLayout;
});<div class="author-details">
	<div class="document">
		<img class="image" src="{{imageAvatarURL}}">
		<div class="title">
			<div class="name">{{name}}</div>
			<div class="description">{{description}}</div>
		</div>
		<div class="contentItem" id="{{id}}-contentItem">
			<div class="bio">{{&data.author_bio}}</div>
		</div>
	</div>	
</div>
