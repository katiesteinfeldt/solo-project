import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#3180c6',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main,
        },
        secondary: {
            light: '#0066ff',
            main: '#3180c6',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#3180c6',
        },
        text: {
            primary: '#44505c',
        }
        // error: will use the default color
    },
    typography: {
        fontFamily: 'Roboto',
        fontSize: 14,
        useNextVariants: true,
    },

});

export default theme;