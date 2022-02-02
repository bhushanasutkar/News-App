
import './App.css';
import React, { Component} from 'react'
import { Navbar } from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {

  state={progress:0,mode:'light'}
  // const [progress, setprogress] = useState('0');
  // setProgress('10'))
 
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  togglemode = () => {
    console.log("hii");
    if (this.state.mode === 'light') {
      this.setState({mode:'dark'})
      document.body.style.backgroundColor = '#fcde67';
      // document.body.style.backgroundImage="url('bglight.jpg')";
     
    }
    else {
      this.setState({mode:'light'})
      document.body.style.backgroundColor = 'white';
      // document.body.style.backgroundImage="url('bglight.jpg')";
     

    }
  }

  render() {
   
    return (
      <div>
        <Router>
          <Navbar mode={this.state.mode}  togglemode={this.togglemode} />
          <LoadingBar
            height={4}
            color='#f11946'
            progress={this.state.progress}
            
          />
          <Switch>
            <Route exact path="/general"><News mode={this.state.mode}setProgress={this.setProgress}  key="general" pagesize={6} category='general' country='in' /></Route>
            <Route exact path="/sports"> <News mode={this.state.mode}setProgress={this.setProgress}  key="sports" pagesize={6} category='sports' country='in' /></Route>
            <Route exact path="/entertainment"><News mode={this.state.mode} setProgress={this.setProgress}  key="entertainment" pagesize={6} category='entertainment' country='in' /></Route>
            <Route exact path="/health"> <News mode={this.state.mode}setProgress={this.setProgress}  key="health" pagesize={6} category='health' country='in' /></Route>
            <Route exact path="/science"><News mode={this.state.mode}setProgress={this.setProgress}  key="science" pagesize={6} category='science' country='in' /></Route>
            <Route exact path="/technology"><News mode={this.state.mode} setProgress={this.setProgress}  key="technology" pagesize={6} category='technology' country='in' /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}







