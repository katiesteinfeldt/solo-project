import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCurrentPark(action) {
    try {
        const getParkResponse = yield axios.get('/currentpark/' + action.payload);
        yield dispatch({ type: '', payload: getParkResponse.data });
    }
    catch (error) {
        console.log('error with fetching current park from the server', error);
    }
}

function* currentParkSaga() {
    yield takeLatest('FETCH_CURRENT_PARK', fetchCurrentPark);
}

export default currentParkSaga;
