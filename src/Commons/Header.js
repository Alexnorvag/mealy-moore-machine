import React, {Component} from 'react';
import './Header.scss';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'; // eslint-disable-line no-unused-vars

class Header extends Component {
    constructor() {
        super();

        this.state = {
            currentTime: new Date().toLocaleString(),
            date: ''
        };
    }

    componentDidMount() {
        setInterval(() => {
            var week = [
                'SUN',
                'MON',
                'TUE',
                'WED',
                'THU',
                'FRI',
                'SAT'
            ];
            var cd = new Date();
            console.log("DATE: ", );

            this.setState({
                currentTime: new Date().toLocaleString(),
                date: this.zeroPadding(cd.getFullYear(), 4) + '-' +
                this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2)
                + ' ' + week[cd.getDay()]
            })
        }, 1000)
    }

    zeroPadding(num, digit) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }

    render() {
        const {currentTime, date} = this.state;

        return (
            <div className="header">
                <nav className="navbar navbar-light bg-light">
                    <div className="col-4">
                        <Link to={'/home'}>
                            <p className="navbar-brand text-uppercase">Home</p>
                        </Link>
                    </div>
                    <div className="col-4 d-inline text-center">
                        <p className="date">{date}</p>
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
                </nav>
            </div>
        );
    }
}

export default Header;