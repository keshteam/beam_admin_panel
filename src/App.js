import React from 'react';
import './App.css';
import { 
  BrowserRouter as Router, 
  Route, 
  // Link,
  Switch,
  // Redirect
} from "react-router-dom";

// import NoMatch from './components/NoMatch';
import Main from "./components/RootRoutes/Main";
import SignIn from "./components/SignIn/SignIn";

function App() {
const setTokenHandler = () => {
  // console.log('adminToken',localStorage.getItem('adminToken'))
}
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={() => { return <SignIn onSetToken={setTokenHandler} />}} /> 
          <Route  path="/admin" component={Main} />
          {/* <Route component={NoMatch} /> */}
      </Switch>
    </Router>
  );
}

export default App;
