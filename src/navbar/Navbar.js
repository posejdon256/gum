import './Navbar.scss';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { setL1, setL2, setMode, setSelect1, setSelect2 } from '../datas/CollectAndShareDatas';
import { Button } from '@material-ui/core';
import { startAnimation } from '../Animation/Animation';
import { setContextFloodFill } from './FloodFillCanvas';
import Snackbar from './Snackbar';
import { removeAllRectangles } from '../canvas/Rectangles/Rectangle';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            l1:  100,
            l2: 100,
            edit: false,
            select12: 1,
            select34: 1,
            openError: true,
            _errorMessage: "No error"
        };
        this._setL1 = this._setL1.bind(this);
        this._setL2 = this._setL2.bind(this);
        this._edit = this._edit.bind(this);
        this._set12 = this._set12.bind(this);
        this._set34 = this._set34.bind(this);
        this._startAnimation = this._startAnimation.bind(this);
        this._openError = this._openError.bind(this);
        this._removeAllRectangles = this._removeAllRectangles.bind(this);
    }
    _openError(message) {
        this.setState({
            _errorMessage: message
        });
    }
    _set12(e) {
        this.setState({
            select12: e.target.checked
        });
        setSelect1();
    }
    _startAnimation() {
        setContextFloodFill(this.refs.navCan)
        startAnimation(this._openError);
    }
    _edit(e) {
        this.setState({
            edit: e.target.checked
        });
       setMode();
    }
    _setL1(event) {
        this.setState({
            l1: event.target.value
        });
        setL1(event.target.value);
    }
    _setL2(event) {
        this.setState({
            l2: event.target.value
        });
        setL2(event.target.value);
    }
    _set34(event) {
        this.setState({
            select34: event.target.checked
        });
        setSelect2();
    }
    _removeAllRectangles() {
        removeAllRectangles();
    }
    render(){
        return(
            <div className="ab-navbar">
                <MuiThemeProvider>
                <Paper className="ab-paper">
                <Snackbar
                open={this.state.openError}
                error={this.state._errorMessage}>
                </Snackbar>
                <FormGroup column>
                    <FormControlLabel control={
                        <Switch
                        checked={this.state.edit}
                        onChange={this._edit}
                        value="false"
                        />} label="Rectangles draw" />
                    <FormControlLabel control={
                            <Switch
                            checked={this.state.select12}
                            onChange={this._set12}
                            value="false"
                            />} label="Flip end" />
                    <FormControlLabel control={
                            <Switch
                            checked={this.state.select34}
                            onChange={this._set34}
                            value="false"
                            />} label="Flip start" />
                    </FormGroup>
                    <TextField
                        label="L1 size"
                        value={this.state.l1}
                        margin="normal"
                        onChange={this._setL1}
                        variant="outlined"
                    />
                    <TextField
                        label="L2 size"
                        value={this.state.l2}
                        onChange={this._setL2}
                        margin="normal"
                        variant="outlined"
                    />
                    <canvas ref="navCan" width="360" height="360"></canvas>
                    <Button
                    onClick={this._removeAllRectangles}
                    >Remove all rectangles</Button>
                    <Button
                    onClick={this._startAnimation}
                    >Go!</Button>
                    </Paper>
                </MuiThemeProvider>
            </div>
      
    );}
}