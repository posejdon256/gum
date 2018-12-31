import React, { Component } from 'react';
import './Navbar.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { _setN, _setSize, _setDisplacement, _setDensity, _seenTrayectory, _seenCube, _seenDagonal, _seenGravitation, _setSpeed, setPerturbation, setVibrationDamping, setElasticity, setElasticity2, setVelocityStart, setRotateFrame, setShowCuboid, setShowBezierCube, setShowSolid, setShowControlPoints, setShowFrame } from '../datas/CollectAndShareDatas';
import { Button } from '@material-ui/core';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowControlPoints: true,
            ShowFrame: true,
            ShowCuboid: true,
            ShowBezierCube: true,
            ShowSolid: false,
            rotateFrame: false,
            velocityStart: 0,
            mass: 64,
            elasticity: 1,
            elasticity2: 1,
            vibrationDamping: 1,
            perturbation: 1
        };
        this._showFrame = this._showFrame.bind(this);
        this._showControlPoints = this._showControlPoints.bind(this);
        this._showCuboid = this._showCuboid.bind(this);
        this._showBezierCube = this._showBezierCube.bind(this);
        this._showSolid = this._showSolid.bind(this);
        this._setRotateFrame = this._setRotateFrame.bind(this);
        this._setVelocityStart = this._setVelocityStart.bind(this);
        this._setControlPointsMass = this._setControlPointsMass.bind(this);
        this._setElasticity = this._setElasticity.bind(this);
        this._setElasticity2 = this._setElasticity2.bind(this);
        this._setVibrationDamping = this._setVibrationDamping.bind(this);
        this._setPerturbation = this._setPerturbation.bind(this);
    }
    _setPerturbation(event) {
        this.setState({
            perturbation: event.target.value
        });
        setPerturbation(event.target.value);
    }
    _setVibrationDamping(event) {
        this.setState({
            vibrationDamping: event.target.value
        });
        setVibrationDamping(event.target.value);
    }
    _setElasticity2(event) {
        this.setState({
            elasticity2: event.target.value
        });
        setElasticity2(event.target.value);
    }
    _setElasticity(event) {
        this.setState({
            elasticity: event.target.value
        });
        setElasticity(event.target.value);
    }
    _setControlPointsMass(event) {
        this.setState({
            mass: event.target.value
        });
    }
    _setVelocityStart(event) {
        this.setState({
            velocityStart: event.target.value
        });
        setVelocityStart(event.target.value);
    }
    _setRotateFrame() {
        this.setState({
            rotateFrame: !this.state.rotateFrame
        });
        setRotateFrame();
    }
    _showSolid() {
        if(!this.state.ShowSolid) {
            this.setState({
                ShowBezierCube: false
            })
            setShowBezierCube(false);
        }
        this.setState({
            ShowSolid: !this.state.ShowSolid
        });
        setShowSolid();
    }
    _showBezierCube() {
        if(!this.state.ShowBezierCube) {
            this.setState({
                ShowSolid: false
            })
            setShowSolid(false);
        }
        this.setState({
            ShowBezierCube: !this.state.ShowBezierCube
        });
        setShowBezierCube();
    }
    _showCuboid() {
        this.setState({
            ShowCuboid: !this.state.ShowCuboid
        });
        setShowCuboid();
    }
    _showControlPoints() {
        this.setState({
            ShowControlPoints: !this.state.ShowControlPoints
        });
        setShowControlPoints();
    }
    _showFrame() {
        this.setState({
            ShowFrame: !this.state.ShowFrame
        });
        setShowFrame();
    }
    render(){
        return(
            <div className="ab-navbar">
                <MuiThemeProvider>
                <Paper className="ab-paper">
                    <FormGroup column>
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.ShowControlPoints}
                                onChange={this._showControlPoints}
                                value="seenCube"
                                />} label="Show control Points" />
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.ShowFrame}
                                value="seenDiagonal"
                                onChange={this._showFrame}
                                />} label="Show frame" />
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.ShowCuboid}
                                value="trayectory"
                                onChange={this._showCuboid}
                                />} label="Show cuboid" />
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.ShowBezierCube}
                                onChange={this._showBezierCube}
                                value="gravitation"
                                />} label="Show bezier cube" />
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.ShowSolid}
                                onChange={this._showSolid}
                                value="gravitation"
                                />} label="Show deformed solid" />
                        <FormControlLabel control={
                                <Switch
                                checked={this.state.rotateFrame}
                                onChange={this._setRotateFrame}
                                value="gravitation"
                                />} label="Rotate frame" />
                    </FormGroup>
                    <TextField
                        label="Velocity on start"
                        value={this.state.velocityStart}
                        margin="normal"
                        onChange={this._setVelocityStart}
                        variant="outlined"
                    />
                    <TextField
                        label="Control points mass"
                        value={this.state.mass}
                        onChange={this._setControlPointsMass}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Elasticity"
                        value={this.state.elasticity}
                        onChange={this._setElasticity}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Vibration Damping"
                        onChange={this._setVibrationDamping}
                        value={this.state.vibrationDamping}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Elasticity 2"
                        onChange={this._setElasticity2}
                        value={this.state.elasticity2}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Perturbation"
                        onChange={this._setPerturbation}
                        value={this.state.perturbation}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button>Reset</Button>
                    </Paper>
                </MuiThemeProvider>
            </div>
      
    );}
}