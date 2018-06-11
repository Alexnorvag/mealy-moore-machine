import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';// eslint-disable-line no-unused-vars
import './Homepage.scss';

class Homepage extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {

        return (
            <div className="homepage content">
                <div className="row d-flex justify-content-around align-middle m-0">
                    <div className="col-11">
                        <div className="card border-0 bg-transparent">
                            <div className="card-body">
                                <h2 className="card-title">Moore and Mealy Machines</h2>
                                <p className="card-text font-italic">Description for both machines
                                </p>
                                <p className="card-text text-monospace">Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Similique possimus aliquam nulla eos, optio nisi, impedit
                                    explicabo laborum maiores aliquid accusantium blanditiis quae placeat ratione
                                    sint perferendis alias error vitae!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <Link to={'/moore'} className="link-decoration">
                            <div className="card card-item border-0 bg-transparent">
                                <img
                                    className="card-image"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Moore_Machine.svg/330px-Moore_Machine.svg.png"
                                    alt="Moore machine"/>
                                <div className="card-info">
                                    <h2 className="text-dark">Moore machine</h2>
                                    <div className="meta">271</div>
                                    <div className="brand">Description</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <Link to={'mealy'} className="link-decoration">
                            <div className="card card-item border-0 bg-transparent">
                                <img
                                    className="card-image"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/CPT-FSM-Mealy-01.svg/350px-CPT-FSM-Mealy-01.svg.png"
                                    alt="Mealy machine"/>
                                <div className="card-info">
                                    <h2 className="text-dark">Mealy machine</h2>
                                    <div className="meta">271</div>
                                    <div className="brand">Description</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;