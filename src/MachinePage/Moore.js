import React, {Component} from 'react';

class Moore extends Component {
    constructor() {
        super();

        this.state = {
            z: 0,
            w: 0,
            a: 0
        };

        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {

        return (
            <div className="moore-machine">
                <div className="row mx-0">
                    <div className="col-4">
                        <label htmlFor="z">{this.state.z}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.z}
                            min={0}
                            max={10}
                            onInput={this.handleChange}
                            id="z"/>
                    </div>
                    <div className="col-4">
                        <label htmlFor="w">{this.state.w}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.w}
                            min={0}
                            max={10}
                            onInput={this.handleChange}
                            id="w"/>
                    </div>
                    <div className="col-4">
                        <label htmlFor="a">{this.state.a}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.a}
                            min={0}
                            max={10}
                            onInput={this.handleChange}
                            id="a"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Moore;