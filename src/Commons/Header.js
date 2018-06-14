import React, {Component} from 'react';
import './Header.scss';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'; // eslint-disable-line no-unused-vars

class Header extends Component {
    constructor() {
        super();

        this.state = {
            date: '',
            time: ''
        };
    }

    componentDidMount() {
        setInterval(() => {
            const week = [
                'SUN',
                'MON',
                'TUE',
                'WED',
                'THU',
                'FRI',
                'SAT'
            ];
            let currentDate = new Date();

            this.setState({
                date: this.clearPadding(currentDate.getFullYear(), 4) + '-' + this.clearPadding(currentDate.getMonth() + 1, 2) + '-' + this.clearPadding(currentDate.getDate(), 2) + ' ' + week[currentDate.getDay()],
                time: this.clearPadding(currentDate.getHours(), 2) + ':' + this.clearPadding(currentDate.getMinutes(), 2) + ':' + this.clearPadding(currentDate.getSeconds(), 2)
            })
        }, 1000)
    }

    clearPadding(num, digit) {
        let zero = '';
        for (let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }

    render() {
        const {date, time} = this.state;

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
                        <p className="time">{time}</p>
                    </div>

                    <div className="col-4 d-flex justify-content-end">
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary">Alexandra Ignatenya</button>
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