


   createMarkup(tmp) {
     return {__html: tmp};
   }
   <div className="search-blog-body" dangerouslySetInnerHTML={this.createMarkup(ContentItem.body)}/>
