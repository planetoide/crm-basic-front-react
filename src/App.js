
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignInSide from './components/SignInSide'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
    <div>
    <Switch>
          <Route exact path="/">
            <SignInSide></SignInSide>
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
