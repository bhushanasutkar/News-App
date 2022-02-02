import React, { Component } from 'react'
import loading from './ajax-loader.gif'
export class Spinning extends Component {
    render() {
        return (
            <div className="text-center">
              <img src={loading} alt="loading" /> 
            </div>
        )
    }
}

export default Spinning
