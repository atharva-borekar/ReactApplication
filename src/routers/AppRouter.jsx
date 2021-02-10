import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Login from "../components/Login";
import Home from "../components/Home";

const AppRouter = () =>{
    return(
        <Router>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route component={Login}/>
            </Switch>
        </Router>
    );
}

export default AppRouter;