import React, {Component} from 'react';

class Moore extends Component {
    constructor() {
        super();

        this.state = {
            inputSignals: 1,
            outputSignals: 1,
            stateSet: 1
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
                        <label htmlFor="stateSet">{"State set: " + this.state.stateSet + ' (A)'}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.stateSet}
                            min={1}
                            max={10}
                            onInput={this.handleChange}
                            onChange={this.handleChange}
                            id="stateSet"/>
                    </div>
                    <div className="col-4">
                        <label htmlFor="inputSignals">{"Input signals: " + this.state.inputSignals + ' (Z)'}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.inputSignals}
                            min={1}
                            max={10}
                            onInput={this.handleChange}
                            onChange={this.handleChange}
                            id="inputSignals"/>
                    </div>
                    <div className="col-4">
                        <label htmlFor="outputSignals">{"Output signals: " + this.state.outputSignals + ' (W)'}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.outputSignals}
                            min={1}
                            max={10}
                            onInput={this.handleChange}
                            onChange={this.handleChange}
                            id="outputSignals"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Moore;