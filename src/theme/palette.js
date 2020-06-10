import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[500],
    light: colors.blue[100]
  },
  secondary: {
    contrastText: white,
    dark: '#7049a3',
    main: '#7049a3',
    light: '#7049a3'
  },
  success: {
    contrastText: white,
    dark: '#2DBDA8',
    main: '#2DBDA8',
    light: '#2DBDA8'
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[500],
    light: colors.blue[100]
  },
  warning: {
    contrastText: white,
    dark: '#EFC663',
    main: '#EFC663',
    light: '#EFC663'
  },
  error: {
    contrastText: white,
    dark: '#E16070',
    main: '#E16070',
    light: '#E16070'
  },
  text: {
    primary: '#f5f5f5',
    secondary: colors.blueGrey[200],
    link: colors.blue[600]
  },
  background: {
    default: '#353C45',
    paper: '#353C45'
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
