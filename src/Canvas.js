import p5 from 'p5';
import React, { Component } from 'react';

class Canvas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roll: 0,
      pitch: 0,
      yaw: 0,
      yAxis: 0
    };
    this.myRef = React.createRef();
    this.Sketch = this.Sketch.bind(this);
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
    this.props.socket.on('data', data => {
      this.setState(data);
    });
  }

  Sketch = p => {
    p.setup = () => {
      p.createCanvas(1200, 1000, p.WEBGL);
    }

    p.draw = () => {
      p.background(255); // set background to white
      p.lights();
      //roll += 1;
      //pitch += 1;
      //this.setState({ yAxis: this.state.yAxis + 1 });
  
      p.translate(0, this.state.yAxis); // set position to centre
  
      p.push(); // begin object
  
      var c1 = p.cos(p.radians(this.state.roll));
      var s1 = p.sin(p.radians(this.state.roll));
      var c2 = p.cos(p.radians(this.state.pitch));
      var s2 = p.sin(p.radians(this.state.pitch));
      var c3 = p.cos(p.radians(this.state.yaw));
      var s3 = p.sin(p.radians(this.state.yaw));
      p.applyMatrix( c2*c3, s1*s3+c1*c3*s2, c3*s1*s2-c1*s3, 0,
                   -s2, c1*c2, c2*s1, 0,
                   c2*s3, c1*s2*s3-c3*s1, c1*c3+s1*s2*s3, 0,
                   0, 0, 0, 1);
  
      p.drawArduino();
  
      p.pop(); // end of object
    }

    p.drawArduino = () => {
        /* function contains shape(s) that are rotated with the IMU */
      p.stroke(0, 90, 90); // set outline colour to darker teal
      p.fill(0, 130, 130); // set fill colour to lighter teal
      p.box(300, 10, 200); // draw Arduino board base shape

      p.stroke(0); // set outline colour to black
      p.fill(80); // set fill colour to dark grey

      p.translate(60, -10, 90); // set position to edge of Arduino box
      p.box(170, 20, 10); // draw pin header as box

      p.translate(-20, 0, -180); // set position to other edge of Arduino box
      p.box(210, 20, 10); // draw other pin header as box
    }
  }

  render () {
    return (
      <div className="canvas" ref={this.myRef}></div>
    );
  }
}

export default Canvas;
