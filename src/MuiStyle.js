import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#faca9c',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        text: {
            primary: '#44505c',
        }
        // error: will use the default color
    },
    typography: {
        fontFamily: 'Roboto',
        fontSize: 14,
    },

});

export default theme;