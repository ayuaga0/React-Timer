import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: [0,0,0],
      interval : 0
    }
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
  }
  handlePlayClick (time) {
    var currentTime =new Date().getTime()
    var deadLine = currentTime + time*1000
    this.state.interval = setInterval(()=>{
    var now = new Date().getTime()
    var t = deadLine - now + 1000
    console.log(t)
    var hour = Math.floor(t/(60*60*1000))
    var min = Math.floor(t / (60*1000))
    var sec = parseInt(t/1000)%60
    if(hour >=0 && min >= 0 && sec >=0 ) {
      this.setState(()=>{
        return {time: [hour, min, sec]}
      }) 
    }
    }, 100)
  }
  handleResetClick () {
    clearInterval(this.state.interval)
    this.setState(()=>{
      return {
        time : [0,0,0],
        interval: 0
      }
    }) 
  }
  render() {
    return (
      <div className="App">
      <Header />
      <Body time={this.state.time} handlePlayClick={this.handlePlayClick} handleResetClick={this.handleResetClick}/>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div>
      <img src={logo} height='50' width='50'/>
      <h1>React Timer</h1>
      </div>
    )
  }

}

class Body extends Component {
  render() {
    return (
      <div>
      <Controls time={this.props.time} handlePlayClick={this.props.handlePlayClick} handleResetClick={this.props.handleResetClick}/>
      </div>
    )
  }
}


class Controls extends Component {
  constructor (props) {
    super(props) 
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.state = {
      play : false,
      input: false
    }
  }
  handleResetClick() {
    this.props.handleResetClick()
    this.setState(()=>{
      return {
        play: false,
        input:false
      }
    })

  }
  handlePlayClick() {
    var inputTime = document.getElementById('userInput').value;
    this.props.handlePlayClick(inputTime) 
    this.setState((prevState) => {
      return {
        input: !prevState.input
      }
    })
  }
  handleChange(e) {
    e.persist()
      this.setState(()=>{
        if(e.target.value) {
        return {
          play: true
        }
      } else {
      return {
        play :false
      }
    }})
  }
  render(){
    return (
      <div>
      {this.state.input ? <p>{this.props.time[0]}:{this.props.time[1]}:{this.props.time[2]}</p> : <input type='number' id='userInput' placeholder='0' onChange={this.handleChange}/>}
      <button onClick={this.handlePlayClick} disabled={!this.state.play}>Play</button>
      <button onClick={this.handleResetClick}>Reset</button>
      </div>
    )

  }
}

export default App;
