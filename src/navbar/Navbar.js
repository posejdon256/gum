import './Navbar.scss';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { setL1, setL2, setMode } from '../datas/CollectAndShareDatas';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            l1:  1,
            l2: 1,
            edit: false
        };
        this._setL1 = this._setL1.bind(this);
        this._setL2 = this._setL2.bind(this);
        this._edit = this._edit.bind(this);
    }
    _edit(e) {
        this.setState({
            edit: e.target.checked
        });
       setMode();
    }
    _setL1(event) {
        setL1(event.target.value);
    }
    _setL2(event) {
        setL2(event.target.value);
    }
    render(){
        return(
            <div className="ab-navbar">
                <MuiThemeProvider>
                <Paper className="ab-paper">
                <FormGroup column>
                    <FormControlLabel control={
                        <Switch
                        checked={this.state.edit}
                        onChange={this._edit}
                        value="false"
                        />} label="Edit" />
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
                    </Paper>
                </MuiThemeProvider>
            </div>
      
    );}
}