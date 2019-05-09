import React, { Component } from 'react';
import { connect } from 'react-redux';

// -- Material UI Styling -- //

import { withStyles } from '@material-ui/core/styles';
//import Modal from '@material-ui/core/Modal';


const styles = theme => ({
   
});

class SuccessModal extends Component {
    
    render() {
        return (
            <div>COOL DOG</div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default withStyles(styles)(connect(mapReduxStateToProps)(SuccessModal));
