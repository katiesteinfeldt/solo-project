const parkDisplayReducer = (state = [], action) => {
    switch (action.type) {
        case 'DISPLAY_CURRENT_PARK':
            return action.payload;
        default:
            return state;
    }
};

const clearCurrentPark = (state = [], action) => {
    switch (action.type) {
        case 'CLEAR_CURRENT_PARK':
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default parkDisplayReducer;
