import React, {Component} from 'react';
import ReactTable from "react-table";
import update from 'immutability-helper';
import {Table, Button} from 'reactstrap';

import './Mealy.scss';

class Mealy extends Component {
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
            statesArray: [],
            outputsArray: [],
            counter: 0
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
        if (event.target.name.indexOf('selectState') !== -1) {
            // eslint-disable-next-line
            this.state.statesArray[i][j] = event.target.value;
            this.generateTable();
        } else  {
            // eslint-disable-next-line
            this.state.outputsArray[i][j] = event.target.value;
            this.generateTable();
        }
    }

    generateData() {
        console.log("FORM GENERATE DATA");
        var dataStates = [];
        var dataOutputs = [];

        for (let i = 0; i < this.state.inputSignals; i++) {
            dataStates[i] = [];
            dataOutputs[i] = [];
            for (let j = 0; j < this.state.stateSet; j++) {
                dataStates[i][j] = "selectState00";
                dataOutputs[i][j] = "selectOutput00";
            }
        }
        this.setState({
            statesArray: dataStates,
            outputsArray: dataOutputs
        }, () => this.generateTable());
    }

    generateTable() {
        var testData = [];
        const testCol = [];
        var selectStateArray = [];

        //первая колонка
        testCol.push({Header: 'Z/A', accessor: 'inSignal', minWidth: 40});

        for (let i = 0; i < this.state.inputSignals; i++) {
            var optionListA = this.createOptions(i, 'a');
            var optionListW = this.createOptions(i, 'w');
            selectStateArray[i] = []

            //остальные данные
            for (let j = 0; j < this.state.stateSet; j++) {
                selectStateArray[i][j] = (
                    <div>
                        <select
                            name={"selectState" + i + j}
                            value={this.state.statesArray[i][j]}
                            className="select-style"
                            onChange={(e) => this.handleChangeSelect(e, i, j)}>
                            {optionListA}
                        </select>
                        <select
                            name={"selectOutput" + i + j}
                            value={this.state.outputsArray[i][j]}
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
            console.log("States: ", this.state.statesArray);
            console.log("Outputs: ", this.state.outputsArray);
        })
    }

    createOptions = (rowNumber, optionName) => {
        let options = [];
        if (optionName === 'a') {
            for (let i = 1; i <= this.state.stateSet; i++) {
                options.push(
                    <option value={'selectState' + rowNumber + (i - 1)} key={i}>{optionName + i}
                    </option>
                )
            }
        } else {
            for (let i = 1; i <= this.state.outputSignals; i++) {
                options.push(
                    <option value={'selectOutput' + rowNumber + (i - 1)} key={i}>{optionName + i}
                    </option>
                )
            }
        }
        console.log("OPTIONS:");
        return options;
    }

    generateTriangleTable() {
        for (let i = 1; i < this.state.stateSet; i++) {
            console.log("Index: ", i);
        }
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
                            pageSize={this.state.data.length}
                            showPagination={false}
                            />
                    </div>
                    <div className="col-12 mt-3">
                        <Button color="primary">
                            add 'Build button' to pagination
                        </Button>
                    {this.generateTriangleTable()}
                    </div>
                    <div className="col-12 mt-3">
                        <Table bordered>
                            {/* <thead>
                                <tr>
                                    <th>a2</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead> */}
                            <tbody>
                                <tr>
                                    <td scope="row">a2</td>
                                    <td>X</td>
                                    {/* <td>Otto</td>
                                    <td>@mdo</td> */}
                                </tr>
                                <tr>
                                    <td scope="row">a3</td>
                                    <td>(a2, a6)</td>
                                    <td>X</td>
                                    {/* <td>@mdo</td> */}
                                </tr>
                                <tr>
                                    <td scope="row">a4</td>
                                    <td>X</td>
                                    <td>X</td>
                                    <td>X</td>
                                </tr>
                                <tr>
                                    <td scope="row">a5</td>
                                    <td>X</td>
                                    <td>(a2, a6), (a5, a6)</td>
                                    <td>X</td>
                                    <td>X</td>
                                </tr>
                                <tr>
                                    <td scope="row">a6</td>
                                    <td>X</td>
                                    <td>(a2, a5)</td>
                                    <td>X</td>
                                    <td>X</td>
                                    <td>(a2, a5)</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>a1</td>
                                    <td>a2</td>
                                    <td>a3</td>
                                    <td>a4</td>
                                    <td>a5</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mealy;