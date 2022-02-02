import React, { Component } from 'react'

export class Newsitems extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, publishedAt, author, source } = this.props;
        return (
            <div>
                <div className="card" height="12rem">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
                        <span className=" badge rounded-pill bg-danger">{source}</span>
                    </div>

                    <img src={!imageUrl ? "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2021%2F1030%2Fr930448_1296x729_16%2D9.jpg" : imageUrl} className="card-img-top w-100 h-50 d-inline-block " class="imageh" alt="..." />
                    <div className="card-body" style={{color: this.props.mode === 'dark' ? 'white' : 'black',
      backgroundColor: this.props.mode === 'dark' ? '#212529' : '#f4f4f4'}}>

                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text "   ><small className={`text-${this.props.mode === 'dark' ? '#EDF5E1' : 'black'}`} > By {author} On {publishedAt}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-warning">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitems
