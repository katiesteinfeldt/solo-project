import loginReducer from '../../redux/reducers/loginModeReducer';
import userReducer from '../../redux/reducers/userReducer';

describe('Testing loginModeReducer', () => {
    test('should have the correct initial state', () => {
        const action = {type: 'INITIALIZE'};
        const returnedState = loginReducer(undefined, action);
        expect(returnedState).toBe('login');
    });
    test('should have the correct ____', () => {
        const action = {type: 'SET_TO_REGISTER_MODE'};
        const returnedState = loginReducer(undefined, action);
        expect(returnedState).toBe('register');
    });
});

describe('Testing userReducer', () => {
   
});