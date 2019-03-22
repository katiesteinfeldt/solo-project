import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './MyParks.css';
import Card from '@material-ui/core/Card';
import { CardContent, CardActions, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
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
    width: '100%',
    padding: 10,
  },
  header: {
    margin: 10,
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class MyParks extends Component {
  state = {
    open: false,
    currentPark: 0,
    editParkForm: false,
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

  //this will delete park from the database 
  deletePark = (parks_visited_id) => {
    return () => {
      console.log('delete was clicked', parks_visited_id);
      const r = window.confirm("Are you sure you want to delete this park?");
      if (r === true) {
        axios({
          method: 'DELETE',
          url: '/myparks/' + parks_visited_id,
        }).then((response) => {
          this.getMyParks();
        });
      }
      else {
        window.alert("Feedback saved");
      }
    }
  }

  editVisit = (parks_visited_id) => {
    return () => {
      console.log('edit visit has been clicked');
      this.setState({
        editParkForm: true,
      })
      // axios({
      //   method: 'PUT',
      //   url: '/myparks/' + parks_visited_id,
      //   // data: {
      //   //   date_visited_1: 
      //   //   notes: 
      //   // }
      // }).then((response) => {
      //   console.log('park updated');
      // })
    }
  }

  createMyParks = () => {
    return this.props.parks.map(park =>
      <Card className={this.props.classes.card} key={park.all_parks_id}><Typography className={this.props.classes.cardTitle} variant="h4">{park.park_full_name}</Typography>
        <Divider />
        <CardContent>
          <img onClick={this.displayParkInfo(park.all_parks_id)} alt={park.park_description} src={park.image_path_1} />
          <pre></pre>
          <Typography>Date Visited: {park.date_visited_1}</Typography>
          <pre></pre>
          <Typography>Notes: {park.notes}</Typography>
        </CardContent>
        <Divider />
        <CardActions className={this.props.classes.button}>
          <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.editVisit(park.parks_visited_id)}>Update Visit</Button>
          <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.deletePark(park.parks_visited_id)}>Delete From My Parks</Button>
        </CardActions>
      </Card>
    )
  }

  closeParkDisplay = () => {
    console.log('closing park display');
    this.setState({
      open: false,
    })
    this.props.dispatch({ type: 'FETCH_CURRENT_PARK', payload: '' })
  }

  render() {
    const { classes } = this.props;
    let currentParkDisplay;
    let editForm;

    // displays the current park information in a modal when the user clicks on the image
    if (this.state.open) {
      currentParkDisplay = <div>
        {this.props.parkdisplay[0] &&
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.closeParkDisplay}>
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="h4" id="modal-title">{this.props.parkdisplay[0].park_full_name}</Typography>
              <Typography>{this.props.parkdisplay[0].park_description}</Typography>
              <img alt={this.props.parkdisplay[0].park_description} src={this.props.parkdisplay[0].image_path_1} />
              <Button variant="contained" color="default" className={this.props.classes.button} onClick={this.closeParkDisplay}>Cool!</Button>
            </div>
          </Modal>
        }
      </div>;
    }
    else {
      currentParkDisplay = null;
    }

    if (this.state.editParkForm) {
      editForm = <div>
        EDIT FORM HERE
      </div>
    }
    else {
      editForm = null;
    }

    // displays a form for the user to update the visit information when the user clicks


    return (
      <div>
        <Typography className={classes.header} variant="h3">
          My Parks
      </Typography>
        {/* <LogOutButton className="log-in" /> */}
        <div className="container">
          {this.createMyParks()}
        </div>
        {currentParkDisplay}
        {editForm}
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  parks: state.parks,
  parkdisplay: state.parkdisplay,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(MyParks));
