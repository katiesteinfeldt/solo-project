import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* editCurrentPark(action) {
    try {
        const editParkResponse = yield axios.get('/editpark/' + action.payload);
        yield dispatch({ type: 'SET_PARK_TO_EDIT', payload: editParkResponse.data });
    }
    catch (error) {
        console.log('error with fetching current park from the server', error);
    }
}

function* editParkSaga() {
    yield takeLatest('EDIT_PARK', editCurrentPark);
}

export default editParkSaga;
