import {
  createTheme,
  PaletteOptions,
  ThemeOptions,
} from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const ubuntuDefault = {
  fontFamily: ['Ubuntu', 'sans-serif'].join(','),
  letterSpacing: 0.3,
};

const montserratDefault = {
  fontFamily: ['Montserrat Alternates', 'sans-serif'].join(','),
  fontWeight: 700,
};

const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#4FD1C5',
    dark: '#171923',
    light: 'rgba(57, 178, 172, .2)',
  },
  secondary: {
    main: '#F687B3',
  },
  background: {
    default: '#1A202C',
    paper: '#2D3748',
  },
};

const typography: TypographyOptions = {
  h1: {
    ...montserratDefault,
  },
  h2: {
    ...montserratDefault,
  },
  h3: {
    ...montserratDefault,
  },

  h4: {
    ...montserratDefault,
  },

  body1: {
    ...ubuntuDefault,
  },

  body2: {
    ...ubuntuDefault,
  },

  button: {
    ...ubuntuDefault,
    textTransform: 'none',
    fontWeight: 'bold',
  },
};

export const themeOptions: ThemeOptions = {
  components: {
    MuiAppBar: {
      defaultProps: {
        style: {
          backgroundColor: '#1A202C',
          backgroundImage: 'unset',
        },
      },
    },
  },
  palette,
  typography,
};

export default createTheme({
  ...themeOptions,
});
