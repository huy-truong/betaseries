import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import Series from './Series'
import LoginComponent from './LoginComponent';


class Router extends React.Component {
    requireAuth(nextState, replace, next) {
        console.log(this.state.isAuthenticated);
        if (!this.state.isAuthenticated) {
        replace({
            pathname: "/login",
        });
        }
    }

    render = () => {
        const isAuthenticated  = this.props.appProps.isAuthenticated;
        return (
            <div>
                   <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/home' component={Home}/>
                        <Route path='/series' render={() => !isAuthenticated ? <LoginComponent/> : <Series appProps={this.props.appProps}/>}/>
                        <Route path='/login' component={LoginComponent}/>
                    </Switch>
            </div>
        );
    }
}

export default Router;