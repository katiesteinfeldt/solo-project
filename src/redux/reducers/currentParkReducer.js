const currentParkReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENT_PARK':
            return action.payload;
        default:
            return state;
    }
};

export default currentParkReducer;
