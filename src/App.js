import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import { 
  Box, 
  Container 
} from '@material-ui/core';

import Home from './pages/home';

//edwards: 1630162
//ball: 1630163

function App() {
  return (
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
  );
}

export default App;
