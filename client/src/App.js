import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import NoMatch from './Components/NoMatch/NoMatch';
import Addblog from './Components/Addblog/Addblog';

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/addblog" component={Addblog} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </>
    )
}

export default App