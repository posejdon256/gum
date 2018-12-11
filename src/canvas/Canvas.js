import './Canvas.scss';

import Paper from '@material-ui/core/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';

export default class Canvas extends Component {
    mouseFunction(event) {
       
    }
    render(){
        return(
        <div className="ab-canvas-container">
            <MuiThemeProvider>
                <Paper className="ab-canvas-paper">
                    <canvas tabindex={0} ref="can" className="ab-canvas" width="1400px" height="913px" 
                    onMouseUp={this.mouseFunction}/>
                </Paper>
            </MuiThemeProvider>
        </div>
    );}
}