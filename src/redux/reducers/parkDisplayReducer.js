const parkDisplayReducer = (state = [], action) => {
    switch (action.type) {
        case 'DISPLAY_CURRENT_PARK':
            return action.payload;
        default:
            return state;
    }
};

export default parkDisplayReducer;
