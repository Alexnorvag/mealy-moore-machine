import React, {Component} from 'react';
import ReactTable from "react-table";
import Select from 'react-select';
import update from 'immutability-helper';

import 'react-select/dist/react-select.css';
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
                    inSignal: 'Z1'
                }
            ],
            columns: [
                {
                    Header: 'Z/A',
                    accessor: 'inSignal',
                    // Cell: row => 'z/a'
                    minWidth: 40
                }, {
                    Header: 'A1',
                    accessor: 'a1',
                    minWidth: 40
                }
            ]
        };

        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        }, () => this.generateTable());
    }

    generateTable() {
        const testData = [];
        const testCol = [];
        testCol.push({
            Header: 'Z/A', accessor: 'inSignal', minWidth: 40
            // Cell: row => 'z/a'
        });

        for (let i = 0; i < this.state.inputSignals; i++) {
            testData.push({
                inSignal: 'Z' + (i + 1)
            });
            var statesA = [];
            for (let j = 0; j < this.state.stateSet; j++) {
                statesA.push('a' + (j + 1));
            }
            testData[i] = update(testData[i], {$merge: [statesA]});
        }

        console.log("AFAFA: ", testData[0][0][2]);

        for (let i = 0; i < this.state.stateSet; i++) {
            testCol.push({
                Header: 'A' + (i + 1),
                // accessor: 'a' + (i + 1),
                Cell: row => this.editHandler(row),
                // Cell: row => testData[0][0][i] + ' / z',
                minWidth: 40
            });
        }

        this.setState({
            data: update(this.state.data, {$set: testData}),
            columns: update(this.state.columns, {$set: testCol})
        })
        console.log("Data", testData);
        // console.log("STATE DATA", this.state.data);
        console.log("Col: ", testCol);
    }

    editHandler(cellInfo) {
        return (
            <div>
                <select name="select">
                    <option value="value1">Значение 1</option>
                    <option value="value2" selected>Значение 2</option>
                    <option value="value3">Значение 3</option>
                </select>
                <select>
                    <option>w1</option>
                    <option>w2</option>
                </select>
            </div>
        //   <div className="d-flex justify-content-center">     <a       style={{
        // cursor: 'pointer'       }}       onClick={e => {         if
        // (this.state.selectedArray.trigger) {           console.log('true. trigger',
        // this.state.selectedArray.trigger);           console.log('FULL ARR: ',
        // this.state.selectedArray);         }         this.setState({           modal:
        // update(this.state.modal, {             $set: !this.state.modal           }),
        // selectedArray: update(this.state.selectedArray, {             $set:
        // this.state.data[cellInfo.index]           }),           changeState:
        // update(this.state.changeState, {             $set: !this.state.changeState
        // }),           indexToChange: update(this.state.indexToChange, { $set:
        // cellInfo.index           })         });       }}>       <i className="far
        // fa-edit" />     </a>   </div>
        );
    }

    render() {
        // console.log("Data from State: ", this.state.data);

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