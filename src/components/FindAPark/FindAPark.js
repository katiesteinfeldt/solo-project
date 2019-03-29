import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './FindAPark.css';
import Card from '@material-ui/core/Card';
import { CardContent, CardActions, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  cardTitle: {
    padding: 15,
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
  card: {
    maxWidth: 600,
    margin: 15,
  },
  parkDescription: {
    marginTop: 20,
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

class FindAPark extends Component {
  state = {
    parkDisplay: false,
    open: false,
    newPark: {
      park_id: 0,
      user_id: this.props.user.id,
      date_visited_1: '2019-03-01',
      date_visited_2: '',
      date_visited_3: '',
      notes: '',
    },
    parkSubmitted: false,
  }

  componentDidMount = () => {
    this.getParks();
  }

  getParks = () => {
    axios.get('/parks')
      .then((response) => {
        this.props.dispatch({ type: 'SET_PARKS', payload: response.data })
      }).catch(error => {
        console.log('error in parks client get request', error);
      });
  }

  handleParkChange = event => {
    axios.get('/currentpark/', {
      params: {
        id: event.target.value,
      }
    }).then((response) => {
      this.props.dispatch({ type: 'SET_CURRENT_PARK', payload: response.data })
      this.setState({
        park_id: this.props.currentpark.id,
        parkDisplay: true,
        parkSubmitted: false,
      })
    }).catch(error => {
      console.log('error in current park get request', error);
    });
  }

  //displays new park fields on the DOM when the function runs
  addVisit = () => {
    console.log('button clicked', this.props.currentpark[0].id);
    this.setState({
      open: true,
    })
  }

  // sets local state to input values
  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      newPark: {
        ...this.state.newPark,
        [propertyName]: event.target.value,
      }
    });
  }

  //add park to parks_visited database 
  addPark = () => {
    axios({
      method: 'POST',
      url: '/currentpark/' + this.props.currentpark[0].id,
      data: {
        user_id: this.state.newPark.user_id,
        date_visited_1: this.state.newPark.date_visited_1,
        notes: this.state.newPark.notes,
        park_id: this.props.currentpark[0].id,
      }
    })
      .then(() => {
        this.setState({
          open: false,
          parkSubmitted: true,
          parkDisplay: true,
          newPark: {
            park_id: 0,
            user_id: this.props.user.id,
            date_visited_1: '2019-03-01',
            date_visited_2: '',
            date_visited_3: '',
            notes: '',
          },
        })

      })
  }

  closeParkDisplay = () => {
    this.setState({
      open: false,
      parkSubmitted: false,
    })
  }

  render() {
    const { classes } = this.props;
    let parkDOMDisplay
    let addParkDOMDisplay
    if (this.state.parkDisplay) {
      parkDOMDisplay =
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography className={this.props.classes.cardTitle} variant="h4">{this.props.currentpark[0].park_full_name}</Typography>
            <Divider />
            <img onClick={this.viewParkInfo} className="parkImages" alt={this.props.currentpark[0].park_description} src={this.props.currentpark[0].image_path_1} />
            <Typography className={classes.parkDescription}>{this.props.currentpark[0].park_description}</Typography>
          </CardContent>
          <CardActions>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.addVisit}>Add Visit</Button>
          </CardActions>
        </Card>
    }
    else {
      parkDOMDisplay = null;
    }

    if (this.state.open) {
      addParkDOMDisplay = <div>
        {this.props.currentpark[0] &&
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.closeParkDisplay}
           >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h4"> Add Visit To {this.props.currentpark[0].park_full_name}</Typography>
            <pre></pre>
            <TextField
              value={this.state.newPark.date_visited_1}
              onChange={this.handleChangeFor('date_visited_1')}
              id="date"
              type="date"
              className={classes.textField}
              margin="normal"
            />
            <TextField
            value={this.state.newPark.notes}
            onChange={this.handleChangeFor('notes')}
              id="standard-multiline-static"
              label="Park Notes"
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={this.addPark}>Add Park</Button>
          </div>
          </Modal>
        }
    
      </div>
    }
    else {
      addParkDOMDisplay = null;
    }

    let parkSubmitted
    if (this.state.parkSubmitted) {
      parkSubmitted = <h1>Success!</h1>
    }
    else {
      parkSubmitted = null;
    }


    return (
      <div>
        <div>{parkSubmitted}</div>
        <h1 className="findAPark">Find A Park</h1>
        <div className="container">
        <select
          
          onChange={this.handleParkChange}
        >
          <option>-- Find A Park --</option>
          {this.props.parks && this.props.parks.map(park =>
            <option value={park.id} key={park.id}>{park.park_full_name}</option>
          )}
          </select>
        </div>
        <br />
        <br />
       {parkDOMDisplay}
        <br />
        <br />
        <div>{addParkDOMDisplay}</div>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState;
}

export default withStyles(styles)(connect(mapReduxStateToProps)(FindAPark));
