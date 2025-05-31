import { Provider } from 'react-redux';
import { store } from './store/store';
import UrlShortener from './components/UrlShortener';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UrlShortener />
      </ThemeProvider>
    </Provider>
  );
}

export default App;