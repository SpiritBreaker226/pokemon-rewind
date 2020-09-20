import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
  },
  palette: {
    type: 'dark',
    text: {
      primary: '#fff',
    },
    background: {
      default: '#000',
    },
    info: {
      main: '#1e1f21',
    },
    success: {
      main: '#999',
    },
    error: {
      main: '#f44336',
    },
  },
})

export default theme
