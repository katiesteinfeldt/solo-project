import React, { Component } from 'react';
import { connect } from 'react-redux';

// -- Material UI Styling -- //

import { withStyles } from '@material-ui/core/styles';
//import Modal from '@material-ui/core/Modal';


const styles = theme => ({
 
});

// //modal positioniong and style
// function getModalStyle() {
//     const top = 50;
//     const left = 50;

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

class SuccessModal extends Component {
   


    render() {
       

        return (
            <div>
                Success!!!!!
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default withStyles(styles)(connect(mapReduxStateToProps)(SuccessModal));
