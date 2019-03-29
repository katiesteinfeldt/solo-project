import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './MyParks.css';

// -- Material UI components -- //
import Card from '@material-ui/core/Card';
import { CardContent, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
//import TextField from '@material-ui/core/TextField';

let editFormDisplay;

// -- styling for Material UI components -- //
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    //padding: theme.spacing.unit * 4,
    outline: 'none',
    font: 'Roboto'
  },
  card: {
    maxWidth: 400,
    margin: 15,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  button: {
    position: 'center',
    width: '100%',
  },
  deleteButton: {
    position: 'center',
    width: '100%',
    padding: '10px',
  },
  cardActions: {
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    position: 'center',
  },
  tripNotes: {
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'left',
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

let emptyArray = [];
class MyParks extends Component {
  state = {
    open: false,
    edit_date: '',
    edit_notes: '',
    isInEditMode: false,
    editText: '',
    dateVisited: '04/01/2019',
    notes: '',
  }

  componentDidMount = () => {
    this.getMyParks();
  }

  // retrieves list of parks visited from database and saves the information
  // in a reducer 
  getMyParks = () => {
    axios.get('/myparks')
      .then((response) => {
        this.props.dispatch({ type: 'SET_MY_PARKS', payload: response.data })
      }).catch(error => {
        console.log('error in my parks client get request', error);
      });
  }

  // determines which park was clicked and retrieves additional information
  // from the database; opens modal
  displayParkInfo = (parks_visited_id) => {
    return () => {
      this.props.dispatch({ type: 'FETCH_CURRENT_PARK', payload: parks_visited_id })
      this.setState({
        open: true,
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

  //this will delete a park visit from the parks_visited table in the database 
  deletePark = (parks_visited_id) => {
    return () => {
      const r = window.confirm("Are you sure you want to delete this visit to this park?");
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

  // displays list of parks visited on the dom in a material ui card
  createMyParks = () => {
    return this.props.parks.map(park =>
      <Card onClick={this.displayParkInfo(park.all_parks_id)} className={this.props.classes.card} key={park.all_parks_id}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={park.park_description}
            className={this.props.classes.media}
            height="300"
            image={park.image_path_1}
            title={park.park_full_name}
          />
          <CardContent className={this.props.classes.cardContent} >
            <Typography className="parkName" variant="h5">{park.park_full_name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={this.props.classes.cardActions} >
          <Button className={this.props.classes.button} onClick={this.displayParkInfo(park.all_parks_id)}>See Visit Details</Button>
        </CardActions>
      </Card>
    )
  }

  //closes modal on click of "ok" button or when clicking on the background page
  //and also clears current park reducer so that it doesn't lag on the last image
  //when a new park is clicked on
  closeParkDisplay = () => {
    this.props.dispatch({ type: 'DISPLAY_CURRENT_PARK', payload: emptyArray })
    this.setState({
      open: false,
    })
  }

  //when save is clicked, the information that the user has typed into the input boxes
  //gets sent to the database and the parks_visited table for that park is updated.
  //the information is refreshed by calling the getMyParks function and is displayed on the DOM
  saveEditedInfo = () => {
    this.setState({
      isInEditMode: false,
      dateVisited: this.state.dateVisited,
      notes: this.state.notes,
      open: false,
    })
    axios({
      method: 'PUT',
      url: '/myparks/' + this.props.parkdisplay[0].all_parks_id,
      data: {
        id: this.props.parkdisplay[0].all_parks_id,
        date_visited_1: this.state.dateVisited,
        notes: this.state.notes,
      }
    }).then(() => {
      this.getMyParks();
    })
  }

  //this will toggle the park input information between text and input boxes with 
  //a save/cancel button
  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    })
  }

  //toggles park visited information on the modal between text and input fields for the user to update 
  displayEditFormDisplay = () => {
    if (this.state.isInEditMode) {
      editFormDisplay =
        <div className="editForm">
          <div className="textInputs">
            <input type="date"
              defaultValue={this.props.parkdisplay[0].date_visited_1}
              className="dateInput"
              onChange={this.handleChangeFor('dateVisited')}
            />
            <textarea type="text"
              rows="4" cols="50"
              defaultValue={this.props.parkdisplay[0].notes}
              onChange={this.handleChangeFor('notes')}
            />
          </div>
          <div className="editIconsContainer">
            {/* <Button onClick={this.changeEditMode}><i style={{ fontSize: '2em', color: '#44505c' }} className="far fa-window-close"></i></Button > */}
            <div className="editIcons">
              <Button onClick={this.saveEditedInfo}><i style={{ fontSize: '1.75em', color: '#44505c' }} className="far fa-save"></i> </Button>
              <Button onClick={this.deletePark(this.props.parkdisplay[0].parks_visited_id)}>
                <i style={{ fontSize: '1.75em', color: '#44505c' }} class="fas fa-trash"></i></Button >
            </div>
          </div>
          {/* <Button className={this.props.classes.deleteButton} variant="contained" color="secondary" onClick={this.deletePark(this.props.parkdisplay[0].parks_visited_id)}>Delete Park</Button> */}
        </div>
    }
    else {
      editFormDisplay =
        <div>
          <div className="editButton"><i style={{ fontSize: '1.25em', color: '#3180c6' }} class="fa fa-edit" onClick={this.changeEditMode}></i></div>
          <br></br>
          <div className={this.props.classes.tripNotes}>
            <Typography>Date Visited: {this.props.parkdisplay[0].date_visited_1}</Typography>
            <Typography>Trip Highlights: {this.props.parkdisplay[0].notes}</Typography>
          </div>
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
            // aria-labelledby="simple-modal-title"
            // aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.closeParkDisplay}
          >
            <div style={getModalStyle()} className={classes.paper}>
              {/* <Button className="closeModal" onClick={this.closeParkDisplay}><i style={{ fontSize: '1em' }} class="far fa-window-close"></i></Button> */}
              <Typography variant="h5" className="parkName">{this.props.parkdisplay[0].park_full_name}</Typography>
              <Divider className="modalDivider" />
              <Typography className="parkDescription">{this.props.parkdisplay[0].park_description}</Typography>
              <img className={this.props.classes.modalImage} alt={this.props.parkdisplay[0].park_description} src={this.props.parkdisplay[0].image_path_1} />
              {this.displayEditFormDisplay()}
              <div className="editFormDisplay"> {editFormDisplay} </div>
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
        <h1 className="myParksHeader">My Parks</h1>
        <div className="parksContainer">{this.createMyParks()}</div>
        {currentParkDisplay}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  //user: state.user,
  parks: state.parks,
  parkdisplay: state.parkdisplay,
  editpark: state.editpark,
});

export default withStyles(styles)(connect(mapStateToProps)(MyParks));
