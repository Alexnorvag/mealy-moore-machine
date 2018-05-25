import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
// import Header from '../Commons/Header';
// import Footer from '../Commons/Footer';
import Homepage from '../Homepage/Homepage';
import Moore from '../MachinePage/Moore'
import Mealy from '../MachinePage/Mealy'
import './App.scss';

// Components
import { Root } from "./Root";
// const Footer = ({title}) => (     <footer>{title}</footer> );

class App extends Component {
    render() {
        // const {footer} = this.props;

        return (

            <div className="app py-0">
                <Router>
                    <Root>
                        <main>
                            <Switch>
                                <Route path={'/home'} component={Homepage}/>
                                <Route path={'/moore'} component={Moore}/>
                                <Route path={'/mealy'} component={Mealy}/>
                                <Route exact path={'/'} component={() => <Redirect to={'/home'} />} />
                            </Switch>
                        </main>
                    </Root>
                </Router>
            </div>

        // <div className="app py-0">     <Header title='Home'/>     <Homepage/>
        // <Footer/> {/* <Footer title={footer}/> */} </div>
        );
    }
}

export default App;