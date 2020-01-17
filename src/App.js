import React, { Component } from 'react';
import './App.css';
let increasingColor = "rgba(40, 40, 190, ratio)";
let decreasingColor = "rgba(190, 40, 40, ratio"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevRatio: 0,
      prevRatio2: 0,
      divStyle: {
        display: 'none'
      }
    }
    this.scrollRef = React.createRef();
  }
  componentDidMount() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: this.buildThresholdList()
    };
    let target = document.querySelector("#reveal");
    let target2 = document.querySelector("#reveal2");

    
    this.observer = new IntersectionObserver(this.handleObserver, options);
    this.observer2 = new IntersectionObserver(this.handleBox2, options)
    this.observer.observe(target);
    this.observer2.observe(target2);
  }
  buildThresholdList = () => {
    let thresholds = [];
    let numSteps = 20;

    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i /numSteps;
      thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
  }
  handleObserver = (entries, observer) => {
   entries.forEach((entry) => {
     if (entry.intersectionRatio > this.state.prevRatio) {
        ;
        //entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio)
        entry.target.style.opacity = `${entry.intersectionRatio}`
        entry.target.style.transition = "1.5s ease-in";
        entry.target.style.animation = "slide 2s forwards"
     }
     this.setState({
      prevRatio: entry.intersectionRatio
    });
   });
  }
  handleBox2 = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > this.state.prevRatio2) {
        entry.target.style.opacity = `${entry.intersectionRatio}`
        entry.target.style.transition = "1.5s ease-in";
        entry.target.style.animation = "slide2 2s forwards"
        entry.target.style.transitionDelay = "250ms";
        entry.target.style.animationDelay = ".25s"
      }
      this.setState({
        prevRatio2: entry.intersectionRatio
      });
    });
  }
  render() {
    return (
      <div className="App">
        <div className="first_box">box</div>
        <div className="second_container">
          <div className="reveal" id="reveal" ref={this.scrollRef}>hidden box</div>
          <div className="reveal2" id="reveal2">hiddenbox2</div>
        </div>
      </div>
    );
  }
}

export default App;
