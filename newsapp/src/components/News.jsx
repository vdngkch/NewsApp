import React, {Component} from 'react'
import NewsItem from './NewsItem'
import Loader from './loader'
import PropTypes from 'prop-types'

export class News extends Component{
 
    static defaultProps={
      country: 'us',
      pageSize:9,
      category:'general',
      searchTerm:""
    }
    
    static propTypes={
      country: PropTypes.string,
      pageSize:PropTypes.number,
      category: PropTypes.string,
      searchTerm:PropTypes.string
    }

    constructor(props){
        super(props);
        this.state={
          articles:[],
          allArticles:[],
          loading: false,
          page:1,
          totalResults:0
        }
    }


    async updateNews(){
      const {country,category,pageSize,searchTerm} = this.props;
      
      let url = searchTerm ? 
      `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=833278a3f6d0486bb6ab18f9d22c8c44&page=${this.state.page}&pageSize=${pageSize}`
      :`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=833278a3f6d0486bb6ab18f9d22c8c44&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
      this.setState({loading:true})

      let data = await fetch(url)
      let parsedData = await data.json()
      
      console.log(parsedData)
      this.setState({
        allArticles: parsedData.articles,
        articles:this.filterArticles(parsedData.articles,this.props.searchTerm),
        totalResults: parsedData.totalResults,
        loading:false})
    }

    //filtering articles
    filterArticles = (articles,searchTerm)=>{
      if(!searchTerm || searchTerm.trim() === ""){
        return articles;
      }

      const term = searchTerm.toLowerCase().trim();

      return articles.filter(article =>{
        const titleMatch = article.title?.toLowerCase().includes(term);
        return titleMatch;  
      })
    }


    async componentDidMount(){
      console.log("Country prop received:", this.props.country);
      
      this.updateNews();
    }

    async componentDidUpdate(prevProps){
      if(prevProps.searchTerm != this.props.searchTerm){
        this.setState({
          articles:this.filterArticles(this.state.allArticles, this.props.searchTerm),
          page:1});
        this.updateNews();
      }

      //refetching news when category changes
      if(prevProps.category !== this.props.category){
        this.setState({page:1});
        this.updateNews();
      }

    }

    

    prevClick = async ()=>{
      console.log("Preveious button")
     
      this.setState({page:this.state.page-1})
      this.updateNews();
    }

    nextClick=async ()=>{
      console.log("next button")
      
      this.setState({page:this.state.page+1});
      this.updateNews();
  }

    capitilizeFirst=(str)=>{
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render(){
        return(
            <div className="container my-3">
                <h2 style={{margin:'40px 0px'}}>
                  
                  {this.props.searchTerm 
                    ?`Search Result for "${this.props.searchTerm}"`
                  : `Newszila's Top ${this.capitilizeFirst(this.props.category)} Headlines`}</h2>
                  
                {this.state.loading && <Loader/>}

                {/* {display message when search is empty} */}
                {!this.state.loading && this.state.articles.length===0 && this.props.searchTerm && (
                  <div className='alert alert-warning' role="alert">
                    No articles found with {this.props.searchTerm}. Try a different search term.
                  </div>
                )}

                 {/* {displays message when a category is empty} */}
                 {!this.state.loading && this.state.articles.length ===0 && !this.props.searchTerm &&(
                  <div className='alert alert-info text-center' role="alert">
                    <h5>No News Available in the {this.capitilizeFirst(this.props.category)} category at the moment.</h5>
                    <p>Please try another Category or check back later!</p>
                  </div>
                 )}



                 <div className='row'>
                    {!this.state.loading && this.state.articles.map((e)=>{
                       return <div className='col-md-4' key={e.url}>
                        <NewsItem title={e.title?e.title.slice(0,50):""} 
                        description={e.description?e.description.slice(0,80):""} 
                        imgurl={e.urlToImage} newsurl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
                        </div>
                     })}
                 </div>

                 <div className='container d-flex justify-content-between'>
                  <button disabled={this.state.page<=1} type="button"
                   className="btn btn-primary"
                    onClick={this.prevClick}> &larr; Previous</button>

                  <button  disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}
                  type="button" className="btn btn-primary" 
                  onClick={this.nextClick}>Next &rarr;</button>
                 </div>
            </div>
        );
      }   
}
  

export default News