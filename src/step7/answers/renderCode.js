
 {this.state.messages.map((message, index) => {
   if (index % 2 === 0) {
     return (
       <div className='bubble-left' key={index}>
         You searched for  "{message}"
       </div>
     )
   } else {


     let response = this.state.messages[index] ;

     if (typeof  response === 'string'){

        return (
          <div className="search-response-error" key={index} > {message} </div>
        )
      }
      else{
         return (

       <div className="search-response" key={index} >


         {message.map((ContentItem, i) => <div key={i} className="search-item">
               <img alt="contentImage" className='search-image' src={ContentItem.image}  />
               <div className="search-blog-title" >  {ContentItem.name }  -  {ContentItem.description } </div>
               <div className="search-blog-body" dangerouslySetInnerHTML={this.createMarkup(ContentItem.body)}/>
                 <br/><br/><br/>
                                </div>
             )}

        </div>
     )
   }
 }
 })}
