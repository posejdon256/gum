import './Canvas.scss';

import Paper from '@material-ui/core/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { setContext } from './CanvasData';
import { mouseDown, mouseUp } from './Mouse/MouseCenter';

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
    }
    componentDidMount(props) {
        setContext(this.refs.can);
    }
    _mouseDown(event) {
       mouseDown(event);
    }
    _mouseUp(event) {
       mouseUp(event);
    }
    render(){
        return(
        <div className="ab-canvas-container">
            <MuiThemeProvider>
                <Paper className="ab-canvas-paper">
                    <canvas tabindex={0} ref="can" className="ab-canvas" width="1400px" height="913px" 
                    onMouseUp={this._mouseUp}
                    onMouseDown={this._mouseDown}
                    />
                </Paper>
            </MuiThemeProvider>
        </div>
    );}
}