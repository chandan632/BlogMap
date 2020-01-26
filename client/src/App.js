import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import NoMatch from './Components/NoMatch/NoMatch';
import Addblog from './Components/Addblog/Addblog';
import Blog from './Components/Blog/Blog';
import Profile from './Components/Profile/Profile';
import EditBlog from './Components/EditBlog/EditBlog';
import CategoryBlog from './Components/Blog/CategoryBlog';

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
                    <Route path="/blog" component={Blog} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/edit" component={EditBlog} />
                    <Route path="/categoryblog" component={CategoryBlog} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </>
    )
}

export default App