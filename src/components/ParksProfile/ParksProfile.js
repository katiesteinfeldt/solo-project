import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ParksProfile.css';

// -- Material UI components -- //
import Card from '@material-ui/core/Card';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

//bring in moment js to this component and set it equal to the variable moment
const moment = require('moment');

let emptyArray = [];
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  cardTitle: {
    padding: 15,
    textAlign: 'center',
  },
  button: {
    width: '50%',
    padding: 10,
  },
  card: {
    maxWidth: 345,
    margin: 20,
  },
  modalImage: {
    width: '100%',
    display: 'block',
    margin: 'auto',
  }
});


// -- styling for Material UI modal -- //
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class ParksProfile extends Component {
  state = {
    //displayMyParks: false,
    open: false,
  }

  componentDidMount = () => {
    // this.getMyParks();
    this.props.dispatch({ type: 'GET_PARKS', payload: this.props.user.id })
  }

  // getMyParks = () => {
  //   axios.get('/myparks')
  //     .then((response) => {
  //       this.props.dispatch({ type: 'SET_MY_PARKS', payload: response.data })
  //     }).catch(error => {
  //       console.log('error in my parks client get request', error);
  //     });
  // }

  displayParkInfo = (parks_visited_id) => {
    return () => {
      this.props.dispatch({ type: 'FETCH_CURRENT_PARK', payload: parks_visited_id })
      this.setState({
        open: true,
        currentPark: parks_visited_id,
      })
    }
  }

  //closes modal on click of "ok" button or when clicking on the background page
  closeParkDisplay = () => {
    this.props.dispatch({ type: 'DISPLAY_CURRENT_PARK', payload: emptyArray })
    this.setState({
      open: false,
    })
  }

  createMyParks = () => {
    return this.props.parks.map(park =>
      <Card onClick={this.displayParkInfo(park.all_parks_id)} className={this.props.classes.card}>
        <CardActionArea className="container">
          <CardMedia
            component="img"
            alt={park.park_description}
            className="image"
            height="200"
            image={park.image_path_1}
            title={park.park_full_name}
          />
          <div className="overlay">
            <div className="text">{park.park_full_name}
            </div>
          </div>
        </CardActionArea>
      </Card>
    )
  }

  render() {
    let currentParkDisplay;

    if (this.state.open) {
      currentParkDisplay = <div>
        {this.props.parkdisplay[0] &&
          <Modal
            // aria-labelledby="simple-modal-title"
            // aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.closeParkDisplay}
          >
            <div style={getModalStyle()} className={this.props.classes.paper}>
              <Typography variant="h5">{this.props.parkdisplay[0].park_full_name}</Typography>
              <Divider />
              <div className="parkDescription">
              <Typography>{this.props.parkdisplay[0].park_description}</Typography>
            </div>
            <div className="modalImage">
              <img className={this.props.classes.modalImage} alt={this.props.parkdisplay[0].park_description} src={this.props.parkdisplay[0].image_path_1} />
             </div>
              <Divider />
              {/* <Button className={this.props.classes.button} onClick={this.closeParkDisplay}>OK</Button> */}
              <div className="tripNotes">
                <Typography>Date Visited: {moment(this.props.parkdisplay[0].date_visited_1).format('LL')}</Typography>
                <Typography>Trip Highlights: {this.props.parkdisplay[0].notes}</Typography >
              </div>
            </div>
          </Modal>
        }
      </div>;
    }
    else {
      currentParkDisplay = null;
    }

    return (
      <div className="body">
        <h1 className="profileHeader">Park Profile</h1>
        <div className="parkContainer">{this.createMyParks()}</div>
        {currentParkDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  parks: state.parks,
  parkdisplay: state.parkdisplay,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(ParksProfile));

