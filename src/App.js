
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignInSide from './components/SignInSide'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import store from './redux/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Router>
    <div>
    <Switch>
          <Route exact path="/">
            <SignInSide></SignInSide>
          </Route>
          <PrivateRoute path="/Dashboard">
      <Provider store={store}>
            <Dashboard />
          </Provider>
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
