import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// -- Material UI components -- //
import Card from '@material-ui/core/Card';
import { CardContent, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: 20,
    padding: 20,
  },
  cardTitle: {
    padding: 15,
    textAlign: 'center',
  },
  button: {
    width: '50%',
    padding: 10,
  },
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
    this.getMyParks();
  }

  getMyParks = () => {
    axios.get('/myparks')
      .then((response) => {
        this.props.dispatch({ type: 'SET_MY_PARKS', payload: response.data })
      }).catch(error => {
        console.log('error in my parks client get request', error);
      });
  }

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
    this.setState({
      open: false,
    })
  }

  createMyParks = () => {
    return this.props.parks.map(park =>
      <Card className={this.props.classes.card}>
        <div key={park.all_parks_id}><Typography variant="h4">{park.park_full_name}</Typography>
          <Divider />
          <CardContent>
            <img onClick={this.displayParkInfo(park.all_parks_id)} alt={park.park_description} src={park.image_path_1} />
            <pre></pre>
            <Typography>Date Visited: {park.date_visited_1}</Typography>
            <pre></pre>
            <Typography>Notes: {park.notes}</Typography>
            <pre></pre>
          </CardContent>
        </div>
      </Card>
    )
  }

  render() {
    let currentParkDisplay;

    if (this.state.open) {
      currentParkDisplay = <div>
        {this.props.parkdisplay[0] &&
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.closeParkDisplay}
        >
          <div style={getModalStyle()} className={this.props.classes.paper}>
            <Typography variant="h5">{this.props.parkdisplay[0].park_full_name}</Typography>
            <Divider />
            <Typography>{this.props.parkdisplay[0].park_description}</Typography>
            <pre></pre>
            <img alt={this.props.parkdisplay[0].park_description} src={this.props.parkdisplay[0].image_path_1} />
            <Divider/>
            <Button className={this.props.classes.button} onClick={this.closeParkDisplay}>OK</Button>
          </div>
          </Modal>
        }
      </div>;
    }
    else {
      currentParkDisplay = null;
    }


    return (
      <div>
        <Typography variant="h3">{this.props.user.username}'s Park Profile</Typography>
        {this.createMyParks()}
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

