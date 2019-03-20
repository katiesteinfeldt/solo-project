import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchPark(action) {
    console.log('in fetchParks saga')
    try {
        let getCurrentPark = yield axios.get('/currentpark' + action.payload);
        console.log(getCurrentPark);
        //yield dispatch({ type: 'SET_CURRENT_PARK', payload: getCurrentPark.data });
    }
    catch (error) {
        console.log('error with fetching current project from the server', error);
    }
}


function* parkSaga() {
    yield takeLatest('FETCH_PARK', fetchPark);
}

export default parkSaga;
