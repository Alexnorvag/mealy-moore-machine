import React, {Component} from 'react';
import ReactTable from "react-table";
import update from 'immutability-helper';

import './Moore.scss'

class Moore extends Component {
    constructor() {
        super();

        this.state = {
            stateSet: 1,
            inputSignals: 1,
            outputSignals: 1,
            data: [
                {
                    inSignal: 'z1'
                }
            ],
            columns: [
                {
                    Header: 'Z/A',
                    accessor: 'inSignal',
                    // Cell: row => 'z/a'
                    minWidth: 40
                }, {
                    Header: 'a1',
                    accessor: 'a1',
                    minWidth: 40
                }
            ],
            test: []
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleChangeSelect = this
            .handleChangeSelect
            .bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        }, () => this.generateData());
    }

    handleChangeSelect(event, i, j) {
        this.state.test[i][j] = event.target.value;
        // this.setState({
        //     test: {
        //         ...this.state.test,
        //         [i]: {
        //             [j]: event.target.value
        //         }
        //     }
        // });
        this.generateTable();
    }

    generateData() {
        var data = [];

        for (let i = 0; i < this.state.inputSignals; i++) {
            data[i] = [];
            for (let j = 0; j < this.state.stateSet; j++) {
                data[i][j] = "selectState00";
            }
        }
        this.setState({
            test: data
        }, () => this.generateTable());
    }

    generateTable() {
        var testData = [];
        const testCol = [];
        var selectStateArray = [];

        //первая колонка
        testCol.push({Header: 'Z/A', accessor: 'inSignal', minWidth: 40});

        for (let i = 0; i < this.state.inputSignals; i++) {
            var optionListA = this.createOpt(i, 'a');
            var optionListW = this.createOpt(i, 'w');
            selectStateArray[i] = []

            //остальные данные
            for (let j = 0; j < this.state.stateSet; j++) {
                selectStateArray[i][j] = (
                    <div>
                        <select
                            name={"selectState" + i + j}
                            value={this.state.test[i][j]}
                            className="select-style"
                            onChange={(e) => this.handleChangeSelect(e, i, j)}>
                            {optionListA}
                        </select>
                        <select
                            name={"selectState" + i + j}
                            value={this.state.test[i][j]}
                            className="select-style"
                            onChange={(e) => this.handleChangeSelect(e, i, j)}>
                            {optionListW}
                        </select>
                    </div>
                );
            }

            //данные для первой колонки
            testData.push({
                inSignal: 'z' + (i + 1),
                arr: selectStateArray[i]
            });
        }

        //добавление названий для каждой колонки
        for (let i = 0; i < this.state.stateSet; i++) {
            testCol.push({
                Header: 'a' + (i + 1),
                id: i,
                accessor: 'arr.' + i,
                minWidth: 40
            });
        }

        this.setState({
            data: update(this.state.data, {$set: testData}),
            columns: update(this.state.columns, {$set: testCol})
        }, () => {
            console.log("Data: ", this.state.data);
            console.log("Col: ", this.state.columns);
            console.log("VALUES: ", this.state.test);
        })
    }

    createOpt = (rowNumber, optionName) => {
        let options = [];
        for (let i = 1; i <= this.state.stateSet; i++) {
            options.push(
                <option value={'selectState' + rowNumber + (i - 1)} key={i}>{optionName + i}</option>
            )
        }
        return options;
    }

    render() {

        return (
            <div className="moore-machine mt-3">
                <div className="row mx-0">
                    <div className="col-4">
                        <label htmlFor="stateSet">{"State set: " + this.state.stateSet + ' (A)'}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.stateSet}
                            min={1}
                            max={10}
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
                            onChange={this.handleChange}
                            id="outputSignals"/>
                    </div>
                    <div className="col-12 mt-5">
                        <ReactTable
                            data={this.state.data}
                            columns={this.state.columns}
                            pageSize={this.state.data.length}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Moore;