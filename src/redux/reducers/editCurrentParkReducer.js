
const editCurrentParkReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARK_TO_EDIT':
            return action.payload;
        default:
            return state;
    }
};


export default editCurrentParkReducer;
