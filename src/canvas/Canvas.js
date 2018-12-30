import './Canvas.scss';

import Paper from '@material-ui/core/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import ThreeLib from 'three-js';

import { setTHREE, _animate, setRenderer, setScene, setCamera } from './Animation/AnimationFrame';
import KeyboardCenter from './KeybordCenter/KeyboardCenter';
import MouseCenter from './MouseCenter/MouseCenter';
import { addBox } from './Objects/Box';
import { addBezierCube, prepareCubePoints } from './Objects/Bezier';
import { addFrameToScene } from './Objects/Frame';

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.keyFunction = this.keyFunction.bind(this);
        this.mouseFunction = this.mouseFunction.bind(this);
    }
    componentDidMount() {

       // initWebGL(this.refs.can1);
       const THREE = ThreeLib();
       const container = this.refs.can;
       setTHREE(THREE);
       const WIDTH = 1400;
       const HEIGHT = 913;
       const renderer = new THREE.WebGLRenderer();
       let scene = new THREE.Scene();
       let camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
   
       renderer.setSize(WIDTH, HEIGHT);
       container.appendChild(renderer.domElement);
       scene.add(camera);
       renderer.setSize(WIDTH, HEIGHT);
   
       camera.position.z = 150;
       camera.lookAt(0, 0, 0);
       container.appendChild(renderer.domElement);
       setRenderer(renderer);
       setScene(scene);
       setCamera(camera);
       prepareCubePoints();
       addBox();
       addBezierCube();
       addFrameToScene();
       // generateArm(this.refs.can, 0);
       // generateArm(this.refs.can2, 1);
        _animate();

       // DrawArms();

    }
    keyFunction(event) {
        KeyboardCenter(event);
    }
    mouseFunction(event) {
        MouseCenter(event);
    }
    render(){
        return(
        <div className="ab-canvas-container">
            <MuiThemeProvider>
                <Paper className="ab-canvas-paper">
                    <div ref="can" tabIndex="0"
                    onKeyDown={this.keyFunction}
                    onKeyUp={this.keyFunction}
                    onMouseDown={this.mouseFunction}
                    onMouseUp={this.mouseFunction}
                    onMouseMove={this.mouseFunction}/>
                </Paper>
            </MuiThemeProvider>
        </div>
    );}
}