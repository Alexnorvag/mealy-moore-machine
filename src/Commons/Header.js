import React, {Component} from 'react';
import './Header.scss';

class Header extends Component {
    constructor() {
        super();

        this.state = {
            currentTime: new Date().toLocaleString()
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: new Date().toLocaleString()
            })
        }, 1000)
    }

    render() {
        const {currentTime} = this.state;

        return (
            <div className="header">
                <nav className="navbar navbar-light bg-light">
                    {/* <div className="row"> */}
                        <div className="col-4">
                            <a className="navbar-brand text-uppercase" href="/home">Home</a>
                        </div>
                        <div className="col-4 d-inline text-center">
                            <div className="mb-1">{(currentTime.substring(0, currentTime.indexOf(', ')))}</div>
                            <div className="">{(currentTime.substring(currentTime.indexOf(', ') + 2))}</div>
                        </div>

                        <div className="col-4 d-flex justify-content-end">
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary">Sasha Ignatenya</button>
                                <button
                                    type="button"
                                    className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <span className="sr-only">Toggle Dropdown</span>
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="/profile">Profile</a>
                                    <a className="dropdown-item" href="/settings">Settings</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/logout">Log out</a>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}

                </nav>
            </div>
        );
    }
}

export default Header;