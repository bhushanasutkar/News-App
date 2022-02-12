import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinning from './Spinning';
// import PropTypes from 'prop-types'

export class News extends Component {
   static defaultProps={
     country:'in',
     pagesize:8,
     category:'general'
   }
  //  static propTypes={
  //      country: PropTypes.string,
  //      pagesize:PropTypes.number,
  //      category:PropTypes.string
  //  }
    capitalizeFirstLetter(string) {
    return string.toUpperCase() ;
  }
  
  constructor(props) {
    super(props);
    this.state = {
      articles:[],
      loading: false,
      page: 1,
      
     
    }
    document.title= `${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`;
  }

  async Udatenews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a8f54c601ea24dbea5296c385d6c2c7b&page=1&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});

    let data = await fetch(url);
    this.props.setProgress(30);

    let parseddata = await data.json();
    this.props.setProgress(50);

    this.setState({ 
      articles: parseddata.articles,
       totalresult: parseddata.totalResults,
      loading:false
    });
    this.props.setProgress(100);


  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a8f54c601ea24dbea5296c385d6c2c7b&page=1&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true});

    // let data = await fetch(url);
    // let parseddata = await data.json();
    // this.setState({ 
    //   articles: parseddata.articles,
    //    totalresult: parseddata.totalResults,
    //   loading:false
    // });
    this.Udatenews();
    // we can do this in handlenext and this.handleprevious too
  }
  handlenext = async () => {
  console.log("next");
  let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a8f54c601ea24dbea5296c385d6c2c7b&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parseddata = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parseddata.articles,
      loading:false
    })
  }
  handleprevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a8f54c601ea24dbea5296c385d6c2c7b&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});

    let data = await fetch(url);
    let parseddata = await data.json();

    this.setState  ({
      page: this.state.page - 1,
      articles: parseddata.articles,
      loading:false

    })
  }
  
  
  // style={{backgroundColor:'red'}}
  // {this.props.mode==='light'?'Darkmode':'Lightmode'}
  render() {
    return (
    <div className="container my-5"  >
        <h1  style={{padding: '20px 0px'}} className={`my-3 text-center text-${this.props.mode==='dark'?'white':'dark'} `}>NewsMonkey-Top  {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        { this.state.loading && <Spinning />}
        <div className="row ">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div key={element.url} className="col-md-4 my-3">
              <Newsitems mode={this.props.mode} title={element.title ? element.title : ""} description={element.description ? element.description : ` Read Full Article On ${element.source.name}`} imageUrl={element.urlToImage} publishedAt={new Date(element.publishedAt).toGMTString()} author={element.author? element.author:"Unknown"} newsUrl={element.url} source={element.source.name} />
            </div>
          })}
        </div>
        {!this.state.loading && <div className="d-flex justify-content-between my-4">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevious}> &larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalresult/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
        </div>}
    </div>
    )
  }
}

export default News
