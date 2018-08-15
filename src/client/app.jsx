// Node.JS
import React from "react";
import ReactDOM from "react-dom";
  
class App extends React.Component {

  constructor(props) {
    super(props);
    
    const test = [1,2,3];
    console.log(test.includes(1));
  }

  render() {
    return (
      <div>
        <p>Pelican</p>
        <div id="tripmeter">
          <p>
            Starting Location (lat, lon):<br/>
            <span id="startLat">???</span>°, <span id="startLon">???</span>°
          </p>
          <p>
            Current Location (lat, lon):<br/>
            <span id="currentLat">???</span>°, <span id="currentLon">???</span>°
          </p>
          <p>
            Distance from starting location:<br/>
            <span id="distance">0</span> km
          </p>
        </div>
      </div>
    );
  }
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));


module.hot.accept();