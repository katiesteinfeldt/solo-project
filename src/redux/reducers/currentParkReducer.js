const currentParkReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENT_PARK':
            return action.payload;
        case 'SET_PARK_TO_EDIT':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default currentParkReducer;
