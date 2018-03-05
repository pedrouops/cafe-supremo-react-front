
export default () => {
				// Get formatted date
				const formattedDate = dateToMDY(content.updateddate);

				// Get blog image
				const imageAdURL = contentClient.getRenditionURL({
					'itemGUID': (data.blog_image_ad instanceof Object) ? data.blog_image_ad.id : data.blog_image_ad,
					'contentType': contentType,
					'secureContent': secureContent
				});

			

	function dateToMDY(date) {
		var dateObj = new Date(date.value);
		var options = {year: 'numeric', month: 'long', day: 'numeric'};
		var formattedDate = dateObj.toLocaleDateString('en-US', options);
		return formattedDate;
	}


return (
<a href={scsData.detailPageLink}">
	<div class="blog-highlight">
		<div class="contentItemWrapper">
			<button type="button">{data.blog_category}</button>
			<div class="contentItem">
				<div class="titleWrapper">
					<span class="title">{type} / </span>
					<span class="date">{formattedDate}</span>
				</div>
				<div class="name">{name}</div>
				<div class="description">{description}</div>
			</div>
		</div>
		<img class="image" id={id +'-imageAd'} src={imageAdURL} alt=""/ >
	</div>
</a>)

}