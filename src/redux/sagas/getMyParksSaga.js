import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMyParks(action) {
    console.log('in getMyParks saga', action.payload);
    try {
        const getParksResponse = yield axios.get('/myparks/' + action.payload);
        yield dispatch({ type: 'SET_MY_PARKS', payload: getParksResponse.data });
        console.log(getParksResponse);
    }
    catch (error) {
        console.log('error with fetching my parks from the server', error);
    }
}

function* getMyParksSaga() {
    yield takeLatest('GET_PARKS', getMyParks);
}

export default getMyParksSaga;
