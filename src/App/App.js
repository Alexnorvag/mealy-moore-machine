import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from '../Commons/Header';
import Footer from '../Commons/Footer';
import Homepage from '../Homepage/Homepage';
import './App.scss';

// Components
import { Root } from "./Root";
// const Footer = ({title}) => (     <footer>{title}</footer> );

class App extends Component {
    render() {
        // const {footer} = this.props;

        return (

            <div className="app">
                <Router>
                    <Root>
                        <Switch>
                            <Route path={'/home'} component={Homepage}/>
                        </Switch>
                    </Root>
                </Router>
            </div>

        // <div className="app py-0">     <Header title='Home'/>     <Homepage/>
        // <Footer/> {/* <Footer title={footer}/> */} </div>
        );
    }
}

export default App;