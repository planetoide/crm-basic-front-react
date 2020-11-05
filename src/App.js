
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignInSide from './components/SignInSide'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
    <div>
    <Switch>
          <Route exact path="/">
            <SignInSide></SignInSide>
          </Route>
          <PrivateRoute path="/Dashboard">
            <Dashboard />
          </PrivateRoute>
          {/* <Route path="/Dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
    </div>
    </Router>
  );
}

export default App;
