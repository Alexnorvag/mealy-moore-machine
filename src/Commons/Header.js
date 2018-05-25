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
        // console.log("DATE NOW: ", new Date().toLocaleString());
        const {currentTime} = this.state;

        return (
            <div className="header">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand text-uppercase" href="/home">{this.props.title}</a>
                    <div className="">{(currentTime)}</div>

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

                </nav>
            </div>
        );
    }
}

export default Header;