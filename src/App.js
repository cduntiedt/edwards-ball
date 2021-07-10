import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import {
  ThemeProvider,
  createMuiTheme,
  Box, 
  Container
} from '@material-ui/core';

import Home from './pages/home';

//edwards: 1630162
//ball: 1630163

const font =  "'Permanent Marker', sans-serif";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar></NavBar>
        <Box style={{marginTop:80}}>
          <Container>
            <Switch>
              <Route exact path="/" component={Home}></Route>
            </Switch>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
