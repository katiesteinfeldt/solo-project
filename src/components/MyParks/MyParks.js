import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './MyParks.css';
import Card from '@material-ui/core/Card';
import { CardContent, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
let editFormDisplay;

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
    edit_date: '',
    edit_notes: '',
    isInEditMode: false,
    editText: 'TEST!',
    dateVisited: '1/6/89',
    notes: 'Test notes',
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
        isInEditMode: false,
      })
    }
  }

  // sets local state to input values
  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  //this will delete park from the database 
  deletePark = (parks_visited_id) => {
    return () => {
      const r = window.confirm("Are you sure you want to delete this park?");
      if (r === true) {
        axios({
          method: 'DELETE',
          url: '/myparks/' + parks_visited_id,
        }).then((response) => {
          this.setState({
            open: false,
          })
          this.getMyParks();
        });
      }
    }
  }

  // editVisit = (parks_visited_id) => {
  //   return () => {
  //     //this.props.dispatch({ type: 'EDIT_PARK', payload: parks_visited_id })
  //     console.log('edit visit has been clicked', this.state);
  //     this.setState({
  //       isInEditMode: true,
  //     })
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
  //   }
  // }

  createMyParks = () => {
    return this.props.parks.map(park =>
      <Card onClick={this.displayParkInfo(park.all_parks_id)} className={this.props.classes.card} key={park.all_parks_id}><Typography className={this.props.classes.cardTitle} variant="h4">{park.park_full_name}</Typography>
        <Divider />
        <CardContent>
          <img alt={park.park_description} src={park.image_path_1} />
          <pre></pre>
          <Typography>{park.park_description}</Typography>
          <pre></pre>
          <Divider />
          <pre></pre>
          <Typography variant="h5"> My Visit:</Typography>
          <Typography>Date: {park.date_visited_1}</Typography>
          <pre></pre>
          <Typography>Notes: {park.notes}</Typography>
        </CardContent>
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

  saveEditedInfo = () => {
    console.log(this.state);
    this.setState({
      isInEditMode: false,
      dateVisited: this.state.dateVisited,
      notes: this.state.notes,
    })
    axios({
      method: 'PUT',
      url: '/myparks/' + this.props.parkdisplay[0].id,
      data: {
        id: this.props.parkdisplay[0].id,
        date_visited_1: this.state.dateVisited,
        notes: this.state.notes,
      }
    }).then((response) => {
      this.getMyParks();
    })
    //this.props.dispatch({type: 'EDIT_PARK', payload: this.state })
  }

  cancelEditedInfo = () => {
    console.log('cancel clicked');
    this.setState({
      isInEditMode: false,
    })
  }

  // submitEditedInfo = () => {
  //   console.log(this.state);
  // }

  changeEditMode = () => {
    console.log('HI');
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    })
  }

  displayEditFormDisplay = () => {
    if (this.state.isInEditMode) {
      editFormDisplay =
        <div>
          <div>
            <input type="date"
              onChange={this.handleChangeFor('dateVisited')}
            />
            <input type="text"
              defaultValue={this.props.parks[0].notes}
              onChange={this.handleChangeFor('notes')}
            />
          </div>
          <pre></pre>
          <Button onClick={this.saveEditedInfo}>Save</Button>
          <Button onClick={this.cancelEditedInfo}>Cancel</Button>
        </div>
    }
    else {
      editFormDisplay =
        <div onDoubleClick={this.changeEditMode}>
          Date Visited: {this.props.parks[0].date_visited_1}
          <pre></pre>
          Notes: {this.props.parks[0].notes}
        </div>
    }
  }

  render() {
    const { classes } = this.props;
    let currentParkDisplay;

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
              {this.displayEditFormDisplay()}
              {editFormDisplay}
              <img alt={this.props.parkdisplay[0].park_description} src={this.props.parkdisplay[0].image_path_1} />
              <Button variant="contained" color="default" className={this.props.classes.button} onClick={this.closeParkDisplay}>OK</Button>
              {/* <Button variant="contained" color="default" className={this.props.classes.button} onClick={this.editVisit(this.props.parkdisplay[0].id)}>Edit</Button> */}
              <Button variant="contained" color="default" className={this.props.classes.button} onClick={this.deletePark(this.props.parkdisplay[0].id)}>Delete This Visit</Button>
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
        <Typography className={classes.header} variant="h3">My Parks</Typography>
        <div className="container">{this.createMyParks()}</div>
        {currentParkDisplay}
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
  editpark: state.editpark,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(MyParks));
